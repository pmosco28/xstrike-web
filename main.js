(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  /* ================= Reveal on scroll ================= */
  var revealEls = document.querySelectorAll(".reveal, .reason-card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ================= Sticky CTA ================= */
  var stickyCta = document.getElementById("sticky-cta");
  var hero = document.getElementById("hero");
  var formSection = document.getElementById("formulario");
  if (stickyCta && hero) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          stickyCta.classList.toggle("show", pastHero);
        });
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);

    if (formSection) {
      var formObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) stickyCta.classList.remove("show");
          });
        },
        { threshold: 0.3 }
      );
      formObserver.observe(formSection);
    }
  }

  /* ================= FAQ ================= */
  var FAQ_DATA = [
    {
      q: "¿Enviar el formulario garantiza que voy a competir?",
      a: "No. Cada postulación será revisada antes de confirmar la participación y el enfrentamiento correspondiente.",
    },
    {
      q: "¿Todos los seleccionados competirán por un cinturón?",
      a: "No. X-Strike tendrá cuatro cinturones en juego. La organización definirá las peleas titulares según categoría, experiencia, perfil y compatibilidad deportiva.",
    },
    {
      q: "¿Puedo enfrentar a un peleador internacional?",
      a: "La cartelera contará con peleadores internacionales, pero la postulación no garantiza un enfrentamiento específico. El matchmaking será definido por la organización.",
    },
    {
      q: "¿Cómo funcionan los premios económicos?",
      a: "Los campeones recibirán premios económicos. Los montos, condiciones y peleas aplicables se comunicarán en la información oficial del evento.",
    },
    {
      q: "¿Puedo postular si todavía no he competido?",
      a: "Sí, siempre que entrenes formalmente y tu coach considere que estás listo para dar el paso. El equipo evaluará cada perfil antes de continuar el proceso.",
    },
    {
      q: "¿Qué información debo enviar?",
      a: "Datos personales y de contacto, academia, coach, disciplina, peso o categoría, experiencia competitiva y enlaces a material deportivo.",
    },
    {
      q: "¿Qué disciplinas y categorías estarán habilitadas?",
      a: "Respuesta pendiente de confirmación por parte de la organización.",
    },
    {
      q: "¿Hasta cuándo puedo postular?",
      a: "Fecha y hora límite pendientes de confirmación.",
    },
    {
      q: "¿Cuándo recibiré una respuesta?",
      a: "Tiempo de respuesta pendiente de confirmación.",
    },
    {
      q: "¿El evento cubre transporte u hospedaje?",
      a: "Respuesta pendiente de confirmación.",
    },
    {
      q: "¿Dónde se realizará X-Strike?",
      a: "Venue pendiente de confirmación.",
    },
  ];

  var faqList = document.getElementById("faq-list");
  if (faqList) {
    FAQ_DATA.forEach(function (item, i) {
      var el = document.createElement("div");
      el.className = "faq-item";
      el.innerHTML =
        '<button type="button" class="faq-q" aria-expanded="false">' +
        "<span>" + item.q + "</span>" +
        '<span class="icon"></span>' +
        "</button>" +
        '<div class="faq-a"><p>' + item.a + "</p></div>";
      faqList.appendChild(el);
      var btn = el.querySelector(".faq-q");
      btn.addEventListener("click", function () {
        var isOpen = el.classList.contains("open");
        faqList.querySelectorAll(".faq-item.open").forEach(function (openEl) {
          openEl.classList.remove("open");
          openEl.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          el.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ================= Footer links (desde config.js) ================= */
  var footerLinks = document.getElementById("footer-links");
  if (footerLinks) {
    var contacto = CFG.contacto || {};
    var links = [];
    if (contacto.instagram) links.push({ label: "Instagram", href: contacto.instagram });
    if (contacto.whatsapp) links.push({ label: "WhatsApp", href: contacto.whatsapp });
    if (contacto.correo) links.push({ label: "Correo", href: "mailto:" + contacto.correo });

    if (links.length) {
      links.forEach(function (l) {
        var a = document.createElement("a");
        a.href = l.href;
        a.textContent = l.label;
        a.target = "_blank";
        a.rel = "noopener";
        footerLinks.appendChild(a);
      });
    } else {
      var pending = document.createElement("span");
      pending.className = "pending";
      pending.title = "Pendiente de confirmar";
      pending.textContent = "Instagram · WhatsApp · Correo (pendientes)";
      footerLinks.appendChild(pending);
    }
  }

  /* ================= Formulario multi-paso ================= */
  var form = document.getElementById("xstrike-form");
  if (!form) return;

  // Disciplinas desde config.js
  var disciplinaSelect = document.getElementById("disciplina");
  if (disciplinaSelect && CFG.disciplinas) {
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Selecciona una disciplina";
    placeholder.disabled = true;
    placeholder.selected = true;
    disciplinaSelect.appendChild(placeholder);
    CFG.disciplinas.forEach(function (d) {
      var opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      disciplinaSelect.appendChild(opt);
    });
  }

  // País desde countries.js (lista fija, ver ese archivo).
  var paisSelect = document.getElementById("pais");
  if (paisSelect && window.XSTRIKE_COUNTRIES) {
    window.XSTRIKE_COUNTRIES.forEach(function (pais) {
      var opt = document.createElement("option");
      opt.value = pais;
      opt.textContent = pais;
      if (pais === "Ecuador") opt.selected = true;
      paisSelect.appendChild(opt);
    });
  }

  /* ================= Categoría de edad y de peso (automáticas) ================= */
  var categoriaEdadActual = null;

  function calcularEdad(fechaStr) {
    var nacimiento = new Date(fechaStr + "T00:00:00");
    if (isNaN(nacimiento.getTime())) return null;
    var hoy = new Date();
    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  }

  function categoriaPorEdad(edad) {
    var lista = CFG.categoriasEdad || [];
    for (var i = 0; i < lista.length; i++) {
      if (edad >= lista[i].min && edad <= lista[i].max) return lista[i];
    }
    return null;
  }

  var LB_A_KG = 0.453592;

  function pesoEnKg() {
    var pesoInput = document.getElementById("peso");
    var unidad = document.querySelector('input[name="unidadPeso"]:checked');
    var valor = parseFloat(pesoInput.value);
    if (!valor) return null;
    return unidad && unidad.value === "lb" ? valor * LB_A_KG : valor;
  }

  function sugerirUmbral(tabla, pesoKg) {
    for (var i = 0; i < tabla.length; i++) {
      if (pesoKg <= tabla[i]) return tabla[i];
    }
    return tabla[tabla.length - 1];
  }

  var categoriaPesoTocadaManualmente = false;

  function poblarCategoriaPeso(categoriaEdadId, pesoKg) {
    var select = document.getElementById("categoria-peso");
    var tabla = (CFG.categoriasPeso || {})[categoriaEdadId];

    if (!categoriaEdadId || !tabla) {
      select.innerHTML = '<option value="">Completa fecha de nacimiento y peso primero</option>';
      select.disabled = true;
      categoriaPesoTocadaManualmente = false;
      return;
    }

    var sugerido = pesoKg ? sugerirUmbral(tabla, pesoKg) : null;
    // Solo cuenta como "elección manual" si el usuario ya tocó el desplegable
    // alguna vez — evita confundir el valor por defecto del navegador (la
    // primera opción, antes de que exista una sugerencia) con una elección real.
    var valorPrevio = categoriaPesoTocadaManualmente ? select.value : null;

    select.innerHTML = "";
    tabla.forEach(function (umbral, i) {
      var opt = document.createElement("option");
      var esUltimo = i === tabla.length - 1;
      opt.value = "Hasta " + umbral + " kg";
      opt.textContent = "Hasta " + umbral + " kg";
      select.appendChild(opt);
      if (esUltimo) {
        var optMas = document.createElement("option");
        optMas.value = "Más de " + umbral + " kg";
        optMas.textContent = "Más de " + umbral + " kg";
        select.appendChild(optMas);
      }
    });
    select.disabled = false;

    if (valorPrevio && Array.prototype.some.call(select.options, function (o) { return o.value === valorPrevio; })) {
      select.value = valorPrevio;
    } else if (sugerido) {
      select.value = "Hasta " + sugerido + " kg";
    }
  }

  function actualizarCategorias() {
    var nacimientoInput = document.getElementById("nacimiento");
    var edadHint = document.getElementById("edad-hint");
    var pesoHint = document.getElementById("peso-hint");

    var edad = nacimientoInput.value ? calcularEdad(nacimientoInput.value) : null;
    var cat = edad !== null && edad >= 0 ? categoriaPorEdad(edad) : null;
    categoriaEdadActual = cat;

    if (cat) {
      edadHint.textContent = "Categoría por edad: " + cat.id + " (" + edad + " años)";
      edadHint.hidden = false;
    } else {
      edadHint.hidden = true;
    }

    var pesoKg = pesoEnKg();
    poblarCategoriaPeso(cat ? cat.id : null, pesoKg);
    pesoHint.hidden = !(cat && pesoKg);
  }

  var nacimientoField = document.getElementById("nacimiento");
  var pesoField = document.getElementById("peso");
  if (nacimientoField) nacimientoField.addEventListener("change", actualizarCategorias);
  if (pesoField) pesoField.addEventListener("input", actualizarCategorias);
  document.querySelectorAll('input[name="unidadPeso"]').forEach(function (r) {
    r.addEventListener("change", actualizarCategorias);
  });
  var categoriaPesoSelect = document.getElementById("categoria-peso");
  if (categoriaPesoSelect) {
    categoriaPesoSelect.addEventListener("change", function () {
      categoriaPesoTocadaManualmente = true;
    });
  }

  /* ================= Limpieza automática del WhatsApp ================= */
  function limpiarWhatsApp(raw, pais) {
    var v = (raw || "").trim();
    if (!v) return v;
    var digits = v.replace(/[^\d+]/g, "");
    if (pais === "Ecuador") {
      var local = digits.replace(/^\+?593/, "").replace(/^0+/, "");
      return "+593" + local;
    }
    // Genérico (cualquier otro país): solo limpia formato, sin adivinar ni
    // recortar dígitos — cada país tiene sus propias reglas de marcado y no
    // las conocemos todas.
    if (digits.indexOf("00") === 0) digits = "+" + digits.slice(2);
    if (digits.indexOf("+") !== 0) digits = "+" + digits;
    return digits;
  }

  var whatsappField = document.getElementById("whatsapp");
  if (whatsappField) {
    whatsappField.addEventListener("blur", function () {
      if (!whatsappField.value.trim()) return;
      var paisVal = paisSelect ? paisSelect.value : "";
      var limpio = limpiarWhatsApp(whatsappField.value, paisVal);
      var hint = document.getElementById("whatsapp-hint");
      if (limpio !== whatsappField.value.trim()) {
        whatsappField.value = limpio;
        hint.textContent = "Ajustamos el formato a " + limpio;
        hint.hidden = false;
      } else {
        hint.hidden = true;
      }
    });
  }

  var steps = Array.prototype.slice.call(form.querySelectorAll(".form-step"));
  var progressEls = Array.prototype.slice.call(document.querySelectorAll("#form-progress span"));
  var currentStep = 1;

  function showStep(n) {
    steps.forEach(function (s) {
      s.classList.toggle("active", parseInt(s.dataset.step, 10) === n);
    });
    progressEls.forEach(function (p) {
      var step = parseInt(p.dataset.step, 10);
      p.classList.toggle("active", step === n);
      p.classList.toggle("done", step < n);
    });
    currentStep = n;
    var shell = document.querySelector(".form-shell");
    if (shell) shell.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(n) {
    var stepEl = steps[n - 1];
    var valid = true;

    var fields = stepEl.querySelectorAll("input[required], select[required], textarea[required]");
    fields.forEach(function (field) {
      if (field.type === "radio") return; // handled separately
      var wrapper = field.closest(".field");
      // Un <select> disabled se considera "válido" aunque esté vacío — hay
      // que exigir explícitamente que tenga valor antes de continuar.
      var ok = field.disabled ? false : (field.checkValidity() && field.value !== "");
      if (wrapper) wrapper.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });

    // Radio groups: genero, disponibilidad
    [
      { group: "genero-group", name: "genero", errorId: "genero-error" },
      { group: "disponibilidad-group", name: "disponibilidad", errorId: "disponibilidad-error" },
    ].forEach(function (cfg) {
      var radioGroup = stepEl.querySelector("#" + cfg.group);
      if (!radioGroup) return;
      var checked = stepEl.querySelector('input[name="' + cfg.name + '"]:checked');
      var err = document.getElementById(cfg.errorId);
      if (!checked) {
        valid = false;
        if (err) err.style.display = "block";
      } else if (err) {
        err.style.display = "none";
      }
    });

    // Checkboxes step 4
    if (n === 4) {
      var checks = stepEl.querySelectorAll('input[type="checkbox"][required]');
      var allChecked = true;
      checks.forEach(function (c) { if (!c.checked) allChecked = false; });
      var checksError = document.getElementById("checks-error");
      if (!allChecked) {
        valid = false;
        if (checksError) checksError.style.display = "block";
      } else if (checksError) {
        checksError.style.display = "none";
      }
    }

    return valid;
  }

  form.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    });
  });
  form.querySelectorAll("[data-prev]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showStep(currentStep - 1);
    });
  });

  // Radio pill visual state
  document.querySelectorAll(".radio-pill input").forEach(function (input) {
    input.addEventListener("change", function () {
      document.querySelectorAll(".radio-pill").forEach(function (pill) {
        pill.classList.toggle("checked", pill.querySelector("input").checked);
      });
    });
  });

  /* ================= Submit ================= */
  var submittingEl = document.getElementById("form-submitting");
  var resultEl = document.getElementById("form-result");
  var errorStateEl = document.getElementById("form-error-state");
  var codeEl = document.getElementById("form-code");
  var retryBtn = document.getElementById("form-retry");

  function collectPayload() {
    var data = new FormData(form);
    var payload = {};
    data.forEach(function (value, key) {
      payload[key] = value;
    });

    // Combina país + ciudad en un solo campo (mantiene compatible la columna
    // "Ciudad y país" del Sheet sin tener que migrar el backend).
    if (payload.pais) {
      payload.ciudad = (payload.ciudad || "") + ", " + payload.pais;
      delete payload.pais;
    }

    // El peso siempre se guarda en kg, sin importar en qué unidad lo haya
    // escrito la persona (se convierte antes de enviarlo).
    var kg = pesoEnKg();
    if (kg) payload.peso = kg.toFixed(1);
    delete payload.unidadPeso;

    if (categoriaEdadActual) {
      payload.categoriaEdad = categoriaEdadActual.id;
    }

    payload.origen = "landing-x-strike";
    payload.userAgent = navigator.userAgent;
    return payload;
  }

  function setView(view) {
    form.hidden = view !== "form";
    submittingEl.hidden = view !== "submitting";
    resultEl.hidden = view !== "result";
    errorStateEl.hidden = view !== "error";
  }

  function backendConfigured() {
    return CFG.APPS_SCRIPT_URL && CFG.APPS_SCRIPT_URL.indexOf("http") === 0;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateStep(4)) return;

    var payload = collectPayload();

    // Sin backend real todavía: guarda localmente (solo en este navegador,
    // ver local-store.js) para poder probar el flujo completo mientras tanto.
    if (!backendConfigured()) {
      if (!window.XStrikeLocalStore) {
        alert(
          "Falta configurar la URL del backend en config.js (APPS_SCRIPT_URL). " +
          "Revisa apps-script/README.md para desplegarlo."
        );
        return;
      }
      setView("submitting");
      setTimeout(function () {
        var code = window.XStrikeLocalStore.save(payload);
        codeEl.textContent = code;
        var note = document.getElementById("local-mode-note");
        if (note) note.hidden = false;
        setView("result");
      }, 400);
      return;
    }

    setView("submitting");

    fetch(CFG.APPS_SCRIPT_URL, {
      method: "POST",
      // text/plain evita el preflight CORS que Apps Script no maneja.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.ok) {
          codeEl.textContent = data.code || "—";
          setView("result");
        } else {
          setView("error");
        }
      })
      .catch(function () {
        setView("error");
      });
  });

  if (retryBtn) {
    retryBtn.addEventListener("click", function () {
      setView("form");
    });
  }
})();
