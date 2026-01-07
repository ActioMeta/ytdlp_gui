# 🔧 API Backend - Documentación Técnica

Referencia completa de la API Rust/Tauri de yt-dlp GUI.

---

## 📚 Tabla de Contenidos

1. [Comandos Tauri](#comandos-tauri)
2. [Estructuras de Datos](#estructuras-de-datos)
3. [Funciones Internas](#funciones-internas)
4. [Detección de Plataforma](#detección-de-plataforma)
5. [Manejo de Errores](#manejo-de-errores)

---

## 🎯 Comandos Tauri

### 1. `check_ytdlp()`

Verifica si yt-dlp está instalado y devuelve la versión.

**Firma:**
```rust
#[tauri::command]
fn check_ytdlp() -> Result<String, String>
```

**Retorno:**
- **OK**: `"native: X.X.X"` o `"python: X.X.X"`
- **Error**: `"yt-dlp no encontrado"`

**Métodos de detección:**
1. `yt-dlp --version` (binario nativo)
2. `python3 -m yt_dlp --version` (Linux/macOS)
3. `python -m yt_dlp --version` (Windows)

**Ejemplo de uso (frontend):**
```typescript
import { invoke } from "@tauri-apps/api/tauri";

const version = await invoke<string>("check_ytdlp");
console.log(version); // "native: 2024.01.01"
```

---

### 2. `check_ffmpeg()`

Verifica si FFmpeg y ffprobe están instalados.

**Firma:**
```rust
#[tauri::command]
fn check_ffmpeg() -> Result<String, String>
```

**Retorno:**
- **OK**: `"FFmpeg y ffprobe detectados en: /ruta"`
- **Error**: `"FFmpeg no encontrado"` o `"ffprobe no encontrado"`

**Validación:**
- Usa crate `which` para encontrar ejecutables
- Verifica **AMBOS** ffmpeg y ffprobe
- Retorna directorio padre (para `--ffmpeg-location`)

**Ejemplo de uso:**
```typescript
try {
  const ffmpegPath = await invoke<string>("check_ffmpeg");
  console.log("FFmpeg OK:", ffmpegPath);
} catch (error) {
  console.warn("FFmpeg no disponible:", error);
}
```

---

### 3. `select_folder()`

Abre diálogo de selección de carpeta nativo.

**Firma:**
```rust
#[tauri::command]
async fn select_folder() -> Result<String, String>
```

**Retorno:**
- **OK**: Ruta absoluta de la carpeta seleccionada
- **Error**: `"No se seleccionó carpeta"` (usuario canceló)

**Ejemplo de uso:**
```typescript
const folder = await invoke<string>("select_folder");
setOutputPath(folder);
```

---

### 4. `download_video()`

Descarga un video con configuración completa.

**Firma:**
```rust
#[tauri::command]
async fn download_video(
    url: String,
    config: DownloadConfig,
) -> Result<String, String>
```

**Parámetros:**
- `url`: URL del video (string)
- `config`: Configuración de descarga (ver estructura)

**Retorno:**
- **OK**: Output completo de yt-dlp
- **Error**: stderr de yt-dlp o mensaje de error

**Manejo especial:**
- Detecta videos sin audio: `"no tiene audio"` en stderr
- Si download 100% pero error en postprocessing → marca como completado con warning
- Convierte errores a warnings apropiados

**Ejemplo de uso:**
```typescript
const config: DownloadConfig = {
  output_path: "/home/user/Downloads",
  format: "bestvideo+bestaudio",
  extract_audio: false,
  audio_format: null,
  // ... más opciones
};

const result = await invoke<string>("download_video", {
  url: "https://youtube.com/watch?v=...",
  config,
});
```

---

### 5. `get_video_info()`

Obtiene metadata del video en formato JSON.

**Firma:**
```rust
#[tauri::command]
async fn get_video_info(
    url: String,
    use_python: bool,
) -> Result<String, String>
```

**Parámetros:**
- `url`: URL del video
- `use_python`: `true` para forzar Python, `false` para auto-detect

**Retorno:**
- **OK**: JSON con metadata del video
- **Error**: stderr de yt-dlp

**Argumentos usados:**
```bash
yt-dlp --dump-json --no-download [URL]
```

**Ejemplo de uso:**
```typescript
const info = await invoke<string>("get_video_info", {
  url: videoUrl,
  usePython: false,
});
const metadata = JSON.parse(info);
console.log(metadata.title, metadata.duration);
```

---

## 📦 Estructuras de Datos

### `DownloadConfig`

Configuración completa de descarga.

```rust
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct DownloadConfig {
    pub output_path: String,
    pub format: Option<String>,
    pub extract_audio: bool,
    pub audio_format: Option<String>,
    pub cookies_from_browser: Option<String>,
    pub sponsorblock_remove: Option<String>,
    pub geo_bypass: bool,
    pub max_filesize: Option<String>,
    pub output_template: Option<String>,
    pub rate_limit: Option<String>,
    pub retries: Option<u32>,
    pub proxy: Option<String>,
    pub socket_timeout: Option<u32>,
    pub user_agent: Option<String>,
    pub write_sub: bool,
    pub sub_lang: Option<String>,
    pub write_thumbnail: bool,
    pub use_python: bool,
    pub concurrent_fragments: Option<u32>,
}
```

**Campos:**

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `output_path` | `String` | Carpeta de descarga | `"/home/user/Downloads"` |
| `format` | `Option<String>` | Formato de video | `"bestvideo+bestaudio"` |
| `extract_audio` | `bool` | Extraer solo audio | `true` |
| `audio_format` | `Option<String>` | Formato de audio | `"mp3"` |
| `cookies_from_browser` | `Option<String>` | Navegador para cookies | `"chrome"` |
| `sponsorblock_remove` | `Option<String>` | Categorías SponsorBlock | `"sponsor,intro"` |
| `geo_bypass` | `bool` | Bypass restricciones geo | `true` |
| `max_filesize` | `Option<String>` | Tamaño máximo | `"100M"` |
| `output_template` | `Option<String>` | Template nombre archivo | `"%(title)s.%(ext)s"` |
| `rate_limit` | `Option<String>` | Límite velocidad | `"1M"` |
| `retries` | `Option<u32>` | Reintentos | `10` |
| `proxy` | `Option<String>` | Proxy HTTP/SOCKS | `"http://proxy:8080"` |
| `socket_timeout` | `Option<u32>` | Timeout socket | `30` |
| `user_agent` | `Option<String>` | User Agent custom | `"Mozilla/5.0..."` |
| `write_sub` | `bool` | Descargar subtítulos | `true` |
| `sub_lang` | `Option<String>` | Idiomas subtítulos | `"en,es"` |
| `write_thumbnail` | `bool` | Descargar miniatura | `true` |
| `use_python` | `bool` | Forzar Python | `false` |
| `concurrent_fragments` | `Option<u32>` | Fragmentos concurrentes | `5` |

---

## 🛠️ Funciones Internas

### `execute_ytdlp()`

Ejecuta yt-dlp con fallback automático.

**Firma:**
```rust
fn execute_ytdlp(
    args: Vec<String>,
    use_python: bool,
) -> Result<Output, String>
```

**Lógica de fallback:**
1. Si `use_python == false`:
   - Intenta: `yt-dlp [args]`
   - Si falla → intenta método Python
2. Si `use_python == true` o falló método 1:
   - Intenta: `python3 -m yt_dlp [args]` (Linux/macOS)
   - Si falla → intenta: `python -m yt_dlp [args]` (Windows)

**Debug:**
```rust
eprintln!("Ejecutando comando: {:?}", command);
```

**Ejemplo interno:**
```rust
let args = vec![
    "--version".to_string(),
];
let output = execute_ytdlp(args, false)?;
```

---

### `build_ytdlp_args()`

Construye argumentos de yt-dlp desde DownloadConfig.

**Firma:**
```rust
fn build_ytdlp_args(
    url: &str,
    config: &DownloadConfig,
    ffmpeg_location: Option<&str>,
) -> Vec<String>
```

**Lógica:**
1. Argumentos base: `-o [output_path]`
2. Por cada campo `Some(value)` en config → agregar argumento
3. Casos especiales:
   - `extract_audio` → `--extract-audio --audio-format [format]`
   - `geo_bypass` → `--geo-bypass`
   - `write_sub` → `--write-subs --sub-langs [lang]`
4. Si FFmpeg detectado → `--ffmpeg-location [path]`
5. Flags finales: `--keep-video --no-mtime`
6. URL al final

**Ejemplo de salida:**
```rust
vec![
    "-o", "/home/user/Downloads/%(title)s.%(ext)s",
    "-f", "bestvideo+bestaudio",
    "--cookies-from-browser", "chrome",
    "--sponsorblock-remove", "sponsor",
    "--ffmpeg-location", "/usr/bin",
    "--keep-video",
    "--no-mtime",
    "https://youtube.com/watch?v=..."
]
```

---

### Detección de FFmpeg

Usa crate `which`:

```rust
use which::which;

match which("ffmpeg") {
    Ok(path) => {
        match which("ffprobe") {
            Ok(_) => {
                let dir = path.parent()
                    .and_then(|p| p.to_str())
                    .unwrap_or("");
                Ok(dir.to_string())
            }
            Err(_) => Err("ffprobe no encontrado".into())
        }
    }
    Err(_) => Err("ffmpeg no encontrado".into())
}
```

---

## 🌐 Detección de Plataforma

### Detección de yt-dlp

**Windows:**
```rust
// Orden de intento:
1. yt-dlp.exe --version
2. python -m yt_dlp --version
3. python3 -m yt_dlp --version
```

**Linux/macOS:**
```rust
// Orden de intento:
1. yt-dlp --version
2. python3 -m yt_dlp --version
3. python -m yt_dlp --version
```

### Compatibilidad 95% en Windows

**Casos que funcionan:**
- ✅ yt-dlp nativo instalado
- ✅ Python + pip install yt-dlp
- ✅ Python desde Microsoft Store
- ✅ Python desde python.org
- ✅ Anaconda/Miniconda

**Casos con problemas:**
- ⚠️ WSL (requiere configuración PATH)
- ⚠️ Python portable sin PATH

---

## ❌ Manejo de Errores

### Categorías de errores

**1. Errores fatales (retornan Error):**
- yt-dlp no encontrado
- Comando falló sin output
- Error de sintaxis en argumentos

**2. Warnings (retornan OK con mensaje):**
- Video sin audio (descarga exitosa)
- Error postprocessing con descarga 100%
- FFmpeg no disponible (solo warning)

**3. Errores ignorados:**
- stderr con "WARNING" pero exitCode = 0

### Detección de video sin audio

```rust
let stderr_str = String::from_utf8_lossy(&output.stderr);

if !output.status.success() {
    if stderr_str.contains("no tiene audio") ||
       stderr_str.contains("Postprocessing") {
        // Verificar si descarga completó
        if stdout_str.contains("100%") {
            return Ok(format!(
                "Video descargado pero sin audio:\n{}",
                stdout_str
            ));
        }
    }
    return Err(stderr_str.into());
}
```

---

## 🔍 Debugging

### Activar logs

**Backend (Rust):**
```rust
eprintln!("Ejecutando comando: {:?}", command);
eprintln!("stderr: {}", String::from_utf8_lossy(&output.stderr));
```

**Frontend:**
```typescript
console.log("Invocando download_video con:", { url, config });
```

### Ver comandos ejecutados

La app imprime comandos en consola de Tauri:
```
Ejecutando comando: Command { program: "yt-dlp", args: [...] }
```

---

## 📚 Dependencias Rust

```toml
[dependencies]
tauri = { version = "2.x", features = ["dialog-all"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
which = "6"
```

**Usos:**
- `tauri::dialog`: Selector de carpetas
- `serde`: Serialización DownloadConfig
- `which`: Detección de ejecutables en PATH

---

## 🚀 Compilar Backend

```bash
# Desarrollo
cargo build

# Producción
cargo build --release

# Con Tauri CLI
npm run tauri build
```

---

## 🔗 Referencias

- **Tauri Commands:** https://tauri.app/v1/guides/features/command
- **Rust std::process:** https://doc.rust-lang.org/std/process/
- **which crate:** https://docs.rs/which/latest/which/

---

**Siguiente:** [Funciones](./funciones.md) | [Parámetros yt-dlp](./parametros-ytdlp.md)
