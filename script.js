document.addEventListener("DOMContentLoaded", () => {
  // ======== LOGIN ========
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const role = document.getElementById("role").value;

      if (role === "cliente") {
        const devSeleccionado = localStorage.getItem("desarrolladorSeleccionado");
        if (!devSeleccionado) {
          // Si el cliente aún no eligió desarrollador
          window.location.href = "desarrolladores.html";
        } else {
          // Ya tiene desarrollador asignado
          window.location.href = "cliente.html";
        }
      } else if (role === "desarrollador") {
        window.location.href = "desarrollador.html";
      } else {
        alert("Selecciona un rol válido");
      }
    });
  }

  // ======== PROTECCIÓN DE RUTAS ========
  const path = window.location.pathname;

  // En cliente.html, verificar que haya un desarrollador elegido
  if (path.includes("cliente.html")) {
    const devSeleccionado = localStorage.getItem("desarrolladorSeleccionado");
    if (!devSeleccionado) {
      alert("Debes elegir un desarrollador antes de acceder al panel.");
      window.location.href = "desarrolladores.html";
    } else {
      mostrarDesarrolladorAsignado(devSeleccionado);
    }
  }

  // ======== OCULTAR FOOTER EN LOGIN ========
  const footer = document.querySelector(".footer");
  if (footer && path.includes("index.html")) {
    footer.style.display = "none";
  }

  // ======== MENÚ FLOTANTE USUARIO ========
  const userIcon = document.getElementById("userIcon");
  const userMenu = document.getElementById("userMenu");
  if (userIcon && userMenu) {
    userIcon.addEventListener("click", () => {
      userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
    });
    window.addEventListener("click", (e) => {
      if (!userIcon.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.style.display = "none";
      }
    });
  }
});

// ======== LOGOUT ========
function logout() {
  localStorage.removeItem("desarrolladorSeleccionado");
  window.location.href = "index.html";
}

// ======== CLIENTE: ENVIAR REQUERIMIENTO ========
function enviarRequerimiento() {
  const req = document.getElementById("nuevoRequerimiento").value;
  if (!req.trim()) return alert("Escribe un requerimiento");
  const lista = document.getElementById("listaRequerimientos");
  if (lista) {
    const li = document.createElement("li");
    li.textContent = req;
    lista.appendChild(li);
  }
  document.getElementById("nuevoRequerimiento").value = "";
}

// ======== DESARROLLADOR: ACTUALIZAR ESTADO ========
function actualizarEstado() {
  const estado = document.getElementById("estadoSelect").value;
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, i) => {
    step.classList.remove("completed", "active");
    if (i + 1 < estado) step.classList.add("completed");
    if (i + 1 == estado) step.classList.add("active");
  });
}

// ======== CHAT ========
function enviarMensaje(rol) {
  const inputId = rol === "cliente" ? "mensajeCliente" : "mensajeDesarrollador";
  const mensaje = document.getElementById(inputId).value;
  if (!mensaje.trim()) return;
  const chat = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.classList.add("chat-bubble", rol);
  div.innerHTML = `<b>${rol}:</b> ${mensaje}`;
  chat.appendChild(div);
  document.getElementById(inputId).value = "";
  chat.scrollTop = chat.scrollHeight;
}

// ======== MOSTRAR DESARROLLADOR ASIGNADO EN PANEL CLIENTE ========
function mostrarDesarrolladorAsignado(nombre) {
  const header = document.querySelector("header h1");
  if (header) {
    const span = document.createElement("span");
    span.textContent = `  |  Desarrollador asignado: ${nombre}`;
    span.style.fontSize = "0.8em";
    span.style.color = "#ffffff";
    span.style.fontWeight = "500";

    header.appendChild(span);
  }
}
