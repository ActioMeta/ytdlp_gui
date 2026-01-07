# 📋 Opciones de yt-dlp: Disponibles vs Implementadas

## 🎯 Opciones Actualmente Implementadas en la App

### ✅ Configurables por el Usuario

| Opción | Parámetro yt-dlp | Descripción | Valores |
|--------|------------------|-------------|---------|
| **Calidad de Audio** | `--audio-quality` | Calidad del audio extraído | 0 (mejor) a 5 (peor) |
| **Subtítulos** | `--write-subs` | Descargar subtítulos | On/Off |
| **Idioma Subtítulos** | `--sub-lang` | Idioma de subtítulos | es, en, fr, de |
| **Formato Título** | `-o` (template) | Cómo nombrar archivos | Fecha-Nombre / Solo Nombre |
| **Carpeta Descarga** | `-o` (path) | Dónde guardar videos | Ruta seleccionada |
| **Límite Velocidad** | `--limit-rate` | Máxima velocidad de descarga | unlimited, 5M, 2M, 1M, 500K |
| **Pausa entre Videos** | `--sleep-interval` | Segundos entre descargas | 0, 3, 5, 10, 30 |

### ✅ Automáticas (Sin configuración del usuario)

| Opción | Parámetro | Por qué la usamos |
|--------|-----------|-------------------|
| **Formato Video** | `-f bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best` | Mejor calidad en MP4 |
| **No Descripción** | `--no-write-description` | Evitar archivos extra |
| **No Metadata JSON** | `--no-write-info-json` | Evitar archivos extra |
| **No Thumbnails** | `--no-write-thumbnail` | Evitar archivos extra |
| **No Comentarios** | `--no-write-comments` | Evitar archivos extra |
| **No Auto-Subs** | `--no-write-auto-subs` | Solo subtítulos reales |
| **Embed Subs** | `--embed-subs` | Subtítulos dentro del MP4 |
| **No Playlist** | `--no-playlist` | Solo el video, no la playlist |
| **Sleep Requests** | `--sleep-requests 1` | Pausa entre peticiones HTTP |
| **Reintentos** | `--extractor-retries 3` | Reintentar si falla |
| **Referer** | `--referer https://www.youtube.com/` | Simular navegador |
| **Accept-Language** | `--add-header Accept-Language:en-US,en;q=0.9` | Header realista |
| **User-Agent** | `--user-agent "Chrome/131..."` | Simular navegador real |

---

## 📚 Opciones DISPONIBLES en yt-dlp (No implementadas)

### 🎥 Formatos y Calidad

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `-f FORMAT` | Elegir formato específico | `-f 137+140` (720p+audio) |
| `--format-sort` | Ordenar formatos por preferencia | `--format-sort res,fps` |
| `-S SORT` | Ordenar por varios criterios | `-S +size,+br,+res` |
| `--merge-output-format` | Formato final después de merge | `--merge-output-format mp4` |
| `--remux-video` | Convertir a otro contenedor | `--remux-video mkv` |
| `--recode-video` | Recodificar video | `--recode-video mp4` |
| `--video-quality` | Calidad de video (altura) | `--video-quality 1080` |
| `-x, --extract-audio` | Solo extraer audio | `-x --audio-format mp3` |
| `--audio-format` | Formato de audio | `mp3, aac, m4a, opus, vorbis, flac, alac, wav` |
| `--audio-multistreams` | Múltiples pistas de audio | Para videos con varios idiomas |

### 📥 Descarga y Red

| Opción | Descripción | Útil para |
|--------|-------------|-----------|
| `--concurrent-fragments N` | Fragmentos en paralelo | Acelerar descargas |
| `-N, --concurrent N` | Descargas simultáneas | Múltiples videos a la vez |
| `--throttled-rate` | Velocidad mínima aceptable | Auto-reintentar si es lenta |
| `--retries N` | Reintentos de descarga | Por defecto 10 |
| `--file-access-retries N` | Reintentos acceso archivo | Problemas de disco |
| `--fragment-retries N` | Reintentos fragmentos | Videos largos |
| `--retry-sleep EXPR` | Tiempo entre reintentos | Progresivo |
| `--proxy URL` | Usar proxy | Evitar restricciones geográficas |
| `--socket-timeout` | Timeout de conexión | Redes lentas |
| `--source-address IP` | IP de origen específica | Multi-interfaz |

