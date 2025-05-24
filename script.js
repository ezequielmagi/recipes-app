let recetas = []; // Se llenará desde el backend

function mostrarRecetas(lista) {
  /* en mi HTML tengo el contenedor donde se van a mostrar las recetas
    y lo llamo por su id */
  const contenedor = document.getElementById("lista-recetas");
  /* le asigno un contenido "vacio" en caso que no tengamos ninguna receta */
  contenedor.innerHTML = "";
    /* recorro el array de recetas y por cada receta creo un nuevo elemento
        del DOM, le asigno el contenido y lo añado al contenedor */

    if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron recetas.</p>";
    return;
  }

  lista.forEach((receta) => {
    /* creo un nuevo elemento del DOM */
    const recetaDiv = document.createElement("article");
    /* creo los elementos que van a contener los datos de la receta */
    recetaDiv.innerHTML = `
        <img src="${receta.portada}" alt="${receta.titulo}">
      <h2>${receta.titulo}</h2>
      <h3>Ingredientes:</h3>
      <ul>${receta.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>
      <p><strong>Preparación:</strong> ${receta.instrucciones}</p>
    `;
    /* ese elemento que he creado con la data se lo asigno como hijo a CONTENEDOR */
    contenedor.appendChild(recetaDiv);
  });
}

function filtrarRecetas(evento) {
  const texto = evento.target.value.toLowerCase();
  const resultados = recetas.filter(receta =>
    receta.titulo.toLowerCase().includes(texto)
  );
  mostrarRecetas(resultados);
}

// document.addEventListener("DOMContentLoaded", () => {
//   mostrarRecetas(recetas);

//   const inputBuscador = document.getElementById("buscador");
//   inputBuscador.addEventListener("input", filtrarRecetas);
// });

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/api/recetas')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo obtener las recetas');
      return response.json();
    })
    .then(data => {
      recetas = data;
      mostrarRecetas(recetas);
    })
    .catch(error => {
      console.error(error);
      const contenedor = document.getElementById("lista-recetas");
      contenedor.innerHTML = "<p>Error al cargar recetas.</p>";
    });

  const inputBuscador = document.getElementById("buscador");
  inputBuscador.addEventListener("input", filtrarRecetas);
});

/* dark mode */
const btnModoOscuro = document.getElementById("modo-oscuro-toggle");

// Función para actualizar el ícono y tooltip según el modo actual
function actualizarBotonModo() {
  const esModoOscuro = document.body.classList.contains("modo-oscuro");
  btnModoOscuro.textContent = esModoOscuro ? "☀️" : "🌙";
  btnModoOscuro.title = esModoOscuro ? "Modo claro" : "Modo oscuro";
  btnModoOscuro.style.color = esModoOscuro ? "#f5c85c" : "#333";
}

// Leer el modo almacenado al cargar
document.addEventListener("DOMContentLoaded", () => {
  const modoGuardado = localStorage.getItem("modo-oscuro");
  if (modoGuardado === "true") {
    document.body.classList.add("modo-oscuro");
  }

  actualizarBotonModo();

  btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    // Guardar el modo actual
    const modoActual = document.body.classList.contains("modo-oscuro");
    localStorage.setItem("modo-oscuro", modoActual);

    actualizarBotonModo();
  });
});

