# 🐧 Guía Linux

Instrucciones específicas para instalar y usar yt-dlp GUI en Linux.

---

## 📋 Distribuciones Soportadas

✅ **Oficialmente testeado:**
- Ubuntu 20.04+
- Debian 11+
- Fedora 36+
- Arch Linux
- Linux Mint 20+

✅ **Debería funcionar:**
- Pop!_OS
- Manjaro
- openSUSE
- Cualquier distro con GTK 3.24+

---

## 🔧 Instalación por Distribución

### Ubuntu / Debian / Linux Mint

```bash
# 1. Actualizar repositorios
sudo apt update

# 2. Instalar yt-dlp
sudo apt install yt-dlp

# Si no está disponible:
sudo apt install python3-pip
pip3 install yt-dlp

# 3. Instalar FFmpeg
sudo apt install ffmpeg

# 4. Descargar yt-dlp GUI
# Ir a https://github.com/alejandg1/ytdlp_gui/releases
# Descargar ytdlp-gui_0.1.0_amd64.AppImage

# 5. Dar permisos de ejecución
chmod +x ytdlp-gui_*.AppImage

# 6. Ejecutar
./ytdlp-gui_*.AppImage
```

### Fedora

```bash
# 1. Instalar yt-dlp
sudo dnf install yt-dlp

# 2. Instalar FFmpeg (requiere RPM Fusion)
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install ffmpeg

# 3. Descargar AppImage desde releases
chmod +x ytdlp-gui_*.AppImage
./ytdlp-gui_*.AppImage
```

### Arch Linux / Manjaro

```bash
# 1. Instalar desde repos oficiales
sudo pacman -S yt-dlp ffmpeg

# 2. Descargar AppImage
chmod +x ytdlp-gui_*.AppImage
./ytdlp-gui_*.AppImage

# O compilar desde AUR (cuando esté disponible)
# yay -S ytdlp-gui
```

---

## 🚀 Ejecución de AppImage

### Método 1: Doble click (recomendado)

```bash
# Dar permisos una vez
chmod +x ytdlp-gui_*.AppImage

# Doble click desde explorador de archivos
```

### Método 2: Terminal

```bash
./ytdlp-gui_*.AppImage
```

### Método 3: Integración con sistema

```bash
# Mover a /opt
sudo mv ytdlp-gui_*.AppImage /opt/ytdlp-gui

# Crear .desktop file
cat > ~/.local/share/applications/ytdlp-gui.desktop << 'EOF'
[Desktop Entry]
Name=yt-dlp GUI
Exec=/opt/ytdlp-gui
Icon=download
Type=Application
Categories=Network;
EOF

# Actualizar base de datos de aplicaciones
update-desktop-database ~/.local/share/applications/
```

---

## 🔧 Dependencias de Sistema

### WebKitGTK (requerido para Tauri)

**Ubuntu/Debian:**
```bash
sudo apt install libwebkit2gtk-4.0-dev
```

**Fedora:**
```bash
sudo dnf install webkit2gtk3-devel
```

**Arch:**
```bash
sudo pacman -S webkit2gtk
```

---

## ⚙️ Configuración Específica de Linux

### Permisos de Carpetas

```bash
# Si tienes problemas guardando en ciertas carpetas
# Verificar permisos
ls -la /ruta/descarga

# Dar permisos si es necesario
chmod 755 /ruta/descarga
```

### Variables de Entorno

```bash
# Si yt-dlp no se detecta, agregar a PATH
export PATH="$HOME/.local/bin:$PATH"

# Hacerlo permanente
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### FFmpeg en ubicaciones no estándar

```bash
# Si FFmpeg está en /usr/sbin o /snap/bin
# Crear symlinks a /usr/local/bin
sudo ln -s /usr/sbin/ffmpeg /usr/local/bin/ffmpeg
sudo ln -s /usr/sbin/ffprobe /usr/local/bin/ffprobe
```

---

## 🐛 Troubleshooting Linux

### AppImage no ejecuta

**Error: FUSE no disponible**

```bash
# Instalar FUSE
sudo apt install fuse libfuse2  # Ubuntu/Debian
sudo dnf install fuse           # Fedora
sudo pacman -S fuse2            # Arch

# O extraer AppImage
./ytdlp-gui_*.AppImage --appimage-extract
./squashfs-root/AppRun
```

### Error "cannot execute binary file"

```bash
# Verificar arquitectura
uname -m  # Debe ser x86_64

# Si es ARM:
# Necesitas compilar desde fuente
```

### Error de librerías GTK

```bash
# Ubuntu/Debian
sudo apt install libgtk-3-0 libayatana-appindicator3-1

# Fedora
sudo dnf install gtk3 libappindicator-gtk3

# Arch
sudo pacman -S gtk3
```

### FFmpeg no detectado (snap)

```bash
# Si instalaste FFmpeg con snap
snap info ffmpeg

# Crear symlinks
sudo ln -s /snap/bin/ffmpeg /usr/local/bin/ffmpeg
sudo ln -s /snap/bin/ffprobe /usr/local/bin/ffprobe
```

---

## 📦 Compilar desde Fuente

```bash
# 1. Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# 3. Instalar dependencias de desarrollo
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

# 4. Clonar repositorio
git clone https://github.com/alejandg1/ytdlp_gui.git
cd ytdlp_gui

# 5. Instalar dependencias npm
npm install

# 6. Compilar
npm run tauri build

# Binario en: src-tauri/target/release/ytdlp-gui
```

---

## 🔐 Seguridad

### Verificar integridad de AppImage

```bash
# Calcular SHA256
sha256sum ytdlp-gui_*.AppImage

# Comparar con hash oficial en releases
```

### Ejecutar en sandbox (opcional)

```bash
# Con firejail
sudo apt install firejail
firejail ./ytdlp-gui_*.AppImage
```

---

## 🎯 Optimizaciones

### Acelerar inicio de AppImage

```bash
# Extraer una vez
./ytdlp-gui_*.AppImage --appimage-extract

# Ejecutar directamente
./squashfs-root/AppRun

# Crear alias
echo 'alias ytdlp-gui="~/squashfs-root/AppRun"' >> ~/.bashrc
```

### Integrar con Nautilus (Ubuntu)

```bash
# Agregar acción "Descargar con yt-dlp"
# Archivo: ~/.local/share/nautilus/scripts/Download with yt-dlp

#!/bin/bash
URL=$(zenity --entry --text="URL del video:")
/opt/ytdlp-gui "$URL"
```

---

## 📚 Recursos Linux

- **AppImage Documentation:** https://appimage.org/
- **Tauri Linux Setup:** https://tauri.app/v1/guides/getting-started/prerequisites#linux
- **yt-dlp Linux Issues:** https://github.com/yt-dlp/yt-dlp/issues

---

## 🆘 Soporte Específico

**Problemas con tu distribución?**
Abre un [Issue](https://github.com/alejandg1/ytdlp_gui/issues) indicando:
- Distribución y versión
- Arquitectura (`uname -a`)
- Error completo

---

**Siguiente:** [Inicio Rápido](./inicio-rapido.md) | [Troubleshooting](./troubleshooting.md)