### 🌍 Geolocalización y Bypass

| Opción | Descripción | Útil para |
|--------|-------------|-----------|
| `--geo-bypass` | Intentar bypass geo-restricción | Videos bloqueados por región |
| `--geo-bypass-country CODE` | Fingir país específico | `--geo-bypass-country US` |
| `--geo-verification-proxy URL` | Proxy para verificación | Combinado con bypass |

### 🔐 Autenticación

| Opción | Descripción | Útil para |
|--------|-------------|-----------|
| `-u, --username` | Usuario | Sitios con login |
| `-p, --password` | Contraseña | Sitios con login |
| `-2, --twofactor` | Código 2FA | Cuentas protegidas |
| `--netrc` | Usar archivo .netrc | Credenciales guardadas |
| `--video-password` | Password de video | Videos protegidos |
| `--cookies FILE` | Archivo de cookies | **⭐ Evitar bloqueos** |
| `--cookies-from-browser` | Exportar cookies navegador | **⭐ Muy útil** |

### 📝 Metadata y Archivos Extra

| Opción | Descripción | Contrario en app |
|--------|-------------|------------------|
| `--write-description` | Guardar descripción | ✅ --no-write-description |
| `--write-info-json` | Guardar metadata JSON | ✅ --no-write-info-json |
| `--write-thumbnail` | Guardar miniatura | ✅ --no-write-thumbnail |
| `--write-comments` | Guardar comentarios | ✅ --no-write-comments |
| `--embed-thumbnail` | Incrustar thumbnail en video | Opcional |
| `--embed-metadata` | Incrustar metadata en video | Títulos, artistas, etc. |
| `--embed-chapters` | Incrustar capítulos | Para videos largos |
| `--add-metadata` | Añadir tags al archivo | Similar a embed |

### 📜 Subtítulos Avanzados

| Opción | Descripción | Estado en app |
|--------|-------------|---------------|
| `--write-subs` | Descargar subtítulos | ✅ Implementado |
| `--write-auto-subs` | Subtítulos auto-generados | ❌ Desactivado |
| `--all-subs` | Todos los idiomas | ❌ No (solo 1 idioma) |
| `--sub-langs LANGS` | Idiomas específicos | ✅ Implementado |
| `--embed-subs` | Incrustar en video | ✅ Implementado |
| `--convert-subs FORMAT` | Convertir formato subs | srt, vtt, ass |
| `--sub-format FORMAT` | Formato preferido | best, srt, vtt, etc. |

### 📂 Naming y Organización

| Opción | Descripción | Estado en app |
|--------|-------------|---------------|
| `-o TEMPLATE` | Template de nombre | ✅ Implementado (parcial) |
| `--output-na-placeholder` | Placeholder si dato no existe | Por defecto "NA" |
| `--restrict-filenames` | Nombres compatibles | ASCII solo |
| `--windows-filenames` | Compatible Windows | Incluso en Linux |
| `--trim-filenames LENGTH` | Limitar longitud nombre | Evitar errores SO |

**Templates disponibles:**
```
%(title)s           - Título del video
%(uploader)s        - Nombre del canal
%(upload_date)s     - Fecha YYYYMMDD
%(upload_date>%Y-%m-%d)s  - Fecha formateada (✅ usamos esto)
%(duration)s        - Duración en segundos
%(view_count)s      - Número de vistas
%(like_count)s      - Número de likes
%(channel)s         - Nombre del canal
%(channel_id)s      - ID del canal
%(id)s              - ID del video
%(playlist)s        - Nombre de playlist
%(playlist_index)s  - Posición en playlist
%(resolution)s      - Resolución (1080p, 720p...)
%(fps)s             - Frames por segundo
%(ext)s             - Extensión (✅ usamos esto)
```

