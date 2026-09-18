/* ==se hizo un unico archivo js con las funcionalidades de las paginas, ademas esta especificado las duncones ára cada pagon*/

document.addEventListener('DOMContentLoaded', () => {
  const rutaActual = window.location.pathname;

  if (rutaActual.includes('index.html') || rutaActual === '/' || rutaActual.endsWith('/')) {
    initLanding();
  } else if (rutaActual.includes('menu.html')) {
    initMenu();
  } else if (rutaActual.includes('oficios.html')) {
    initOficios();
  } else if (rutaActual.includes('perfil.html')) {
    initPerfil();
  } else if (rutaActual.includes('perfiltrabajador.html')) {
    initPerfilTrabajador();
  } else if (rutaActual.includes('historialtrabajador.html')) {
    initHistorialTrabajador();
  } else if (rutaActual.includes('historial.html')) {
    initHistorial();
  } else if (rutaActual.includes('crearpedido.html') || rutaActual.includes('solicitar-servicio.html')) {
    initCrearPedido();
  }
});

function obtenerSesion() {
  return JSON.parse(localStorage.getItem("oficioya-sesion"));
}

function cerrarSesion() {
  localStorage.removeItem("oficioya-sesion");
  window.location.href = "index.html";
}


/* ======LOGIN Y REGISTRO========= */
function initLanding() {
  if (obtenerSesion()) {
    window.location.href = "menu.html";
    return;
  }

  let rolSeleccionado = "cliente";

  const tabLogin = document.getElementById("tab-login");
  const tabRegistro = document.getElementById("tab-registro");
  const panelLogin = document.getElementById("login");
  const panelRegistro = document.getElementById("registro");
  const mensajeArea = document.getElementById("mensaje-area");

  function mostrarTab(tab) {
    const esLogin = tab === "login";

    if (tabLogin) tabLogin.classList.toggle("activo", esLogin);
    if (tabRegistro) tabRegistro.classList.toggle("activo", !esLogin);
    if (panelLogin) panelLogin.style.display = esLogin ? "block" : "none";
    if (panelRegistro) panelRegistro.style.display = esLogin ? "none" : "block";

    if (mensajeArea) mensajeArea.innerHTML = "";

    const panelCuenta = document.getElementById("panel-cuenta");
    if (panelCuenta) {
      panelCuenta.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (tabLogin) tabLogin.addEventListener("click", () => mostrarTab("login"));
  if (tabRegistro) tabRegistro.addEventListener("click", () => mostrarTab("registro"));
  
  const linkRegistro = document.getElementById("link-a-registro");
  if (linkRegistro) {
    linkRegistro.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarTab("registro");
    });
  }

  const linkLogin = document.getElementById("link-a-login");
  if (linkLogin) linkLogin.addEventListener("click", () => mostrarTab("login"));

  const linkIngresar = document.getElementById("link-ingresar");
  if (linkIngresar) {
    linkIngresar.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarTab("login");
    });
  }

  const linkProfesional = document.getElementById("link-profesional");
  if (linkProfesional) {
    linkProfesional.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarTab("registro");
      elegirRol("trabajador");
    });
  }

  const rolCliente = document.getElementById("rol-cliente");
  const rolTrabajador = document.getElementById("rol-trabajador");
  const camposTrabajador = document.getElementById("campos-trabajador");

  function elegirRol(rol) {
    rolSeleccionado = rol;
    if (rolCliente) rolCliente.classList.toggle("activo", rol === "cliente");
    if (rolTrabajador) rolTrabajador.classList.toggle("activo", rol === "trabajador");
    if (camposTrabajador) camposTrabajador.style.display = rol === "trabajador" ? "block" : "none";
  }

  if (rolCliente) rolCliente.addEventListener("click", () => elegirRol("cliente"));
  if (rolTrabajador) rolTrabajador.addEventListener("click", () => elegirRol("trabajador"));

  document.querySelectorAll(".toggle-password").forEach((boton) => {
    boton.addEventListener("click", () => {
      const input = document.getElementById(boton.dataset.target);
      if (input) {
        const esPassword = input.type === "password";
        input.type = esPassword ? "text" : "password";
        boton.textContent = esPassword ? "🙈" : "👁";
      }
    });
  });

  const descripcion = document.getElementById("reg-descripcion");
  const contadorDesc = document.getElementById("contador-desc");
  if (descripcion && contadorDesc) {
    descripcion.addEventListener("input", () => {
      contadorDesc.textContent = `${descripcion.value.length} / 200`;
    });
  }

  function mostrarMensaje(texto, tipo = "error") {
    if (mensajeArea) {
      mensajeArea.innerHTML = `<span class="mensaje mensaje-${tipo}">${texto}</span>`;
    }
  }

  function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("oficioya-usuarios")) || [
      { nombre: "Cliente Demo", email: "cliente@demo.com", password: "1234", rol: "cliente" }
    ];
  }

  function guardarUsuarios(usuarios) {
    localStorage.setItem("oficioya-usuarios", JSON.stringify(usuarios));
  }

  function guardarSesion(usuario) {
    localStorage.setItem("oficioya-sesion", JSON.stringify(usuario));
  }

  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;

      const usuarios = obtenerUsuarios();
      const usuario = usuarios.find((u) => u.email === email && u.password === password);

      if (!usuario) {
        mostrarMensaje("Email o contraseña incorrectos.", "error");
        return;
      }

      guardarSesion(usuario);
      mostrarMensaje(`¡Bienvenido/a, ${usuario.nombre}! Redirigiendo...`, "exito");

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1200);
    });
  }

  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nombre = document.getElementById("reg-nombre").value.trim();
      const email = document.getElementById("reg-email").value.trim().toLowerCase();
      const password = document.getElementById("reg-password").value;

      if (password.length < 4) {
        mostrarMensaje("La contraseña debe tener al menos 4 caracteres.", "error");
        return;
      }

      const usuarios = obtenerUsuarios();
      if (usuarios.some((u) => u.email === email)) {
        mostrarMensaje("Ya existe una cuenta registrada con ese email.", "error");
        return;
      }

      const precioInput = document.getElementById("reg-precio")?.value;

      const nuevoUsuario = {
        nombre,
        email,
        password,
        rol: rolSeleccionado,
        oficio: document.getElementById("reg-oficio")?.value.trim() || "",
        categoria: document.getElementById("reg-categoria")?.value || "",
        zona: document.getElementById("reg-zona")?.value.trim() || "",
        precioPorHora: precioInput ? Number(precioInput) : null,
        descripcion: descripcion ? descripcion.value.trim() : "",
      };

      usuarios.push(nuevoUsuario);
      guardarUsuarios(usuarios);
      guardarSesion(nuevoUsuario);

      mostrarMensaje(`¡Cuenta creada con éxito! Redirigiendo...`, "exito");

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1200);
    });
  }
}


