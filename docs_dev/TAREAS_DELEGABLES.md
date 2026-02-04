#  Tareas Delegables - yt-dlp GUI

Lista priorizada de tareas que pueden ser delegadas a colaboradores nuevos.

---

##  Tareas por Nivel de Dificultad

###  FÁCIL (Ideal para principiantes)

#### 1. Documentación
- [ ] **Crear capturas de pantalla** de ambos modos (Simple/Pro)
  - Archivo: Crear `docs/screenshots/` con imágenes
  - Actualizar README.md con enlaces
  - **Tiempo estimado:** 30 min
  - **Requiere:** Solo usar la app y capturar pantallas

- [ ] **Traducir documentación al inglés**
  - Archivos: Todo `docs/*.md`
  - Crear carpeta `docs/en/` con traducciones
  - **Tiempo estimado:** 4-6 horas
  - **Requiere:** Inglés intermedio

#### 2. UI/UX Mejoras Menores

- [ ] **Agregar tooltips explicativos**
  - Archivo: `src/App.tsx`
  - Agregar atributo `title=""` a inputs complejos
  - **Tiempo estimado:** 1 hora
  - **Requiere:** Conocimientos básicos de HTML

- [ ] **Mejorar mensajes de error**
  - Archivo: `src/App.tsx` (función `startDownloads`)
  - Hacer mensajes más descriptivos y amigables
  - **Tiempo estimado:** 2 horas
  - **Requiere:** JavaScript básico

- [ ] **Agregar iconos a botones**
  - Archivo: `src/App.tsx`, `src/App.css`
  - Reemplazar texto "⋯" "↓" con iconos SVG reales
  - **Tiempo estimado:** 3 horas
  - **Requiere:** CSS + SVG básico

#### 3. Testing

- [ ] **Crear checklist de testing manual**
  - Archivo: Crear `docs/testing-checklist.md`
  - Documentar casos de prueba para cada funcionalidad
  - **Tiempo estimado:** 2 horas
  - **Requiere:** Leer documentación

- [ ] **Probar en diferentes plataformas**
  - Ejecutar en Windows/Linux/macOS
  - Documentar bugs encontrados
  - **Tiempo estimado:** 3 horas
  - **Requiere:** Acceso a múltiples SOs

---

###  MEDIO (Requiere conocimientos técnicos)

#### 4. Organización de Código

- [ ] **Separar App.tsx en componentes**
  - Crear: `src/components/SimpleMode.tsx`
  - Crear: `src/components/ProMode.tsx`
  - Crear: `src/components/DownloadList.tsx`
  - **Tiempo estimado:** 6 horas
  - **Requiere:** React intermedio
  - **Beneficio:** Código más mantenible

- [ ] **Extraer lógica a hooks custom**
  - Crear: `src/hooks/useDownloads.ts`
  - Crear: `src/hooks/useYtdlpDetection.ts`
  - **Tiempo estimado:** 4 horas
  - **Requiere:** React hooks avanzado
  - **Beneficio:** Separación de lógica y UI

- [ ] **Crear tipos TypeScript centralizados**
  - Archivo: `src/types/index.ts`
  - Mover todas las interfaces de App.tsx
  - **Tiempo estimado:** 2 horas
  - **Requiere:** TypeScript básico
  - **Beneficio:** Mejor autocompletado y type safety

#### 5. Features Nuevas

- [ ] **Agregar selector de tema (claro/oscuro)**
  - Archivos: `src/App.tsx`, `src/App.css`
  - Agregar toggle en UI
  - Persistir en localStorage
  - **Tiempo estimado:** 5 horas
  - **Requiere:** CSS variables + React state
  - **Beneficio:** Mejor accesibilidad

- [ ] **Implementar historial de descargas**
  - Archivo: `src/App.tsx`
  - Guardar en localStorage
  - Mostrar en nueva pestaña/modal
  - **Tiempo estimado:** 6 horas
  - **Requiere:** React + localStorage
  - **Beneficio:** UX mejorada

- [ ] **Agregar barra de progreso real**
  - Archivos: `src/App.tsx`, `src-tauri/src/lib.rs`
  - Parsear output de yt-dlp para extraer %
  - Actualizar UI en tiempo real
  - **Tiempo estimado:** 8 horas
  - **Requiere:** Rust + React + IPC
  - **Beneficio:** Mejor feedback visual

- [ ] **Implementar descarga concurrente**
  - Archivo: `src/App.tsx` (función `startDownloads`)
  - Cambiar de secuencial a paralelo (max 3 a la vez)
  - **Tiempo estimado:** 4 horas
  - **Requiere:** JavaScript async/await
  - **Beneficio:** Descargas más rápidas

#### 6. Backend

- [ ] **Agregar logging estructurado**
  - Archivo: `src-tauri/src/lib.rs`
  - Usar crate `log` + `env_logger`
  - Guardar logs en archivo
  - **Tiempo estimado:** 3 horas
  - **Requiere:** Rust básico
  - **Beneficio:** Debugging mejorado

