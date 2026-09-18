// =========================================================
// OFIGO — JAVASCRIPT GENERAL
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const rutaActual = window.location.pathname;

    if (
        rutaActual.includes("index.html") ||
        rutaActual === "/" ||
        rutaActual.endsWith("/")
    ) {
        initLanding();

    } else if (rutaActual.includes("menu.html")) {
        initMenu();

    } else if (rutaActual.includes("oficios.html")) {
        initOficios();

    } else if (
        rutaActual.includes("perfil.html") ||
        rutaActual === "/perfil"
    ) {
        initPerfil();

    } else if (
        rutaActual.includes("perfiltrabajador.html") ||
        rutaActual.startsWith("/perfiltrabajador")
    ) {
        initPerfilTrabajador();

    } else if (rutaActual.includes("historialtrabajador.html")) {
        initHistorialTrabajador();

    } else if (rutaActual.includes("historial.html")) {
        initHistorial();

    } else if (
        rutaActual.includes("crearpedido.html") ||
        rutaActual.includes("solicitar-servicio.html")
    ) {
        initCrearPedido();
    }
});


// =========================================================
// SESIÓN
// =========================================================

function obtenerSesion() {
    const sesion = localStorage.getItem("oficioya-sesion");

    if (!sesion) {
        return null;
    }

    try {
        return JSON.parse(sesion);
    } catch (error) {
        console.error("Error al leer la sesión:", error);
        return null;
    }
}


function cerrarSesion() {
    localStorage.removeItem("oficioya-sesion");
    window.location.href = "index.html";
}


// =========================================================
// LANDING / LOGIN
// =========================================================

function initLanding() {

    const btnLogin = document.getElementById("btn-login");
    const btnRegistro = document.getElementById("btn-registro");

    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            window.location.href = "menu.html";
        });
    }

    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            window.location.href = "menu.html";
        });
    }
}


// =========================================================
// MENÚ PRINCIPAL
// =========================================================

function initMenu() {

    const usuario = obtenerSesion();

    // Si no hay sesión, vuelve al inicio
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // ---------- CERRAR SESIÓN ----------

    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }


    // ---------- VISTAS ----------

    const vistaCliente =
        document.getElementById("vista-cliente");

    const vistaTrabajador =
        document.getElementById("vista-trabajador");


    // ---------- TRABAJADOR ----------

    if (usuario.rol === "trabajador") {

        if (vistaCliente) {
            vistaCliente.style.display = "none";
        }

        if (vistaTrabajador) {
            vistaTrabajador.style.display = "block";
        }

        const nombreTrabajador =
            document.getElementById("nombre-trabajador");

        if (nombreTrabajador) {
            nombreTrabajador.textContent = usuario.nombre;
        }


        // Barra inferior del trabajador

        const bottomNav =
            document.getElementById("bottom-nav");

        if (bottomNav) {

            bottomNav.innerHTML = `
                <ul class="d-flex w-100 justify-content-around list-unstyled mb-0">

                    <li>
                        <a href="menu.html" class="nav-link fw-bold text-primary">
                            <img src="img/house.png"
                                 alt="Inicio"
                                 class="icono-home">
                            Inicio
                        </a>
                    </li>

                    <li>
                        <a href="historialtrabajador.html" class="nav-link">
                            <img src="img/completed-task.png"
                                 alt="Pedidos"
                                 class="icono-home">
                            Pedidos
                        </a>
                    </li>

                    <li>
                        <a href="perfil.html" class="nav-link">
                            <img src="img/user.png"
                                 alt="Perfil"
                                 class="icono-home">
                            Perfil
                        </a>
                    </li>

                </ul>
            `;
        }

    } else {

        // ---------- CLIENTE ----------

        if (vistaCliente) {
            vistaCliente.style.display = "block";
        }

        if (vistaTrabajador) {
            vistaTrabajador.style.display = "none";
        }

        const nombreCliente =
            document.getElementById("nombre-cliente");

        if (nombreCliente) {
            nombreCliente.textContent = usuario.nombre;
        }
    }
}


// =========================================================
// OFICIOS / BÚSQUEDA Y FILTROS
// =========================================================

