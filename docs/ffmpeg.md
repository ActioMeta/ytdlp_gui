# Instalación de FFmpeg

FFmpeg es **necesario** para extraer audio de videos. Si intentas descargar solo audio sin FFmpeg instalado, verás errores como:

```
ERROR: Postprocessing: WARNING: unable to obtain file audio codec with ffprobe
```

## 🐧 Linux

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install ffmpeg
```

### Fedora:
```bash
sudo dnf install ffmpeg
```

### Arch Linux:
```bash
sudo pacman -S ffmpeg
```

### Verificar instalación:
```bash
ffmpeg -version
```

## 🪟 Windows

### Opción 1: Chocolatey (Recomendado)
```powershell
choco install ffmpeg
```

### Opción 2: Manual
1. Descargar desde: https://www.gyan.dev/ffmpeg/builds/
2. Extraer el ZIP
3. Añadir la carpeta `bin` al PATH del sistema

### Verificar instalación:
```powershell
ffmpeg -version
```

## 🍎 macOS

### Homebrew:
```bash
brew install ffmpeg
```

### Verificar instalación:
```bash
ffmpeg -version
```

## ¿Por qué se necesita FFmpeg?

yt-dlp descarga videos en su formato original. Para extraer solo el audio o convertirlo a MP3/M4A/OPUS, necesita FFmpeg para:

- Extraer audio del contenedor de video
- Convertir entre formatos de audio
- Incrustar metadata y thumbnails
- Mezclar audio/video de diferentes fuentes

## Presets que requieren FFmpeg

En **modo simple**:
- ✅ **Video** - No requiere FFmpeg
- ⚠️ **Audio/Música** - **Requiere FFmpeg**
- ⚠️ **Podcast** - **Requiere FFmpeg**

En **modo pro**:
- Cuando `extract_audio: true`
- Cuando se usa `audio_format` (MP3, M4A, OPUS, etc.)
- Cuando `embed_thumbnail: true`

## Solución rápida

Si no puedes instalar FFmpeg, puedes:

1. **Descargar el video completo** (usar preset "Video")
2. **Extraer audio manualmente** con otra herramienta después
3. En modo pro, desactivar `extract_audio` y obtener el video

---

**Nota**: La aplicación detecta automáticamente si FFmpeg está instalado y muestra advertencias en los presets de audio.
