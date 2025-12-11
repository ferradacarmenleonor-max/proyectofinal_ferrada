const suplementos = [
    {id: 1, nombre: "Vitamina C", categoria: "Inmunidad", descripcion: "Fortalece el sistema inmunológico, previene resfrios y gripes, camsancio y fatiga", precio: 12.50},
    {id: 2, nombre: "Omega 3", categoria: "Salud Cardiovascular", descripcion: "Mejora la salud cardiovascular, reduce inflamación, mejora la función cerebral", precio: 35.90},
    {id: 3, nombre: "Multivitamínico", categoria: "Bienestar General", descripcion: "Aporta nutrientes esenciales para el bienestar general, mejora la energía y vitalidad", precio: 75.50},
    {id: 4, nombre: "Magnesio", categoria: "Relajación y Energía", descripcion: "Energía, relajación y salud integral: Ayuda a reducir la fatiga y el cansancio, mejora la función muscular y nerviosa, reduce el stress, ayuda a mantenr un sueño reparador", precio: 13.50},
    {id: 5, nombre: "Artro Flex", categoria: "Salud Articular", descripcion: "Fortalece las articulaciones y reduce el dolor articular, mejora la movilidad. Fundamental para mantener una estructura ósea saludable", precio: 45.90},
    {id: 6, nombre: "Probioticos", categoria: "Salud Digestiva", descripcion: "Reduce la hinchazón, mejora la digestión, fortalece el sistema inmunológico, reduce el riesgo de infecciones intestinales", precio: 65.50},
    {id: 7, nombre: "Colágeno", categoria: "Salud de la Piel y Articulaciones", descripcion: "Mejora la salud de la piel y articulaciones", precio: 35.90},
    {id: 8, nombre: "Resveratrol", categoria: "Antioxidante y Salud Cardiovascular", descripcion: "Retarda el envejecimiento celular, mejora la circulación sanguínea, aumenta la energía, protege el corazón", precio: 55.50},
    {id: 9, nombre: "Vitamina D", categoria: "Salud Ósea e Inmunológica", descripcion: "Fortalece los huesos y el sistema inmunológico, mejora el estado de ánimo", precio: 65.00},
    {id: 10, nombre: "Hierro", categoria: "Prevención de Anemia", descripcion: "Previene la anemia, mejora la energía y concentración", precio: 25.90},
    {id: 11, nombre: "Zinc", categoria: "Sistema Inmunológico", descripcion: "Refuerza el sistema inmunológico, acelera la cicatrización de heridas", precio: 25.90},
    {id: 12, nombre: "Calcio", categoria: "Salud Ósea", descripcion: "Fortalece los huesos y dientes, previene la osteoporosis", precio: 25.00},
    {id: 13, nombre: "Vitamina B12", categoria: "Energía y Metabolismo", descripcion: "Mejora la energía y el metabolismo, previene la anemia", precio: 55.00},
    {id: 14, nombre: "Ácido Fólico", categoria: "Salud Prenatal y Cardiovascular", descripcion: "Previene defectos congénitos, mejora la salud cardiovascular", precio: 45.00},
    {id: 15, nombre: "Coenzima Q10", categoria: "Energía Celular y Salud Cardiovascular", descripcion: "Mejora la energía celular, protege el corazón", precio: 45.00},
];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contendorSuplementos = document.getElementById("supplements-container");


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    imprimirCarrito(); 
}
function vaciarCarrito() {
    if (carrito.length === 0) return;
    carrito.length = 0;
    guardarCarrito();
    imprimirCarrito();
    alert("El carrito ha sido vaciado.");
}
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. ¡Agrega productos antes de finalizar la compra!");
        return;
    }
    
    alert("¡Compra realizada con éxito! Gracias por tu pedido.");
    vaciarCarrito(); // Vacía el carrito después de la compra
}
function imprimirCarrito() {
    const contenedorCarrito = document.getElementById("cart-container");
    contenedorCarrito.innerHTML = "<h2>Carrito de Compras</h2>";
    let total = 0;
    
    carrito.forEach((item, index) => {
        contenedorCarrito.innerHTML += `
            <div class="cart-item">
                <p>${index + 1} - ${item.supplement} - $${item.precio.toFixed(2)}</p>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        total += item.precio;
    });

    if (carrito.length > 0) {
        contenedorCarrito.innerHTML += `
            <hr>
            <h3>Total: $${total.toFixed(2)}</h3>
            <div class="cart-actions">
                <button id="btnVaciarCarrito" class="btn-secondary">Vaciar Carrito</button>
                <button id="btnFinalizarCompra" class="btn-primary">Finalizar Compra</button>
            </div>
        `;
        
        // Asocia las funciones a los botones que acaban de ser creados en el DOM
        document.getElementById("btnVaciarCarrito").addEventListener("click", vaciarCarrito);
        document.getElementById("btnFinalizarCompra").addEventListener("click", finalizarCompra);
        const deleteButtons = document.querySelectorAll(".btn-eliminar");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => eliminarProducto(e.target.dataset.index));
        });

    } else {
        contenedorCarrito.innerHTML += "<p>El carrito está vacío.</p>";
    }
}
if (carrito.length > 0) {
    imprimirCarrito();
}
suplementos.forEach((supplement) => {
    let cardSuplemento = document.createElement("article");
    cardSuplemento.classList = "supplement-item";
    
    cardSuplemento.innerHTML = `
        <h2>Suplemento: ${supplement.nombre}</h2>
        <p>Categoría: ${supplement.categoria}</p>
        <p>Descripción: ${supplement.descripcion}</p>
        <p>Precio: $${supplement.precio.toFixed(2)}</p>
        <button id="btnComprar${supplement.id}">Comprar</button>
    `;

    // para agregar al contenedor padre
    contendorSuplementos.appendChild(cardSuplemento);
    const botonComprar = document.getElementById(`btnComprar${supplement.id}`);
    botonComprar.addEventListener("click", () => {
        carrito.push({ 
            id: supplement.id, 
            supplement: supplement.nombre,
            precio: supplement.precio
        });

        imprimirCarrito();
        guardarCarrito(); // Persistencia
    });
});

