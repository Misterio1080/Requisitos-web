const desarrolladores = [
  { nombre: "Rios", especialidad: "Backend", estado: "Disponible" },
  { nombre: "Rojas", especialidad: "Frontend", estado: "Ocupado" },
  { nombre: "Luperdi", especialidad: "Full Stack", estado: "Disponible" },
  { nombre: "Cortez", especialidad: "UI/UX", estado: "Ocupado" },
  { nombre: "Valencia", especialidad: "QA / Testing", estado: "Disponible" }
];

const devList = document.getElementById("devList");

desarrolladores.forEach(dev => {
  const card = document.createElement("div");
  card.classList.add("dev-card", dev.estado === "Disponible" ? "disponible" : "ocupado");

  card.innerHTML = `
    <h3>${dev.nombre}</h3>
    <p><b>Especialidad:</b> ${dev.especialidad}</p>
    <p><b>Estado:</b> <span>${dev.estado}</span></p>
    <button ${dev.estado === "Ocupado" ? "disabled" : ""}>Seleccionar</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    localStorage.setItem("desarrolladorSeleccionado", dev.nombre);
    alert(`Has seleccionado a ${dev.nombre} como tu desarrollador.`);
    window.location.href = "cliente.html"; // redirige al panel del cliente
  });

  devList.appendChild(card);
});
