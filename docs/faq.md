# ❓ Preguntas Frecuentes (FAQ)

Respuestas a las preguntas más comunes sobre yt-dlp GUI.

---

## 🎯 General

### ¿Qué es yt-dlp GUI?

Es una interfaz gráfica para yt-dlp que permite descargar videos de YouTube y +1000 sitios web de forma sencilla, sin usar comandos de terminal.

### ¿Es gratis?

✅ Sí, completamente gratis y de código abierto (Open Source).

### ¿Funciona en mi sistema operativo?

✅ Sí, disponible para:
- Windows 10/11
- Linux (Ubuntu, Fedora, Arch, Debian, etc.)
- macOS 10.15+

---

## 🔧 Instalación

### ¿Necesito instalar yt-dlp por separado?

**Sí**, yt-dlp GUI requiere que tengas instalado:
- **yt-dlp** (obligatorio)
- **FFmpeg** (opcional, solo para audio)

Ver [Guía de Instalación](./instalacion.md).

### ¿Puedo usar yt-dlp instalado con Python?

✅ Sí, la aplicación detecta automáticamente:
- `yt-dlp` (binario nativo)
- `python -m yt_dlp` (instalación vía pip)
- `python3 -m yt_dlp` (Linux/macOS)

### ¿FFmpeg es obligatorio?

❌ No, solo necesario para:
- Extraer audio de videos
- Convertir formatos
- Videos sin audio (Reddit, Twitter)

Para descargas de video completo **NO es necesario**.

---

## 📥 Descargas

### ¿Qué sitios web soporta?

Más de **1000 sitios**, incluyendo:
- YouTube, Vimeo, Dailymotion
- Facebook, Twitter, Instagram
- Reddit, TikTok, Twitch
- SoundCloud, Bandcamp
- [Lista completa](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)

### ¿Puedo descargar playlists completas?

✅ Sí, simplemente pega la URL de la playlist.

Ejemplo:
```
https://www.youtube.com/playlist?list=PLxxxxxx
```

### ¿Puedo descargar solo audio?

✅ Sí, de dos formas:

**Modo Simple:**
```
Preset → Audio → Iniciar Descarga
```

**Modo Pro:**
```
Activar "Extract Audio" → Formato: mp3/m4a/opus
```

### ¿Puedo descargar múltiples videos a la vez?

✅ Sí, pega cada URL en una línea separada:

```
https://www.youtube.com/watch?v=video1
https://www.youtube.com/watch?v=video2
https://www.youtube.com/watch?v=video3
```

### ¿Cómo elijo la calidad del video?

**Modo Simple:**
- Preset "Video" = Mejor calidad disponible

**Modo Pro:**
```
Formato → best / bestvideo+bestaudio / 1080p / 720p
```

---

## 🛡️ Privacidad y Seguridad

### ¿Es seguro usar esta aplicación?

✅ Sí, la aplicación:
- Es de código abierto (auditable)
- No envía datos a servidores externos
- Solo ejecuta yt-dlp localmente
- No almacena contraseñas

### ¿Mis descargas son privadas?

✅ Sí, todo sucede en tu computadora:
- Las descargas van directo a tu disco
- No hay servidores intermedios
- Nadie excepto tú tiene acceso

### ¿Puedo usar cookies de mi navegador?

✅ Sí, útil para:
- Videos privados (con acceso)
- Evitar límites de descarga
- Acceder a contenido exclusivo

```
Modo Pro → Cookies From Browser → chrome/firefox/edge
```

**Nota:** Las cookies **NO se almacenan** en la aplicación.

---

## 🚫 Errores Comunes

### "Video sin audio" - ¿Qué significa?

Algunos videos (especialmente Reddit, Twitter) **no tienen pista de audio**.

✅ El video se descargó correctamente  
✅ No es un error de la aplicación  
⚠️ El video original no tiene sonido

### "FFmpeg no detectado" - ¿Qué hago?

Ver [Instalación FFmpeg](./ffmpeg.md).

**Si solo descargas video completo:**
- Puedes ignorar la advertencia

**Si extraes audio:**
- Debes instalar FFmpeg

### "HTTP 403 Forbidden" - ¿Cómo soluciono?

Usar cookies de navegador:
```
Modo Pro → Cookies From Browser → chrome
```

O activar Geo-Bypass:
```
Modo Pro → Geo Bypass → Activar
```

Ver más en [Evitar Bloqueos](./anti-bloqueos.md).

---

## 🎨 Interfaz

### ¿Cuál es la diferencia entre Modo Simple y Pro?

**Modo Simple:**
- 3 presets predefinidos (Video/Audio/Podcast)
- Interfaz minimalista
- Sin configuración técnica
- Para usuarios principiantes

