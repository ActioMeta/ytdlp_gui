# 🍎 Guía macOS

Instrucciones específicas para instalar y usar yt-dlp GUI en macOS.

---

## 📋 Requisitos

- **macOS 10.15 Catalina** o superior
- **Homebrew** (gestor de paquetes, recomendado)
- **Xcode Command Line Tools**

---

## 🔧 Instalación Completa

### 1. Instalar Xcode Command Line Tools

```bash
xcode-select --install
```

### 2. Instalar Homebrew (si no lo tienes)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 3. Instalar yt-dlp y FFmpeg

```bash
# Instalar ambos con un comando
brew install yt-dlp ffmpeg

# Verificar instalación
yt-dlp --version
ffmpeg -version
```

### 4. Instalar yt-dlp GUI

**Desde Releases:**
1. Ir a [Releases](https://github.com/alejandg1/ytdlp_gui/releases)
2. Descargar `ytdlp-gui_0.1.0_x64.dmg`
3. Abrir el .dmg
4. Arrastrar "yt-dlp GUI" a Aplicaciones
5. Abrir desde Aplicaciones

---

## 🛡️ Permisos de Seguridad

### Primera ejecución

macOS puede bloquear la aplicación por "desarrollador no identificado".

**Solución:**

```bash
# Método 1: Desde Preferencias del Sistema
1. Click derecho en la app → Abrir
2. Confirmar "Abrir" en el diálogo

# Método 2: Terminal
xattr -cr /Applications/ytdlp-gui.app
```

### Permisos de Descarga

La primera vez que selecciones carpeta de descarga:
- macOS pedirá permiso de acceso
- Click en "OK"/"Permitir"

---

## ⚙️ Configuración Específica de macOS

### PATH de Python

Si instalaste Python desde python.org:

```bash
# Verificar ubicación
which python3

# Debería mostrar:
/usr/local/bin/python3  # Intel Mac
/opt/homebrew/bin/python3  # Apple Silicon
```

### FFmpeg en Apple Silicon (M1/M2/M3)

```bash
# Homebrew automáticamente instala versión ARM
brew install ffmpeg

# Verificar arquitectura
file $(which ffmpeg)
# Debe decir: Mach-O 64-bit executable arm64
```

---

## 🔧 Troubleshooting macOS

### Error "App está dañada"

```bash
# Eliminar atributos de cuarentena
xattr -cr /Applications/ytdlp-gui.app
sudo spctl --master-disable  # Permitir apps de cualquier lugar
```

### yt-dlp no detectado

```bash
# Verificar PATH
echo $PATH

# Si Homebrew no está en PATH:
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Reinstalar yt-dlp
brew reinstall yt-dlp
```

### FFmpeg no detectado

```bash
# Verificar instalación
which ffmpeg
which ffprobe

# Reinstalar si es necesario
brew reinstall ffmpeg

# Verificar que ffprobe está disponible
ffprobe -version
```

### Error de permisos en carpeta de descargas

```bash
# Verificar permisos
ls -la ~/Downloads

# Reparar permisos
chmod 755 ~/Downloads

# Si es carpeta externa (USB, etc.)
# Necesitas dar permisos desde:
# Preferencias del Sistema → Seguridad y Privacidad → Archivos y Carpetas
```

---

## 🍺 Gestión con Homebrew

### Actualizar yt-dlp

```bash
brew upgrade yt-dlp
```

### Actualizar FFmpeg

```bash
brew upgrade ffmpeg
```

### Verificar versiones instaladas

```bash
brew list --versions yt-dlp
brew list --versions ffmpeg
```

### Desinstalar

```bash
brew uninstall yt-dlp ffmpeg
```

---

## 🎯 Instalación Alternativa (Sin Homebrew)

### Con Python/pip

```bash
# 1. Verificar Python 3
python3 --version

# 2. Instalar yt-dlp
pip3 install yt-dlp

# 3. Agregar a PATH
echo 'export PATH="$HOME/Library/Python/3.x/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 4. FFmpeg
# Descargar desde https://evermeet.cx/ffmpeg/
# Extraer y mover a /usr/local/bin
```

---

## 📦 Compilar desde Fuente (macOS)

```bash
# 1. Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Instalar Node.js
brew install node

# 3. Clonar repositorio
git clone https://github.com/alejandg1/ytdlp_gui.git
cd ytdlp_gui

# 4. Instalar dependencias
npm install

# 5. Compilar
npm run tauri build

# App en: src-tauri/target/release/bundle/macos/
```

---

## 🚀 Optimizaciones

### Agregar al Dock

```bash
# Arrastrar desde /Applications al Dock
```

### Crear Alias de Terminal

```bash
# Agregar a ~/.zshrc
echo 'alias ytdlp-gui="open -a ytdlp-gui"' >> ~/.zshrc
source ~/.zshrc

# Usar
ytdlp-gui
```

### Script de Descarga Rápida

```bash
#!/bin/bash
# ~/bin/download-video.sh

URL="$1"
if [ -z "$URL" ]; then
    URL=$(pbpaste)  # Tomar desde clipboard
fi

yt-dlp -f bestvideo+bestaudio -o "~/Downloads/%(title)s.%(ext)s" "$URL"
```

---

## 🔐 Seguridad y Privacidad

### Verificar firma de la app

```bash
codesign -dv /Applications/ytdlp-gui.app
```

### Permisos de red

macOS puede pedir permiso para acceso a red:
- Necesario para descargar videos
- Click en "Permitir"

### Sandbox

La app usa sandbox de macOS:
- Solo accede a carpetas que seleccionaste
- No acceso completo al sistema

---

## 🍏 Características Específicas de macOS

### Modo Oscuro

La app respeta automáticamente:
```
Preferencias del Sistema → General → Apariencia
```

### Notificaciones

Activar notificaciones en:
```
Preferencias del Sistema → Notificaciones → yt-dlp GUI
```

### Gestos Trackpad

- Swipe con 2 dedos: scroll
- Pinch: zoom (en vista previa)

---

## 📚 Recursos macOS

- **Homebrew:** https://brew.sh
- **FFmpeg macOS:** https://evermeet.cx/ffmpeg/
- **Python macOS:** https://www.python.org/downloads/macos/
- **Tauri macOS:** https://tauri.app/v1/guides/getting-started/prerequisites#macos

---

## 🆘 Soporte Específico

**Problemas en macOS?**
Abre un [Issue](https://github.com/alejandg1/ytdlp_gui/issues) indicando:
- Versión de macOS
- Chip (Intel/Apple Silicon)
- Error completo

---

**Siguiente:** [Inicio Rápido](./inicio-rapido.md) | [Troubleshooting](./troubleshooting.md)