- [ ] **Implementar cancelación de descargas**
  - Archivos: `src-tauri/src/lib.rs`, `src/App.tsx`
  - Manejar procesos hijos y kill signal
  - Agregar botón "Cancelar" en UI
  - **Tiempo estimado:** 6 horas
  - **Requiere:** Rust + IPC
  - **Beneficio:** Control mejorado

---

###  DIFÍCIL (Requiere experiencia avanzada)

#### 7. Arquitectura

- [ ] **Migrar a state management library**
  - Opción A: Zustand
  - Opción B: Redux Toolkit
  - **Tiempo estimado:** 10-12 horas
  - **Requiere:** React avanzado + state management
  - **Beneficio:** Escalabilidad

- [ ] **Implementar sistema de plugins**
  - Permitir scripts personalizados pre/post descarga
  - Archivos: Nueva carpeta `src/plugins/`
  - **Tiempo estimado:** 15-20 horas
  - **Requiere:** Arquitectura de software avanzada
  - **Beneficio:** Extensibilidad

- [ ] **Agregar base de datos local (SQLite)**
  - Para historial, configuraciones, estadísticas
  - Usar `tauri-plugin-sql`
  - **Tiempo estimado:** 12 horas
  - **Requiere:** SQL + Rust + React
  - **Beneficio:** Persistencia robusta

#### 8. Testing Automatizado

- [ ] **Configurar tests unitarios (Frontend)**
  - Framework: Vitest + React Testing Library
  - Archivos: `src/**/*.test.tsx`
  - **Tiempo estimado:** 10 horas
  - **Requiere:** Testing en React
  - **Beneficio:** Confiabilidad

- [ ] **Configurar tests unitarios (Backend)**
  - Framework: Rust built-in testing
  - Archivos: `src-tauri/src/**/*.rs` (sección `#[cfg(test)]`)
  - **Tiempo estimado:** 8 horas
  - **Requiere:** Rust testing
  - **Beneficio:** Confiabilidad

- [ ] **Implementar E2E tests**
  - Framework: Playwright o Tauri WebDriver
  - **Tiempo estimado:** 15 horas
  - **Requiere:** E2E testing avanzado
  - **Beneficio:** Cobertura completa

#### 9. CI/CD

- [ ] **Configurar GitHub Actions**
  - Build automático en push
  - Tests automáticos
  - Release automático con tags
  - Archivos: `.github/workflows/*.yml`
  - **Tiempo estimado:** 6 horas
  - **Requiere:** DevOps básico
  - **Beneficio:** Automatización

- [ ] **Configurar auto-updater**
  - Usar `tauri-plugin-updater`
  - Notificaciones de actualización en app
  - **Tiempo estimado:** 8 horas
  - **Requiere:** Tauri avanzado + GitHub Releases
  - **Beneficio:** UX mejorada

---

## 🎨 Mejoras de UI/UX Específicas

### Prioridad Alta

1. **Reorganizar layout de Modo Pro**
   - Problema: 18 opciones apiladas son abrumadoras
   - Solución: Agrupar en secciones colapsables
   - Archivo: `src/App.tsx`, `src/App.css`
   - **Tiempo estimado:** 4 horas

2. **Mejorar feedback visual de descargas**
   - Problema: Solo texto de estado
   - Solución: Agregar barra de progreso, spinner, animaciones
   - Archivo: `src/App.tsx`, `src/App.css`
   - **Tiempo estimado:** 5 horas

3. **Implementar drag & drop de URLs**
   - Problema: Solo copy-paste
   - Solución: Permitir arrastrar archivos/links
   - Archivo: `src/App.tsx`
   - **Tiempo estimado:** 3 horas

### Prioridad Media

4. **Agregar atajos de teclado**
   - Ejemplos: Ctrl+V para pegar, Ctrl+Enter para iniciar
   - Archivo: `src/App.tsx`
   - **Tiempo estimado:** 2 horas

5. **Mejorar responsive design**
   - Problema: UI fija para tamaños grandes
   - Solución: Media queries para pantallas pequeñas
   - Archivo: `src/App.css`
   - **Tiempo estimado:** 4 horas

6. **Agregar animaciones de transición**
   - Entre modos Simple/Pro
   - Al mostrar/ocultar elementos
   - Archivo: `src/App.css`
   - **Tiempo estimado:** 3 horas

---

##  Organización de Directorios

### Estructura Actual (Mejorable)
```
src/
├── App.tsx         (578 líneas - DEMASIADO GRANDE)
├── App.css         (740 líneas - DEMASIADO GRANDE)
├── main.tsx
└── assets/
```

