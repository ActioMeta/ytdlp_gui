#  Guía de Onboarding - yt-dlp GUI

**Bienvenido/a al equipo de desarrollo de yt-dlp GUI!**

Esta guía te ayudará a configurar tu entorno y empezar a contribuir rápidamente.

---

##  Paso 1: Entender el Proyecto

### ¿Qué es yt-dlp GUI?

Es una **aplicación de escritorio multiplataforma** que permite descargar videos de YouTube y +1000 sitios web usando yt-dlp, pero con una interfaz gráfica amigable.

**Stack tecnológico:**
- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Rust + Tauri 2.0
- **Comunicación:** IPC (Inter-Process Communication)
- **Estilos:** CSS puro (sin frameworks)

### Lee estos documentos primero

**OBLIGATORIO leer (en orden):**

1. **[README.md](./README.md)** (5 min)
   - Qué hace la app
   - Características principales
   - Enlaces a documentación

2. **[ARQUITECTURA.md](./ARQUITECTURA.md)** (20 min)
   - Estructura del proyecto
   - Componentes principales
   - Flujos de comunicación
   - **ESTE ES EL MÁS IMPORTANTE**

3. **[docs/README.md](./docs/README.md)** (10 min)
   - Índice de toda la documentación
   - Guías de usuario y técnicas

**RECOMENDADO leer:**

4. **[docs/funciones.md](./docs/funciones.md)** (15 min)
   - Todas las funcionalidades implementadas
   - Casos de uso

5. **[docs/api-backend.md](./docs/api-backend.md)** (20 min)
   - Si vas a trabajar en backend
   - Comandos Tauri disponibles

---

##  Paso 2: Configurar Entorno de Desarrollo

### Prerrequisitos Obligatorios

Instalar en este orden:

#### 1. Node.js (v18 o superior)

**Windows:**
```powershell
# Con winget
winget install OpenJS.NodeJS

# O descargar desde https://nodejs.org/
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Fedora
sudo dnf install nodejs

# Arch
sudo pacman -S nodejs npm
```

**macOS:**
```bash
brew install node
```

**Verificar:**
```bash
node --version  # Debe ser v18+
npm --version   # Debe ser 9+
```

---

#### 2. Rust (última versión estable)

**Todos los sistemas:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Sigue las instrucciones del instalador.

**Verificar:**
```bash
rustc --version  # Debe mostrar versión
cargo --version  # Debe mostrar versión
```

---

#### 3. Dependencias de Sistema (solo Linux)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

**Fedora:**
```bash
sudo dnf install webkit2gtk3-devel \
    openssl-devel \
    curl \
    wget \
    file \
    libappindicator-gtk3-devel \
    librsvg2-devel
```

**Arch:**
```bash
sudo pacman -S webkit2gtk \
    base-devel \
    curl \
    wget \
    file \
    openssl \
    gtk3 \
    libappindicator-gtk3 \
    librsvg
```

---

#### 4. yt-dlp (para testing)

**Windows:**
```powershell
pip install yt-dlp
```

**Linux:**
```bash
sudo apt install yt-dlp  # Ubuntu/Debian
# O
pip3 install yt-dlp      # Cualquier distro
```

**macOS:**
```bash
brew install yt-dlp
```

**Verificar:**
```bash
yt-dlp --version
```

---

#### 5. FFmpeg (opcional, solo para testing de audio)

**Windows:**
```powershell
choco install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg  # Ubuntu/Debian
```

**macOS:**
```bash
brew install ffmpeg
```

**Verificar:**
```bash
ffmpeg -version
ffprobe -version
```

---

### Clonar el Repositorio

```bash
# HTTPS
git clone https://github.com/alejandg1/ytdlp_gui.git
cd ytdlp_gui

# O SSH (recomendado si tienes llaves configuradas)
git clone git@github.com:alejandg1/ytdlp_gui.git
cd ytdlp_gui
```

---

### Instalar Dependencias

```bash
# Instalar dependencias de npm
npm install

# Esto descargará:
# - React, TypeScript, Vite
# - Tauri CLI
# - Plugins de Tauri
# - Dependencias de desarrollo
```

**No necesitas instalar dependencias de Rust manualmente**, Cargo lo hace automáticamente al compilar.

---

##  Paso 3: Ejecutar la Aplicación

### Modo Desarrollo

```bash
npm run tauri dev
```

**Qué hace este comando:**
1. Vite compila el frontend (React + TS)
2. Vite inicia servidor en `http://localhost:1420`
3. Cargo compila el backend (Rust)
4. Tauri abre ventana de la app
5. Hot reload activado (cambios en frontend se reflejan automáticamente)

**Primera compilación:** 5-10 minutos (Rust compila muchas dependencias)  
**Compilaciones posteriores:** 10-30 segundos

**Ventana que deberías ver:**
- Interfaz de la app con dos botones arriba: [Simple] [Pro]
- Modo Simple activo por defecto
- 3 presets: Video, Audio, Podcast

---

### Verificar que Todo Funciona

1. **Abrir DevTools:**
   - Windows/Linux: `Ctrl + Shift + I`
   - macOS: `Cmd + Option + I`