### 📋 Playlists

| Opción | Descripción | Estado en app |
|--------|-------------|---------------|
| `--yes-playlist` | Descargar toda la playlist | ❌ No (opuesto) |
| `--no-playlist` | Solo el video | ✅ Implementado |
| `--playlist-start N` | Empezar desde video N | ❌ No |
| `--playlist-end N` | Terminar en video N | ❌ No |
| `--playlist-items RANGE` | Videos específicos | `1,2,5-8` |
| `--playlist-reverse` | Orden inverso | Más nuevo primero |
| `--playlist-random` | Orden aleatorio | ❌ No |
| `--lazy-playlist` | No cargar toda la playlist | Más rápido |
| `--no-flat-playlist` | Información completa | Por defecto |

### 🎬 Post-Procesamiento

| Opción | Descripción | Requiere |
|--------|-------------|----------|
| `--extract-audio` | Extraer solo audio | FFmpeg |
| `--audio-format FORMAT` | Formato de audio | mp3, aac, etc. |
| `--audio-quality QUALITY` | Calidad audio | ✅ Implementado |
| `--recode-video FORMAT` | Convertir video | FFmpeg |
| `--postprocessor-args ARGS` | Args para FFmpeg | Avanzado |
| `--exec CMD` | Ejecutar comando después | Scripts custom |
| `--exec-before-download CMD` | Ejecutar antes | Scripts custom |
| `--convert-subs FORMAT` | Convertir subtítulos | srt, ass, etc. |
| `--convert-thumbnails FORMAT` | Convertir miniaturas | jpg, png, webp |
| `--split-chapters` | Dividir por capítulos | Videos largos |
| `--remove-chapters REGEX` | Eliminar capítulos | Intro/outro |
| `--sponsorblock-mark` | Marcar segmentos | SponsorBlock |
| `--sponsorblock-remove` | Remover segmentos | **⭐ Útil** |

### 🔍 Filtros y Selección

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `--match-filter` | Filtrar videos | `--match-filter "duration < 600"` |
| `--match-filters FILTERS` | Múltiples filtros | Complejo |
| `--break-match-filter` | Parar si no coincide | Para playlists |
| `--no-break-match-filter` | Continuar siempre | Por defecto |
| `--date DATE` | Videos de fecha específica | YYYYMMDD |
| `--datebefore DATE` | Antes de fecha | YYYYMMDD |
| `--dateafter DATE` | Después de fecha | YYYYMMDD |
| `--min-filesize SIZE` | Tamaño mínimo | `50M` |
| `--max-filesize SIZE` | Tamaño máximo | `100M` |
| `--min-views N` | Vistas mínimas | Filtrar videos |
| `--max-views N` | Vistas máximas | Filtrar videos |

### 🎭 Simulación y Headers

| Opción | Descripción | Estado en app |
|--------|-------------|---------------|
| `--user-agent UA` | User-Agent custom | ✅ Implementado |
| `--referer URL` | Referer header | ✅ Implementado |
| `--add-header FIELD:VALUE` | Header personalizado | ✅ Implementado (Accept-Language) |
| `--sleep-interval SECONDS` | Pausa entre descargas | ✅ Implementado |
| `--max-sleep-interval SECONDS` | Pausa máxima aleatoria | ❌ No |
| `--sleep-requests SECONDS` | Pausa entre requests | ✅ Implementado (1 seg) |
| `--sleep-subtitles SECONDS` | Pausa antes de subs | ❌ No |

### 📊 Información y Listado

| Opción | Descripción | Uso |
|--------|-------------|-----|
| `--list-formats` | Listar formatos disponibles | Ver opciones |
| `--list-subs` | Listar subtítulos | Ver idiomas |
| `--dump-json` | Mostrar metadata JSON | Debugging |
| `--print TEMPLATE` | Imprimir info custom | `--print "%(title)s"` |
| `--print-to-file TEMPLATE FILE` | Guardar info en archivo | Logs |
| `--get-title` | Solo obtener título | Sin descargar |
| `--get-id` | Solo obtener ID | Sin descargar |
| `--get-url` | Solo obtener URL directa | Sin descargar |
| `--get-description` | Solo descripción | Sin descargar |
| `--get-duration` | Solo duración | Sin descargar |
| `--get-filename` | Ver nombre que tendría | Sin descargar |
| `--get-format` | Ver formato que usaría | Sin descargar |
| `--get-thumbnail` | Solo URL thumbnail | Sin descargar |