/* =======MENÚ PRINCIPAL================= */
function initMenu() {
  const usuario = obtenerSesion();

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }

  const vistaCliente = document.getElementById("vista-cliente");
  const vistaTrabajador = document.getElementById("vista-trabajador");

  if (usuario.rol === "trabajador") {
    if (vistaCliente) vistaCliente.style.display = "none";
    if (vistaTrabajador) vistaTrabajador.style.display = "block";

    const elemNombre = document.getElementById("nombre-trabajador");
    if (elemNombre) elemNombre.textContent = usuario.nombre;

    const bottomNav = document.getElementById("bottom-nav");
    if (bottomNav) {
      bottomNav.innerHTML = `
        <ul class="d-flex w-100 justify-content-around list-unstyled mb-0">
          <li><a href="menu.html" class="nav-link fw-bold text-primary">🏠 Inicio</a></li>
          <li><a href="historialtrabajador.html" class="nav-link">🧾 Pedidos</a></li>
          <li><a href="perfil.html" class="nav-link">👤 Perfil</a></li>
        </ul>
      `;
    }
  } else {
    if (vistaCliente) vistaCliente.style.display = "block";
    if (vistaTrabajador) vistaTrabajador.style.display = "none";

    const elemNombre = document.getElementById("nombre-cliente");
    if (elemNombre) elemNombre.textContent = usuario.nombre;
  }
}


/* ======BÚSQUEDA============================ */
/* ====== BÚSQUEDA ============================ */