2. **Verificar consola:**
   - Debería mostrar versión de yt-dlp detectada
   - Ejemplo: `"yt-dlp detectado: native: 2024.01.01"`

3. **Probar una descarga:**
   - Modo Simple → Preset: Video
   - Pegar URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Seleccionar carpeta (ej: Descargas)
   - Click "Iniciar Descarga"
   - Debería aparecer en lista de descargas con estado

**Si algo falla:** Ver sección de [Troubleshooting](#troubleshooting) más abajo.

---

##  Paso 4: Estructura del Código

### Archivos Clave

**Frontend (lo que más editarás):**
```
src/
├── App.tsx           #  COMPONENTE PRINCIPAL (578 líneas)
│                     # Aquí está TODA la lógica de UI
│                     # - Dual mode (Simple/Pro)
│                     # - Estado de descargas
│                     # - Handlers de eventos
│
├── App.css           #  ESTILOS (740 líneas)
│                     # - Variables CSS
│                     # - Layout de ambos modos
│                     # - Estilos de componentes
│
├── main.tsx          # Entry point de React
│                     # No necesitas tocarlo casi nunca
│
└── vite-env.d.ts     # Tipos de Vite
                      # No lo modifiques
```

**Backend (si trabajas en funcionalidades nuevas):**
```
src-tauri/src/
├── lib.rs            #  COMANDOS TAURI (408 líneas)
│                     # Aquí están los 5 comandos:
│                     # - check_ytdlp()
│                     # - check_ffmpeg()
│                     # - select_folder()
│                     # - download_video()
│                     # - get_video_info()
│
└── main.rs           # Inicialización de Tauri
                      # No necesitas tocarlo
```

**Configuración:**
```
src-tauri/
├── Cargo.toml        # Dependencias de Rust
├── tauri.conf.json   # Config de Tauri (nombre app, permisos, etc.)
└── build.rs          # Build script (no modificar)
```

---

##  Paso 5: Flujo de Desarrollo

### Workflow Típico

1. **Crear rama nueva:**
   ```bash
   git checkout -b feature/nombre-de-feature
   # O
   git checkout -b fix/nombre-del-bug
   ```

2. **Hacer cambios:**
   - Editar archivos (principalmente `src/App.tsx` o `src/App.css`)
   - Guardar → Hot reload automático en ventana de dev

3. **Probar cambios:**
   - Verificar en la app
   - Abrir DevTools para ver console.log/errores

4. **Commit:**
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   # O
   git commit -m "fix: descripción del bug resuelto"
   ```

5. **Push:**
   ```bash
   git push origin feature/nombre-de-feature
   ```

6. **Crear Pull Request en GitHub**

---

### Convenciones de Commits

Usar **Conventional Commits:**

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato (no afecta código)
refactor: refactorización (sin cambio funcional)
test: agregar/modificar tests
chore: tareas de mantenimiento
```

**Ejemplos:**
```bash
git commit -m "feat: agregar selector de tema claro/oscuro"
git commit -m "fix: corregir detección de FFmpeg en Windows"
git commit -m "docs: actualizar guía de instalación"
git commit -m "refactor: separar App.tsx en componentes"
```

---

##  Paso 6: Testing

### Testing Manual (por ahora)

1. **Modo Simple:**
   - Probar los 3 presets (Video, Audio, Podcast)
   - Verificar que aplican configuración correcta
   - Probar con múltiples URLs

2. **Modo Pro:**
   - Activar/desactivar diferentes opciones
   - Verificar que se pasan correctamente a backend
   - Probar combinaciones (ej: cookies + sponsorblock)

3. **Edge Cases:**
   - URLs inválidas
   - Videos privados/eliminados
   - Sin conexión a internet
   - Sin yt-dlp instalado
   - Sin FFmpeg (intentar extraer audio)

### Testing Automatizado (futuro)

**TODO:** Implementar tests unitarios con Vitest + React Testing Library

---

##  Troubleshooting

### Problema: "yt-dlp no encontrado"

**Solución:**
```bash
# Verificar que está instalado
yt-dlp --version

# Si no funciona, instalar:
pip install yt-dlp

# O (Linux):
sudo apt install yt-dlp
```

---

### Problema: "Error compilando Rust"

**Solución:**
```bash
# Actualizar Rust
rustup update

# Limpiar caché de compilación
cd src-tauri
cargo clean
cd ..

# Reintentar
npm run tauri dev
```

---

### Problema: "Ventana no abre"

**Solución Windows:**
```powershell
# Verificar que WebView2 está instalado
# Descargar desde: https://developer.microsoft.com/en-us/microsoft-edge/webview2/
```

**Solución Linux:**
```bash
# Instalar webkit2gtk
sudo apt install libwebkit2gtk-4.0-dev
```

---

### Problema: "Hot reload no funciona"

**Solución:**
```bash
# Cerrar la app
# Ctrl + C en la terminal

# Limpiar y reiniciar
rm -rf node_modules/.vite
npm run tauri dev
```

---

### Problema: "Changes in Rust code not reflected"

Los cambios en Rust **requieren recompilación**:

```bash
# Cerrar app (Ctrl + C)
# Volver a ejecutar
npm run tauri dev
```

---

##  Paso 7: Guía de Estilo de Código

### TypeScript/React

```typescript
//  BIEN: Interfaces con nombre descriptivo
interface DownloadConfig {
  outputPath: string;
  format: string;
  extractAudio: boolean;
}

//  BIEN: Funciones con tipo de retorno explícito
const handleDownload = async (): Promise<void> => {
  // ...
};

//  BIEN: Nombres descriptivos
const [isDownloading, setIsDownloading] = useState(false);

//  MAL: Nombres genéricos
const [flag, setFlag] = useState(false);
```

### CSS

```css
/*  BIEN: Usar variables CSS */
.button {
  background: var(--accent-primary);
  color: var(--text-primary);
}

/*  BIEN: Clases descriptivas */
.download-list-item {}
.preset-selector-button {}

/*  MAL: Abreviaturas crípticas */
.dl-li {}
.ps-btn {}
```

### Rust

```rust
//  BIEN: Manejo de errores explícito
fn check_ytdlp() -> Result<String, String> {
    match Command::new("yt-dlp").arg("--version").output() {
        Ok(output) => Ok(String::from_utf8_lossy(&output.stdout).to_string()),
        Err(e) => Err(format!("Error: {}", e))
    }
}

//  BIEN: Nombres descriptivos
let ytdlp_version = check_ytdlp()?;

//  MAL: Unwrap sin manejo
let version = check_ytdlp().unwrap(); // Puede crashear!
```

---

##  Paso 8: Recursos de Aprendizaje

### Si eres nuevo en React

- **Oficial:** https://react.dev/learn
- **Tutorial interactivo:** https://react.dev/learn/tutorial-tic-tac-toe
- **Video (español):** https://www.youtube.com/watch?v=T_j60n1zgu0

### Si eres nuevo en Rust

- **Rust Book (oficial):** https://doc.rust-lang.org/book/
- **Rustlings (ejercicios):** https://github.com/rust-lang/rustlings
- **Video (español):** https://www.youtube.com/watch?v=x2-tjdJUKy0

### Si eres nuevo en Tauri

- **Oficial:** https://tauri.app/v1/guides/
- **Getting Started:** https://tauri.app/v1/guides/getting-started/setup/
- **Prerequisites:** https://tauri.app/v1/guides/getting-started/prerequisites

### Específico de yt-dlp

- **Documentación:** https://github.com/yt-dlp/yt-dlp#readme
- **Opciones:** https://github.com/yt-dlp/yt-dlp#usage-and-options
- **Nuestro catálogo:** [docs/parametros-ytdlp.md](./docs/parametros-ytdlp.md)

---

##  Paso 9: Elegir Tu Primera Tarea

### Para Principiantes

**Recomendación:** Empieza con algo de documentación o UI básica.

**Tareas ideales:**
1. [Crear capturas de pantalla](./TAREAS_DELEGABLES.md#1-documentación)
2. [Agregar tooltips explicativos](./TAREAS_DELEGABLES.md#2-uiux-mejoras-menores)
3. [Mejorar mensajes de error](./TAREAS_DELEGABLES.md#2-uiux-mejoras-menores)

### Para Intermedios

**Tareas ideales:**
1. [Separar App.tsx en componentes](./TAREAS_DELEGABLES.md#4-organización-de-código)
2. [Implementar selector de tema](./TAREAS_DELEGABLES.md#5-features-nuevas)
3. [Agregar barra de progreso real](./TAREAS_DELEGABLES.md#5-features-nuevas)

### Para Avanzados

**Tareas ideales:**
1. [Implementar sistema de plugins](./TAREAS_DELEGABLES.md#7-arquitectura)
2. [Configurar tests automatizados](./TAREAS_DELEGABLES.md#8-testing-automatizado)
3. [Configurar CI/CD](./TAREAS_DELEGABLES.md#9-cicd)

**Ver lista completa:** [TAREAS_DELEGABLES.md](./TAREAS_DELEGABLES.md)

---

##  Paso 10: Comunicación

### Preguntas o Dudas

1. **Revisar documentación primero:**
   - [ARQUITECTURA.md](./ARQUITECTURA.md)
   - [docs/](./docs/)
   - [TAREAS_DELEGABLES.md](./TAREAS_DELEGABLES.md)

2. **Abrir un Issue en GitHub:**
   - https://github.com/alejandg1/ytdlp_gui/issues
   - Usa etiqueta `question`
   - Incluye contexto y lo que ya intentaste

3. **Pull Request:**
   - Abre PR aunque no esté completo (usa Draft PR)
   - Pide feedback temprano
   - Menciona issues relacionados (`Closes #123`)


##  ¡Listo!

Ya estás preparado/a para contribuir al proyecto.

**Recuerda:**
- No tengas miedo de preguntar
- Empieza con tareas pequeñas
- Lee la documentación existente
- Usa conventional commits


**Creado:** 4 de febrero de 2026  
**Mantenedor:** ActioMeta
