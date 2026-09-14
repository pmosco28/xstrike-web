/**
 * Configuración central del sitio X-Strike.
 * Edita SOLO este archivo para actualizar datos pendientes, enlaces y el
 * endpoint del backend. El resto del sitio lee estos valores.
 */
window.SITE_CONFIG = {
  // URL del Web App de Google Apps Script (ver apps-script/README.md para desplegarlo).
  // Debe terminar en /exec
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbywm1zrBexeFAafqiSzYwcIF-NqvAX_zPhTlX3SJ56JkUpTv4IKluew9__mATxmL9kp/exec",

  event: {
    fecha: "31 de octubre de 2026",
    ciudad: "Cuenca, Ecuador",
    venue: null,          // ej: "Coliseo Jefferson Pérez" — null = pendiente
    horario: null,        // ej: "18:00" — null = pendiente
    deadline: null,       // ej: "15 de octubre de 2026, 23:59" — null = pendiente
  },

  contacto: {
    instagram: null,      // ej: "https://instagram.com/xstrike.ec"
    whatsapp: null,       // ej: "https://wa.me/593999999999"
    correo: null,         // ej: "postulaciones@xstrike.ec"
  },

  analytics: {
    gaMeasurementId: null,   // ej: "G-XXXXXXX" — null = no instalar todavía
    metaPixelId: null,       // ej: "1234567890123" — null = no instalar todavía
  },

  // Opciones del selector "Disciplina principal" en el formulario.
  // Muay Thai y Kickboxing están confirmadas. Las demás quedan como referencia
  // por si se habilitan más adelante — confirma con la organización.
  disciplinas: [
    "Muay Thai",
    "Kickboxing",
    "MMA",
    "Boxeo",
    "Grappling / BJJ",
    "Otra",
  ],

  // Datos de pago de inscripción — solo se piden DESPUÉS de aceptar a un peleador
  // (ver pago.html). Tomado del formulario anterior del equipo — confirma que
  // sigan siendo correctos antes de publicar.
  pago: {
    monto: 30,
    moneda: "USD",
    banco: "Cooperativa JEP",
    titular: "Juan Alfredo Ordoñez Jaramillo",
    cedula: "0106643125",
    tipoCuenta: "Cuenta de ahorros",
    numeroCuenta: "406135135905",
  },

  // Categorías por edad. Tomadas del formulario anterior del equipo —
  // confirma con la organización antes de publicar, sobre todo para
  // Kickboxing si maneja rangos distintos a Muay Thai.
  categoriasEdad: [
    { id: "Infantil C", min: 5, max: 6 },
    { id: "Infantil B", min: 7, max: 8 },
    { id: "Infantil A", min: 9, max: 10 },
    { id: "Junior C", min: 11, max: 13 },
    { id: "Junior B", min: 14, max: 15 },
    { id: "Junior A", min: 16, max: 17 },
    { id: "Mayores de edad", min: 18, max: 120 },
  ],

  // Categorías de peso (en kg) por grupo de edad. Cada lista es el techo de
  // cada categoría (ej. en Junior, 52 significa "hasta 52 kg"). Tomadas del
  // formulario anterior — PENDIENTE de confirmar oficialmente, y de definir
  // si Kickboxing y las categorías femeninas usan los mismos rangos.
  categoriasPeso: {
    "Infantil C": [25, 30, 35, 40, 42, 45, 47, 50],
    "Infantil B": [25, 30, 35, 40, 42, 45, 47, 50],
    "Infantil A": [25, 30, 35, 40, 42, 45, 47, 50],
    "Junior C": [52, 57, 63, 69, 74, 79, 84, 89, 94],
    "Junior B": [52, 57, 63, 69, 74, 79, 84, 89, 94],
    "Junior A": [52, 57, 63, 69, 74, 79, 84, 89, 94],
    "Mayores de edad": [50, 54, 57, 60, 63.5, 67, 71, 76, 81, 86, 93],
  },
};