### ⚙️ Configuración

| Opción | Descripción | Ubicación |
|--------|-------------|-----------|
| `--config-location PATH` | Archivo de config | `~/.config/yt-dlp/config` |
| `--ignore-config` | Ignorar config | Temporal |
| `--config-locations PATHS` | Múltiples configs | Avanzado |
| `--flat-playlist` | No extraer info videos | Más rápido |

### 🐛 Debugging

| Opción | Descripción | Útil para |
|--------|-------------|-----------|
| `-v, --verbose` | Modo verbose | Ver todo |
| `--print-traffic` | Ver tráfico HTTP | Debugging |
| `--dump-pages` | Guardar páginas HTML | Debugging extractors |
| `--write-pages` | Similar a dump-pages | Debugging |

---

## 🎯 Opciones RECOMENDADAS para Añadir a la App

### Alta Prioridad ⭐⭐⭐

| Opción | Por qué | Beneficio |
|--------|---------|-----------|
| `--cookies-from-browser` | **Evitar bloqueos** | Usar sesión del navegador |
| `--sponsorblock-remove` | Quitar anuncios integrados | Mejor experiencia |
| `--embed-metadata` | Metadata en el archivo | Organización |
| `--embed-chapters` | Capítulos en videos largos | Navegación |
| `--playlist-items RANGE` | Seleccionar videos específicos | Control playlists |
| `-x --extract-audio` | Solo audio (música) | Podcasts, música |

### Media Prioridad ⭐⭐

| Opción | Por qué | Beneficio |
|--------|---------|-----------|
| `--geo-bypass` | Videos bloqueados por región | Más contenido |
| `--proxy URL` | Usar proxy/VPN | Privacidad |
| `--max-filesize` | Limitar tamaño | Ahorro de espacio |
| `--match-filter` | Filtrar por duración/vistas | Control |
| `--all-subs` | Todos los idiomas de subs | Aprendizaje |
| `--convert-subs srt` | Formato universal | Compatibilidad |

### Baja Prioridad ⭐

| Opción | Por qué | Beneficio |
|--------|---------|-----------|
| `--write-thumbnail` | Guardar miniatura separada | Organización |
| `--embed-thumbnail` | Miniatura en archivo | Visualización |
| `--recode-video` | Convertir formato | Compatibilidad |
| `--list-formats` antes | Ver opciones | Información |

---

## 📊 Resumen de Uso Actual

### Implementadas: **13 opciones** (7 configurables + 6 automáticas)

**Configurables por usuario:**
1. Audio quality
2. Subtítulos On/Off
3. Idioma subtítulos
4. Formato título
5. Carpeta descarga
6. Límite velocidad
7. Pausa entre videos

**Automáticas (protección):**
1. Formato video (MP4)
2. No archivos extra
3. Sleep entre requests
4. Reintentos
5. Headers realistas
6. No playlists automáticas

### Disponibles en yt-dlp: **200+ opciones**

### Porcentaje usado: **~6.5%**

---

## 💡 Conclusión

La app actual usa las opciones **esenciales y críticas** para:
- ✅ Evitar bloqueos (protecciones automáticas)
- ✅ Descargas limpias (solo video+audio)
- ✅ Configuración básica (calidad, subtítulos, naming)

Para hacerla más completa, se podrían añadir:
1. **Cookies del navegador** (anti-bloqueo definitivo)
2. **SponsorBlock** (quitar anuncios integrados)
3. **Solo audio** (para música/podcasts)
4. **Playlists parciales** (selección de videos)
5. **Metadata embebida** (mejor organización)
