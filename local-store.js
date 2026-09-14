/**
 * Almacenamiento LOCAL de postulaciones — solo para pruebas mientras no hay
 * backend configurado (ver config.js -> APPS_SCRIPT_URL).
 *
 * IMPORTANTE: esto guarda los datos únicamente en el navegador de quien llena
 * el formulario (localStorage). Si dos personas distintas llenan el formulario
 * desde dos celulares distintos, cada una ve solo lo suyo — no se juntan en
 * ningún lado. Sirve para probar el flujo en un solo dispositivo, NO para
 * recolectar postulaciones reales de varias personas. Eso requiere el backend
 * de Google Apps Script (ver apps-script/README.md).
 */
window.XStrikeLocalStore = (function () {
  "use strict";

  var KEY = "xstrike_local_postulaciones";

  var COLUMNS = [
    { key: "timestamp", label: "Fecha" },
    { key: "codigo", label: "Código" },
    { key: "nombre", label: "Nombre completo" },
    { key: "nacimiento", label: "Fecha de nacimiento" },
    { key: "genero", label: "Género" },
    { key: "categoriaEdad", label: "Categoría de edad" },
    { key: "ciudad", label: "Ciudad y país" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "correo", label: "Correo" },
    { key: "academia", label: "Academia o equipo" },
    { key: "coach", label: "Coach" },
    { key: "disciplina", label: "Disciplina principal" },
    { key: "peso", label: "Peso (kg)" },
    { key: "categoriaPeso", label: "Categoría de peso" },
    { key: "altura", label: "Altura" },
    { key: "anios", label: "Años de entrenamiento" },
    { key: "experiencia", label: "Experiencia competitiva" },
    { key: "record", label: "Récord" },
    { key: "instagram", label: "Instagram" },
    { key: "highlights", label: "Video / highlights" },
    { key: "disponibilidad", label: "Disponibilidad 31 oct" },
    { key: "estado", label: "Estado" },
    { key: "categoria", label: "Categoría asignada" },
    { key: "proximosPasos", label: "Próximos pasos" },
  ];

  function all() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function persist(rows) {
    localStorage.setItem(KEY, JSON.stringify(rows));
  }

  function save(payload) {
    var rows = all();
    var code = "XS-L" + String(rows.length + 1).padStart(4, "0");
    rows.push({
      timestamp: new Date().toISOString(),
      codigo: code,
      nombre: payload.nombre || "",
      nacimiento: payload.nacimiento || "",
      genero: payload.genero || "",
      categoriaEdad: payload.categoriaEdad || "",
      ciudad: payload.ciudad || "",
      whatsapp: payload.whatsapp || "",
      correo: payload.correo || "",
      academia: payload.academia || "",
      coach: payload.coach || "",
      disciplina: payload.disciplina || "",
      peso: payload.peso || "",
      categoriaPeso: payload.categoriaPeso || "",
      altura: payload.altura || "",
      anios: payload.anios || "",
      experiencia: payload.experiencia || "",
      record: payload.record || "",
      instagram: payload.instagram || "",
      highlights: payload.highlights || "",
      disponibilidad: payload.disponibilidad || "",
      estado: "Pendiente",
      categoria: "",
      proximosPasos: "",
    });
    persist(rows);
    return code;
  }

  function findByCodeOrEmail(query) {
    var q = (query || "").trim().toLowerCase();
    if (!q) return null;
    var rows = all();
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (
        String(r.codigo).toLowerCase() === q ||
        String(r.correo).toLowerCase() === q
      ) {
        return r;
      }
    }
    return null;
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  function toCSV() {
    var rows = all();
    var header = COLUMNS.map(function (c) { return c.label; }).join(",");
    var lines = rows.map(function (r) {
      return COLUMNS.map(function (c) {
        var v = r[c.key] == null ? "" : String(r[c.key]);
        v = v.replace(/"/g, '""');
        return /[",\n]/.test(v) ? '"' + v + '"' : v;
      }).join(",");
    });
    return [header].concat(lines).join("\n");
  }

  return {
    COLUMNS: COLUMNS,
    all: all,
    save: save,
    findByCodeOrEmail: findByCodeOrEmail,
    clear: clear,
    toCSV: toCSV,
  };
})();
