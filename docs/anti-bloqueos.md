# 🛡️ Cómo Evitar Bloqueos al Descargar Videos

## ⚠️ ¿Estás bloqueado AHORA?

### Mensaje: "Sign in to confirm you're not a bot"

**Soluciones INMEDIATAS:**

1. **Espera 24 horas** - El bloqueo suele ser temporal
2. **Cambia tu IP:**
   - Usa una VPN (ProtonVPN gratis, Mullvad, etc.)
   - Usa datos móviles en lugar de WiFi
   - Reinicia tu router (puede funcionar)
3. **Actualiza yt-dlp:**
   ```bash
   pip install -U yt-dlp
   ```
4. **Mientras esperas:** Descarga desde otros sitios (Vimeo, Dailymotion, etc.)

---

## ¿Por qué me bloquearon?

YouTube y otras plataformas pueden bloquear temporalmente tu IP si:
- Descargas muchos videos en poco tiempo
- Haces muchas peticiones rápidas
- Detectan un patrón "no humano" de descargas
- **Incluso con UN SOLO VIDEO** si ya te marcaron antes

## ✅ Soluciones Implementadas en la App

### 1. **Límite de Velocidad**
Reduce la velocidad de descarga para parecer más "humano":

- **Sin límite**: Descarga a máxima velocidad (⚠️ ALTO RIESGO)
- **5 MB/s**: Recomendado para uso normal
- **2 MB/s**: Más seguro, bueno para múltiples descargas
- **1 MB/s**: Muy seguro
- **500 KB/s**: Ultra conservador (⚠️ **NO GARANTIZA evitar bloqueo**)

**IMPORTANTE:** El límite de velocidad NO es suficiente si ya estás marcado. Necesitas cambiar IP.

**Cuándo usar:**
- Si descargas más de 5-10 videos seguidos
- Si ya te bloquearon antes
- Si quieres descargar una playlist completa

### 2. **Pausa entre Descargas**
Espera unos segundos entre cada video:

- **Sin pausa**: Descarga inmediatamente uno tras otro (mayor riesgo)
- **3 segundos**: Recomendado para playlists pequeñas (5-20 videos)
- **5 segundos**: Más seguro, para playlists medianas (20-50 videos)
- **10 segundos**: Muy seguro, para playlists grandes (50+ videos)
- **30 segundos**: Ultra conservador

**Cuándo usar:**
- Siempre que descargues más de 3-4 videos
- Especialmente con playlists completas
- Si ya te bloquearon recientemente

### 3. **Protecciones Automáticas** (Nuevo)
La app ahora incluye:
- ✅ User-Agent de navegador real actualizado
- ✅ Referer de YouTube
- ✅ Accept-Language headers
- ✅ Pausa de 1 segundo entre peticiones HTTP
- ✅ 3 reintentos automáticos si falla

## 📊 Configuraciones Recomendadas

### Para 1-5 videos:
```
Límite de velocidad: 5 MB/s (cambió, antes era "sin límite")
Pausa entre descargas: 3 segundos
```
**⚠️ Ya NO recomendamos "sin límite" - YouTube es más estricto ahora**

### Para 5-20 videos:
```
Límite de velocidad: 5 MB/s
Pausa entre descargas: 3 segundos
```

### Para 20-50 videos:
```
Límite de velocidad: 2 MB/s
Pausa entre descargas: 5 segundos
```

### Para 50+ videos (playlists grandes):
```
Límite de velocidad: 1 MB/s
Pausa entre descargas: 10 segundos
```

### Si ya te bloquearon:
```
Límite de velocidad: 500 KB/s
Pausa entre descargas: 30 segundos
Espera 24 horas antes de volver a descargar
```

## 🔧 Otras Medidas Anti-Bloqueo

### 1. Usar VPN
Si te bloquearon, cambia tu IP usando una VPN:
- ProtonVPN (gratis)
- Mullvad VPN
- NordVPN
- ExpressVPN

### 2. Cambiar de Red
- Usa datos móviles en lugar de WiFi
- Conecta a otra red WiFi
- Reinicia tu router para obtener nueva IP (puede no funcionar)

### 3. Cookies de Sesión (Avanzado)
Si tienes una cuenta de YouTube Premium o simplemente inicias sesión:

```bash
# En terminal, exportar cookies de tu navegador
yt-dlp --cookies-from-browser chrome URL
```

Esto puede ayudar a evitar límites, pero requiere configuración manual.

## ⏰ Si Ya Estás Bloqueado

### Bloqueo Temporal (más común):
- **Duración**: 1-24 horas
- **Solución**: Espera o cambia de IP

### Bloqueo Más Severo:
- **Duración**: 24-72 horas
- **Solución**: Cambia de IP con VPN, espera más tiempo

