# yt-dlp GUI - Descargador Multiplataforma 🎥

[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Rust](https://img.shields.io/badge/Rust-Latest-orange.svg)](https://www.rust-lang.org/)

Una aplicación de escritorio moderna y multiplataforma para descargar videos de YouTube y +1000 sitios web usando yt-dlp.

---

## 📚 Documentación Completa

**🚀 Inicio Rápido:**
- [📖 Instalación](./docs/instalacion.md) - Guía completa para todas las plataformas
- [⚡ Inicio Rápido](./docs/inicio-rapido.md) - Primeros pasos
- [🔧 Configurar FFmpeg](./docs/ffmpeg.md) - Para extracción de audio

**👥 Guías de Usuario:**
- [🟢 Modo Simple](./docs/modo-simple.md) - Interfaz básica con presets
- [🔵 Modo Pro](./docs/modo-pro.md) - Control avanzado (18+ opciones)
- [🛡️ Evitar Bloqueos](./docs/anti-bloqueos.md) - Cookies y SponsorBlock

**🔧 Referencia Técnica:**
- [⚙️ Funciones Implementadas](./docs/funciones.md) - Catálogo completo
- [📝 Parámetros yt-dlp](./docs/parametros-ytdlp.md) - Opciones disponibles
- [🔌 API Backend](./docs/api-backend.md) - Comandos Tauri y Rust

**📱 Por Plataforma:**
- [🪟 Windows](./docs/windows.md) - Guía específica Windows 10/11
- [🐧 Linux](./docs/linux.md) - Ubuntu, Fedora, Arch, Debian
- [🍎 macOS](./docs/macos.md) - macOS 10.15+

**🆘 Soporte:**
- [❓ FAQ](./docs/faq.md) - Preguntas frecuentes
- [🔧 Troubleshooting](./docs/troubleshooting.md) - Solución de problemas
- [📝 Changelog](./docs/changelog.md) - Cambios en v2.0

---

## ✨ Versión 2.0 - Interfaz Dual

**🟢 Modo Simple** - Para usuarios sin conocimientos técnicos
- ✅ 3 presets automáticos (Video, Audio, Podcast)
- ✅ Interfaz minimalista de 2 columnas
- ✅ Cero configuración técnica

**🔵 Modo Pro** - Para usuarios avanzados  
- ✅ 18+ opciones configurables
- ✅ Control total de parámetros yt-dlp
- ✅ Vista previa de información del video

---

## 🌟 Características Destacadas

### 🔐 Anti-Bloqueo Avanzado
- **Cookies de navegador** - Evita "Sign in to confirm you're not a bot"
- **SponsorBlock** - Elimina anuncios/intros/outros automáticamente
- **Geo-bypass** - Salta restricciones regionales

### 🎵 Audio y Video
- **Extracción de audio** - MP3, M4A, OPUS, FLAC, WAV
- **Múltiples formatos** - best, 1080p, 720p, 480p, bestvideo+bestaudio
- **Metadata embebida** - Título, artista, thumbnail, capítulos

### 📦 Control Avanzado
- **Límite de tamaño** - Rechaza archivos >100MB/1GB/2GB
- **Subtítulos** - Múltiples idiomas (ES, EN, FR, DE, PT, IT)
- **Playlists** - Descarga completa o rango personalizado
- **Thumbnails** - Guarda miniaturas automáticamente

### �️ Multiplataforma
- ✅ Windows 10/11 (compatibilidad 95%)
- ✅ Linux (Ubuntu, Fedora, Arch, Debian)
- ✅ macOS 10.15+
- ✅ Detección automática yt-dlp (nativo/Python)
- ✅ FFmpeg opcional (solo para audio)

## 📋 Requisitos Previos

### Todos los Sistemas Operativos

1. **Node.js y npm** (v16 o superior)
2. **Rust** (última versión estable)
3. **yt-dlp**

### Instalación de yt-dlp por Sistema

#### 🪟 Windows
```powershell
# Opción 1: Con Python (RECOMENDADO)
pip install yt-dlp

# Opción 2: Con winget
winget install yt-dlp.yt-dlp

# Opción 3: Ejecutable directo
# Descargar desde: https://github.com/yt-dlp/yt-dlp/releases/latest
```

#### 🐧 Linux
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install yt-dlp

# Fedora
sudo dnf install yt-dlp

# Arch Linux
sudo pacman -S yt-dlp

# Con pip (cualquier distro)
pip install yt-dlp
```

#### 🍎 macOS
```bash
# Con Homebrew
brew install yt-dlp

# Con pip
pip install yt-dlp
```

### Verificar instalación
```bash
yt-dlp --version
```

### 🎬 **Instalar FFmpeg** (Requerido para audio)

FFmpeg es **necesario** para extraer audio y convertir formatos.

#### Windows: `choco install ffmpeg`
#### Linux: `sudo apt install ffmpeg` (Ubuntu/Debian)
#### macOS: `brew install ffmpeg`

📖 **[Ver guía completa: INSTALAR_FFMPEG.md](./INSTALAR_FFMPEG.md)**

## 📦 Instalación del Proyecto

### 1. Clonar o descargar el repositorio
```bash
cd /ruta/a/ytdlp
```

### 2. Instalar dependencias
```bash

---

## 🚀 Instalación Rápida

### 1. Instalar yt-dlp

**Windows:**
```powershell
pip install yt-dlp
```

**Linux:**
```bash
sudo apt install yt-dlp  # Ubuntu/Debian
sudo dnf install yt-dlp  # Fedora
sudo pacman -S yt-dlp    # Arch
```

**macOS:**
```bash
brew install yt-dlp
```

### 2. Instalar FFmpeg (opcional, solo para audio)

**Windows:**
```powershell
choco install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg  # Ubuntu/Debian
```

**macOS:**
```bash
brew install ffmpeg
```

### 3. Descargar yt-dlp GUI

Ir a [Releases](https://github.com/alejandg1/ytdlp_gui/releases) y descargar para tu plataforma:
- **Windows**: `.msi` installer
- **Linux**: `.AppImage`
- **macOS**: `.dmg`

**Ver documentación completa:** [Guía de Instalación](./docs/instalacion.md)

---

## ⚡ Uso Rápido

**Modo Simple (recomendado):**
1. Seleccionar preset: Video / Audio / Podcast
2. Pegar URLs (una por línea)
3. Seleccionar carpeta de descarga
4. Iniciar Descarga ✓

**Modo Pro (avanzado):**
- 18+ opciones configurables
- Control total de parámetros
- Vista previa de información del video

**Ver guías:** [Modo Simple](./docs/modo-simple.md) | [Modo Pro](./docs/modo-pro.md)

---

## 🛠️ Desarrollo

### Compilar desde Fuente

```bash
# 1. Clonar repositorio
git clone https://github.com/alejandg1/ytdlp_gui.git
cd ytdlp_gui

# 2. Instalar dependencias
npm install

# 3. Desarrollo
npm run tauri dev

# 4. Compilar producción
npm run tauri build
```

**Binarios en:**
- Windows: `src-tauri/target/release/bundle/msi/`
- Linux: `src-tauri/target/release/bundle/appimage/`
- macOS: `src-tauri/target/release/bundle/dmg/`

---

## 📸 Capturas de Pantalla

### Modo Simple
![Modo Simple](./docs/screenshots/simple-mode.png)
- Interfaz minimalista de 2 columnas
- 3 presets predefinidos
- Cero configuración técnica

### Modo Pro
![Modo Pro](./docs/screenshots/pro-mode.png)
- 18+ opciones configurables
- Vista previa de información
- Control total de yt-dlp

---

## 🆘 Soporte

**Problemas comunes:**
- [FAQ](./docs/faq.md) - Preguntas frecuentes
- [Troubleshooting](./docs/troubleshooting.md) - Solución de problemas
- [Evitar Bloqueos](./docs/anti-bloqueos.md) - Cookies y SponsorBlock

**Reportar bugs:**
[GitHub Issues](https://github.com/alejandg1/ytdlp_gui/issues)

---

## 📄 Licencia

MIT License - Ver [LICENSE](./LICENSE) para más detalles.

---

## � Créditos

- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** - Herramienta de descarga
- **[Tauri](https://tauri.app/)** - Framework de aplicaciones
- **[React](https://react.dev/)** - Biblioteca UI
- **[FFmpeg](https://ffmpeg.org/)** - Procesamiento multimedia

---

## ⭐ Apoya el Proyecto

Si te gusta el proyecto:
- ⭐ Dale una estrella en GitHub
- 🐛 Reporta bugs
- 💡 Sugiere características
- 📝 Mejora la documentación

---

**Desarrollado con ❤️ por ActioMeta**

**Opciones Avanzadas:**
- ☑️ SponsorBlock (quitar anuncios integrados)
- ☑️ Geo-bypass (contenido bloqueado por región)
- ☑️ Embed metadata (información en el archivo)
- ☑️ Embed thumbnail (miniatura en el archivo)
- ☑️ Forzar uso de Python
- Control de playlists: Single / All / 1-5 / 1-10

### 🔐 Cómo Evitar Bloqueos de YouTube

**Configuración CRÍTICA en Modo Pro:**

1. **Cookies del Navegador**: Selecciona Chrome o Firefox
   - Debes estar logueado en YouTube en ese navegador
   - Esto hace que YouTube piense que eres tú navegando

2. **Límite de Velocidad**: Máximo 5MB/s

3. **Pausa entre Videos**: Mínimo 3 segundos

4. **No descargar más de 20 videos seguidos**

[📖 Guía Completa Anti-Bloqueos](./EVITAR_BLOQUEOS.md)

## 🔧 Configuración Avanzada

### Calidades de Audio
| Valor | Calidad | Descripción | Tamaño |
|-------|---------|-------------|--------|
| 0 | Mejor | Máxima calidad disponible | Grande |
| 2 | Alta | Alta calidad (recomendado) | Medio |
| 5 | Media | Calidad media (balance) | Pequeño |
| 9 | Baja | Menor calidad | Muy pequeño |

### Formatos de Audio (Extracción)
| Formato | Calidad | Compatibilidad | Tamaño |
|---------|---------|----------------|--------|
| MP3 | Buena | Universal ⭐ | Medio |
| M4A | Mejor | Apple, Android | Pequeño |
| OPUS | Excelente | Moderno | Muy pequeño |
| FLAC | Sin pérdida | Reproductores | Grande |
| WAV | Sin compresión | Universal | Muy grande |

### Idiomas de Subtítulos Disponibles
- 🇪🇸 Español (es)
- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇵🇹 Português (pt)
- 🇮🇹 Italiano (it)

## 📚 Documentación Adicional

- [📖 Guía Completa de la Interfaz Dual](./GUIA_UI_DUAL.md)
- [📋 Todas las Opciones de yt-dlp](./OPCIONES_YTDLP.md)
- [🛡️ Guía Anti-Bloqueos](./EVITAR_BLOQUEOS.md)
- [🪟 Setup para Windows](./WINDOWS_SETUP.md)
- [⚡ Inicio Rápido](./QUICK_START.md)
- [👤 Guía para Usuarios](./GUIA_USUARIOS.md)

## 🐛 Solución de Problemas

### "yt-dlp no está instalado"
- **Solución:** Instala yt-dlp según tu sistema operativo (ver arriba)
- **Auto-detección:** La app detecta automáticamente si está instalado vía Python
- **Windows:** La app intenta automáticamente `python -m yt_dlp` si el comando directo falla

### "Sign in to confirm you're not a bot"
- **Causa:** YouTube ha bloqueado tu IP temporalmente
- **Solución INMEDIATA:**
  1. Activa "Cookies del Navegador" (Chrome) en Modo Pro
  2. Reduce velocidad a 2MB/s
  3. Aumenta pausa a 5 segundos
- [Ver Guía Completa de Desbloqueo](./EVITAR_BLOQUEOS.md)

### "Cookies extraction failed"
- Cierra completamente el navegador seleccionado
- Asegúrate de estar logueado en YouTube en ese navegador
- Intenta con otro navegador (Firefox en lugar de Chrome)

### Error al descargar
- Verifica que la URL sea válida
- Comprueba tu conexión a Internet
- Asegúrate de tener permisos de escritura en la carpeta de destino
- Algunos videos pueden estar restringidos geográficamente (usa Geo-bypass)

### SponsorBlock no remueve anuncios
- Normal: No todos los videos tienen segmentos marcados
- La base de datos es comunitaria, no todos los videos están cubiertos

### Error de compilación
```bash
# Limpiar y reinstalar
rm -rf node_modules
npm install

# Limpiar build de Rust
cd src-tauri
cargo clean
cd ..

# Intentar de nuevo
npm run tauri dev
```

## 📝 Estructura del Proyecto

```
ytdlp/
├── src/                      # Frontend React
│   ├── App.tsx              # Componente principal UI (Dual Mode)
│   ├── App.css              # Estilos minimalistas profesionales
│   └── ...
├── src-tauri/               # Backend Rust
│   ├── src/
│   │   ├── main.rs          # Entry point
│   │   └── lib.rs           # Comandos Tauri + lógica yt-dlp + nuevas opciones
│   ├── Cargo.toml           # Dependencias Rust
│   └── tauri.conf.json      # Configuración Tauri
├── package.json             # Dependencias Node
├── README.md                # Este archivo
├── GUIA_UI_DUAL.md          # Guía completa de la interfaz dual
├── OPCIONES_YTDLP.md        # Todas las opciones disponibles
├── EVITAR_BLOQUEOS.md       # Guía anti-bloqueos
├── WINDOWS_SETUP.md         # Guía específica para Windows
├── QUICK_START.md           # Guía rápida
└── GUIA_USUARIOS.md         # Guía para usuarios finales
```

## 🔒 Características de Seguridad

- ✅ Ejecuta yt-dlp de forma segura a través de Tauri
- ✅ No requiere conexión a Internet después de la instalación inicial
- ✅ Los archivos se guardan localmente, sin servicios de terceros
- ✅ Código fuente completamente abierto y auditable

## 🚀 Características Técnicas

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **CSS moderno** con animaciones y gradientes

### Backend
- **Rust** con Tauri 2.0
- **Comandos asíncronos** para descargas sin bloqueos
- **Manejo de errores** robusto
- **Compatibilidad multiplataforma** automática

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una sugerencia:

1. Abre un issue describiendo el problema o mejora
2. Fork el proyecto
3. Crea una rama para tu feature (`git checkout -b feature/MiFeature`)
4. Commit tus cambios (`git commit -m 'Agregar MiFeature'`)
5. Push a la rama (`git push origin feature/MiFeature`)
6. Abre un Pull Request

## 🙏 Agradecimientos

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - La herramienta de descarga por excelencia
- [Tauri](https://tauri.app/) - Framework para aplicaciones de escritorio ligeras
- [React](https://react.dev/) - Biblioteca de interfaz de usuario
- [Rust](https://www.rust-lang.org/) - Lenguaje de programación seguro y rápido

## 📞 Soporte

Para instrucciones específicas de cada sistema operativo:
- 🪟 **Windows:** Ver `WINDOWS_SETUP.md`
- 📚 **Guía rápida:** Ver `QUICK_START.md`

---

**Hecho con ❤️ usando Tauri, React y Rust**
