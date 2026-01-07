# 🪟 Configuración para Windows

## 📋 Requisitos para USAR la aplicación

### ⚠️ Solo necesitas yt-dlp instalado

**Si solo quieres USAR la aplicación compilada, solo necesitas:**

### Instalar yt-dlp

**Opción A: Con Python (Recomendado)**
```powershell
# Instalar Python desde https://www.python.org/
# Luego instalar yt-dlp:
pip install yt-dlp
```

**Opción B: Ejecutable directo**
```powershell
# Descargar yt-dlp.exe desde:
https://github.com/yt-dlp/yt-dlp/releases/latest

# Colocar yt-dlp.exe en una carpeta en el PATH, por ejemplo:
# C:\Windows\System32\
# o agregar la carpeta donde lo descargaste al PATH
```

**Opción C: Con winget**
```powershell
winget install yt-dlp.yt-dlp
```

---

## 🛠️ Requisitos para COMPILAR la aplicación

### ⚠️ Solo necesario si quieres modificar o compilar el código

### 1. Instalar Node.js y npm
Descarga e instala desde: https://nodejs.org/
- Versión recomendada: LTS (Long Term Support)

### 2. Instalar Rust
```powershell
# Descarga e instala desde:
https://rustup.rs/

# O usando winget:
winget install Rustlang.Rustup
```

### 4. Instalar dependencias de Tauri para Windows

**WebView2 (Requerido)**
- Ya viene preinstalado en Windows 11
- Para Windows 10, descarga desde: https://developer.microsoft.com/microsoft-edge/webview2/

**Visual Studio Build Tools (Requerido para compilar)**
```powershell
# Descargar e instalar Visual Studio Build Tools:
https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# Durante la instalación, seleccionar:
# - "Desktop development with C++"
# - Windows 10 SDK
```

## 🚀 Instalación y Ejecución

### 1. Clonar o descargar el proyecto
```powershell
cd C:\Users\TuUsuario\Documentos\
# (navegar a la carpeta del proyecto)
```

### 2. Instalar dependencias
```powershell
npm install
```

### 3. Ejecutar en modo desarrollo
```powershell
npm run tauri dev
```

### 4. Compilar para producción
```powershell
npm run tauri build
```

El ejecutable se generará en:
```
src-tauri\target\release\ytdlp_gui.exe
```

## 📦 Crear Instalador (Opcional)

El comando `npm run tauri build` también generará un instalador MSI en:
```
src-tauri\target\release\bundle\msi\
```

## 🔧 Solución de Problemas en Windows

### Error: "yt-dlp no está instalado"

**Verificar instalación:**
```powershell
where yt-dlp
# o
python -m yt_dlp --version
```

**Si instalaste con Python pero no funciona:**
- La aplicación intentará automáticamente usar `python -m yt_dlp` como alternativa
- Asegúrate de que Python esté en el PATH

### Error de compilación: "link.exe not found"

**Solución:**
Instalar Visual Studio Build Tools con "Desktop development with C++"

### Error: "WebView2 no encontrado"

**Solución:**
Descargar e instalar WebView2 Runtime:
https://developer.microsoft.com/microsoft-edge/webview2/

### Error: "npm no se reconoce como comando"

**Solución:**
Reiniciar PowerShell/CMD después de instalar Node.js o agregar Node.js al PATH manualmente:
```
C:\Program Files\nodejs\
```

### Antivirus bloquea la aplicación

**Solución:**
- Agregar excepciones para la carpeta del proyecto
- Algunos antivirus marcan aplicaciones Rust como sospechosas (falso positivo)

## 📝 Notas Específicas de Windows

1. **Rutas de archivo:**
   - Puedes usar barras normales (/) o backslashes (\\) en las rutas
   - La aplicación las normaliza automáticamente

2. **Permisos:**
   - Asegúrate de tener permisos de escritura en la carpeta de destino
   - Evita carpetas del sistema (C:\Windows, C:\Program Files)

