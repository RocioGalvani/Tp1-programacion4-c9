// ===== OficioYa — Lógica de login/registro con DOM y localStorage =====

let rolSeleccionado = "cliente";

// --- Referencias a elementos del DOM ---
const tabLogin = document.getElementById("tab-login");
const tabRegistro = document.getElementById("tab-registro");
const panelLogin = document.getElementById("login");
const panelRegistro = document.getElementById("registro");
const mensajeArea = document.getElementById("mensaje-area");
const textoCambio = document.getElementById("texto-cambio");

// --- Cambiar entre pestañas Ingresar / Crear cuenta ---
function mostrarTab(tab) {
  const esLogin = tab === "login";

  tabLogin.classList.toggle("activo", esLogin);
  tabRegistro.classList.toggle("activo", !esLogin);
  panelLogin.style.display = esLogin ? "block" : "none";
  panelRegistro.style.display = esLogin ? "none" : "block";

  mensajeArea.innerHTML = "";

  document.getElementById("panel-cuenta").scrollIntoView({ behavior: "smooth", block: "start" });
}

tabLogin.addEventListener("click", () => mostrarTab("login"));
tabRegistro.addEventListener("click", () => mostrarTab("registro"));
document.getElementById("link-a-registro").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarTab("registro");
});
document.getElementById("link-a-login").addEventListener("click", () => mostrarTab("login"));
document.getElementById("link-ingresar").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarTab("login");
});
document.getElementById("link-profesional").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarTab("registro");
  elegirRol("trabajador");
});

// --- Selector de rol Cliente / Trabajador ---
const rolCliente = document.getElementById("rol-cliente");
const rolTrabajador = document.getElementById("rol-trabajador");
const camposTrabajador = document.getElementById("campos-trabajador");

function elegirRol(rol) {
  rolSeleccionado = rol;
  rolCliente.classList.toggle("activo", rol === "cliente");
  rolTrabajador.classList.toggle("activo", rol === "trabajador");
  camposTrabajador.style.display = rol === "trabajador" ? "block" : "none";
}

rolCliente.addEventListener("click", () => elegirRol("cliente"));
rolTrabajador.addEventListener("click", () => elegirRol("trabajador"));

// --- Mostrar / ocultar contraseña ---
document.querySelectorAll(".toggle-password").forEach((boton) => {
  boton.addEventListener("click", () => {
    const input = document.getElementById(boton.dataset.target);
    const esPassword = input.type === "password";
    input.type = esPassword ? "text" : "password";
    boton.textContent = esPassword ? "🙈" : "👁";
  });
});

// --- Contador de caracteres en la descripción ---
const descripcion = document.getElementById("reg-descripcion");
const contadorDesc = document.getElementById("contador-desc");

descripcion.addEventListener("input", () => {
  contadorDesc.textContent = `${descripcion.value.length} / 200`;
});

// --- Mensajes de error / éxito en el DOM ---
function mostrarMensaje(texto, tipo = "error") {
  mensajeArea.innerHTML = `<span class="mensaje mensaje-${tipo}">${texto}</span>`;
}

// --- Base de usuarios simulada con localStorage ---
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

// --- Manejo del formulario de LOGIN ---
document.getElementById("form-login").addEventListener("submit", (evento) => {
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

// --- Manejo del formulario de REGISTRO ---
document.getElementById("form-registro").addEventListener("submit", (evento) => {
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

  const precioInput = document.getElementById("reg-precio").value;

  const nuevoUsuario = {
    nombre,
    email,
    password,
    rol: rolSeleccionado,
    oficio: document.getElementById("reg-oficio").value.trim(),
    categoria: document.getElementById("reg-categoria").value,
    zona: document.getElementById("reg-zona").value.trim(),
    precioPorHora: precioInput ? Number(precioInput) : null,
    descripcion: descripcion.value.trim(),
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  guardarSesion(nuevoUsuario);

  mostrarMensaje(`¡Cuenta creada con éxito! Redirigiendo...`, "exito");

  setTimeout(() => {
    window.location.href = "menu.html";
  }, 1200);
});

// --- Si ya hay una sesión activa, redirigir directo al menú ---
if (localStorage.getItem("oficioya-sesion")) {
  window.location.href = "menu.html";
}