
// ======================================
// TELARAÑA DIGITAL - BIBLIOTECA
// ======================================

const proyectos = [
    {
        nombre: "Veterinaria Patitas",
        categoria: "videojuegos",
        descripcion: "Simulador de veterinaria donde puedes atender mascotas y administrar una clínica.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        icono: "🐾",
        demo: "",
        codigo: ""
    },
    {
        nombre: "Andy Mart",
        categoria: "videojuegos",
        descripcion: "Videojuego de supermercado con una protagonista llamada Andy.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        icono: "🛒",
        demo: "",
        codigo: ""
    },
    {
        nombre: "Smithereens",
        categoria: "web",
        descripcion: "Página web inspirada en el universo visual de Twenty One Pilots.",
        tecnologias: ["HTML", "CSS"],
        icono: "🎧",
        demo: "https://spring-fog-d41e.gavodelangel.workers.dev/",
        codigo: "https://spring-fog-d41e.gavodelangel.workers.dev/"
    },
    {
        nombre: "Feliz cumpleaños yayey",
        categoria: "web",
        descripcion: "Una página web especial de felicitación con diseño personalizado.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        icono: "🎂",
        demo: "",
        codigo: ""
    }
];

const lista = document.getElementById("lista-proyectos");
const buscador = document.getElementById("buscador");
const contador = document.getElementById("contador");
const sinResultados = document.getElementById("sin-resultados");

let categoriaActual = "todos";

function mostrarProyectos() {

    const busqueda = buscador.value.toLowerCase();

    const resultados = proyectos.filter(proyecto => {

        const coincideCategoria =
            categoriaActual === "todos" ||
            proyecto.categoria === categoriaActual;

        const coincideBusqueda =
            proyecto.nombre.toLowerCase().includes(busqueda) ||
            proyecto.descripcion.toLowerCase().includes(busqueda) ||
            proyecto.tecnologias.join(" ").toLowerCase().includes(busqueda);

        return coincideCategoria && coincideBusqueda;
    });

    lista.innerHTML = "";

    contador.textContent =
        `${resultados.length} PROYECTOS`;

    sinResultados.hidden = resultados.length !== 0;

    resultados.forEach(proyecto => {

        const tarjeta = document.createElement("article");
        tarjeta.className = "project-card";

        const tecnologias = proyecto.tecnologias
            .map(tec => `<span>${tec}</span>`)
            .join("");

        tarjeta.innerHTML = `
            <div class="project-image">
                ${proyecto.icono}
            </div>

            <div class="project-info">

                <span class="project-category">
                    ${proyecto.categoria}
                </span>

                <h3>${proyecto.nombre}</h3>

                <p>${proyecto.descripcion}</p>

                <div class="technologies">
                    ${tecnologias}
                </div>

                <div class="project-actions">
                    <a href="${proyecto.demo || '#'}"
                       class="demo-button">
                       Ver proyecto ↗
                    </a>

                    <a href="${proyecto.codigo || '#'}"
                       class="code-button">
                       Ver código
                    </a>
                </div>

            </div>
        `;

        tarjeta.querySelector(".demo-button")
            .addEventListener("click", function(event) {
                if (!proyecto.demo) {
                    event.preventDefault();
                    alert("Este proyecto todavía no tiene una demostración publicada.");
                }
            });

        tarjeta.querySelector(".code-button")
            .addEventListener("click", function(event) {
                if (!proyecto.codigo) {
                    event.preventDefault();
                    alert("Próximamente encontrarás aquí el código fuente.");
                }
            });

        lista.appendChild(tarjeta);
    });
}

// Buscador
buscador.addEventListener("input", mostrarProyectos);

// Filtros
document.querySelectorAll(".filter").forEach(boton => {

    boton.addEventListener("click", () => {

        document.querySelector(".filter.active")
            ?.classList.remove("active");

        boton.classList.add("active");

        categoriaActual = boton.dataset.category;

        mostrarProyectos();
    });
});

// Mostrar proyectos al iniciar
mostrarProyectos();
