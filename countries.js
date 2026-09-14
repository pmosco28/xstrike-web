/**
 * Lista de países (español) para el desplegable "País de residencia".
 * Un desplegable de CIUDADES del mundo entero no es viable sin conectar una
 * base de datos externa (son cientos de miles) — por eso el país es
 * desplegable y la ciudad/provincia queda como texto libre.
 */
window.XSTRIKE_COUNTRIES = [
  "Ecuador", "Colombia", "Perú", "México", "Argentina", "Chile", "Venezuela",
  "Bolivia", "Paraguay", "Uruguay", "Brasil", "Panamá", "Costa Rica",
  "Guatemala", "Honduras", "El Salvador", "Nicaragua", "República Dominicana",
  "Cuba", "Puerto Rico", "Estados Unidos", "Canadá", "España", "Portugal",
  "Francia", "Italia", "Alemania", "Reino Unido", "Irlanda", "Países Bajos",
  "Bélgica", "Suiza", "Austria", "Suecia", "Noruega", "Dinamarca", "Finlandia",
  "Polonia", "República Checa", "Grecia", "Rusia", "Ucrania", "Turquía",
  "China", "Japón", "Corea del Sur", "Tailandia", "Filipinas", "India",
  "Indonesia", "Vietnam", "Malasia", "Singapur", "Australia", "Nueva Zelanda",
  "Sudáfrica", "Marruecos", "Egipto", "Nigeria", "Israel",
  "Otro país",
].sort((a, b) => a === "Otro país" ? 1 : b === "Otro país" ? -1 : a.localeCompare(b, "es"));
