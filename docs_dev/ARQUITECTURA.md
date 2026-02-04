# Arquitectura de yt-dlp GUI

**Versión:** 2.0  
**Última actualización:** 4 de febrero de 2026  
**Stack:** Tauri 2.0 + React 18 + TypeScript + Rust

---

## Estructura del Proyecto

```
ytdlp_gui/
├── src/                          # Frontend (React + TypeScript)
│   ├── App.tsx                   # Componente principal (578 líneas)
│   ├── App.css                   # Estilos globales (740 líneas)
│   ├── main.tsx                  # Entry point de React
│   ├── vite-env.d.ts            # Tipos de Vite
│   └── assets/                   # Recursos estáticos
│
├── src-tauri/                    # Backend (Rust)
│   ├── src/
│   │   ├── lib.rs               # Comandos Tauri (408 líneas)
│   │   └── main.rs              # Inicialización de Tauri
│   ├── Cargo.toml               # Dependencias Rust
│   ├── tauri.conf.json          # Configuración de Tauri
│   ├── build.rs                 # Build script
│   └── icons/                   # Iconos de la app
│
├── docs/                         # Documentación (16 archivos .md)
│   ├── README.md                # Índice de documentación
│   ├── instalacion.md           # Guía de instalación
│   ├── modo-simple.md           # Documentación UI Simple
│   ├── modo-pro.md              # Documentación UI Pro
│   ├── api-backend.md           # Referencia API Rust
│   ├── funciones.md             # Catálogo de funcionalidades
│   ├── parametros-ytdlp.md      # Opciones yt-dlp disponibles
│   ├── troubleshooting.md       # Solución de problemas
│   ├── faq.md                   # Preguntas frecuentes
│   ├── ffmpeg.md                # Instalación FFmpeg
│   ├── anti-bloqueos.md         # Cookies y SponsorBlock
│   ├── recomendaciones.md       # Mejoras sugeridas
│   ├── windows.md               # Guía Windows
│   ├── linux.md                 # Guía Linux
│   ├── macos.md                 # Guía macOS
│   └── inicio-rapido.md         # Quick start
│
├── public/                       # Assets públicos
├── index.html                    # HTML principal
├── package.json                  # Dependencias npm
├── tsconfig.json                 # Config TypeScript
├── vite.config.ts               # Config Vite
└── README.md                     # Documentación principal
```

---

## Arquitectura General

### Patrón: **Desktop App con IPC**

```
┌─────────────────────────────────────────┐
│         FRONTEND (React)                │
│  ┌────────────────────────────────┐    │
│  │   App.tsx (UI Component)       │    │
│  │   - Dual Mode (Simple/Pro)     │    │
│  │   - State Management           │    │
│  │   - Event Handlers             │    │
│  └────────────────────────────────┘    │
│              ↕ invoke()                 │
│  ┌────────────────────────────────┐    │
│  │   @tauri-apps/api              │    │
│  │   - IPC Communication          │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
                  ↕ IPC
┌─────────────────────────────────────────┐
│         BACKEND (Rust)                  │
│  ┌────────────────────────────────┐    │
│  │   lib.rs (Tauri Commands)      │    │
│  │   - check_ytdlp()              │    │
│  │   - check_ffmpeg()             │    │
│  │   - select_folder()            │    │
│  │   - download_video()           │    │
│  │   - get_video_info()           │    │
│  └────────────────────────────────┘    │
│              ↕                          │
│  ┌────────────────────────────────┐    │
│  │   System Integration            │    │
│  │   - Process execution          │    │
│  │   - File system access         │    │
│  │   - Native dialogs             │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
                  ↕
┌─────────────────────────────────────────┐
│       EXTERNAL TOOLS                    │
│   - yt-dlp (Python/Native)              │
│   - FFmpeg (opcional)                   │
└─────────────────────────────────────────┘
```

---

## Componentes Principales

### 1. Frontend (src/App.tsx)

**Responsabilidades:**
- Renderizar interfaz dual (Simple/Pro)
- Manejar estado de la aplicación
- Comunicarse con backend vía IPC
- Persistir configuración en localStorage

**Estado Principal:**
```typescript
interface AppState {
  // UI Mode
  uiMode: 'simple' | 'pro';
  selectedPreset: 'video' | 'audio' | 'podcast';
  
  // Download Configuration
  urls: string;
  outputPath: string;
  format: string;
  extractAudio: boolean;
  audioFormat: string;
  cookiesFromBrowser: string;
  sponsorblockRemove: string;
  geoBypass: boolean;
  maxFilesize: string;
  // ... 18+ opciones más
  
  // Download State
  downloads: DownloadItem[];
  isDownloading: boolean;
  ytdlpDetected: string;
  ffmpegDetected: boolean;
  showFFmpegWarning: boolean;
}
```