### Señales de Bloqueo:
- Error 429: "Too Many Requests"
- Error 403: "Forbidden"
- Videos que no se descargan sin mensaje claro
- Errores de "Sign in to confirm you're not a bot"

## 💡 Mejores Prácticas

1. **No descargues playlists completas de golpe**
   - Divide en lotes de 20-30 videos
   - Espera 1-2 horas entre lotes

2. **Descarga en horas valle**
   - Menos tráfico = menor probabilidad de detección
   - Madrugada o medianoche suele ser mejor

3. **Varía tus patrones**
   - No descargues siempre a la misma hora
   - No descargues siempre la misma cantidad
   - Haz pausas aleatorias

4. **Usa configuración conservadora por defecto**
   - Es mejor que tarde un poco más
   - Que perder acceso por 24 horas

## 🎯 Configuración Recomendada General (ACTUALIZADA 2026)

Para la mayoría de usuarios que quieren evitar problemas:

```
Calidad de Audio: Máxima Calidad
Subtítulos: Según necesites
Formato de Título: Fecha - Nombre Original
Límite de velocidad: 5 MB/s (SIEMPRE, incluso para 1 video)
Pausa entre descargas: 3 segundos
```

⚠️ **CAMBIO IMPORTANTE:** YouTube es más estricto ahora. SIEMPRE usa límite de velocidad.

## 🚨 ESTOY BLOQUEADO - ¿Qué hago AHORA?

### Paso 1: Confirma que estás bloqueado
Verás uno de estos mensajes:
- "Sign in to confirm you're not a bot"
- "ERROR: [youtube] ... Sign in to confirm"
- Error 403 o 429

### Paso 2: Soluciones INMEDIATAS

#### Opción 1: VPN (Más rápido)
```bash
# Instalar ProtonVPN (gratis)
# Windows: Descargar de protonvpn.com
# Linux:
sudo apt install protonvpn
protonvpn-cli connect --fastest

# Después de conectar, intenta de nuevo
```

#### Opción 2: Datos móviles
- Desactiva WiFi
- Usa hotspot de tu celular
- Descarga desde ahí

#### Opción 3: Esperar
- Bloqueo típico: 1-24 horas
- Bloqueo severo: 24-72 horas
- No intentes descargar mientras esperas (empeora el bloqueo)

### Paso 3: Actualiza yt-dlp
El bloqueo puede ser por versión antigua:
```bash
pip install -U yt-dlp
```

### Paso 4: Cuando vuelvas
Después de que se levante el bloqueo:

```
✅ USA SIEMPRE:
   - Límite: 2 MB/s o menos
   - Pausa: 5-10 segundos
   - Máximo 5 videos por sesión

❌ NO HAGAS:
   - Descargar inmediatamente después del bloqueo
   - Usar "sin límite"
   - Descargar playlists grandes
   - Usar la misma IP sin VPN
```

## 🛠️ Solución Avanzada: Cookies (Para bloqueos persistentes)

Si el bloqueo persiste incluso con VPN:

### 1. Exportar cookies de tu navegador

**Chrome/Edge:**
```bash
# Instalar extensión "Get cookies.txt LOCALLY"
# https://chrome.google.com/webstore/detail/get-cookiestxt-locally

# Ir a youtube.com logueado
# Click en la extensión → Export
# Guardar como youtube_cookies.txt
```

**Firefox:**
```bash
# Instalar extensión "cookies.txt"
# https://addons.mozilla.org/firefox/addon/cookies-txt/

# Ir a youtube.com logueado
# Click en la extensión → Export
# Guardar como youtube_cookies.txt
```

### 2. Usar cookies en yt-dlp (Terminal)
```bash
yt-dlp --cookies youtube_cookies.txt URL
```

**Nota:** Esta app NO soporta cookies automáticamente (por ahora).
Usa yt-dlp en terminal si necesitas esta funcionalidad.

## 🔍 ¿Por qué me bloquearon con UN solo video?

Posibles razones:
1. **Ya estabas marcado** - Descargaste mucho antes
2. **IP compartida** - Alguien más en tu red descargó mucho
3. **Sin User-Agent/Headers** - Versión antigua de la app
4. **Patrón sospechoso** - Descargaste, cerraste, volviste a descargar rápido

**Solución:** Cambia IP (VPN) y usa configuración conservadora.

## ⚠️ Nota Legal

Recuerda:
- Solo descarga contenido que tengas derecho a descargar
- Respeta los términos de servicio de las plataformas
- Usa estas herramientas de forma responsable
- El bloqueo puede ser permanente en casos de abuso extremo

---

**¿Dudas?** Consulta la documentación de yt-dlp: https://github.com/yt-dlp/yt-dlp
**¿Bloqueado persistente?** Usa VPN o espera 48-72 horas