use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DownloadConfig {
    // Opciones básicas
    audio_quality: String,
    subtitles: bool,
    subtitle_lang: String,
    title_format: String, // "date-original" o "original"
    output_path: String,
    rate_limit: String,  // Límite de velocidad (ej: "1M", "500K")
    sleep_interval: u64, // Tiempo de espera entre descargas (segundos)

    // Nuevas opciones avanzadas
    cookies_browser: String, // Browser para cookies: "none", "chrome", "firefox", "edge", "brave", etc.
    sponsorblock: bool,      // Remover segmentos de SponsorBlock
    extract_audio: bool,     // Extraer solo audio
    audio_format: String,    // Formato audio: "mp3", "m4a", "opus", "wav", etc.
    geo_bypass: bool,        // Bypass restricciones geográficas
    max_filesize: String,    // Tamaño máximo (ej: "100M", "1G")
    embed_metadata: bool,    // Incluir metadata en el archivo
    embed_thumbnail: bool,   // Incluir thumbnail en el archivo
    all_subtitles: bool,     // Descargar todos los idiomas de subtítulos
    playlist_items: String,  // Items de playlist: "1-5" o "1,3,5" o "all"
    use_python: bool,        // Forzar uso de python -m yt_dlp
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DownloadProgress {
    url: String,
    status: String, // "pending", "downloading", "completed", "error"
    progress: f32,
    message: String,
}

// Función auxiliar mejorada para ejecutar yt-dlp (con soporte Python)
fn execute_ytdlp(
    args: &[String],
    use_python: bool,
) -> Result<std::process::Output, std::io::Error> {
    // Si se fuerza Python o estamos en Windows, intentar primero con Python
    if use_python {
        let mut python_args = vec!["-m".to_string(), "yt_dlp".to_string()];
        python_args.extend(args.iter().cloned());

        // Intentar con python3 primero (Linux/Mac)
        #[cfg(not(target_os = "windows"))]
        {
            let output = Command::new("python3").args(&python_args).output();

            if output.is_ok() {
                return output;
            }
        }

        // Intentar con python (Windows/fallback)
        return Command::new("python").args(&python_args).output();
    }

    // Intentar con comando nativo yt-dlp
    let ytdlp_cmd = get_ytdlp_command();
    let output = Command::new(ytdlp_cmd).args(args).output();

    // Si falla en Windows, intentar automáticamente con Python
    #[cfg(target_os = "windows")]
    {
        if output.is_err() || !output.as_ref().unwrap().status.success() {
            let mut python_args = vec!["-m".to_string(), "yt_dlp".to_string()];
            python_args.extend(args.iter().cloned());

            return Command::new("python").args(&python_args).output();
        }
    }

    output
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
async fn check_ytdlp() -> Result<String, String> {
    let ytdlp_cmd = get_ytdlp_command();

    // Intentar primero con el comando directo
    let output = Command::new(ytdlp_cmd).arg("--version").output();

    match output {
        Ok(out) if out.status.success() => {
            let version = String::from_utf8_lossy(&out.stdout);
            return Ok(format!("native:{}", version.trim()));
        }
        _ => {}
    }

    // Intentar con python3 (Linux/Mac)
    #[cfg(not(target_os = "windows"))]
    {
        let python3_output = Command::new("python3")
            .args(&["-m", "yt_dlp", "--version"])
            .output();

        if let Ok(out) = python3_output {
            if out.status.success() {
                let version = String::from_utf8_lossy(&out.stdout);
                return Ok(format!("python3:{}", version.trim()));
            }
        }
    }

    // Intentar con python (Windows/fallback)
    let python_output = Command::new("python")
        .args(&["-m", "yt_dlp", "--version"])
        .output();

    match python_output {
        Ok(out) if out.status.success() => {
            let version = String::from_utf8_lossy(&out.stdout);
            Ok(format!("python:{}", version.trim()))
        }
        _ => Err("yt-dlp no encontrado. Instálalo con: pip install yt-dlp".to_string()),
    }
}

// Comando para verificar si FFmpeg está instalado
#[tauri::command]
async fn check_ffmpeg() -> Result<String, String> {
    // Verificar ffmpeg
    let ffmpeg_output = Command::new("ffmpeg").arg("-version").output();

    // Verificar ffprobe (necesario para procesar audio)
    let ffprobe_output = Command::new("ffprobe").arg("-version").output();

    match (ffmpeg_output, ffprobe_output) {
        (Ok(ffmpeg), Ok(ffprobe)) if ffmpeg.status.success() && ffprobe.status.success() => {
            let version = String::from_utf8_lossy(&ffmpeg.stdout);
            let first_line = version.lines().next().unwrap_or("unknown");
            Ok(first_line.to_string())
        }
        (Ok(ffmpeg), _) if ffmpeg.status.success() => {
            Err("FFmpeg encontrado pero falta ffprobe. Reinstala FFmpeg completo.".to_string())
        }
        _ => Err("FFmpeg no encontrado. Necesario para extraer audio.".to_string()),
    }
}

// Comando para seleccionar carpeta de descarga
#[tauri::command]
async fn select_folder(app: tauri::AppHandle) -> Result<String, String> {
    use tauri_plugin_dialog::DialogExt;

    let folder = app.dialog().file().blocking_pick_folder();

    match folder {
        Some(path) => Ok(path.to_string()),
        None => Err("No folder selected".to_string()),
    }
}

// Comando para descargar un video
#[tauri::command]
async fn download_video(url: String, config: DownloadConfig) -> Result<String, String> {
    let mut args = vec![];

    // Configurar formato de salida según el formato de título
    let output_template = match config.title_format.as_str() {
        "date-original" => format!(
            "{}/%(upload_date>%Y-%m-%d)s - %(title)s.%(ext)s",
            config.output_path
        ),
        _ => format!("{}/%(title)s.%(ext)s", config.output_path),
    };

    args.push("-o".to_string());
    args.push(output_template);

    // === NUEVAS OPCIONES AVANZADAS ===

    // Cookies del navegador (CRÍTICO para evitar bloqueos)
    if !config.cookies_browser.is_empty() && config.cookies_browser != "none" {
        args.push("--cookies-from-browser".to_string());
        args.push(config.cookies_browser.clone());
    }

    // SponsorBlock - Remover segmentos patrocinados
    if config.sponsorblock {
        args.push("--sponsorblock-remove".to_string());
        args.push("sponsor,intro,outro,selfpromo,interaction".to_string());
    }

    // Geo-bypass para contenido bloqueado regionalmente
    if config.geo_bypass {
        args.push("--geo-bypass".to_string());
    }

    // Límite de tamaño de archivo
    if !config.max_filesize.is_empty() && config.max_filesize != "unlimited" {
        args.push("--max-filesize".to_string());
        args.push(config.max_filesize.clone());
    }

    // Configurar FFmpeg location para asegurar que yt-dlp lo encuentra
    // Intentar detectar ffmpeg en el PATH
    let ffmpeg_path = which::which("ffmpeg").ok();
    if let Some(path) = ffmpeg_path {
        // Usar el directorio padre, no el ejecutable específico
        // Esto permite que yt-dlp encuentre tanto ffmpeg como ffprobe
        if let Some(parent) = path.parent() {
            args.push("--ffmpeg-location".to_string());
            args.push(parent.to_string_lossy().to_string());
        }
    }

    // Configurar formato según si se extrae solo audio
    if config.extract_audio {
        args.push("-x".to_string()); // Extraer audio
        args.push("--audio-format".to_string());
        args.push(config.audio_format.clone());

        // Mantener video original si falla la conversión (REMOVED: args.push("--keep-video".to_string());)

        // Ignorar errores de post-procesamiento
        args.push("--no-post-overwrites".to_string());
        args.push("--postprocessor-args".to_string());
        args.push("ffmpeg:-loglevel error".to_string());
    } else {
        // Configurar formato de video - mejor calidad mp4
        args.push("-f".to_string());
        args.push("bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best".to_string());
    }

    // NO descargar descripciones, metadata extra, etc. (si no se extrae audio)
    if !config.extract_audio {
        args.push("--no-write-description".to_string());
        args.push("--no-write-info-json".to_string());
        args.push("--no-write-comments".to_string());

        // Thumbnail según configuración
        if config.embed_thumbnail {
            args.push("--embed-thumbnail".to_string());
        } else {
            args.push("--no-write-thumbnail".to_string());
            args.push("--no-embed-thumbnail".to_string());
        }
    }

    // Metadata embebida
    if config.embed_metadata {
        args.push("--embed-metadata".to_string());
        args.push("--embed-chapters".to_string());
    }

    // Playlist items
    if !config.playlist_items.is_empty() && config.playlist_items != "single" {
        if config.playlist_items == "all" {
            args.push("--yes-playlist".to_string());
        } else {
            args.push("--yes-playlist".to_string());
            args.push("--playlist-items".to_string());
            args.push(config.playlist_items.clone());
        }
    } else {
        args.push("--no-playlist".to_string()); // Solo el video
    }

    // Opciones CRÍTICAS para evitar bloqueos
    args.push("--extractor-retries".to_string());
    args.push("3".to_string()); // Reintentar 3 veces si falla

    args.push("--sleep-requests".to_string());
    args.push("1".to_string()); // Pausa de 1 segundo entre peticiones HTTP

    // Simular navegador real
    args.push("--referer".to_string());
    args.push("https://www.youtube.com/".to_string());

    args.push("--add-header".to_string());
    args.push("Accept-Language:en-US,en;q=0.9".to_string());

    // Limitar velocidad de descarga si está configurado
    if !config.rate_limit.is_empty() && config.rate_limit != "unlimited" {
        args.push("--limit-rate".to_string());
        args.push(config.rate_limit.clone());
    }

    // Añadir pausa entre peticiones para evitar bloqueos
    if config.sleep_interval > 0 {
        args.push("--sleep-interval".to_string());
        args.push(config.sleep_interval.to_string());
    }

    // Añadir User-Agent de navegador real actualizado
    args.push("--user-agent".to_string());
    args.push("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36".to_string());

    // Configurar calidad de audio
    if !config.audio_quality.is_empty() {
        args.push("--audio-quality".to_string());
        args.push(config.audio_quality.clone());
    }

    // Configurar subtítulos
    if config.subtitles {
        if config.all_subtitles {
            args.push("--all-subs".to_string());
        } else {
            args.push("--write-subs".to_string());
            args.push("--sub-lang".to_string());
            args.push(config.subtitle_lang.clone());
        }
        args.push("--no-write-auto-subs".to_string()); // NO subtítulos automáticos
        args.push("--embed-subs".to_string()); // Incrustar en el video
    }

    // Agregar URL
    args.push(url.clone());

    // Debug: Imprimir comando completo
    eprintln!("Ejecutando yt-dlp con args: {:?}", args);

    // Ejecutar yt-dlp con soporte Python mejorado
    let output = execute_ytdlp(&args, config.use_python);

    match output {
        Ok(out) if out.status.success() => Ok(format!("Video descargado exitosamente: {}", url)),
        Ok(out) => {
            let error_msg = String::from_utf8_lossy(&out.stderr);
            let stdout_msg = String::from_utf8_lossy(&out.stdout);
            eprintln!("Error stderr: {}", error_msg);
            eprintln!("Output stdout: {}", stdout_msg);

            // Si el error es por falta de audio en post-procesamiento, pero el archivo se descargó
            if error_msg.contains("Postprocessing")
                && error_msg.contains("ffprobe")
                && stdout_msg.contains("100%")
            {
                return Ok(format!("Video descargado pero no tiene audio para extraer. Archivo guardado como video."));
            }

            Err(format!("Error descargando video: {}", error_msg))
        }
        Err(e) => Err(format!("Error ejecutando yt-dlp: {}", e)),
    }
}

// Comando para obtener información de un video
#[tauri::command]
async fn get_video_info(url: String, use_python: bool) -> Result<String, String> {
    let args = vec!["--dump-json".to_string(), url.clone()];

    let output = execute_ytdlp(&args, use_python);

    match output {
        Ok(out) if out.status.success() => {
            let info = String::from_utf8_lossy(&out.stdout);
            Ok(info.to_string())
        }
        Ok(out) => {
            let error_msg = String::from_utf8_lossy(&out.stderr);
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
            check_ffmpeg,
            select_folder,
            download_video,
            get_video_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
