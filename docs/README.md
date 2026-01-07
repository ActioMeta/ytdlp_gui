# 📚 Documentación yt-dlp GUI v2.0

Bienvenido a la documentación completa de yt-dlp GUI, una aplicación de escritorio multiplataforma para descargar videos de YouTube y otras plataformas.

---

## 📖 Índice de Documentación

### 🚀 Inicio Rápido
- **[Instalación](./instalacion.md)** - Guía completa de instalación en Windows, Linux y macOS
- **[Inicio Rápido](./inicio-rapido.md)** - Primeros pasos y descarga de tu primer video
- **[Configuración FFmpeg](./ffmpeg.md)** - Instalación de FFmpeg para extracción de audio

### 👥 Guías de Usuario
- **[Modo Simple](./modo-simple.md)** - Para usuarios sin conocimientos técnicos
- **[Modo Pro](./modo-pro.md)** - Control avanzado con todas las opciones
- **[Evitar Bloqueos](./anti-bloqueos.md)** - Cookies, SponsorBlock y configuración anti-ban

### 🔧 Referencia Técnica
- **[Funciones Implementadas](./funciones.md)** - Catálogo completo de funcionalidades
- **[Parámetros yt-dlp](./parametros-ytdlp.md)** - Opciones disponibles y utilizadas
- **[API Backend](./api-backend.md)** - Comandos Tauri y funciones Rust

### 🪟 Plataformas
- **[Windows](./windows.md)** - Guía específica para Windows 10/11
- **[Linux](./linux.md)** - Instalación en Ubuntu, Debian, Fedora, Arch
- **[macOS](./macos.md)** - Configuración para macOS 10.15+

### 📝 Changelog y Desarrollo
- **[Changelog v2.0](./changelog.md)** - Cambios y nuevas características
- **[Recomendaciones](./recomendaciones.md)** - Mejoras futuras y optimizaciones

---

## 🎯 Inicio Rápido

### Prerrequisitos
1. **yt-dlp** instalado (nativo o vía Python)
2. **FFmpeg** instalado (solo para extracción de audio)
3. **Sistema operativo**: Windows 10+, Linux, macOS 10.15+

### Instalación Básica

**Windows:**
```powershell
# Instalar yt-dlp
pip install yt-dlp

# Instalar FFmpeg
choco install ffmpeg
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install yt-dlp ffmpeg

# Fedora
sudo dnf install yt-dlp ffmpeg

# Arch Linux
sudo pacman -S yt-dlp ffmpeg
```

**macOS:**
```bash
brew install yt-dlp ffmpeg
```

### Primera Descarga

1. **Abrir la aplicación** → Modo Simple activado por defecto
2. **Seleccionar preset**: Video, Audio o Podcast
3. **Pegar URL** del video en el textarea
4. **Seleccionar carpeta** de descarga
5. **Iniciar Descarga** ✓

---

## 🌟 Características Principales

### Modo Simple
- ✅ Presets automáticos (Video/Audio/Podcast)
- ✅ Sin configuración técnica necesaria
- ✅ Interfaz minimalista de 2 columnas
- ✅ Resultados en tiempo real

### Modo Pro
- ✅ 18+ opciones configurables
- ✅ Control total de parámetros yt-dlp
- ✅ Vista previa de información del video
- ✅ Configuración de cookies, SponsorBlock, geo-bypass

### Backend Rust
- ✅ Detección automática yt-dlp (nativo/Python)
- ✅ Fallback inteligente en Windows
- ✅ Verificación de FFmpeg y ffprobe
- ✅ Manejo robusto de errores

---

## 🔗 Enlaces Rápidos

- **Repositorio**: [alejandg1/ytdlp_gui](https://github.com/alejandg1/ytdlp_gui)
- **Reportar Bug**: [Issues](https://github.com/alejandg1/ytdlp_gui/issues)
- **yt-dlp Oficial**: [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **FFmpeg**: [ffmpeg.org](https://ffmpeg.org)

---

## 📞 Soporte

¿Problemas? Consulta:
1. **[Solución de Problemas](./troubleshooting.md)**
2. **[Preguntas Frecuentes](./faq.md)**
3. **[Issues de GitHub](https://github.com/alejandg1/ytdlp_gui/issues)**

---

**Versión**: 2.0.0  
**Última actualización**: Enero 2026  
**Autor**: ActioMeta
