# 📥 YouTube Downloader - Guía Rápida para Usuarios

## ¿Qué necesito para usar esta aplicación?

### ✅ Solo necesitas instalar yt-dlp

**Nada más. NO necesitas Node.js, Rust, ni ninguna herramienta de desarrollo.**

---

## 🪟 Windows

### Instalación de yt-dlp:

**Opción 1 - Con Python (Recomendado):**
```powershell
pip install yt-dlp
```

**Opción 2 - Ejecutable directo:**
1. Descargar yt-dlp.exe desde: https://github.com/yt-dlp/yt-dlp/releases/latest
2. Colocar en `C:\Windows\System32\` o agregar al PATH

**Opción 3 - Con winget:**
```powershell
winget install yt-dlp.yt-dlp
```

### Usar la aplicación:
1. Descargar `ytdlp_gui.exe`
2. Doble clic para ejecutar
3. ¡Listo!

---

## 🐧 Linux

### Instalación de yt-dlp:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install yt-dlp
```

**Fedora:**
```bash
sudo dnf install yt-dlp
```

**Cualquier distro (con pip):**
```bash
pip install yt-dlp
```

### Usar la aplicación:
1. Descargar `ytdlp_gui`
2. Dar permisos de ejecución: `chmod +x ytdlp_gui`
3. Ejecutar: `./ytdlp_gui`

---

## 🍎 macOS

### Instalación de yt-dlp:

```bash
# Con Homebrew
brew install yt-dlp

# O con pip
pip install yt-dlp
```

### Usar la aplicación:
1. Descargar `ytdlp_gui.app`
2. Abrir la aplicación
3. Si aparece advertencia de seguridad: Click derecho → Abrir

---

## 🎯 Cómo usar la aplicación

1. **Primera vez:**
   - Click en "📁 Seleccionar Carpeta" para elegir dónde guardar videos
   
2. **Configurar:**
   - Calidad de audio (0 = mejor, 5 = menor)
   - Activar subtítulos si quieres (opcional)
   - Elegir formato del nombre del archivo

3. **Descargar:**
   - Pega las URLs de YouTube (una por línea)
   - Click en "⬇️ Iniciar Descargas"
   - Espera a que termine

4. **Listo!**
   - Tus videos estarán en la carpeta que seleccionaste

---

## ❓ Preguntas Frecuentes

### ¿Necesito Python?
Solo si instalas yt-dlp con `pip install yt-dlp`. Si usas otra opción, no.

### ¿Necesito Rust o Node.js?
**NO.** Eso solo es para programadores que quieren modificar el código.

### ¿Es gratis?
Sí, completamente gratis y de código abierto.

### ¿Es seguro?
Sí. La aplicación solo ejecuta yt-dlp localmente en tu computadora.

### ¿Qué plataformas soporta?
YouTube, Vimeo, Dailymotion, Twitter, TikTok, y más de 1000 sitios que soporta yt-dlp.

### ¿Puedo descargar playlists completas?
Sí, solo pega la URL de la playlist.

---

## 🔧 Solución de Problemas

### "yt-dlp no está instalado"
- Instala yt-dlp según las instrucciones de tu sistema operativo arriba
- Verifica con: `yt-dlp --version`

### "Error al descargar"
- Verifica que la URL sea correcta
- Verifica tu conexión a Internet
- Algunos videos pueden tener restricciones

### Otro problema
- Consulta el archivo WINDOWS_SETUP.md (Windows)
- Consulta el archivo README.md (información general)

---

## 📞 ¿Más ayuda?

Ver documentación completa:
- **Windows:** `WINDOWS_SETUP.md`
- **General:** `README.md`