function initOficios() {

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }


  /* ---------- Elementos de la página ---------- */

  const inputBusqueda = document.getElementById("input-busqueda");
  const chipsCategoria = document.querySelectorAll(".chip-categoria");
  const listaProf = document.getElementById("lista-profesionales");

  /* Las tarjetas son ARTICLE en tu HTML */
  const tarjetas = listaProf
    ? listaProf.querySelectorAll("article[data-categoria]")
    : [];

  const sinResultados = document.getElementById("sin-resultados");


  /* ---------- Categoría seleccionada ---------- */

  let categoriaFiltro = "todos";


  /* ---------- Categoría recibida por URL ---------- */

  const urlParams = new URLSearchParams(window.location.search);
  const catURL = urlParams.get("categoria");

  if (catURL) {

    categoriaFiltro = catURL;

    chipsCategoria.forEach((chip) => {

      chip.classList.toggle(
        "activo",
        chip.dataset.categoria === catURL
      );

    });
  }


  /* ---------- Función para filtrar ---------- */

  function filtrar() {

    const texto = inputBusqueda
      ? inputBusqueda.value.trim().toLowerCase()
      : "";

    let visibles = 0;


    tarjetas.forEach((tarjeta) => {

      const catTarjeta = tarjeta.dataset.categoria;

      const nombreTarjeta = tarjeta.dataset.nombre
        ? tarjeta.dataset.nombre.toLowerCase()
        : "";


      /* Comprobar categoría */

      const coincideCat =
        categoriaFiltro === "todos" ||
        catTarjeta === categoriaFiltro;


      /* Comprobar texto */

      const coincideTexto =
        !texto ||
        nombreTarjeta.includes(texto);


      /* Mostrar u ocultar */

      if (coincideCat && coincideTexto) {

        tarjeta.style.display = "";

        visibles++;

      } else {

        tarjeta.style.display = "none";

      }

    });


    /* ---------- Mensaje sin resultados ---------- */

    if (sinResultados) {

      sinResultados.style.display =
        visibles === 0 ? "block" : "none";

    }

  }


  /* ---------- Botones de categorías ---------- */

  chipsCategoria.forEach((chip) => {

    chip.addEventListener("click", () => {

      /* Quitar activo de todos */

      chipsCategoria.forEach((c) => {
        c.classList.remove("activo");
      });


      /* Activar el seleccionado */

      chip.classList.add("activo");


      /* Guardar categoría */

      categoriaFiltro = chip.dataset.categoria;


      /* Aplicar filtro */

      filtrar();

    });

  });


  /* ---------- Buscador ---------- */

  if (inputBusqueda) {

    inputBusqueda.addEventListener("input", filtrar);

  }


  /* ---------- Filtrar al cargar ---------- */

  filtrar();

}


/* ==========PERFIL============= */
function initPerfil() {
  const usuario = obtenerSesion();

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const elemNombre = document.getElementById("perfil-nombre");
  const elemEmail = document.getElementById("perfil-email");
  const elemRol = document.getElementById("perfil-rol");

  if (elemNombre) elemNombre.textContent = usuario.nombre || "—";
  if (elemEmail) elemEmail.textContent = usuario.email || "—";
  if (elemRol) {
    elemRol.textContent = usuario.rol === "trabajador" ? "Trabajador" : "Cliente";
    elemRol.className = usuario.rol === "trabajador" ? "badge bg-warning text-dark" : "badge bg-secondary";
  }

  if (usuario.rol === "trabajador") {
    const datosTrabajador = document.getElementById("datos-trabajador");
    if (datosTrabajador) datosTrabajador.style.display = "block";

    const elemOficio = document.getElementById("perfil-oficio");
    const elemCategoria = document.getElementById("perfil-categoria");
    const elemZona = document.getElementById("perfil-zona");
    const elemPrecio = document.getElementById("perfil-precio");
    const elemDesc = document.getElementById("perfil-descripcion");

    if (elemOficio) elemOficio.textContent = usuario.oficio || "—";
    if (elemCategoria) elemCategoria.textContent = usuario.categoria || "—";
    if (elemZona) elemZona.textContent = usuario.zona || "—";
    if (elemPrecio) elemPrecio.textContent = usuario.precioPorHora ? usuario.precioPorHora : "—";
    if (elemDesc) elemDesc.textContent = usuario.descripcion || "Sin descripción cargada.";
  }

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }
}


