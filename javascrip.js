// Seleccionamos los elementos necesarios
const btnComprar = document.querySelectorAll(".btn-comprar");
const listaCarrito = document.getElementById("lista-carrito");
const carrito = [];

// Evento para cada botón "Comprar"
btnComprar.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("¡Botón presionado!");

        // Buscamos el input que está en la misma tarjeta
        const tarjeta = btn.closest('.card');
        const cantidadInput = tarjeta.querySelector('.cantidad-input');
        const cantidad = cantidadInput ? parseInt(cantidadInput.value) || 1 : 1;

        const nombre = btn.getAttribute("data-nombre");
        const precio = parseFloat(btn.getAttribute("data-precio"));

        // Guardamos nombre, precio y cantidad en el carrito
        carrito.push({ nombre, precio, cantidad });

        actualizarCarrito();

        // ✅ Mostrar toast en vez de abrir modal
        mostrarToast(`${nombre} agregado al carrito `);
    });
});

// Función para actualizar el carrito (aunque no se muestre modal)
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        const li = document.createElement("li");
        li.textContent = `${item.nombre} (x${item.cantidad}) - $${subtotal.toFixed(2)} `;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            actualizarCarrito();
        });

        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });

    const totalCarrito = document.getElementById("total-carrito");
    if (totalCarrito) {
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }

    // 🔘 Botón Comprar
    const btnComprarFinal = document.createElement("button");
    btnComprarFinal.textContent = "Comprar";
    btnComprarFinal.classList.add("btn-comprar-final");

    btnComprarFinal.addEventListener("click", () => {
        if (carrito.length === 0) {
            mostrarToast("Tu carrito está vacío");
        } else {
            mostrarToast("¡Compra realizada con éxito!");
            carrito.length = 0; // vacía el carrito
            actualizarCarrito();
        }
    });

    listaCarrito.appendChild(btnComprarFinal);
}



// ✅ Función para mostrar toast flotante
function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

const verCarritoBtn = document.getElementById("ver-carrito");
const modal = document.getElementById("carrito-modal");
const cerrarBtn = document.querySelector(".cerrar-btn");

verCarritoBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

cerrarBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

nextBtn.addEventListener("click", () => {
  const cards = document.querySelectorAll(".carousel-track .card");
  if (index < cards.length - 1) {
    index++;
    track.style.transform = `translateX(-${index * 270}px)`; 
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    track.style.transform = `translateX(-${index * 270}px)`;
  }
});


