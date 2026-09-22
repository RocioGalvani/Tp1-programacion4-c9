document.addEventListener("DOMContentLoaded", () => {
    const segmentos = window.location.pathname.split("/").filter(Boolean);
    const pagina = (segmentos[segmentos.length - 1] || "index").replace(".html", "");

    if (pagina === "login") {
        initLanding();
    } else if (pagina === "" || pagina === "index") {
        initMenu();
    } else if (pagina === "oficios") {
        initOficios();
    } else if (pagina === "perfiltrabajador") {
        initPerfilTrabajador();
    } else if (pagina === "perfil") {
        initPerfil();
    } else if (pagina === "historialtrabajador") {
        initHistorialTrabajador();
    } else if (pagina === "historial") {
        initHistorial();
    } else if (pagina === "crearpedido" || pagina === "solicitar-servicio") {
        initCrearPedido();
    }
});


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



function initLanding() {

    const btnLogin = document.getElementById("btn-login");
    const btnRegistro = document.getElementById("btn-registro");

    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
}


function initMenu() {

    const usuario = obtenerSesion();

 
    //
    // if (!usuario) {
    //     window.location.href = "login.html";
    //     return;
    // }


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }



    const vistaCliente =
        document.getElementById("vista-cliente");

    const vistaTrabajador =
        document.getElementById("vista-trabajador");



    if (usuario && usuario.rol === "trabajador") {

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



        const bottomNav =
            document.getElementById("bottom-nav");

        if (bottomNav) {

            bottomNav.innerHTML = `
                <ul class="d-flex w-100 justify-content-around list-unstyled mb-0">

                    <li>
                        <a href="index.html" class="nav-link fw-bold text-primary">
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


        if (vistaCliente) {
            vistaCliente.style.display = "block";
        }

        if (vistaTrabajador) {
            vistaTrabajador.style.display = "none";
        }

        const nombreCliente =
            document.getElementById("nombre-cliente");

        if (nombreCliente) {
            nombreCliente.textContent = usuario ? usuario.nombre : "Invitado";
        }
    }
}





function initOficios() {


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }



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



    let categoriaFiltro = "todos";



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



        if (sinResultados) {

            sinResultados.style.display =
                visibles === 0 ? "block" : "none";
        }
    }



    chipsCategoria.forEach((chip) => {

        chip.addEventListener("click", () => {


            chipsCategoria.forEach((c) => {
                c.classList.remove("activo");
            });



            chip.classList.add("activo");



            categoriaFiltro =
                chip.dataset.categoria;



            filtrar();
        });

    });



    if (inputBusqueda) {

        inputBusqueda.addEventListener(
            "input",
            filtrar
        );
    }

    filtrar();
}



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


    const btnCerrarSesion =
        document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });

    }
}



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