3. **Formato de nombres:**
   - Windows tiene restricciones en caracteres especiales en nombres de archivo
   - yt-dlp los reemplaza automáticamente

4. **Firewall:**
   - Es posible que Windows Firewall pida permiso la primera vez
   - Permitir el acceso para que yt-dlp pueda descargar

## 🎨 Interfaz

La aplicación se ve igual en Windows que en Linux/macOS:
- Tema oscuro moderno
- Totalmente funcional
- Sin diferencias visuales

## 📂 Ubicaciones Recomendadas para Descargas

```
C:\Users\TuUsuario\Videos\YouTube\
C:\Users\TuUsuario\Downloads\
D:\Videos\
```

---

## 🚀 Distribución para Usuarios Finales

### ✅ Lo que los usuarios NECESITAN:

**Solo yt-dlp** - Eso es todo!
- Instalar con `pip install yt-dlp` o descargar el .exe
- WebView2 (ya incluido en Windows 11, auto-instalable en Windows 10)

### ❌ Lo que los usuarios NO necesitan:

- ❌ Node.js
- ❌ npm
- ❌ Rust
- ❌ Visual Studio Build Tools
- ❌ Compilar nada

### 📦 Cómo distribuir tu aplicación:

#### Opción 1: Ejecutable Portable (.exe)
```
src-tauri\target\release\ytdlp_gui.exe
```
- **Ventajas:** Simple, un solo archivo
- **Desventajas:** Usuario debe tener yt-dlp instalado
- **Peso:** ~10-15 MB
- **Instrucciones para el usuario:**
  1. Instalar yt-dlp: `pip install yt-dlp`
  2. Ejecutar ytdlp_gui.exe
  3. ¡Listo!

#### Opción 2: Instalador MSI
```
src-tauri\target\release\bundle\msi\ytdlp_gui_0.1.0_x64.msi
```
- **Ventajas:** Instalación profesional, aparece en Programas
- **Desventajas:** Usuario aún necesita yt-dlp
- **Peso:** ~10-15 MB
- **Instalación:** Doble clic → Siguiente → Instalar

#### Opción 3: NSIS Installer
```
src-tauri\target\release\bundle\nsis\
```
- **Ventajas:** Más personalizable, puede incluir scripts
- **Desventajas:** Más complejo de configurar

### 💡 Recomendación para Distribución:

**Para usuarios técnicos:**
- Distribuir el .exe portable
- Incluir un README.txt con instrucciones de yt-dlp

**Para usuarios no técnicos:**
- Crear un instalador MSI
- Incluir instrucciones claras de instalación de yt-dlp
- Considerar crear un .bat de instalación:

```batch
@echo off
echo Instalando yt-dlp...
pip install yt-dlp
echo.
echo ¡Instalacion completa!
pause
```

## 📂 Ubicaciones Recomendadas para Descargas (repetido, eliminar duplicado arriba)

```
C:\Users\TuUsuario\Videos\YouTube\
C:\Users\TuUsuario\Downloads\
D:\Videos\
```

## 🚀 Distribución

Para distribuir la aplicación:

1. **Ejecutable portable:**
   ```
   src-tauri\target\release\ytdlp_gui.exe
   ```
   Requiere que el usuario tenga yt-dlp instalado

2. **Instalador MSI:**
   ```
   src-tauri\target\release\bundle\msi\ytdlp_gui_0.1.0_x64.msi
   ```
   Instalador profesional para Windows

3. **NSIS Installer:**
   Más personalizable, se genera automáticamente en:
   ```
   src-tauri\target\release\bundle\nsis\
   ```

## 💡 Consejos

- **Rendimiento:** La primera compilación puede tardar 10-15 minutos
- **Tamaño:** El ejecutable final es ~10-15 MB
- **Actualización yt-dlp:** Ejecutar `pip install -U yt-dlp` regularmente
- **FFmpeg:** Si quieres convertir formatos, instala FFmpeg y agrégalo al PATH
