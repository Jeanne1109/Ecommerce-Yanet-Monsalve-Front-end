const productos = [
    // --- Productos para Perros ---
    {
        id: 1,
        nombre: "Arnés Nosferatu de Cuero",
        precio: 35990,
        imagen: "assets/img/arnes-cuero.jpg",
        descripcion: "Elegancia, estilo y resistencia. Este arnés está forrado con cuero genuino y adornado con hebillas y cadenas de acero cromado. Garantía de durabilidad y actitud intransigente.",
        especificaciones: ["Material: Cuero Bovino de 3mm / Acero Inoxidable.", "Ajuste: Hebillas ajustables para razas medianas y grandes.", "Tallas: S, M, L, XL, (Ver Guía de Ataque). Ademas contamos con tallas personalizadas."]
    },
    {
        id: 2,
        nombre: "Collar de Pinchos Cromados",
        precio: 15990,
        imagen: "assets/img/collar-pinchos.jpg",
        descripcion: "El accesorio definitivo para imponer respeto en el parque. Acero inoxidable de alta resistencia.",
        especificaciones: ["Material: Cuero Sintético y Acero Inoxidable.", "Ajuste: Hebilla clásica, 5 puntos de ajuste.", "Tallas: Única (Ajustable de 30cm a 50cm). Puede ser de cuero genuino bajo pedido."]
    },
    {
        id: 6,
        nombre: "Correa de Paseo Requiem",
        precio: 20000,
        imagen: "assets/img/correa-gotica.jpg",
        descripcion: "Correa de alta resistencia para paseos nocturnos, con detalles de terciopelo y mosquetón cromado.",
        especificaciones: ["Material: Nylon reforzado y Terciopelo.", "Largo: 1.5 metros.", "Gancho: Mosquetón de seguridad con giro 360°."]
    },
    // --- Productos para Gatos ---
    {
        id: 3,
        nombre: "Chaqueta Tartán, Alicia Encadenada",
        precio: 22500,
        imagen: "assets/img/chaqueta-tartan.jpg",
        descripcion: "Tartán clásica para dueños y gatos amantes del Grunge. Elegante, pero con un toque subversivo.",
        especificaciones: ["Material: 100%  Algodón.", "Cierre: Botones de presión.", "Tallas: S, M, L, XL. (otras tallas bajo pedido)"]
    },
    {
        id: 4,
        nombre: "Arnés Alas de Drácula",
        precio: 18990,
        imagen: "assets/img/arnes-alas.jpg",
        descripcion: "Vuela entre las sombras. Hecho en terciopelo negro y piel sintética para una apariencia dramática.",
        especificaciones: ["Material: Terciopelo y Piel Sintética.", "Ajuste: Velcro en pecho y abdomen.", "Tallas: S, M, L."]
    },
    {
        id: 5,
        nombre: "Collar Mobius, Anti-Ahorque",
        precio: 10500,
        imagen: "assets/img/collar-mobius.jpg",
        descripcion: "Collar aterciopelado de alta resistencia, con broche cromado de seguridad anti-ahorque para gatos eternos.",
        especificaciones: ["Material: Velvetón.", "Sistema: Broche de seguridad (Anti-Ahorque).", "Colores: Negro, Rojo Rubí."]
    }
];

function actualizarContadorNavbar() {
    const contadorElement = document.getElementById('contador-carrito');
    const totalItems = localStorage.getItem('contadorCarrito') || 0; 
    
    if (contadorElement) {
        contadorElement.textContent = totalItems;
    }
}

function agregarACarrito(e) {
    e.preventDefault(); 
    
    let contador = parseInt(localStorage.getItem('contadorCarrito')) || 0;
    contador++;
    
    localStorage.setItem('contadorCarrito', contador);
    
    actualizarContadorNavbar(); 

    console.log(`Producto ID ${e.target.dataset.id} agregado. Nuevo Total: ${contador} items.`);
}

function conectarBotonesCarrito() {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarACarrito);
    });
}


function inicializarCarrusel() {
    const slidesContainer = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slidesContainer || !prevBtn || !nextBtn) {
        return; 
    }

    const slides = slidesContainer.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0; 
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    updateCarousel(); 
}



function cargarDetalleProducto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const producto = productos.find(p => p.id === productId);

    if (!producto) { 
        return; 
    }
    
    document.title = `${producto.nombre} | Princess Fedora`;
    
    const titleElement = document.getElementById('product-title');
    if (titleElement) titleElement.textContent = producto.nombre;

    const priceElement = document.getElementById('detail-price');
    if (priceElement) priceElement.textContent = `$${producto.precio.toLocaleString('es-CL')} CLP`;

    const descElement = document.getElementById('detail-description');
    if (descElement) descElement.textContent = producto.descripcion;

    const btnAgregar = document.getElementById('btn-agregar-carrito');
    if (btnAgregar) btnAgregar.setAttribute('data-id', productId); 

    const specsList = document.getElementById('specs-list');
    if (specsList) {
        specsList.innerHTML = ''; 
        producto.especificaciones.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
    }
    
    const carruselSlides = document.getElementById('carouselSlides');
    if (carruselSlides) {
        const mainImage = carruselSlides.querySelector('.slide img');
        if (mainImage) {
            mainImage.src = producto.imagen;
            mainImage.alt = producto.nombre;
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    
    actualizarContadorNavbar(); 
    conectarBotonesCarrito(); 

    cargarDetalleProducto(); 
    inicializarCarrusel();
});