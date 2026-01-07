# 🔧 Solución de Problemas

Guía completa de troubleshooting para resolver problemas comunes en yt-dlp GUI.

---

## 🚨 Problemas Comunes

### 1. yt-dlp no detectado

**Síntomas:**
- Aplicación no inicia descargas
- Mensaje de error: "yt-dlp no encontrado"

**Soluciones:**

**Windows:**
```powershell
# Verificar instalación
yt-dlp --version
python -m yt_dlp --version

# Reinstalar
pip install --upgrade --force-reinstall yt-dlp

# Verificar PATH
echo $env:PATH | findstr yt-dlp
```

**Linux/macOS:**
```bash
# Verificar instalación
which yt-dlp
yt-dlp --version

# Reinstalar
pip3 install --upgrade --force-reinstall yt-dlp

# Verificar PATH
echo $PATH | grep yt-dlp
```

---

### 2. FFmpeg no detectado

**Síntomas:**
- Banner amarillo "FFmpeg no detectado"
- Falla extracción de audio
- Error: "Postprocessing: ffprobe not found"

**Soluciones:**

**Verificar instalación:**
```bash
# Debe mostrar versión
ffmpeg -version
ffprobe -version

# Verificar ubicación
which ffmpeg
which ffprobe
```

**Windows:**
```powershell
# Instalar con Chocolatey
choco install ffmpeg

# O descargar manualmente:
# 1. https://www.gyan.dev/ffmpeg/builds/
# 2. Extraer a C:\ffmpeg
# 3. Agregar C:\ffmpeg\bin a PATH del sistema
# 4. Reiniciar aplicación
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Arch
sudo pacman -S ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

---

### 3. Error "Videos sin audio"

**Síntomas:**
- Descarga completa al 100%
- Mensaje: "Video descargado pero sin audio"
- Error en postprocesamiento

**Causa:**
Algunos videos (especialmente de Reddit, Twitter) **NO tienen pista de audio**.

**Solución:**
✅ **NO es un error** - El video se descargó correctamente  
✅ El archivo está completo en tu carpeta de descargas  
⚠️ Si necesitas audio, prueba con otra URL

---

### 4. Error "HTTP 403 Forbidden"

**Síntomas:**
- Descarga falla inmediatamente
- Mensaje: "HTTP Error 403: Forbidden"

**Soluciones:**

**1. Usar cookies de navegador:**
```
Modo Pro → Cookies From Browser → Seleccionar navegador (chrome/firefox/edge)
```

**2. Cambiar User Agent:**
```bash
# Manualmente (terminal):
yt-dlp --user-agent "Mozilla/5.0" [URL]
```

**3. Geo-Bypass:**
```
Modo Pro → Activar "Geo Bypass" → Iniciar Descarga
```

---

### 5. Error "Video privado o eliminado"

**Síntomas:**
- Error inmediato
- Mensaje: "Video unavailable" o "Private video"

**Soluciones:**

**Si es video privado:**
1. Asegurarse de tener acceso (estar logueado)
2. Usar cookies de navegador:
   ```
   Modo Pro → Cookies From Browser → chrome
   ```

**Si es video eliminado:**
❌ No hay solución - el video ya no existe

---

### 6. Descargas lentas

**Síntomas:**
- Velocidad muy por debajo de tu conexión
- Descarga se congela

**Soluciones:**

**1. Cambiar servidor:**
```bash
# yt-dlp selecciona automáticamente
# Reintentar descarga puede usar servidor diferente
```

**2. Limitar concurrent fragments:**
```bash
# En terminal (para debugging):
yt-dlp -N 1 [URL]
```

**3. Usar proxy (si hay restricción regional):**
```
Modo Pro → Proxy → http://tu-proxy:puerto
```

---

### 7. Error "Formato no disponible"

**Síntomas:**
- Error: "Requested format not available"
- Falla con formato específico

**Soluciones:**

**1. Modo Simple:**
Cambiar preset:
- Video → Audio
- Audio → Video

**2. Modo Pro:**
```
Formato → Cambiar a "best" o "bestvideo+bestaudio"
```

**3. Verificar formatos disponibles:**
```bash
yt-dlp -F [URL]
# Muestra todos los formatos disponibles
```

---

### 8. Error en SponsorBlock

**Síntomas:**
- Error: "Unable to communicate with SponsorBlock"
- Descarga falla con SponsorBlock activado

**Soluciones:**

**1. Desactivar SponsorBlock:**
```
Modo Pro → Desactivar "SponsorBlock Remove"
```

**2. Verificar conexión a internet:**
```bash
ping api.sponsor.ajay.app
```

**3. Usar solo categorías básicas:**
```
SponsorBlock Categories → "sponsor,intro,outro"
```

---

### 9. Errores de codificación de caracteres

**Síntomas:**
- Nombres de archivo con caracteres extraños
- Error al guardar archivo

**Soluciones:**

**Windows:**
```powershell
# Cambiar codificación de terminal
chcp 65001
```

**Modo Pro:**
```
Output Template → Usar solo ASCII
Ejemplo: %(title).50s.%(ext)s
```

---

### 10. Aplicación no inicia

**Síntomas:**
- Ventana no abre
- Crash inmediato

**Soluciones:**

**1. Verificar logs:**

**Windows:**
```powershell
# Ejecutar desde terminal para ver errores
.\ytdlp-gui.exe
```

**Linux:**
```bash
# Ver logs
./ytdlp-gui
# O desde AppImage:
./ytdlp-gui*.AppImage
```

**2. Reinstalar aplicación:**
- Eliminar carpeta de configuración
- Reinstalar desde [Releases](https://github.com/alejandg1/ytdlp_gui/releases)

**3. Verificar dependencias:**
```bash
# Linux: verificar WebKit2GTK
sudo apt install libwebkit2gtk-4.0-dev
```

---

## 🔍 Debugging Avanzado

### Ver comandos ejecutados

La aplicación muestra comandos en consola de desarrollador:

```
Tauri console → Ver comando yt-dlp ejecutado
```

### Ejecutar manualmente

```bash
# Copiar comando de la consola y ejecutar en terminal
yt-dlp [argumentos copiados]
```

### Habilitar logs verbose

```bash
# Ejecutar en terminal con --verbose
yt-dlp --verbose [URL]
```

---

## 📞 Reportar Bugs

Si ninguna solución funciona:

1. **Recopilar información:**
   - Sistema operativo y versión
   - Versión de yt-dlp: `yt-dlp --version`
   - Versión de FFmpeg: `ffmpeg -version`
   - URL del video (si es pública)
   - Mensaje de error completo

2. **Crear Issue:**
   - [GitHub Issues](https://github.com/alejandg1/ytdlp_gui/issues)
   - Incluir toda la información recopilada
   - Captura de pantalla si es posible

---

## 📚 Recursos Adicionales

- **[Documentación yt-dlp](https://github.com/yt-dlp/yt-dlp#readme)**
- **[FAQ](./faq.md)**
- **[Instalación](./instalacion.md)**
- **[Evitar Bloqueos](./anti-bloqueos.md)**

---

**¿No encuentras tu problema?** Abre un [Issue](https://github.com/alejandg1/ytdlp_gui/issues) con todos los detalles.