/* ========PERFIL DE TRABAJADOR======================= */
function initPerfilTrabajador() {
  const profesionalesDemo = [
    {
      id: "1",
      nombre: "Carlos Medina",
      iniciales: "CM",
      oficio: "Electricista Matriculado",
      estrellas: "★★★★☆",
      ratingNum: "4.8",
      resenas: "23",
      precio: "$4.500",
      distancia: "2.1 km",
      llegada: "~15 min",
      especialidades: ["Instalaciones", "Tableros", "Urgencias 24hs"],
      descripcion: "Electricista matriculado con más de 10 años de experiencia en trabajos residenciales y comerciales en Tucumán Capital.",
      zona: "San Miguel de Tucumán y Yerba Buena",
      disponibilidad: "🟢 Disponible hoy",
      disponible: true
    },
    {
      id: "2",
      nombre: "Mónica Paz",
      iniciales: "MP",
      oficio: "Plomera Specialist",
      estrellas: "★★★★★",
      ratingNum: "4.9",
      resenas: "31",
      precio: "$5.000",
      distancia: "3.2 km",
      llegada: "~20 min",
      especialidades: ["Pérdidas de agua", "Destapes", "Instalaciones de gas"],
      descripcion: "Especialista en reparación de pérdidas, instalación de sanitarios y mantenimiento preventivo de cañerías.",
      zona: "Tucumán Zona Sur y Centro",
      disponibilidad: "🟢 Disponible hoy",
      disponible: true
    }
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const profId = urlParams.get("id") || "1";

  const prof = profesionalesDemo.find(p => p.id === profId) || profesionalesDemo[0];

  const elemIniciales = document.getElementById("prof-iniciales");
  const elemEstadoPunto = document.getElementById("prof-estado-punto");
  const elemNombre = document.getElementById("prof-nombre");
  const elemOficio = document.getElementById("prof-oficio");
  const elemEstrellas = document.getElementById("prof-estrellas");
  const elemRating = document.getElementById("prof-resumen-rating");
  const elemPrecio = document.getElementById("prof-precio");
  const elemDistancia = document.getElementById("prof-distancia");
  const elemLlegada = document.getElementById("prof-llegada");
  const elemEsp = document.getElementById("prof-especialidades");
  const elemDesc = document.getElementById("prof-descripcion");
  const elemZona = document.getElementById("prof-zona");
  const elemDisp = document.getElementById("prof-disponibilidad");

  if (elemIniciales) elemIniciales.textContent = prof.iniciales;
  if (elemEstadoPunto) elemEstadoPunto.className = `punto-estado ${prof.disponible ? 'disponible' : 'ocupado'}`;
  if (elemNombre) elemNombre.textContent = prof.nombre;
  if (elemOficio) elemOficio.textContent = prof.oficio;
  if (elemEstrellas) elemEstrellas.textContent = prof.estrellas;
  if (elemRating) elemRating.textContent = `${prof.ratingNum} de 5 · ${prof.resenas} reseñas`;
  if (elemPrecio) elemPrecio.textContent = prof.precio;
  if (elemDistancia) elemDistancia.textContent = prof.distancia;
  if (elemLlegada) elemLlegada.textContent = prof.llegada;
  if (elemDesc) elemDesc.textContent = prof.descripcion;
  if (elemZona) elemZona.textContent = prof.zona;
  if (elemDisp) elemDisp.textContent = prof.disponibilidad;

  if (elemEsp) {
    elemEsp.innerHTML = prof.especialidades
      .map(e => `<span class="tag-especialidad">${e}</span>`)
      .join("");
  }

  const btnContratar = document.getElementById("btn-contratar");
  if (btnContratar) {
    btnContratar.addEventListener("click", () => {
      window.location.href = `crearpedido.html?profesional=${encodeURIComponent(prof.nombre)}`;
    });
  }
}


/* =========HISTORIAL DE TRABAJADOR================ */
function initHistorialTrabajador() {
  const usuario = obtenerSesion();

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }

  let pedidos = JSON.parse(localStorage.getItem("oficioya-pedidos")) || [
    {
      id: 1,
      clienteNombre: "Juana Torres",
      direccion: "Av. Mate de Luna 2400, Tucumán",
      fecha: "18/09/2026 - 15:30 hs",
      descripcion: "Necesito revisar el tablero eléctrico por saltos continuos de la térmica.",
      estadoSlug: "pendiente",
      estadoText: "Pendiente"
    },
    {
      id: 2,
      clienteNombre: "Lucía Gómez",
      direccion: "Barrio Sur, Jujuy 450",
      fecha: "20/09/2026 - 10:00 hs",
      descripcion: "Instalación de ventilador de techo y luminarias LED.",
      estadoSlug: "aceptado",
      estadoText: "Aceptado"
    }
  ];

  const listaPedidos = document.getElementById("lista-pedidos");
  const sinPedidos = document.getElementById("sin-pedidos");

  function renderizarPedidos() {
    if (!listaPedidos) return;

    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      if (sinPedidos) sinPedidos.style.display = "block";
      return;
    }

    if (sinPedidos) sinPedidos.style.display = "none";

    pedidos.forEach((p) => {
      const li = document.createElement("li");
      li.className = "col-12 col-md-6";

      li.innerHTML = `
        <article class="tarjeta-pedido card p-3 h-100 shadow-sm">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h3 class="h6 mb-0 fw-bold text-dark">${p.clienteNombre}</h3>
            <span class="estado estado-${p.estadoSlug}">${p.estadoText}</span>
          </div>
          <p class="meta text-muted small mb-2">📅 ${p.fecha} — 📍 ${p.direccion}</p>
          <p class="desc-pedido text-secondary small mb-3">${p.descripcion}</p>
          
          <div class="d-flex gap-2 mt-auto pt-2 border-top">
            ${
              p.estadoSlug === 'pendiente' 
                ? `<button class="btn btn-primario btn-chico w-100 btn-aceptar" data-id="${p.id}">Aceptar</button>
                   <button class="btn btn-fantasma btn-chico w-100 text-danger border-danger-subtle btn-rechazar" data-id="${p.id}">Rechazar</button>`
                : p.estadoSlug === 'aceptado'
                ? `<button class="btn btn-primario btn-chico w-100 btn-finalizar" data-id="${p.id}">Marcar Finalizado</button>`
                : `<span class="small text-muted text-center w-100">Sin acciones pendientes</span>`
            }
          </div>
        </article>
      `;

      listaPedidos.appendChild(li);
    });

    asignarEventosAcciones();
  }

  function cambiarEstadoPedido(id, nuevoEstado, nuevoTexto) {
    pedidos = pedidos.map((p) => {
      if (p.id === Number(id)) {
        return { ...p, estadoSlug: nuevoEstado, estadoText: nuevoTexto };
      }
      return p;
    });

    localStorage.setItem("oficioya-pedidos", JSON.stringify(pedidos));
    renderizarPedidos();
  }

  function asignarEventosAcciones() {
    document.querySelectorAll(".btn-aceptar").forEach((b) => {
      b.addEventListener("click", () => cambiarEstadoPedido(b.dataset.id, "aceptado", "Aceptado"));
    });

    document.querySelectorAll(".btn-rechazar").forEach((b) => {
      b.addEventListener("click", () => cambiarEstadoPedido(b.dataset.id, "cancelado", "Cancelado"));
    });

    document.querySelectorAll(".btn-finalizar").forEach((b) => {
      b.addEventListener("click", () => cambiarEstadoPedido(b.dataset.id, "finalizado", "Finalizado"));
    });
  }

  renderizarPedidos();
}