function initOficios() {

    // ---------- CERRAR SESIÓN ----------

    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }


    // ---------- ELEMENTOS ----------

    const inputBusqueda =
        document.getElementById("input-busqueda");

    const chipsCategoria =
        document.querySelectorAll(".chip-categoria");

    const listaProf =
        document.getElementById("lista-profesionales");

    const tarjetas = listaProf
        ? listaProf.querySelectorAll("article[data-categoria]")
        : [];

    const sinResultados =
        document.getElementById("sin-resultados");


    // Categoría seleccionada

    let categoriaFiltro = "todos";


    // ---------- CATEGORÍA DESDE LA URL ----------

    const urlParams =
        new URLSearchParams(window.location.search);

    const categoriaURL =
        urlParams.get("categoria");

    if (categoriaURL) {

        categoriaFiltro = categoriaURL;

        chipsCategoria.forEach((chip) => {

            chip.classList.toggle(
                "activo",
                chip.dataset.categoria === categoriaURL
            );

        });
    }


    // ---------- FUNCIÓN FILTRAR ----------

    function filtrar() {

        const texto = inputBusqueda
            ? inputBusqueda.value.trim().toLowerCase()
            : "";

        let visibles = 0;


        tarjetas.forEach((tarjeta) => {

            const categoria =
                tarjeta.dataset.categoria || "";

            const nombre =
                tarjeta.dataset.nombre
                    ? tarjeta.dataset.nombre.toLowerCase()
                    : "";


            const coincideCategoria =
                categoriaFiltro === "todos" ||
                categoria === categoriaFiltro;


            const coincideBusqueda =
                !texto ||
                nombre.includes(texto) ||
                categoria.toLowerCase().includes(texto);


            if (coincideCategoria && coincideBusqueda) {

                tarjeta.style.display = "";
                visibles++;

            } else {

                tarjeta.style.display = "none";
            }

        });


        // Mostrar / ocultar mensaje

        if (sinResultados) {

            sinResultados.style.display =
                visibles === 0 ? "block" : "none";
        }
    }


    // ---------- BOTONES DE CATEGORÍA ----------

    chipsCategoria.forEach((chip) => {

        chip.addEventListener("click", () => {

            // Quitar activo de todos

            chipsCategoria.forEach((c) => {
                c.classList.remove("activo");
            });


            // Activar el seleccionado

            chip.classList.add("activo");


            // Guardar categoría

            categoriaFiltro =
                chip.dataset.categoria;


            // Aplicar filtro

            filtrar();
        });

    });


    // ---------- BUSCADOR ----------

    if (inputBusqueda) {

        inputBusqueda.addEventListener(
            "input",
            filtrar
        );
    }


    // Filtrar al cargar la página

    filtrar();
}


// =========================================================
// PERFIL
// =========================================================

function initPerfil() {

    const usuario = obtenerSesion();

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }


    const nombre =
        document.getElementById("perfil-nombre");

    const email =
        document.getElementById("perfil-email");

    const rol =
        document.getElementById("perfil-rol");


    if (nombre) {
        nombre.textContent = usuario.nombre || "";
    }

    if (email) {
        email.textContent = usuario.email || "";
    }

    if (rol) {
        rol.textContent = usuario.rol || "";
    }


    // Cerrar sesión

    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });

    }
}


// =========================================================
// PERFIL DEL TRABAJADOR
// =========================================================

function initPerfilTrabajador() {

    const usuario = obtenerSesion();

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }


    const contenido =
        document.getElementById("contenido-perfil");

    if (contenido) {

        contenido.innerHTML = `
            <h2>${usuario.nombre || "Profesional"}</h2>
            <p><strong>Email:</strong> ${usuario.email || ""}</p>
            <p><strong>Rol:</strong> ${usuario.rol || ""}</p>
        `;
    }


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });

    }
}


// =========================================================
// HISTORIAL DEL TRABAJADOR
// =========================================================

function initHistorialTrabajador() {

    const usuario = obtenerSesion();

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });

    }
}


// =========================================================
// HISTORIAL DEL CLIENTE
// =========================================================

function initHistorial() {

    const usuario = obtenerSesion();

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });

    }
}


// =========================================================
// CREAR PEDIDO
// =========================================================

function initCrearPedido() {

    const usuario = obtenerSesion();

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });

    }
}