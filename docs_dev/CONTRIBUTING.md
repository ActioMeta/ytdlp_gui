# Guía de Contribución


## Tabla de Contenidos

1. [Antes de Empezar](#-antes-de-empezar)
2. [Configurar Entorno](#-configurar-entorno)
3. [Workflow de Desarrollo](#-workflow-de-desarrollo)
4. [Estándares de Código](#-estándares-de-código)
5. [Testing](#-testing)
6. [Pull Requests](#-pull-requests)
7. [Reportar Bugs](#-reportar-bugs)
8. [Sugerir Features](#-sugerir-features)

---

## Antes de Empezar

### ¿Primera vez contribuyendo?

**Lee primero (en orden):**
1. [ONBOARDING.md](./ONBOARDING.md) - Configuración completa
2. [ARQUITECTURA.md](./ARQUITECTURA.md) - Cómo funciona el proyecto
3. [TAREAS_DELEGABLES.md](./TAREAS_DELEGABLES.md) - Tareas disponibles


## Configurar Entorno

### Prerrequisitos

- **Node.js** v18+
- **Rust** (última estable)
- **Git**
- **yt-dlp** (para testing)
- **FFmpeg** (opcional, para testing de audio)

**Guía completa:** [ONBOARDING.md](./ONBOARDING.md#-paso-2-configurar-entorno-de-desarrollo)

### Clone

```bash
git clone https://github.com/actiometa/ytdlp_gui.git
cd ytdlp_gui

```

### Instalar Dependencias

```bash
npm install
```

### Verificar que Funciona

```bash
npm run tauri dev
```

**Convención de nombres:**
- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bug
- `docs/` - Solo documentación
- `refactor/` - Refactorización sin cambio funcional
- `test/` - Agregar/modificar tests
- `chore/` - Tareas de mantenimiento

### 3. Hacer Cambios

```bash
# Editar archivos
# ...

# Ver cambios
git status
git diff

# Agregar cambios al staging
git add src/App.tsx
# O agregar todos
git add .
```

### 4. Commit

**Usar Conventional Commits:**

```bash
git commit -m "tipo: descripción breve"
```

**Tipos permitidos:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato (sin cambios de código)
- `refactor:` - Refactorización
- `test:` - Agregar/modificar tests
- `chore:` - Mantenimiento

**Ejemplos:**
```bash
git commit -m "feat: agregar selector de tema claro/oscuro"
git commit -m "fix: corregir detección de FFmpeg en Windows"
git commit -m "docs: actualizar guía de instalación en Linux"
git commit -m "refactor: separar App.tsx en componentes"
git commit -m "test: agregar tests para DownloadList"
```

**Commits complejos:**
```bash
git commit -m "feat: implementar historial de descargas

- Agregar localStorage para persistencia
- Crear componente HistoryModal
- Agregar botón en UI
- Actualizar documentación

Closes #42"
```

### 5. Push a Tu Fork

```bash
git push origin feature/nombre-descriptivo
```

### 6. Crear Pull Request

1. Ir a tu fork en GitHub
2. Click en "Compare & pull request"
3. Llenar template de PR (ver sección [Pull Requests](#-pull-requests))
4. Click "Create pull request"

---

##  Estándares de Código

### TypeScript/React

**Naming:**
```typescript
//  BIEN: PascalCase para componentes
function DownloadList() { }

// BIEN: camelCase para funciones/variables
const handleDownload = () => { };

// BIEN: SCREAMING_SNAKE_CASE para constantes
const MAX_CONCURRENT_DOWNLOADS = 3;

// MAL: snake_case
function download_video() { }
```

**Tipos:**
```typescript
// BIEN: Tipos explícitos
interface DownloadConfig {
  outputPath: string;
  format: string;
}

const config: DownloadConfig = { ... };

// BIEN: Retornos tipados
const startDownload = async (): Promise<void> => { };

// MAL: any
const config: any = { ... };
```

**Componentes:**
```typescript
// BIEN: Componente funcional con tipos
interface Props {
  urls: string[];
  onDownload: () => void;
}

const DownloadButton: React.FC<Props> = ({ urls, onDownload }) => {
  return <button onClick={onDownload}>Download</button>;
};

// MAL: Sin tipos
const DownloadButton = ({ urls, onDownload }) => { };
```

### Rust

**Naming:**
```rust
// BIEN: snake_case para funciones/variables
fn check_ytdlp() -> Result<String, String> { }

// BIEN: PascalCase para structs/enums
struct DownloadConfig { }

// BIEN: SCREAMING_SNAKE_CASE para constantes
const MAX_RETRIES: u32 = 3;
```

**Error Handling:**
```rust
// BIEN: Usar Result
fn download_video(url: &str) -> Result<String, String> {
    match execute_ytdlp(args) {
        Ok(output) => Ok(output),
        Err(e) => Err(format!("Error: {}", e))
    }
}

// MAL: unwrap/expect sin justificación
fn download_video(url: &str) -> String {
    execute_ytdlp(args).unwrap() // Puede crashear!
}
```

### CSS

**Naming:**
```css
/*  BIEN: kebab-case, nombres descriptivos */
.download-list-item { }
.preset-selector-button { }

/*  BIEN: BEM si es necesario */
.download-list__item--active { }

/*  MAL: camelCase */
.downloadListItem { }

/*  MAL: Abreviaturas */
.dl-li { }
```

**Variables:**
```css
/*  BIEN: Usar variables CSS */
:root {
  --accent-primary: #4a9eff;
}

.button {
  background: var(--accent-primary);
}

/* MAL: Hardcodear colores */
.button {
  background: #4a9eff;
}
```

### Formateo

**TypeScript/React:**
```bash
# Usamos Prettier (configuración en .prettierrc si existe)
# Por ahora: seguir estilo del código existente
```

**Rust:**
```bash
# Antes de commit
cargo fmt
```

##  Testing

### Estado Actual

 **No hay tests automatizados** (tarea pendiente prioritaria)

### Testing Manual (por ahora)

Antes de crear PR, probar:

**Modo Simple:**
1. Cada preset (Video, Audio, Podcast)
2. Múltiples URLs
3. Cambiar carpeta de salida

**Modo Pro:**
1. Activar/desactivar opciones
2. Combinaciones (cookies + sponsorblock)
3. Extracción de audio

**Edge Cases:**
1. URLs inválidas
2. Sin yt-dlp
3. Sin FFmpeg (intentar audio)
4. Videos privados/eliminados

### Testing Automatizado (futuro)

Cuando se implementen, ejecutar:

```bash
# Frontend tests
npm run test

# Backend tests
cd src-tauri
cargo test
```

---

##  Pull Requests

### Antes de Crear PR

Checklist:
- [ ] Código sigue estándares del proyecto
- [ ] Testing manual completado
- [ ] Sin errores de compilación/lint
- [ ] Documentación actualizada (si aplica)
- [ ] Commits con mensajes descriptivos

### Template de PR

```markdown
## Descripción

[Descripción breve de los cambios]

## Tipo de Cambio

- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que rompe compatibilidad)
- [ ] Documentación

## ¿Cómo se ha Testeado?

[Describe las pruebas que realizaste]

- [ ] Modo Simple
- [ ] Modo Pro
- [ ] Edge cases

## Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado self-review de mi código
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan warnings nuevos
- [ ] He agregado tests (si aplica)
- [ ] Tests nuevos y existentes pasan

## Screenshots (si aplica)

[Agregar capturas de pantalla]

## Issues Relacionados

Closes #[número de issue]
```

### Process de Review

1. **Automático:** GitHub Actions (cuando se configure)
2. **Manual:** Maintainer revisará el código
3. **Feedback:** Se pedirán cambios si es necesario
4. **Aprobación:** Merge cuando todo esté OK

**Tiempo de respuesta esperado:** 24-48 horas

---

##  Reportar Bugs

### Antes de Reportar

1. **Buscar issues existentes:** Puede que ya esté reportado
2. **Verificar versión:** ¿Estás usando la última versión?
3. **Reproducir:** ¿Puedes reproducir el bug consistentemente?

### Template de Bug Report

```markdown
**Descripción del Bug**
[Descripción clara y concisa]

**Reproducir**
Pasos:
1. Ir a '...'
2. Click en '...'
3. Ver error

**Comportamiento Esperado**
[Qué debería pasar]

**Comportamiento Actual**
[Qué pasa en realidad]

**Screenshots**
[Si aplica, agregar capturas]

**Entorno:**
 - OS: [ej. Windows 11, Ubuntu 22.04, macOS 13]
 - Versión de la app: [ej. 2.0.0]
 - yt-dlp version: [ejecutar `yt-dlp --version`]
 - FFmpeg version: [ejecutar `ffmpeg -version`]

**Logs/Error Messages**
```
[Pegar aquí mensajes de error]
```

**Información Adicional**
[Cualquier otro contexto]
```

---

##  Sugerir Features

### Antes de Sugerir

1. **Buscar issues existentes:** Puede que ya esté sugerido
2. **Revisar roadmap:** [TAREAS_DELEGABLES.md](./TAREAS_DELEGABLES.md)
3. **Pensar en casos de uso:** ¿Beneficia a muchos usuarios?

### Template de Feature Request

```markdown
**¿Tu feature está relacionada con un problema?**
[ej. Siempre me frustra que...]

**Describe la Solución que Quieres**
[Clara y concisa descripción de la feature]

**Alternativas Consideradas**
[Otras soluciones que consideraste]

**Casos de Uso**
1. Como usuario X, quiero Y para poder Z
2. ...

**Mockups/Ejemplos**
[Si tienes, agregar wireframes o referencias]

**Información Adicional**
[Contexto adicional]
```

---

##  Mejoras de UI/UX

Para cambios visuales:
1. **Discutir primero** en Issue
2. **Proporcionar mockup** (Figma, screenshot editado, etc.)
3. **Mantener consistencia** con diseño existente
4. **Responsive:** Probar en diferentes tamaños de ventana

---

##  Mejoras de Documentación

Documentación también es código:
- ✅ Corregir tipos
- ✅ Mejorar claridad
- ✅ Agregar ejemplos
- ✅ Traducir (cuando i18n esté listo)
