# 🎨 Nueva Interfaz Dual: Modo Simple vs Modo Pro

## 📋 Resumen

La aplicación ahora cuenta con **dos modos de operación**:
- **Modo Simple**: Para usuarios sin conocimientos técnicos, con presets automatizados
- **Modo Pro**: Para usuarios avanzados, con control total de parámetros

---

## 🟢 Modo Simple

### Características

El modo simple está diseñado para usuarios que solo quieren descargar contenido sin complicaciones.

### Presets Disponibles

#### 1. 📹 Video
**Configuración automática:**
- Formato: Video MP4
- Subtítulos: Activados (Español)
- SponsorBlock: Activado (sin anuncios integrados)
- Metadata: Incluida
- Cookies: Chrome (para evitar bloqueos)

**Ideal para:**
- Videos de YouTube para ver offline
- Tutoriales con subtítulos
- Contenido sin anuncios

#### 2. 🎵 Audio/Música
**Configuración automática:**
- Formato: Solo audio MP3
- Calidad: Máxima (0)
- Metadata: Incluida
- Thumbnail: Incluido como carátula

**Ideal para:**
- Música
- Álbumes completos
- Bandas sonoras

#### 3. 🎙️ Podcast
**Configuración automática:**
- Formato: Solo audio MP3
- Calidad: Media (5) - menor tamaño
- SponsorBlock: Activado
- Límite tamaño: 500MB

**Ideal para:**
- Podcasts largos
- Entrevistas
- Charlas

### Flujo de Uso

1. Clic en el tipo de contenido que deseas
2. Pega las URLs (una por línea)
3. Selecciona carpeta de descarga
4. Presiona "Iniciar Descarga"

**¡Eso es todo!** La aplicación maneja el resto automáticamente.

---

## 🔵 Modo Pro

### Características

Control total sobre cada aspecto de la descarga para usuarios avanzados.

### Secciones de Configuración

#### 1. Configuración General

| Parámetro | Opciones | Descripción |
|-----------|----------|-------------|
| **Formato** | Video / Solo Audio | Tipo de contenido a descargar |
| **Formato Audio** | MP3, M4A, OPUS, FLAC, WAV | Formato de audio (si se extrae) |
| **Calidad Audio** | 0-9 | 0 = mejor calidad, 9 = menor tamaño |
| **Formato Título** | Fecha-Nombre / Solo Nombre | Cómo nombrar archivos |
| **Límite Velocidad** | Unlimited - 500K | Control de bandwidth |
| **Pausa entre Videos** | 0-30 segundos | Evitar rate limiting |
| **Tamaño Máximo** | 100MB - 2GB | Rechazar archivos grandes |
| **Cookies Navegador** | Chrome, Firefox, Edge, Brave, Opera, Safari | Usar sesión del navegador |

#### 2. Subtítulos

- ☑️ Descargar Subtítulos
- ☑️ Todos los idiomas (o seleccionar uno específico)
- Idiomas: Español, Inglés, Francés, Alemán, Portugués, Italiano

#### 3. Opciones Avanzadas

| Opción | Descripción | Beneficio |
|--------|-------------|-----------|
| **SponsorBlock** | Remover segmentos patrocinados | Videos sin anuncios integrados |
| **Geo-bypass** | Bypass restricciones geográficas | Acceder a contenido bloqueado por región |
| **Embed Metadata** | Incluir metadata en archivo | Título, artista, año en propiedades |
| **Embed Thumbnail** | Incluir miniatura en archivo | Carátula visible en reproductores |
| **Forzar Python** | Usar `python -m yt_dlp` | Si falla instalación nativa |
| **Playlist** | Single / All / 1-5 / 1-10 | Control sobre playlists |

---

## 🆕 Nuevas Funcionalidades Implementadas

### 1. Cookies del Navegador (`--cookies-from-browser`)
**⭐ CRÍTICO para evitar bloqueos**

```
Configuración: Modo Pro > Configuración General > Cookies Navegador
```

**Cómo funciona:**
- Extrae las cookies de tu sesión del navegador
- YouTube piensa que eres tú navegando normalmente
- **Reduce drásticamente los bloqueos por IP**

**Navegadores soportados:**
- Chrome / Chromium
- Firefox
- Edge
- Brave
- Opera
- Safari (macOS)

**Requisitos:**
- Debes estar **logueado en YouTube** en ese navegador
- El navegador debe estar **cerrado** durante la descarga (en algunos casos)

**Recomendación:**
✅ Siempre usar Chrome o Firefox para máxima compatibilidad