/* ========HISSTORIAL============================= */
function initHistorial() {
  const usuario = obtenerSesion();

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }

  let pedidos = JSON.parse(localStorage.getItem("oficioya-pedidos")) || [
    {
      id: 101,
      profesionalNombre: "Carlos Medina",
      oficio: "Electricista",
      direccion: "Av. Mate de Luna 2400",
      fecha: "18/09/2026 - 15:30 hs",
      descripcion: "Revisión de tablero eléctrico por saltos de la térmica.",
      estadoSlug: "finalizado",
      estadoText: "Finalizado",
      calificacion: 5
    },
    {
      id: 102,
      profesionalNombre: "Mónica Paz",
      oficio: "Plomera",
      direccion: "Av. Mate de Luna 2400",
      fecha: "20/09/2026 - 10:00 hs",
      descripcion: "Reparación de pérdida de agua debajo de la bacha.",
      estadoSlug: "en-curso",
      estadoText: "En curso",
      calificacion: 0
    }
  ];

  const listaPedidos = document.getElementById("lista-pedidos");
  const sinPedidos = document.getElementById("sin-pedidos");

  function renderizarHistorial() {
    if (!listaPedidos) return;

    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      if (sinPedidos) sinPedidos.style.display = "block";
      return;
    }

    if (sinPedidos) sinPedidos.style.display = "none";

    pedidos.forEach((p) => {
      const li = document.createElement("li");
      li.className = "col-12 col-md-6";

      li.innerHTML = `
        <article class="tarjeta-pedido card p-4 h-100 shadow-sm border-0">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h3 class="h6 mb-0 fw-bold text-dark">${p.oficio}</h3>
              <small class="text-secondary">Con: ${p.profesionalNombre}</small>
            </div>
            <span class="estado estado-${p.estadoSlug}">${p.estadoText}</span>
          </div>

          <p class="meta text-muted small mb-2">📅 ${p.fecha} — 📍 ${p.direccion}</p>
          <p class="desc-pedido text-secondary small mb-3">${p.descripcion}</p>

          <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
            ${
              p.estadoSlug === 'finalizado'
                ? `
                  <span class="small text-muted fw-bold">Calificación:</span>
                  <div class="estrellas-calificar" data-id="${p.id}">
                    ${[1, 2, 3, 4, 5].map(num => `
                      <span class="estrella ${num <= (p.calificacion || 0) ? 'text-warning' : 'text-muted'}" 
                            data-val="${num}" 
                            style="cursor:pointer; font-size: 1.2rem;">★</span>
                    `).join('')}
                  </div>
                `
                : `<span class="small text-muted">Trabajo en proceso...</span>`
            }
          </div>
        </article>
      `;

      listaPedidos.appendChild(li);
    });

    asignarEventosCalificacion();
  }

  function asignarEventosCalificacion() {
    document.querySelectorAll(".estrellas-calificar").forEach((contenedor) => {
      const pedidoId = Number(contenedor.dataset.id);

      contenedor.querySelectorAll(".estrella").forEach((estrella) => {
        estrella.addEventListener("click", () => {
          const nuevaCalificacion = Number(estrella.dataset.val);

          pedidos = pedidos.map((p) => {
            if (p.id === pedidoId) {
              return { ...p, calificacion: nuevaCalificacion };
            }
            return p;
          });

          localStorage.setItem("oficioya-pedidos", JSON.stringify(pedidos));
          renderizarHistorial();
        });
      });
    });
  }

  renderizarHistorial();
}


