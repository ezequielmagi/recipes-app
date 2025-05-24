const recetas = [
  {
    id: 1,
    titulo: "Tortilla de Patatas",
    portada: "./img/tortilladepapas.png",
    ingredientes: ["Patatas", "Huevos", "Aceite", "Sal"],
    instrucciones: "Pelar, cortar y freír las patatas. Batir huevos y mezclar."
  },
  {
    id: 2,
    titulo: "Ensalada César",
    portada: "./img/ensaladaceasar.png",
    ingredientes: ["Lechuga", "Pollo", "Queso", "Aderezo César"],
    instrucciones: "Mezclar todos los ingredientes y servir."
},
{
    id: 3,
    titulo: "Spaghetti Bolognesa",
    portada: "./img/spagettibolognesa.png",
    ingredientes: ["Spaghetti", "Carne", "Tomate", "Cebolla", "Ajo"],
    instrucciones: "Cocinar la pasta y preparar la salsa con los ingredientes."
  }
];

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

document.addEventListener("DOMContentLoaded", () => {
  mostrarRecetas(recetas);

  const inputBuscador = document.getElementById("buscador");
  inputBuscador.addEventListener("input", filtrarRecetas);
});

/* dark mode */
const btnModoOscuro = document.getElementById("modo-oscuro-toggle");
btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");

  // Cambia ícono y texto según el modo
  if (document.body.classList.contains("modo-oscuro")) {
    btnModoOscuro.textContent = "☀️";
  } else {
    btnModoOscuro.textContent = "🌙";
  }
});