**Funciones Clave:**
- `applySimplePreset()` - Aplica configuración automática por preset
- `startDownloads()` - Inicia proceso de descarga secuencial
- `getVideoInfo()` - Obtiene metadata del video
- `detectYtdlp()` / `detectFFmpeg()` - Detecta herramientas

**Flujo de Descarga:**
```
1. Usuario pega URLs
2. Usuario selecciona preset (Simple) o configura opciones (Pro)
3. Click "Iniciar Descarga"
4. Por cada URL:
   a. Estado → "Descargando"
   b. Invoke download_video(url, config)
   c. Backend ejecuta yt-dlp
   d. Backend retorna output/error
   e. Frontend actualiza estado → "Completado"/"Error"
5. Siguiente URL
```

---

### 2. Backend (src-tauri/src/lib.rs)

**Responsabilidades:**
- Exponer comandos Tauri al frontend
- Ejecutar yt-dlp con argumentos correctos
- Detectar herramientas (yt-dlp, FFmpeg)
- Manejar errores y edge cases

**Comandos Tauri:**

| Comando | Descripción | Retorno |
|---------|-------------|---------|
| `check_ytdlp()` | Detecta yt-dlp (nativo/Python) | `"native: X.X.X"` o `"python: X.X.X"` |
| `check_ffmpeg()` | Detecta FFmpeg y ffprobe | `"FFmpeg y ffprobe detectados en: /path"` |
| `select_folder()` | Abre diálogo nativo de carpeta | `"/ruta/absoluta"` |
| `download_video(url, config)` | Descarga video con configuración | `"Output de yt-dlp"` |
| `get_video_info(url, use_python)` | Obtiene metadata JSON | `"{...}"` |

**Función Principal:**
```rust
fn execute_ytdlp(args: Vec<String>, use_python: bool) -> Result<Output, String>
```

**Lógica de Fallback:**
1. Intenta `yt-dlp [args]` (binario nativo)
2. Si falla → `python3 -m yt_dlp [args]` (Linux/macOS)
3. Si falla → `python -m yt_dlp [args]` (Windows)

**Construcción de Argumentos:**
```rust
fn build_ytdlp_args(url: &str, config: &DownloadConfig, ffmpeg_location: Option<&str>) -> Vec<String>
```

Convierte `DownloadConfig` → argumentos CLI de yt-dlp.

---

## Sistema de Estilos (src/App.css)

**Arquitectura CSS:**
- **Variables CSS** - Paleta de colores centralizada
- **Layout Flexbox** - Diseño responsive
- **Sin frameworks** - CSS puro (740 líneas)

**Variables Principales:**
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  --accent-primary: #4a9eff;
  --accent-hover: #6bb3ff;
  --text-primary: #f0f0f0;
  --text-secondary: #a0a0a0;
  --border-color: #404040;
  --success: #4ade80;
  --warning: #fbbf24;
  --error: #f87171;
}
```

**Layout Principal:**
```css
/* Modo Simple: 2 columnas */
.simple-mode-columns {
  display: flex;
  gap: 30px;
}
.presets-column { width: 350px; }
.main-column { flex: 1; }

/* Modo Pro: 1 columna */
.pro-mode { 
  display: flex;
  flex-direction: column;
  gap: 25px;
}
```

---

## Persistencia de Datos

**Método:** `localStorage` del navegador

**Datos Guardados:**
```typescript
localStorage.setItem('lastOutputPath', outputPath);
localStorage.setItem('selectedPreset', selectedPreset);
localStorage.setItem('uiMode', uiMode);
```

**Carga al Iniciar:**
```typescript
useEffect(() => {
  const savedPath = localStorage.getItem('lastOutputPath');
  const savedPreset = localStorage.getItem('selectedPreset');
  const savedMode = localStorage.getItem('uiMode');
  // ...
}, []);
```

**No se persiste:**
- URLs ingresadas
- Estado de descargas
- Configuración Pro (resetea cada sesión)

---

## Flujo de Comunicación

### Ejemplo: Descarga de Video

**Frontend → Backend:**
```typescript
const config: DownloadConfig = {
  output_path: "/home/user/Downloads",
  format: "bestvideo+bestaudio",
  extract_audio: false,
  audio_format: null,
  cookies_from_browser: "chrome",
  sponsorblock_remove: "sponsor,intro",
  geo_bypass: true,
  // ... más opciones
};

const result = await invoke<string>("download_video", {
  url: "https://youtube.com/watch?v=...",
  config,
});
```

**Backend → Sistema:**
```rust
// 1. Construir argumentos
let args = build_ytdlp_args(url, &config, ffmpeg_location);

// Resultado: ["-o", "/path/%(title)s.%(ext)s", 
//             "-f", "bestvideo+bestaudio",
//             "--cookies-from-browser", "chrome",
//             "--sponsorblock-remove", "sponsor,intro",
//             "--geo-bypass", ...]