/* ======CREAR PEDIDO========= */
function initCrearPedido() {
  const usuario = obtenerSesion();

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }

  const descripcion = document.getElementById("descripcion");
  const contadorDesc = document.getElementById("contador-desc");
  if (descripcion && contadorDesc) {
    descripcion.addEventListener("input", () => {
      contadorDesc.textContent = `${descripcion.value.length} / 200`;
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const nombreProfesional = urlParams.get("profesional") || "Carlos Medina";

  const formPedido = document.getElementById("form-pedido");
  const mensajeArea = document.getElementById("mensaje-area");

  if (formPedido) {
    formPedido.addEventListener("submit", (e) => {
      e.preventDefault();

      const direccion = document.getElementById("direccion").value.trim();
      const fecha = document.getElementById("fecha").value;
      const desc = descripcion ? descripcion.value.trim() : "";

      if (!direccion || !fecha || !desc) {
        if (mensajeArea) {
          mensajeArea.innerHTML = `<div class="alert alert-danger py-2 small mb-0">Completá todos los campos obligatorios.</div>`;
        }
        return;
      }

      const nuevoPedido = {
        id: Date.now(),
        clienteNombre: usuario.nombre || "Cliente Anónimo",
        profesionalNombre: nombreProfesional,
        oficio: "Servicio General",
        direccion: direccion,
        fecha: new Date(fecha).toLocaleString(),
        descripcion: desc,
        estadoSlug: "pendiente",
        estadoText: "Pendiente",
        calificacion: 0
      };

      const pedidosRegistrados = JSON.parse(localStorage.getItem("oficioya-pedidos")) || [];
      pedidosRegistrados.push(nuevoPedido);
      localStorage.setItem("oficioya-pedidos", JSON.stringify(pedidosRegistrados));

      if (mensajeArea) {
        mensajeArea.innerHTML = `<div class="alert alert-success py-2 small mb-0">¡Pedido enviado con éxito! Redirigiendo a tus pedidos...</div>`;
      }

      setTimeout(() => {
        window.location.href = "historial.html";
      }, 1500);
    });
  }
}

/* ==AYUDA========== */
function initAyuda() {
  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }
}
