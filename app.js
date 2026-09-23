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

    if (pagina !== "login") {
        initAyuda();
    }
});


// Profesionales cargados (datos de prueba para la búsqueda y el perfil)
const PROFESIONALES = [
    { id: 1, nombre: "Carlos Medina", oficio: "Electricista Matriculado", categoria: "Electricidad", rating: 4.8, resenas: 23, distancia: "2.1 km", llegada: "~15 min", precio: 4500, disponible: true, tags: ["Instalaciones", "Tableros"], zona: "San Miguel de Tucumán", descripcion: "Más de 10 años haciendo instalaciones eléctricas domiciliarias y comerciales. Trabajo con materiales certificados." },
    { id: 2, nombre: "Mónica Paz", oficio: "Plomera Especialista", categoria: "Plomería", rating: 4.9, resenas: 31, distancia: "3.2 km", llegada: "~20 min", precio: 5000, disponible: true, tags: ["Pérdidas", "Destapes"], zona: "Yerba Buena", descripcion: "Reparación de pérdidas, destapes y cambio de griferías. Atención de urgencias en el día." },
    { id: 3, nombre: "Jorge Álvarez", oficio: "Electricista", categoria: "Electricidad", rating: 4.5, resenas: 12, distancia: "4.0 km", llegada: "~25 min", precio: 4000, disponible: false, tags: ["Cortocircuitos", "Iluminación"], zona: "Banda del Río Salí", descripcion: "Detección de fallas, cortocircuitos e instalación de luminarias LED." },
    { id: 4, nombre: "Lucía Herrera", oficio: "Gasista y Plomera", categoria: "Plomería", rating: 4.7, resenas: 18, distancia: "1.8 km", llegada: "~10 min", precio: 5200, disponible: true, tags: ["Termotanques", "Cañerías"], zona: "San Miguel de Tucumán", descripcion: "Instalación y service de termotanques, cambio de cañerías y conexiones de gas." },
    { id: 5, nombre: "Ramón Díaz", oficio: "Pintor de Interiores", categoria: "Pintura", rating: 4.6, resenas: 27, distancia: "2.7 km", llegada: "~20 min", precio: 3800, disponible: true, tags: ["Interiores", "Empapelado"], zona: "Yerba Buena", descripcion: "Pintura de interiores, reparación de humedad y colocación de empapelado." },
    { id: 6, nombre: "Valeria Gómez", oficio: "Pintora Profesional", categoria: "Pintura", rating: 4.9, resenas: 40, distancia: "5.1 km", llegada: "~30 min", precio: 4200, disponible: true, tags: ["Frentes", "Impermeabilización"], zona: "Tafí Viejo", descripcion: "Pintura de frentes, rejas y techos. Impermeabilización de terrazas." },
    { id: 7, nombre: "Héctor Ruiz", oficio: "Albañil", categoria: "Albañilería", rating: 4.4, resenas: 15, distancia: "3.9 km", llegada: "~25 min", precio: 4000, disponible: true, tags: ["Revoques", "Contrapisos"], zona: "Alderetes", descripcion: "Revoques, contrapisos, colocación de cerámicos y pequeñas ampliaciones." },
    { id: 8, nombre: "Diego Juárez", oficio: "Maestro Mayor de Obras", categoria: "Albañilería", rating: 4.8, resenas: 22, distancia: "6.3 km", llegada: "~35 min", precio: 6000, disponible: false, tags: ["Ampliaciones", "Refacciones"], zona: "San Miguel de Tucumán", descripcion: "Dirección y ejecución de refacciones completas y ampliaciones de viviendas." },
    { id: 9, nombre: "Sergio Luna", oficio: "Técnico en Refrigeración", categoria: "Climatizacion y Refrigeración", rating: 4.7, resenas: 34, distancia: "2.4 km", llegada: "~15 min", precio: 5500, disponible: true, tags: ["Aires acondicionados", "Heladeras"], zona: "San Miguel de Tucumán", descripcion: "Instalación y mantenimiento de aires acondicionados split. Carga de gas y reparación de heladeras." },
    { id: 10, nombre: "Paula Ibáñez", oficio: "Técnica en Climatización", categoria: "Climatizacion y Refrigeración", rating: 4.6, resenas: 9, distancia: "4.5 km", llegada: "~25 min", precio: 5000, disponible: true, tags: ["Calefacción", "Service"], zona: "Yerba Buena", descripcion: "Service preventivo de equipos de aire y calefacción. Presupuestos sin cargo." },
    { id: 11, nombre: "Martín Sosa", oficio: "Carpintero", categoria: "Carpintería", rating: 4.8, resenas: 19, distancia: "3.0 km", llegada: "~20 min", precio: 4600, disponible: true, tags: ["Muebles a medida", "Placares"], zona: "San Miguel de Tucumán", descripcion: "Muebles a medida, placares y bajo mesadas en melamina y madera maciza." },
    { id: 12, nombre: "Graciela Ortiz", oficio: "Carpintera y Restauradora", categoria: "Carpintería", rating: 4.5, resenas: 11, distancia: "5.8 km", llegada: "~30 min", precio: 4300, disponible: false, tags: ["Restauración", "Puertas"], zona: "Lules", descripcion: "Restauración de muebles antiguos, arreglo y ajuste de puertas y ventanas." },
    { id: 13, nombre: "Pablo Romero", oficio: "Cerrajero 24 hs", categoria: "Cerrajería", rating: 4.9, resenas: 52, distancia: "1.5 km", llegada: "~10 min", precio: 3500, disponible: true, tags: ["Aperturas", "Cambio de cerraduras"], zona: "San Miguel de Tucumán", descripcion: "Aperturas de puertas y autos, cambio de combinación y cerraduras de seguridad. Atención las 24 hs." },
    { id: 14, nombre: "Andrea Vega", oficio: "Cerrajera", categoria: "Cerrajería", rating: 4.3, resenas: 8, distancia: "4.2 km", llegada: "~25 min", precio: 3200, disponible: true, tags: ["Copias de llaves", "Candados"], zona: "Banda del Río Salí", descripcion: "Copias de llaves, instalación de cerrojos y candados." },
    { id: 15, nombre: "Rubén Castillo", oficio: "Jardinero", categoria: "Jardinería", rating: 4.7, resenas: 26, distancia: "3.6 km", llegada: "~20 min", precio: 3000, disponible: true, tags: ["Poda", "Corte de césped"], zona: "Yerba Buena", descripcion: "Corte de césped, poda de árboles y mantenimiento mensual de jardines." },
    { id: 16, nombre: "Florencia Molina", oficio: "Paisajista", categoria: "Jardinería", rating: 4.9, resenas: 14, distancia: "7.0 km", llegada: "~40 min", precio: 4800, disponible: false, tags: ["Diseño de jardines", "Riego"], zona: "Tafí Viejo", descripcion: "Diseño de espacios verdes e instalación de sistemas de riego automático." }
];

