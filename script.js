let tareas = [];

// Cargar tareas guardadas
window.onload = function () {
  const guardadas = localStorage.getItem("tareas");
  if (guardadas) {
    tareas = JSON.parse(guardadas);
    tareas.forEach(t => crearTarea(t.texto, t.completada));
  }
};

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value;

  if (texto === "") return;

  const nuevaTarea = { texto: texto, completada: false };
  tareas.push(nuevaTarea);

  crearTarea(texto, false);
  guardarTareas();

  input.value = "";
}

function crearTarea(texto, completada) {
  const li = document.createElement("li");
  li.textContent = texto;

  if (completada) {
    li.classList.add("completada");
  }

  li.onclick = function () {
    li.classList.toggle("completada");

    const index = [...li.parentNode.children].indexOf(li);
    tareas[index].completada = !tareas[index].completada;
    guardarTareas();
  };

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "❌";

  btnEliminar.onclick = function (e) {
    e.stopPropagation();

    const index = [...li.parentNode.children].indexOf(li);
    tareas.splice(index, 1);

    li.remove();
    guardarTareas();
  };

  li.appendChild(btnEliminar);

  document.getElementById("listaTareas").appendChild(li);
}function filtrar(tipo) {
  const items = document.querySelectorAll("#listaTareas li");

  items.forEach((li) => {
    if (tipo === "todas") {
      li.style.display = "flex";
    } else if (tipo === "pendientes") {
      li.style.display = li.classList.contains("completada") ? "none" : "flex";
    } else if (tipo === "completadas") {
      li.style.display = li.classList.contains("completada") ? "flex" : "none";
    }
  });
}if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"));
}