### Estructura Propuesta
```
src/
├── main.tsx
├── App.tsx                    (solo layout principal)
├── styles/
│   ├── variables.css          (variables CSS)
│   ├── global.css             (reset, fuentes)
│   ├── simple-mode.css        (estilos modo simple)
│   └── pro-mode.css           (estilos modo pro)
├── components/
│   ├── SimpleMode/
│   │   ├── SimpleMode.tsx
│   │   ├── PresetSelector.tsx
│   │   └── SimpleMode.css
│   ├── ProMode/
│   │   ├── ProMode.tsx
│   │   ├── GeneralOptions.tsx
│   │   ├── AudioOptions.tsx
│   │   ├── SubtitleOptions.tsx
│   │   └── ProMode.css
│   ├── DownloadList/
│   │   ├── DownloadList.tsx
│   │   ├── DownloadItem.tsx
│   │   └── DownloadList.css
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── common.css
├── hooks/
│   ├── useDownloads.ts
│   ├── useYtdlpDetection.ts
│   └── useLocalStorage.ts
├── types/
│   └── index.ts
├── utils/
│   ├── validators.ts
│   └── formatters.ts
└── assets/
    ├── icons/
    └── images/
```

**Tarea:** Refactorizar estructura actual → estructura propuesta  
**Tiempo estimado:** 12-15 horas  
**Requiere:** React + TypeScript intermedio  
**Beneficio:** Mantenibilidad +80%

---

##  Mejoras de Backend

### Prioridad Alta

1. **Mejorar detección de FFmpeg en Windows**
   - Problema: Solo busca en PATH
   - Solución: Buscar también en ubicaciones comunes
   - Archivo: `src-tauri/src/lib.rs` (función `check_ffmpeg`)
   - **Tiempo estimado:** 2 horas

2. **Implementar retry automático en descargas fallidas**
   - Archivo: `src-tauri/src/lib.rs`
   - Reintentar 3 veces con exponential backoff
   - **Tiempo estimado:** 3 horas

3. **Validar URLs antes de descargar**
   - Archivo: `src-tauri/src/lib.rs`
   - Verificar formato y que sitio esté soportado
   - **Tiempo estimado:** 2 horas

### Prioridad Media

4. **Cachear detección de yt-dlp/FFmpeg**
   - Problema: Se ejecuta en cada descarga
   - Solución: Cachear resultado por 5 minutos
   - **Tiempo estimado:** 2 horas

5. **Agregar soporte para archivos .txt con URLs**
   - Leer archivo con lista de URLs
   - Archivo: `src-tauri/src/lib.rs`
   - **Tiempo estimado:** 3 horas

---

##  Métricas y Analytics

- [ ] **Implementar telemetría básica (opcional, con consentimiento)**
  - Funcionalidades más usadas
  - Plataforma más común
  - Errores frecuentes
  - **Tiempo estimado:** 10 horas
  - **Requiere:** Backend + analytics service

- [ ] **Agregar reporte de errores automático**
  - Integración con Sentry o similar
  - **Tiempo estimado:** 4 horas
  - **Requiere:** Cuenta en servicio de errores

---

##  Internacionalización (i18n)

- [ ] **Implementar sistema de traducciones**
  - Framework: react-i18next
  - Idiomas iniciales: ES, EN
  - **Tiempo estimado:** 12 horas
  - **Requiere:** React + i18n
  - **Beneficio:** Alcance global

---

##  Documentación Técnica Faltante

- [ ] **Crear guía de contribución (CONTRIBUTING.md)**
  - Cómo hacer fork, branch, PR
  - Estándares de código
  - **Tiempo estimado:** 2 horas

- [ ] **Crear código de conducta (CODE_OF_CONDUCT.md)**
  - Basado en Contributor Covenant
  - **Tiempo estimado:** 30 min

- [ ] **Crear guía de debugging**
  - Cómo depurar frontend/backend
  - Herramientas recomendadas
  - **Tiempo estimado:** 3 horas

- [ ] **Documentar API interna completa**
  - JSDoc para TypeScript
  - Rustdoc para Rust
  - **Tiempo estimado:** 6 horas

---

##  Roadmap Sugerido (Priorización)

### Sprint 1 (1-2 semanas)
1.  Crear capturas de pantalla
2.  Separar App.tsx en componentes
3.  Mejorar mensajes de error
4.  Crear guía de contribución

### Sprint 2 (2-3 semanas)
1.  Implementar descarga concurrente
2.  Agregar barra de progreso real
3.  Reorganizar layout Modo Pro
4.  Tests unitarios básicos

### Sprint 3 (3-4 semanas)
1.  Selector de tema claro/oscuro
2.  Historial de descargas
3.  Implementar cancelación
4.  Mejorar detección FFmpeg Windows

### Sprint 4+ (futuro)
1. Internacionalización
2. Sistema de plugins
3. Base de datos SQLite
4. CI/CD completo

---

## 📧 Contacto para Delegación

Al asignar una tarea, proporcionar:
1. **Link a este documento** (sección específica)
2. **Link a ARQUITECTURA.md** (contexto)
3. **Link a documentación relevante** en `docs/`
4. **Criterios de aceptación** claros
5. **Tiempo estimado** y **nivel de dificultad**

---

**Última actualización:** 4 de febrero de 2026  
**Mantenedor:** ActioMeta