const COLORES_TARJETA = ["bg-primary-subtle", "bg-info-subtle", "bg-warning-subtle", "bg-success-subtle"];


// Pasa a minúsculas y quita tildes para que "plomeria" encuentre "Plomería"
function normalizar(texto) {
    return (texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function iniciales(nombre) {
    return nombre
        .split(" ")
        .map((parte) => parte[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}


function formatearPrecio(precio) {
    return "$" + precio.toLocaleString("es-AR");
}


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

 
    // Login desactivado para la entrega: se entra directo al menú.
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

    if (listaProf) {
        listaProf.innerHTML = PROFESIONALES
            .map((prof, i) => crearTarjetaProfesional(prof, COLORES_TARJETA[i % COLORES_TARJETA.length]))
            .join("");
    }

    const tarjetas = listaProf
        ? listaProf.querySelectorAll("article[data-categoria]")
        : [];

    const sinResultados =
        document.getElementById("sin-resultados");

    const resumen =
        document.getElementById("resumen-resultados");



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

        // En celular las categorías son una fila horizontal: la corremos hasta la elegida
        const chipActivo = document.querySelector(".chip-categoria.activo");

        if (chipActivo) {
            // se espera a que cargue la fuente, porque cambia el ancho de los botones
            document.fonts.ready.then(() => {
                const fila = chipActivo.parentElement;
                fila.scrollLeft += chipActivo.getBoundingClientRect().left - fila.getBoundingClientRect().left;
            });
        }
    }


    // Texto que viene del buscador de la página principal (?buscar=...)
    const busquedaURL =
        urlParams.get("buscar");

    if (busquedaURL && inputBusqueda) {
        inputBusqueda.value = busquedaURL;
    }



    function filtrar() {

        const texto = inputBusqueda
            ? normalizar(inputBusqueda.value.trim())
            : "";

        let visibles = 0;


        tarjetas.forEach((tarjeta) => {

            const categoria =
                tarjeta.dataset.categoria || "";

            // data-nombre incluye nombre, oficio, categoría y especialidades
            const nombre =
                normalizar(tarjeta.dataset.nombre);


            const coincideCategoria =
                categoriaFiltro === "todos" ||
                categoria === categoriaFiltro;


            const coincideBusqueda =
                !texto ||
                nombre.includes(texto) ||
                normalizar(categoria).includes(texto);


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


        // Resumen arriba de los resultados, así se ve qué filtro está aplicado
        if (resumen) {

            let textoResumen =
                visibles === 1 ? "1 profesional" : `${visibles} profesionales`;

            if (categoriaFiltro !== "todos") {
                textoResumen += ` en ${nombreCategoria(categoriaFiltro)}`;
            }

            if (texto) {
                textoResumen += ` para "${inputBusqueda.value.trim()}"`;
            }

            resumen.textContent = textoResumen;
        }
    }


    function nombreCategoria(categoria) {
        const chip = [...chipsCategoria].find((c) => c.dataset.categoria === categoria);
        return chip ? chip.textContent.trim() : categoria;
    }


    function seleccionarCategoria(categoria) {

        categoriaFiltro = categoria;

        chipsCategoria.forEach((c) => {
            c.classList.toggle("activo", c.dataset.categoria === categoria);
        });
    }



    chipsCategoria.forEach((chip) => {

        chip.addEventListener("click", () => {

            seleccionarCategoria(chip.dataset.categoria);

            filtrar();
        });

    });



    if (inputBusqueda) {

        // Al escribir se busca en todas las categorías,
        // así no queda un filtro viejo escondiendo resultados
        inputBusqueda.addEventListener("input", () => {

            if (categoriaFiltro !== "todos") {
                seleccionarCategoria("todos");
            }

            filtrar();
        });
    }

    filtrar();
}


function crearTarjetaProfesional(prof, color) {

    const textoBusqueda =
        [prof.nombre, prof.oficio, prof.categoria, ...prof.tags].join(" ");

    const tags = prof.tags
        .map((tag) => `<span class="tag-especialidad badge bg-white text-dark border fw-normal">${tag}</span>`)
        .join("");

    return `
        <article class="col-12 col-xl-6" data-categoria="${prof.categoria}" data-nombre="${textoBusqueda}">
            <section class="card tarjeta-profesional h-100 border-0 shadow-sm ${color} rounded-4">
                <header class="card-body fila-cabecera d-flex gap-3">
                    <section class="avatar-profesional position-relative">
                        ${iniciales(prof.nombre)}
                        <span class="punto-estado ${prof.disponible ? "disponible" : "ocupado"}"></span>
                    </section>
                    <section class="info-principal">
                        <h3 class="nombre-prof h6 mb-0 fw-bold">${prof.nombre}</h3>
                        <p class="oficio-prof text-secondary small mb-1">${prof.oficio}</p>
                        <p class="fila-meta small mb-1">
                            <span class="rating"><img src="img/star.png" alt="Estrella" class="icono-img"> ${prof.rating}</span>
                            <span>(${prof.resenas})</span>
                            <span>· <img src="img/location.png" class="icono-img" alt="Ubicación"> ${prof.distancia}</span>
                            <span>· <img src="img/clock.png" class="icono-img" alt="Reloj"> ${prof.llegada}</span>
                        </p>
                        <footer class="tags-especialidad d-flex gap-1 flex-wrap">${tags}</footer>
                    </section>
                </header>
                <footer class="card-footer bg-transparent d-flex justify-content-between align-items-center py-3 border-top">
                    <p class="precio-hora mb-0 text-dark fw-bold">
                        ${formatearPrecio(prof.precio)}
                        <span class="text-muted fw-normal small">/ hora</span>
                    </p>
                    <a class="btn btn-primary btn-sm rounded-pill px-3" href="perfiltrabajador.html?id=${prof.id}">Contratar</a>
                </footer>
            </section>
        </article>
    `;
}



function initPerfil() {

    const usuario = obtenerSesion() || {};

    // Login desactivado para la entrega: se permite entrar sin sesión.
    // if (!usuario) {
    //     window.location.href = "index.html";
    //     return;
    // }


    const nombre =
        document.getElementById("perfil-nombre");

    const email =
        document.getElementById("perfil-email");

    const rol =
        document.getElementById("perfil-rol");


    if (nombre) {
        nombre.textContent = usuario.nombre || "Invitado";
    }

    if (email) {
        email.textContent = usuario.email || "—";
    }

    if (rol) {
        rol.textContent = usuario.rol || "—";
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

    // Login desactivado para la entrega: se permite entrar sin sesión.
    // const usuario = obtenerSesion();
    // if (!usuario) {
    //     window.location.href = "index.html";
    //     return;
    // }


    const id =
        Number(new URLSearchParams(window.location.search).get("id")) || 1;

    const prof =
        PROFESIONALES.find((p) => p.id === id) || PROFESIONALES[0];


    function mostrar(idElemento, texto) {
        const elemento = document.getElementById(idElemento);
        if (elemento) {
            elemento.textContent = texto;
        }
    }

    const estrellasLlenas = Math.round(prof.rating);

    document.title = `OfiGO — ${prof.nombre}`;
    mostrar("prof-iniciales", iniciales(prof.nombre));
    mostrar("prof-nombre", prof.nombre);
    mostrar("prof-oficio", prof.oficio);
    mostrar("prof-estrellas", "★".repeat(estrellasLlenas) + "☆".repeat(5 - estrellasLlenas));
    mostrar("prof-resumen-rating", `${prof.rating} de 5 · ${prof.resenas} reseñas`);
    mostrar("prof-precio", formatearPrecio(prof.precio));
    mostrar("prof-distancia", prof.distancia);
    mostrar("prof-llegada", prof.llegada);
    mostrar("prof-descripcion", prof.descripcion);
    mostrar("prof-zona", prof.zona);
    const disponibilidad = document.getElementById("prof-disponibilidad");
    if (disponibilidad) {
        disponibilidad.innerHTML = prof.disponible
            ? '<img src="img/disponible.jpeg" class="icono-img" alt="Disponible"> Disponible ahora'
            : '<img src="img/ocupado.jpeg" class="icono-img" alt="Ocupado"> Ocupado por el momento';
    }

    const punto = document.getElementById("prof-estado-punto");
    if (punto) {
        punto.classList.add(prof.disponible ? "disponible" : "ocupado");
    }

    const especialidades = document.getElementById("prof-especialidades");
    if (especialidades) {
        especialidades.innerHTML = prof.tags
            .map((tag) => `<span class="tag-especialidad badge bg-white text-dark border fw-normal">${tag}</span>`)
            .join("");
    }

    const btnContratar = document.getElementById("btn-contratar");
    if (btnContratar) {
        btnContratar.addEventListener("click", () => {
            window.location.href = `crearpedido.html?id=${prof.id}`;
        });
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

    const usuario = obtenerSesion() || {};

    // Login desactivado para la entrega: se permite entrar sin sesión.
    // if (!usuario) {
    //     window.location.href = "index.html";
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
}



function initHistorial() {

    const usuario = obtenerSesion() || {};

    // Login desactivado para la entrega: se permite entrar sin sesión.
    // if (!usuario) {
    //     window.location.href = "index.html";
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


    const lista =
        document.getElementById("lista-pedidos");

    const sinPedidos =
        document.getElementById("sin-pedidos");


    function mostrarPedidos() {

        const pedidos = obtenerPedidos();

        if (sinPedidos) {
            sinPedidos.style.display = pedidos.length === 0 ? "block" : "none";
        }

        if (!lista) {
            return;
        }

        // Los más nuevos primero
        lista.innerHTML = pedidos
            .slice()
            .reverse()
            .map(crearTarjetaPedido)
            .join("");
    }


    if (lista) {

        lista.addEventListener("click", (e) => {

            const boton = e.target.closest("[data-cancelar]");

            if (!boton) {
                return;
            }

            const pedidos = obtenerPedidos();
            const pedido = pedidos.find((p) => p.id === Number(boton.dataset.cancelar));

            if (pedido && confirm("¿Querés cancelar este pedido?")) {
                pedido.estado = "Cancelado";
                guardarPedidos(pedidos);
                mostrarPedidos();
            }
        });
    }

    mostrarPedidos();
}



function initCrearPedido() {

    const usuario = obtenerSesion() || {};

    // Login desactivado para la entrega: se permite entrar sin sesión.
    // if (!usuario) {
    //     window.location.href = "index.html";
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


    const id =
        Number(new URLSearchParams(window.location.search).get("id")) || 1;

    const prof =
        PROFESIONALES.find((p) => p.id === id) || PROFESIONALES[0];


    // "Volver al perfil" vuelve al profesional que se estaba viendo
    const linkVolver =
        document.querySelector('a[href="perfiltrabajador.html"]');

    if (linkVolver) {
        linkVolver.href = `perfiltrabajador.html?id=${prof.id}`;
    }

    const subtitulo =
        document.querySelector(".encabezado-pagina p");

    if (subtitulo) {
        subtitulo.innerHTML = `Completá los datos para enviar tu pedido a <strong>${prof.nombre}</strong> (${prof.oficio}).`;
    }


    const form = document.getElementById("form-pedido");
    const descripcion = document.getElementById("descripcion");
    const contador = document.getElementById("contador-desc");
    const mensaje = document.getElementById("mensaje-area");

    if (descripcion && contador) {
        descripcion.addEventListener("input", () => {
            contador.textContent = `${descripcion.value.length} / 200`;
        });
    }

    if (!form) {
        return;
    }


    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const direccion = form.direccion.value.trim();
        const fecha = form.fechaSolicitada.value;
        const texto = form.descripcion.value.trim();

        if (!direccion || !fecha || !texto) {

            if (mensaje) {
                mensaje.innerHTML = `
                    <div class="alert alert-danger mb-0" role="alert">
                        Completá la dirección, la fecha y la descripción para enviar el pedido.
                    </div>
                `;
            }

            return;
        }

        if (mensaje) {
            mensaje.innerHTML = "";
        }


        const pedidos = obtenerPedidos();

        pedidos.push({
            id: Date.now(),
            profesionalId: prof.id,
            profesional: prof.nombre,
            oficio: prof.oficio,
            direccion: direccion,
            fecha: fecha,
            descripcion: texto,
            estado: "Pendiente"
        });

        guardarPedidos(pedidos);

        form.reset();

        if (contador) {
            contador.textContent = "0 / 200";
        }

        mostrarSolicitudEnviada(prof);
    });
}



// --- Pedidos: se guardan en el navegador (localStorage) ---

function obtenerPedidos() {

    try {
        return JSON.parse(localStorage.getItem("oficioya-pedidos")) || [];
    } catch (error) {
        return [];
    }
}


function guardarPedidos(pedidos) {
    localStorage.setItem("oficioya-pedidos", JSON.stringify(pedidos));
}


// Evita que el texto que escribe el usuario se interprete como HTML
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}


function crearTarjetaPedido(pedido) {

    const claseEstado =
        "estado-" + normalizar(pedido.estado).replace(/\s+/g, "-");

    const fecha = new Date(pedido.fecha).toLocaleString("es-AR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    const botonCancelar = pedido.estado === "Pendiente"
        ? `<button type="button" class="btn btn-outline-danger btn-sm rounded-pill" data-cancelar="${pedido.id}">Cancelar pedido</button>`
        : "";

    return `
        <li class="col-12 col-md-6">
            <article class="card tarjeta-pedido h-100 border-0 shadow-sm rounded-4">
                <div class="fila-top">
                    <div>
                        <h3 class="h6 fw-bold mb-0">${pedido.profesional}</h3>
                        <p class="meta mb-0">${pedido.oficio}</p>
                    </div>
                    <span class="estado ${claseEstado}">${pedido.estado}</span>
                </div>
                <p class="desc-pedido">${escaparHTML(pedido.descripcion)}</p>
                <p class="meta mb-1"><img src="img/location.png" class="icono-img" alt="Dirección"> ${escaparHTML(pedido.direccion)}</p>
                <p class="meta mb-3"><img src="img/clock.png" class="icono-img" alt="Fecha"> ${fecha}</p>
                <div class="d-flex gap-2 flex-wrap">
                    <a href="perfiltrabajador.html?id=${pedido.profesionalId}" class="btn btn-outline-secondary btn-sm rounded-pill">Ver profesional</a>
                    ${botonCancelar}
                </div>
            </article>
        </li>
    `;
}


// Cartel de "Solicitud enviada" (modal de Bootstrap)
function mostrarSolicitudEnviada(prof) {

    let modal = document.getElementById("modal-pedido-enviado");

    if (!modal) {

        document.body.insertAdjacentHTML("beforeend", `
            <div class="modal fade" id="modal-pedido-enviado" tabindex="-1" aria-labelledby="modal-pedido-titulo" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-4 border-0 text-center p-3">
                        <div class="modal-body">
                            <p class="fs-1 mb-2">✅</p>
                            <h2 class="h4 fw-bold" id="modal-pedido-titulo">¡Solicitud enviada!</h2>
                            <p class="text-secondary mb-0" id="modal-pedido-texto"></p>
                        </div>
                        <div class="modal-footer border-0 justify-content-center gap-2">
                            <a href="oficios.html" class="btn btn-outline-secondary rounded-pill px-4">Seguir buscando</a>
                            <a href="historial.html" class="btn btn-primario rounded-pill px-4">Ver mis pedidos</a>
                        </div>
                    </div>
                </div>
            </div>
        `);

        modal = document.getElementById("modal-pedido-enviado");
    }

    document.getElementById("modal-pedido-texto").textContent =
        `Le enviamos tu pedido a ${prof.nombre}. Podés seguir su estado en la sección Pedidos.`;

    bootstrap.Modal.getOrCreateInstance(modal).show();
}



// Agrega el botón "Ayuda" y su panel en todas las páginas (antes solo estaba en el inicio)
function initAyuda() {

    if (!document.getElementById("panel-ayuda")) {

        document.body.insertAdjacentHTML("beforeend", `
            <aside class="offcanvas offcanvas-end" tabindex="-1" id="panel-ayuda" aria-labelledby="panel-ayuda-titulo">
                <div class="offcanvas-header">
                    <h2 class="offcanvas-title h4 fw-bold" id="panel-ayuda-titulo">Centro de Ayuda</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                </div>
                <div class="offcanvas-body">
                    <p class="text-secondary">
                        Encontrá respuestas rápidas, resolvé dudas frecuentes y aprendé a usar OficiosYa.
                    </p>
                    <div class="py-3 border-bottom">
                        <h3 class="h6 fw-bold">¿Cómo contratar un profesional?</h3>
                        <p class="small text-secondary mb-0">
                            Encontrá profesionales según el servicio que necesitás. Elegí una categoría, revisá los perfiles y
                            seleccioná el profesional que más te convenga.
                        </p>
                    </div>
                    <div class="py-3 border-bottom">
                        <h3 class="h6 fw-bold"><img src="img/star.png" alt="Estrella" class="icono-home"> ¿Cómo califico un trabajo?</h3>
                        <p class="small text-secondary mb-0">Desde Mis pedidos cuando el servicio esté finalizado.</p>
                    </div>
                    <div class="py-3 border-bottom">
                        <h3 class="h6 fw-bold"><img src="img/pin.png" alt="Cancelar" class="icono-home"> ¿Puedo cancelar un pedido?</h3>
                        <p class="small text-secondary mb-0">Sí, mientras todavía no haya sido finalizado.</p>
                    </div>
                    <div class="py-3">
                        <h3 class="h6 fw-bold"><img src="img/completed-task.png" alt="Lista" class="icono-home"> ¿Cómo veo el estado de mi pedido?</h3>
                        <p class="small text-secondary mb-0">Desde la sección Mis pedidos.</p>
                    </div>
                    <div class="bg-primary-subtle rounded-4 p-3 mt-3">
                        <strong>¿Necesitás más ayuda?</strong>
                        <p class="small text-secondary mt-2 mb-1"><img src="img/email.png" alt="Correo" class="icono-home"> soporte@oficiosya.com</p>
                        <p class="small text-secondary mb-0"><img src="img/phone.png" alt="Teléfono" class="icono-home"> 0800-123-456</p>
                    </div>
                </div>
            </aside>
        `);
    }


    const bottomNav =
        document.querySelector(".bottom-nav");

    if (bottomNav && !bottomNav.querySelector('[data-bs-target="#panel-ayuda"]')) {

        // En el menú del trabajador los links están dentro de un <ul>
        const contenedor = bottomNav.querySelector("ul") || bottomNav;
        const esLista = contenedor.tagName === "UL";

        const link = `
            <a href="#" data-bs-toggle="offcanvas" data-bs-target="#panel-ayuda" aria-controls="panel-ayuda"${esLista ? ' class="nav-link"' : ""}>
                <span class="icono-nav"><img src="img/help-web-button.png" alt="Ayuda" class="icono-home"></span>
                <span>Ayuda</span>
            </a>
        `;

        contenedor.insertAdjacentHTML("beforeend", esLista ? `<li>${link}</li>` : link);
    }
}