---

### 2. SponsorBlock (`--sponsorblock-remove`)
**⭐ Quita anuncios integrados automáticamente**

```
Configuración: Modo Pro > Opciones Avanzadas > Remover anuncios integrados
```

**Qué remueve:**
- Segmentos patrocinados (ads del creador)
- Intros largas
- Outros/despedidas
- Auto-promociones
- Segmentos de interacción ("dale like y suscríbete")

**Cómo funciona:**
- Usa la base de datos comunitaria de SponsorBlock
- Miles de usuarios marcan estos segmentos
- Se cortan automáticamente del video

**Resultado:**
Videos más cortos y directos al contenido.

---

### 3. Extracción de Audio (`-x --audio-format`)
**⭐ Descargar solo audio en múltiples formatos**

```
Configuración: Modo Pro > Configuración General > Formato = Solo Audio
```

**Formatos disponibles:**
- **MP3**: Universal, compatible con todo (recomendado)
- **M4A**: Alta calidad, menor tamaño que MP3
- **OPUS**: Mejor compresión, calidad excelente
- **FLAC**: Sin pérdida, archivos grandes
- **WAV**: Sin compresión, archivos muy grandes

**Ventajas:**
- Archivos 10-20x más pequeños que video
- Ideal para música, podcasts, audiolibros
- Puede incluir carátula (thumbnail)

---

### 4. Geo-bypass (`--geo-bypass`)
**⭐ Acceder a contenido bloqueado por región**

```
Configuración: Modo Pro > Opciones Avanzadas > Bypass restricción geográfica
```

**Qué hace:**
- Intenta saltarse restricciones geográficas
- Funciona para muchos sitios (no solo YouTube)

**Limitaciones:**
- No funciona al 100% (algunos bloqueos son muy estrictos)
- Combinalo con VPN para mejores resultados

---

### 5. Límite de Tamaño (`--max-filesize`)
**⭐ Rechazar archivos demasiado grandes**

```
Configuración: Modo Pro > Configuración General > Tamaño Máximo
```

**Opciones:**
- 100MB, 500MB, 1GB, 2GB

**Casos de uso:**
- Dispositivos con poco espacio
- Evitar descargas accidentales de videos 4K/8K
- Filtrar contenido en playlists

---

### 6. Soporte Python Mejorado
**⭐ Detección automática de `python -m yt_dlp`**

La aplicación ahora detecta automáticamente si yt-dlp está instalado vía:
- ✅ Binario nativo (`yt-dlp` / `yt-dlp.exe`)
- ✅ Python module (`python -m yt_dlp`)
- ✅ Python3 (Linux/Mac) (`python3 -m yt_dlp`)

**Auto-configuración:**
Al iniciar, la app verifica y configura automáticamente el método correcto.

**Control manual:**
```
Modo Pro > Opciones Avanzadas > Forzar uso de Python
```

---

### 7. Embed Metadata y Thumbnail
**⭐ Archivos con información completa**

**Embed Metadata:**
- Título del video
- Artista/Canal
- Fecha de subida
- Descripción
- Capítulos (si existen)

**Embed Thumbnail:**
- Miniatura del video como carátula
- Visible en reproductores de música
- Perfecta para MP3 de música

**Resultado:**
Archivos multimedia profesionales con toda la información.

---

### 8. Control de Playlists
**⭐ Descarga selectiva de playlists**

```
Configuración: Modo Pro > Opciones Avanzadas > Playlist
```

**Opciones:**
- **Solo video individual**: Ignora playlists (por defecto, seguro)
- **Toda la playlist**: Descarga todos los videos
- **Primeros 5 videos**: Descarga 1-5
- **Primeros 10 videos**: Descarga 1-10

**Uso avanzado:**
Puedes personalizar editando `playlist_items` en el código:
- `1-20`: Videos 1 al 20
- `5,10,15`: Videos 5, 10 y 15
- `::2`: Cada 2 videos

---

## 🎯 Casos de Uso Recomendados

### Caso 1: Usuario Básico (Descargar Videos)
**Modo:** Simple  
**Preset:** Video  
**Pasos:**
1. Clic en "Video"
2. Pegar URLs
3. Seleccionar carpeta
4. Descargar

### Caso 2: Descargar Música
**Modo:** Simple  
**Preset:** Audio/Música  
**Resultado:** MP3 con carátula y metadata

### Caso 3: Descargar Curso Completo
**Modo:** Pro  
**Configuración:**
- Subtítulos: ✅ (tu idioma)
- SponsorBlock: ✅
- Cookies: Chrome
- Pausa: 5 segundos
- Playlist: Toda la playlist