// 2. Ejecutar yt-dlp
let output = execute_ytdlp(args, config.use_python)?;

// 3. Manejar resultado
if output.status.success() {
  Ok(String::from_utf8_lossy(&output.stdout).to_string())
} else {
  // Detectar casos especiales (video sin audio)
  Err(String::from_utf8_lossy(&output.stderr).to_string())
}
```

**Sistema → yt-dlp:**
```bash
yt-dlp \
  -o "/home/user/Downloads/%(title)s.%(ext)s" \
  -f "bestvideo+bestaudio" \
  --cookies-from-browser chrome \
  --sponsorblock-remove "sponsor,intro" \
  --geo-bypass \
  --ffmpeg-location /usr/bin \
  --keep-video \
  --no-mtime \
  "https://youtube.com/watch?v=..."
```

---

## Dependencias Principales

### Frontend (package.json)
```json
{
  "dependencies": {
    "@tauri-apps/api": "^2.x",
    "@tauri-apps/plugin-dialog": "^2.x",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.x",
    "@types/react": "^18.x",
    "@vitejs/plugin-react": "^4.x",
    "typescript": "^5.x",
    "vite": "^7.3.0"
  }
}
```

### Backend (Cargo.toml)
```toml
[dependencies]
tauri = { version = "2", features = ["dialog-all"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
which = "6"  # Para detectar ejecutables en PATH
```

---

## Detección de Plataforma

### Multi-OS Support

**Windows:**
- yt-dlp: `yt-dlp.exe` o `python -m yt_dlp`
- FFmpeg: Busca en PATH, común en `C:\ffmpeg\bin`
- Compatibilidad: **95%** (fallback automático a Python)

**Linux:**
- yt-dlp: `yt-dlp` o `python3 -m yt_dlp`
- FFmpeg: `/usr/bin/ffmpeg` o `/usr/sbin/ffmpeg`
- Compatibilidad: **100%**

**macOS:**
- yt-dlp: Homebrew (`/opt/homebrew/bin/yt-dlp`)
- FFmpeg: Homebrew (`/opt/homebrew/bin/ffmpeg`)
- Compatibilidad: **98%**

---

## Métricas del Código

| Archivo | Líneas | Funciones | Complejidad |
|---------|--------|-----------|-------------|
| `src/App.tsx` | 578 | 12 principales | Media-Alta |
| `src/App.css` | 740 | N/A | Baja |
| `src-tauri/src/lib.rs` | 408 | 7 principales | Media |
| **Total Frontend** | ~1,320 | - | - |
| **Total Backend** | ~410 | - | - |

**Documentación:** 16 archivos .md, ~8,000 líneas totales

---

## Seguridad

### Consideraciones

**✅ Implementado:**
- Validación de rutas de archivos (Tauri dialog API)
- Ejecución de procesos con argumentos sanitizados
- No almacenamiento de cookies (solo lectura temporal)
- Sandbox de Tauri (acceso limitado al sistema)

**⚠️ Limitaciones:**
- Las cookies de navegador se leen directamente (yt-dlp lo hace)
- Ejecución de comandos del sistema (yt-dlp, ffmpeg)
- No hay autenticación (app local)

---

## Proceso de Build

### Desarrollo
```bash
npm run tauri dev
# 1. Vite compila frontend → http://localhost:1420
# 2. Cargo compila backend → ejecutable Rust
# 3. Tauri abre ventana con frontend cargado
```

### Producción
```bash
npm run tauri build
# 1. Vite build (modo producción)
# 2. Cargo build --release
# 3. Tauri bundler crea instaladores:
#    - Windows: .msi
#    - Linux: .AppImage, .deb
#    - macOS: .dmg, .app
```

**Salidas:**
- `src-tauri/target/release/ytdlp_gui` (binario)
- `src-tauri/target/release/bundle/` (instaladores)

---

## Notas de Implementación

### Edge Cases Manejados

1. **Videos sin audio** (Reddit, Twitter):
   - Detecta stderr con "no tiene audio"
   - Si download 100% → marca como completado con warning
   - No marca como error

2. **FFmpeg no instalado**:
   - Muestra banner amarillo de advertencia
   - Permite descargas de video completo
   - Bloquea solo extracción de audio

3. **yt-dlp no detectado**:
   - Intenta 3 métodos (nativo → python3 → python)
   - Muestra mensaje claro si ninguno funciona
   - No inicia app sin yt-dlp

4. **Errores de postprocesamiento**:
   - Detecta si descarga completó antes del error
   - Convierte error en warning si archivo existe

---

## Referencias Clave

- **Tauri Docs:** https://tauri.app/v1/guides/
- **yt-dlp Docs:** https://github.com/yt-dlp/yt-dlp#readme
- **React Docs:** https://react.dev/
- **Rust std::process:** https://doc.rust-lang.org/std/process/

---

**Mantenedor:** ActioMeta
