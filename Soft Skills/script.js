document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contacto form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el envío del formulario
    document.body.classList.toggle("dark-theme"); // Alterna entre claro y oscuro
  });
});




function cambiarIdioma() {
    document.getElementById("titulo").textContent = "Soft Skills";
    document.getElementById("descripcion").textContent = "Adaptability, communication, empathy, and teamwork.";
}
