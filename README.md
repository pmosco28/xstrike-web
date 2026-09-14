# X-Strike — Landing de postulaciones

Landing page de una sola página para la convocatoria de peleadores de X-Strike
(Cuenca, 31 de octubre de 2026). Sin frameworks: HTML/CSS/JS plano, pensado para
publicarse tal cual en Netlify.

## Estructura

```
index.html          → la landing completa (hero, propuesta, convocatoria, pasos,
                       info del evento, FAQ, formulario, footer)
estado.html          → página "ver mi postulación" (consulta por código o correo)
panel.html           → panel de revisión para el equipo organizador (protegido con
                       ADMIN_TOKEN): tarjeta por postulante, cambiar estado, WhatsApp
                       directo, correo automático al peleador, gestión de pago. No se
                       enlaza desde el menú del sitio a propósito.
pago.html            → página de pago de inscripción para peleadores YA aceptados
                       (link va en el correo de aceptación). Sube comprobante o
                       referencia, sin necesitar cuenta de Google.
admin.html           → SOLO modo de prueba: tabla tipo Sheets de lo guardado en
                       local-store.js (ver advertencia abajo), export a CSV
privacidad.html      → borrador de política de privacidad (falta texto legal aprobado)
terminos.html        → borrador de términos de la convocatoria (falta texto legal aprobado)
config.js            → ÚNICO archivo a editar para: URL del backend, fecha límite,
                       venue, horario, redes sociales, disciplinas, Analytics/Pixel
styles.css           → todo el diseño (paleta negro/grafito + verde neón + azul eléctrico)
main.js              → animaciones al scroll, FAQ acordeón, formulario multi-paso, envío
local-store.js       → modo de prueba sin backend (ver advertencia abajo)
apps-script/         → backend (Google Apps Script + Google Sheet) que reemplaza a
                       Google Forms — ver apps-script/README.md para desplegarlo
assets/img/          → logo, favicon, imagen de preview, fotos (pendientes de recibir)
assets/video/        → video del hero (pendiente de comprimir, ver abajo)
```

## Cómo previsualizarlo ahora mismo

Es un sitio 100% estático, no necesita build ni servidor especial:

```bash
cd /Users/apple/XStrike-Web
python3 -m http.server 8080
```

Y abrir `http://localhost:8080` en el navegador.

## Qué falta antes de publicar (checklist)

Esto es exactamente lo que el propio brief marca como pendiente — nada de esto lo
puedo inventar, necesita confirmación de la organización:

- [ ] **Backend**: desplegar `apps-script/Code.gs` (instrucciones en
      `apps-script/README.md`) y pegar la URL en `config.js` → `APPS_SCRIPT_URL`.
      Bloqueado por la cuenta de Gmail nueva del evento — ver esa conversación aparte.
- [ ] **`SITE_URL` en `Code.gs`**: ponerla apenas tengan dominio o URL de Netlify
      definitiva — se usa para el link de pago que va en el correo de aceptación.
- [x] **Logo final**: ya integrado (`assets/img/logo-white.png` + favicon generado).
- [ ] **Datos bancarios en `config.js` → `pago`**: tomé los del formulario anterior
      del equipo (Cooperativa JEP) como referencia — confirmen que sigan siendo
      correctos antes de publicar, y el monto ($30, tomado del form viejo).
- [ ] **Video del hero**: el archivo `XTRIKE 1.mp4` que enviaste pesa ~110 MB — muy
      pesado para cargar rápido en celular. Hay que comprimirlo a un clip corto (10-20s),
      loop silencioso, idealmente <5 MB, en `assets/video/hero.mp4`, más una imagen
      estática de respaldo en `assets/img/hero-fallback.jpg`. No tengo `ffmpeg`
      instalado en esta máquina para hacerlo automáticamente — dime si quieres que
      instale las herramientas necesarias, o lo resolvemos con otra app.
- [ ] **Datos pendientes del brief**: venue, horario, fecha límite de postulación,
      disciplinas y categorías habilitadas, montos de premios, Instagram/WhatsApp/correo
      de contacto — todos marcados en el sitio con subrayado punteado ámbar
      (`.pending`) para que sean fáciles de encontrar y reemplazar en `config.js` o
      directamente en el HTML donde corresponda.
- [ ] **Textos legales**: `privacidad.html` y `terminos.html` son borradores — el brief
      pide que estos textos estén "por aprobar" por la organización.
- [ ] **Dominio propio + HTTPS**: al conectar un dominio en Netlify, HTTPS se activa
      automático.
- [ ] **Analytics / Meta Pixel**: si me pasas los IDs, los agrego en `config.js` y
      quedan listos (dejé el hueco preparado, no instalé nada todavía para no rastrear
      visitas sin permisos configurados).
- [ ] **Fotos reales** de atletas y de Cuenca nocturna, para reemplazar los placeholders
      visuales de las secciones "Propuesta para el peleador" e "Información del evento".

## Modo de prueba sin backend (`local-store.js` + `admin.html`)

Mientras `config.js` no tenga `APPS_SCRIPT_URL` configurada, el formulario guarda cada
postulación en el `localStorage` del navegador (no en ningún servidor) y `admin.html`
la muestra como una tabla editable, igual que se vería en la Google Sheet real, con
botón para exportar a CSV.

**Advertencia importante:** esto es solo para probar el flujo en un mismo dispositivo
(por ejemplo, tú llenando el formulario para ver cómo se comporta). Cada persona que
lo llena desde su propio celular guarda los datos únicamente en su propio celular —
nunca se juntan entre sí ni aparecen en tu `admin.html`. No sirve como reemplazo del
backend para recolectar postulaciones reales de gente distinta. Apenas se configure
`APPS_SCRIPT_URL`, el formulario deja de usar este modo automáticamente, sin tocar
ningún otro código.

## Decisiones de arquitectura (por qué se hizo así)

- **Nada de Google Forms embebido**: en vez de eso, un formulario 100% propio y con el
  estilo exacto de X-Strike, que envía los datos a un Google Apps Script (mismo patrón
  que ya usaste en `CasaMercedes-Uploader`, adaptado). Así el peleador nunca ve la
  interfaz genérica de Google.
- **Sin cuentas de usuario ni login**: cada postulante recibe un código de seguimiento
  (ej. `XS-0004`) por correo al enviar el formulario, y puede consultar su estado en
  `estado.html` en cualquier momento con ese código o su correo. El organizador
  gestiona todo editando celdas directamente en la Google Sheet (estado, categoría,
  próximos pasos) — no hace falta un panel de administración aparte.
- **Sin backend propio**: todo corre gratis sobre Google Apps Script + Google Sheets,
  desplegado desde la cuenta de Google del organizador. La landing en sí es estática y
  se sirve desde Netlify.

## Siguiente paso sugerido

1. Confirmar con tu hermano los datos pendientes (venue, fecha límite, disciplinas,
   premios, redes) para reemplazarlos en `config.js`.
2. Pedir el logo oficial en SVG/PNG transparente y las fotos.
3. Yo despliego el Apps Script contigo o con tu hermano (necesita ser desde su cuenta
   de Google, o la que administrará el evento).
4. Publicamos en Netlify — dime si quieres que lo suba a un repo de GitHub tuyo (como
   StructurAR) o prefieres arrastrar la carpeta directo a Netlify Drop.