### Caso 4: Evitar Bloqueos (Crucial)
**Modo:** Pro  
**Configuración obligatoria:**
- Cookies Navegador: Chrome ⭐
- Rate Limit: 5MB/s ⭐
- Pausa: 3-5 segundos ⭐
- SponsorBlock: ✅ (opcional)

### Caso 5: Contenido Bloqueado Regionalmente
**Modo:** Pro  
**Configuración:**
- Geo-bypass: ✅
- Cookies: Firefox/Chrome
- VPN: Recomendado activar antes

---

## 💡 Mejores Prácticas

### Para Evitar Bloqueos
1. ✅ **SIEMPRE** usar Cookies del navegador
2. ✅ Limitar velocidad a 5MB/s o menos
3. ✅ Pausa de al menos 3 segundos
4. ✅ No descargar más de 20 videos seguidos
5. ✅ Estar logueado en YouTube en el navegador

### Para Mejor Calidad
1. ✅ Audio: Formato OPUS o FLAC
2. ✅ Video: Dejar formato por defecto (MP4)
3. ✅ Calidad Audio: 0 (mejor)
4. ✅ Embed metadata y thumbnail

### Para Ahorrar Espacio
1. ✅ Usar extracción de audio
2. ✅ Formato MP3 o OPUS
3. ✅ Calidad Audio: 5
4. ✅ Límite de tamaño: 500MB
5. ✅ SponsorBlock (videos más cortos)

---

## 🔧 Troubleshooting

### Problema: "Cookies extraction failed"
**Solución:**
1. Cierra completamente el navegador
2. Selecciona otro navegador en la lista
3. Asegúrate de estar logueado en YouTube

### Problema: "SponsorBlock no funciona"
**Causa:** El video no tiene segmentos marcados en la base de datos  
**Solución:** Normal, no todos los videos tienen marcas

### Problema: Geo-bypass no funciona
**Solución:**
1. Activa VPN a otro país
2. Usa cookies del navegador
3. Algunos contenidos no se pueden saltear

### Problema: Audio extraído sin thumbnail
**Solución:**
Activa "Embed Thumbnail" en Modo Pro

---

## 📊 Comparación: Simple vs Pro

| Aspecto | Modo Simple | Modo Pro |
|---------|-------------|----------|
| **Dificultad** | ⭐ Muy fácil | ⭐⭐⭐ Requiere conocimiento |
| **Control** | ❌ Ninguno | ✅ Total |
| **Velocidad uso** | ⚡ Rápido | 🐌 Más lento |
| **Personalización** | ❌ Presets fijos | ✅ Todo configurable |
| **Casos de uso** | Videos individuales | Proyectos complejos |
| **Ideal para** | Usuarios novatos | Usuarios avanzados |
| **Opciones visibles** | 3 | 20+ |

---

## 🚀 Mejoras Futuras Sugeridas

### Alta Prioridad
- [ ] Historial de descargas con búsqueda
- [ ] Exportar/Importar configuraciones
- [ ] Vista previa de video antes de descargar
- [ ] Progreso de descarga con porcentaje
- [ ] Cola de descargas persistente

### Media Prioridad
- [ ] Temas de color (oscuro/claro/auto)
- [ ] Plantillas personalizadas de nombres
- [ ] Búsqueda integrada de YouTube
- [ ] Descarga de listas de reproducción completas con filtros
- [ ] Conversión de formatos post-descarga

### Baja Prioridad
- [ ] Scheduler (programar descargas)
- [ ] Integración con servicios en la nube
- [ ] Estadísticas de descargas
- [ ] Extensión de navegador

---

## 📝 Notas Finales

### Sobre los Modos

**Modo Simple:**
- No necesitas saber nada de yt-dlp
- Configuración "una decisión y listo"
- Perfecto para el 80% de casos

**Modo Pro:**
- Exposición a todas las opciones
- Requiere entender qué hace cada parámetro
- Poder total sobre la descarga

### Recomendación General

**Si eres nuevo:** Usa Modo Simple  
**Si tienes experiencia:** Usa Modo Pro  
**Si tienes problemas:** Cambia a Modo Pro y activa Cookies

---

## 🔗 Referencias

- [Documentación yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [SponsorBlock](https://sponsor.ajay.app/)
- [Guía de opciones completa](./OPCIONES_YTDLP.md)
- [Guía anti-bloqueos](./EVITAR_BLOQUEOS.md)