**Modo Pro:**
- 18+ opciones configurables
- Control total de yt-dlp
- Vista previa de información
- Para usuarios avanzados

### ¿Puedo cambiar entre modos?

✅ Sí, usando los botones en la parte superior:
```
[Simple] [Pro]
```

Los cambios se guardan automáticamente.

### ¿Dónde se guardan mis configuraciones?

La aplicación recuerda:
- Último modo usado (Simple/Pro)
- Última carpeta de descarga
- Último preset seleccionado (Simple)

Se guarda en **localStorage del navegador**.

---

## ⚙️ Características Avanzadas

### ¿Qué es SponsorBlock?

Sistema que automáticamente **salta/elimina**:
- Anuncios integrados
- Intros/outros
- Recordatorios de suscripción
- Autopromoción

```
Modo Pro → SponsorBlock Remove → Activar
```

### ¿Puedo limitar el tamaño de descarga?

✅ Sí:
```
Modo Pro → Max Filesize → 100M / 1G / etc.
```

Si el video es más grande, **no se descarga**.

### ¿Puedo usar un proxy?

✅ Sí:
```
Modo Pro → Proxy → http://proxy:puerto
```

### ¿Puedo limitar la velocidad de descarga?

❌ No directamente en la GUI.

**Workaround:** Usar yt-dlp en terminal:
```bash
yt-dlp --limit-rate 1M [URL]
```

---

## 🔄 Actualizaciones

### ¿Cómo actualizo yt-dlp?

**Python:**
```bash
pip install --upgrade yt-dlp
```

**Binario:**
```bash
yt-dlp -U
```

**Linux (apt):**
```bash
sudo apt update && sudo apt upgrade yt-dlp
```

### ¿Cómo actualizo la aplicación GUI?

Descargar la última versión desde [Releases](https://github.com/alejandg1/ytdlp_gui/releases).

### ¿Cómo sé qué versión de yt-dlp tengo?

La aplicación muestra la versión al iniciar:
```
yt-dlp detectado: native: 2024.01.01
```

O en terminal:
```bash
yt-dlp --version
```

---

## 🐛 Soporte

### ¿Dónde reporto un bug?

[GitHub Issues](https://github.com/alejandg1/ytdlp_gui/issues)

Incluir:
- Sistema operativo
- Versión de yt-dlp
- URL del video (si es público)
- Mensaje de error completo

### ¿Puedo sugerir una característica?

✅ Sí, en [GitHub Issues](https://github.com/alejandg1/ytdlp_gui/issues) con la etiqueta "enhancement".

### ¿Hay documentación más detallada?

✅ Sí, ver:
- [Instalación](./instalacion.md)
- [Modo Simple](./modo-simple.md)
- [Modo Pro](./modo-pro.md)
- [Troubleshooting](./troubleshooting.md)
- [Parámetros yt-dlp](./parametros-ytdlp.md)

---

## 💡 Mejores Prácticas

### ¿Cuál es la mejor calidad para descargar?

**Para video:**
```
Modo Pro → Formato: bestvideo+bestaudio
```

**Para audio:**
```
Modo Simple → Preset: Audio
```

### ¿Cómo evito que me bloqueen?

Ver [Evitar Bloqueos](./anti-bloqueos.md).

Resumen:
1. Usar cookies de navegador
2. Activar Geo-Bypass
3. No hacer muchas descargas seguidas
4. Usar `--sleep-requests` en casos extremos

### ¿Qué formato de audio es mejor?

Depende del uso:

| Formato | Calidad | Compatibilidad | Tamaño |
|---------|---------|----------------|--------|
| **mp3** | Media   | ★★★★★          | Medio  |
| **m4a** | Alta    | ★★★★☆          | Medio  |
| **opus**| Máxima  | ★★★☆☆          | Pequeño|

**Recomendación:** `mp3` para máxima compatibilidad.

---

## 🔒 Legal

### ¿Es legal descargar videos de YouTube?

Depende de:
- **Términos de servicio** de cada plataforma
- **Legislación de tu país**
- **Uso** que le des al contenido

**Recomendación:**
- Solo descargar contenido propio
- O con permiso del creador
- Respetar derechos de autor

**Esta herramienta es solo para usos legítimos.**

---

## 📚 Recursos Externos

- **yt-dlp Documentación:** https://github.com/yt-dlp/yt-dlp
- **FFmpeg Documentación:** https://ffmpeg.org/documentation.html
- **Sitios Soportados:** https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md

---

**¿Tu pregunta no está aquí?** Consulta [Troubleshooting](./troubleshooting.md) o abre un [Issue](https://github.com/alejandg1/ytdlp_gui/issues).
