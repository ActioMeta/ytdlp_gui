use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DownloadConfig {
    audio_quality: String,
    subtitles: bool,
    subtitle_lang: String,
    title_format: String, // "date-original" o "original"
    output_path: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DownloadProgress {
    url: String,
    status: String, // "pending", "downloading", "completed", "error"
    progress: f32,
    message: String,
}

// Función auxiliar para obtener el comando de yt-dlp según la plataforma
fn get_ytdlp_command() -> &'static str {
    #[cfg(target_os = "windows")]
    {
        "yt-dlp.exe"
    }
    #[cfg(not(target_os = "windows"))]
    {
        "yt-dlp"
    }
}

// Comando para verificar si yt-dlp está instalado
#[tauri::command]
async fn check_ytdlp() -> Result<bool, String> {
    let ytdlp_cmd = get_ytdlp_command();
    
    // Intentar primero con el comando directo
    let output = Command::new(ytdlp_cmd)
        .arg("--version")
        .output();
    
    match output {
        Ok(out) if out.status.success() => Ok(true),
        _ => {
            // En Windows, también intentar con "python -m yt_dlp"
            #[cfg(target_os = "windows")]
            {
                let python_output = Command::new("python")
                    .args(&["-m", "yt_dlp", "--version"])
                    .output();
                match python_output {
                    Ok(out) if out.status.success() => Ok(true),
                    _ => Ok(false),
                }
            }
            #[cfg(not(target_os = "windows"))]
            {
                Ok(false)
            }
        }
    }
}

// Comando para seleccionar carpeta de descarga
#[tauri::command]
async fn select_folder(app: tauri::AppHandle) -> Result<String, String> {
    use tauri_plugin_dialog::DialogExt;
    
    let folder = app.dialog()
        .file()
        .blocking_pick_folder();
    
    match folder {
        Some(path) => Ok(path.to_string()),
        None => Err("No folder selected".to_string()),
    }
}

// Comando para descargar un video
#[tauri::command]
async fn download_video(
    url: String,
    config: DownloadConfig,
) -> Result<String, String> {
    let mut args = vec![];
    
    // Configurar formato de salida según el formato de título
    let output_template = match config.title_format.as_str() {
        "date-original" => format!("{}/%(upload_date>%Y-%m-%d)s - %(title)s.%(ext)s", config.output_path),
        _ => format!("{}/%(title)s.%(ext)s", config.output_path),
    };
    
    args.push("-o".to_string());
    args.push(output_template);
    
    // Configurar formato de video - mejor calidad mp4
    args.push("-f".to_string());
    args.push("bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best".to_string());
    
    // Configurar calidad de audio
    if !config.audio_quality.is_empty() {
        args.push("--audio-quality".to_string());
        args.push(config.audio_quality.clone());
    }
    
    // Configurar subtítulos
    if config.subtitles {
        args.push("--write-subs".to_string());
        args.push("--sub-lang".to_string());
        args.push(config.subtitle_lang.clone());
    }
    
    // Agregar URL
    args.push(url.clone());
    
    let ytdlp_cmd = get_ytdlp_command();
    
    // Ejecutar yt-dlp
    let output = Command::new(ytdlp_cmd)
        .args(&args)
        .output();
    
    match output {
        Ok(out) if out.status.success() => {
            Ok(format!("Video descargado exitosamente: {}", url))
        }
        Ok(out) => {
            let error_msg = String::from_utf8_lossy(&out.stderr);
            
            // En Windows, intentar con python si falla el comando directo
            #[cfg(target_os = "windows")]
            {
                let mut python_args = vec!["-m", "yt_dlp"];
                for arg in &args {
                    python_args.push(arg.as_str());
                }
                
                let python_output = Command::new("python")
                    .args(&python_args)
                    .output();
                
                match python_output {
                    Ok(pout) if pout.status.success() => {
                        return Ok(format!("Video descargado exitosamente: {}", url));
                    }
                    Ok(pout) => {
                        let perror = String::from_utf8_lossy(&pout.stderr);
                        return Err(format!("Error descargando video: {}", perror));
                    }
                    Err(e) => {
                        return Err(format!("Error ejecutando yt-dlp: {}", e));
                    }
                }
            }
            
            #[cfg(not(target_os = "windows"))]
            {
                Err(format!("Error descargando video: {}", error_msg))
            }
        }
        Err(e) => Err(format!("Error ejecutando yt-dlp: {}", e)),
    }
}

// Comando para obtener información de un video
#[tauri::command]
async fn get_video_info(url: String) -> Result<String, String> {
    let ytdlp_cmd = get_ytdlp_command();
    
    let output = Command::new(ytdlp_cmd)
        .args(&["--dump-json", &url])
        .output();
    
    match output {
        Ok(out) if out.status.success() => {
            let info = String::from_utf8_lossy(&out.stdout);
            Ok(info.to_string())
        }
        Ok(out) => {
            let error_msg = String::from_utf8_lossy(&out.stderr);
            
            // En Windows, intentar con python
            #[cfg(target_os = "windows")]
            {
                let python_output = Command::new("python")
                    .args(&["-m", "yt_dlp", "--dump-json", &url])
                    .output();
                
                match python_output {
                    Ok(pout) if pout.status.success() => {
                        let info = String::from_utf8_lossy(&pout.stdout);
                        return Ok(info.to_string());
                    }
                    _ => {}
                }
            }
            
            Err(format!("Error obteniendo información: {}", error_msg))
        }
        Err(e) => Err(format!("Error ejecutando yt-dlp: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            check_ytdlp,
            select_folder,
            download_video,
            get_video_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
