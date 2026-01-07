# 🔧 Guía de Instalación

Guía completa para instalar yt-dlp GUI en todas las plataformas.

---

## 📋 Requisitos Previos

### Obligatorios
- **yt-dlp**: Instalado vía sistema o Python
- **Sistema Operativo**: Windows 10+, Linux, macOS 10.15+

### Opcionales
- **FFmpeg**: Necesario SOLO para extracción de audio/video sin audio
  - Incluye `ffmpeg` y `ffprobe`
- **Python 3.8+**: Si prefieres yt-dlp vía pip

---

## 🪟 Windows 10/11

### Opción 1: Instalación Completa con Python

```powershell
# 1. Instalar Python (si no lo tienes)
# Descargar desde https://www.python.org/downloads/

# 2. Instalar yt-dlp
pip install yt-dlp

# 3. Instalar FFmpeg con Chocolatey
choco install ffmpeg

# O descargar manualmente desde https://ffmpeg.org/download.html
# Agregar ffmpeg/bin a PATH
```

### Opción 2: Binarios Standalone

```powershell
# 1. Descargar yt-dlp.exe
# https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe

# 2. Mover a C:\Windows\System32 o agregar a PATH

# 3. Descargar FFmpeg
# https://www.gyan.dev/ffmpeg/builds/
# Extraer y agregar bin/ a PATH
```

### Verificación Windows

```powershell
# Verificar yt-dlp
yt-dlp --version
# O si instalaste con Python:
python -m yt_dlp --version

# Verificar FFmpeg
ffmpeg -version
ffprobe -version
```

---

## 🐧 Linux

### Ubuntu/Debian

```bash
# Actualizar repositorios
sudo apt update

# Instalar yt-dlp
sudo apt install yt-dlp

# Si no está disponible, usar pip:
sudo apt install python3-pip
pip3 install yt-dlp

# Instalar FFmpeg
sudo apt install ffmpeg
```

### Fedora

```bash
# Instalar yt-dlp
sudo dnf install yt-dlp

# Instalar FFmpeg (requiere RPM Fusion)
sudo dnf install ffmpeg
```

### Arch Linux

```bash
# Instalar desde repositorios oficiales
sudo pacman -S yt-dlp ffmpeg
```

### Instalación Universal (cualquier distro)

```bash
# Instalar con pip
pip3 install yt-dlp

# O descargar binario
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

### Verificación Linux

```bash
# Verificar yt-dlp
yt-dlp --version

# Verificar FFmpeg
ffmpeg -version
ffprobe -version
```

---

## 🍎 macOS

### Con Homebrew (recomendado)

```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar yt-dlp y FFmpeg
brew install yt-dlp ffmpeg
```

### Con Python/pip

```bash
# Asegurarse de tener Python 3
python3 --version

# Instalar yt-dlp
pip3 install yt-dlp

# Instalar FFmpeg
brew install ffmpeg
```

### Verificación macOS

```bash
# Verificar instalaciones
yt-dlp --version
ffmpeg -version
ffprobe -version
```

---

## 🎯 Instalación de yt-dlp GUI

### Desde Releases (recomendado)

1. Ir a [Releases](https://github.com/alejandg1/ytdlp_gui/releases)
2. Descargar para tu plataforma:
   - **Windows**: `ytdlp-gui_0.1.0_x64_en-US.msi`
   - **Linux**: `ytdlp-gui_0.1.0_amd64.AppImage`
   - **macOS**: `ytdlp-gui_0.1.0_x64.dmg`
3. Instalar/ejecutar

### Compilar desde fuente

```bash
# 1. Clonar repositorio
git clone https://github.com/alejandg1/ytdlp_gui.git
cd ytdlp_gui

# 2. Instalar dependencias
npm install

# 3. Compilar aplicación
npm run tauri build

# El ejecutable estará en src-tauri/target/release/
```

---

## ✅ Verificación Final

### Test de Funcionamiento

```bash
# 1. Abrir yt-dlp GUI
# 2. La aplicación detectará automáticamente:
#    - yt-dlp (nativo o Python)
#    - FFmpeg (si está instalado)

# 3. Test rápido:
# Modo Simple → Preset: Video
# URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
# Iniciar Descarga
```

### Mensajes Esperados

✅ **yt-dlp detectado**: "native: X.X.X" o "python: X.X.X"  
✅ **FFmpeg detectado**: Sin advertencias amarillas  
⚠️ **FFmpeg no detectado**: Banner amarillo (solo afecta extracción de audio)

---

## 🔧 Solución de Problemas Comunes

### yt-dlp no detectado

**Windows:**
```powershell
# Verificar PATH
echo $env:PATH

# Reinstalar con pip
pip install --upgrade yt-dlp
```

**Linux/macOS:**
```bash
# Verificar PATH
echo $PATH

# Reinstalar
pip3 install --upgrade yt-dlp
```

### FFmpeg no detectado

**Verificar instalación:**
```bash
which ffmpeg
which ffprobe
```

**Si no están en PATH:**
```bash
# Linux: Crear symlinks
sudo ln -s /usr/bin/ffmpeg /usr/local/bin/ffmpeg
sudo ln -s /usr/bin/ffprobe /usr/local/bin/ffprobe

# macOS: Reinstalar con Homebrew
brew reinstall ffmpeg
```

**Windows:**
- Agregar carpeta `bin/` de FFmpeg al PATH del sistema
- Reiniciar la aplicación

---

## 📚 Siguientes Pasos

1. **[Inicio Rápido](./inicio-rapido.md)** - Primera descarga
2. **[Configuración FFmpeg](./ffmpeg.md)** - Configuración avanzada
3. **[Modo Simple](./modo-simple.md)** - Uso básico
4. **[Modo Pro](./modo-pro.md)** - Opciones avanzadas

---

**¿Problemas?** Consulta [Troubleshooting](./troubleshooting.md) o abre un [Issue](https://github.com/alejandg1/ytdlp_gui/issues)
