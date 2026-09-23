/**
 * Configuración central del sitio X-Strike.
 * Edita SOLO este archivo para actualizar datos pendientes, enlaces y el
 * endpoint del backend. El resto del sitio lee estos valores.
 */
window.SITE_CONFIG = {
  // URL del Web App de Google Apps Script (ver apps-script/README.md para desplegarlo).
  // Debe terminar en /exec
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzTp4MSVHjkYjgjwGNA7gQQK1RuOaXF6bF2jZejoGRMaToN5b_fZQoSFHpBb0sENi3Q/exec",

  event: {
    fecha: "31 de octubre de 2026",
    ciudad: "Cuenca, Ecuador",
    venue: "Sindicato de Choferes de Cuenca – Av. Fray Vicente Solano y Florencia Astudillo",
    horario: "Combates desde las 9:00 hasta las 15:00 · Cartelera principal de 19:00 a 22:00",
    deadline: null,       // ej: "15 de octubre de 2026, 23:59" — null = pendiente
  },

  contacto: {
    instagram: "https://www.instagram.com/xstrike.ec",
    whatsapp: null,       // ej: "https://wa.me/593999999999"
    correo: null,         // ej: "postulaciones@xstrike.ec"
  },

  analytics: {
    gaMeasurementId: null,   // ej: "G-XXXXXXX" — null = no instalar todavía
    metaPixelId: null,       // ej: "1234567890123" — null = no instalar todavía
  },

  // Disciplinas habilitadas para X-Strike — solo estas dos, confirmado.
  disciplinas: [
    "Muay Thai",
    "Kickboxing",
  ],

  // Datos de pago de inscripción — solo se piden DESPUÉS de aceptar a un peleador
  // (ver pago.html). Tomado del formulario anterior del equipo — confirma que
  // sigan siendo correctos antes de publicar.
  pago: {
    monto: 20,
    moneda: "USD",
    banco: "Cooperativa JEP",
    titular: "Juan Alfredo Ordoñez Jaramillo",
    cedula: "0106643125",
    tipoCuenta: "Cuenta de ahorros",
    numeroCuenta: "406135135905",
    whatsappAdmin: "+593992758210", // para dudas sobre el pago, en pago.html
  },

  // Categorías por edad — confirmadas por la organización (las mismas del
  // formulario anterior del equipo, válidas también para Kickboxing).
  categoriasEdad: [
    { id: "Infantil C", min: 5, max: 6 },
    { id: "Infantil B", min: 7, max: 8 },
    { id: "Infantil A", min: 9, max: 10 },
    { id: "Junior C", min: 11, max: 13 },
    { id: "Junior B", min: 14, max: 15 },
    { id: "Junior A", min: 16, max: 17 },
    { id: "Mayores de edad", min: 18, max: 120 },
  ],

  // Categorías de peso (en kg) por grupo de edad — confirmadas por la
  // organización. Cada lista es el techo de cada categoría (ej. en Junior,
  // 52 significa "hasta 52 kg").
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
