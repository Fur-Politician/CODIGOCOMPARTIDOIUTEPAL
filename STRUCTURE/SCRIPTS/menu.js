// Manejo del menú desplegable de fecha
const dateDropdown = document.getElementById('dateDropdown');
const selectedDate = document.getElementById('selectedDate');
const monthYearMenu = document.getElementById('monthYearMenu');
const yearSelect = document.getElementById('yearSelect');
const setYear = document.getElementById('setYear');

const docCards = document.querySelectorAll('.doc-card');

// Obtener el año más bajo de los trabajos
let minYear = Infinity;
docCards.forEach(card => {
    const year = parseInt(card.getAttribute('data-ano'), 10);
    if (year < minYear) minYear = year;
});
if (!isFinite(minYear)) minYear = 2000; // fallback si no hay trabajos

const now = new Date();
const currentYear = now.getFullYear();

// Llena el selector de años (desde el año más bajo hasta 2025), dejando "Todos" como primera opción
yearSelect.innerHTML = '<option value="todos" selected>Todos</option>';
for(let y = minYear; y <= 2025; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

// Muestra "Todos" en el texto por defecto
selectedDate.textContent = 'Todos';

dateDropdown.addEventListener('click', function(e) {
    //Establece si se ha hecho clic dentro del menú para poder mostrarlo o no
    if (!monthYearMenu.contains(e.target)) {
        monthYearMenu.style.display = monthYearMenu.style.display === 'none' ? 'block' : 'none';
    }
});


// setYear.addEventListener('click', function(e) {
//     selectedAno = yearSelect.value;
//     selectedDate.textContent = selectedAno === 'todos' ? 'Todos' : selectedAno;
//     monthYearMenu.style.display = 'none';
//     applyFilters();
// });

// Prevenir default al hacer clic dentro del menú
monthYearMenu.addEventListener('click', function(e) {
    e.stopPropagation();
});

let selectedCarrera = null;
let selectedAno = 'todos'; // Inicializa antes de cualquier uso

// Llena el selector de años (desde el año más bajo hasta 2025), dejando "Todos" como primera opción
yearSelect.innerHTML = '<option value="todos" selected>Todos</option>';
for(let y = minYear; y <= 2025; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

// Muestra "Todos" en el texto por defecto
selectedDate.textContent = 'Todos';

// Marcar trabajos con más de 5 años como "antiguos"
docCards.forEach(card => {
    const year = parseInt(card.getAttribute('data-ano'), 10);
    if (currentYear - year > 5) {
        card.classList.add('old-doc');
        const xMark = card.querySelector('.doc-x');
        if (xMark) xMark.style.display = 'block';
    } else {
        card.classList.remove('old-doc');
        const xMark = card.querySelector('.doc-x');
        if (xMark) xMark.style.display = 'none';
    }
});

// Filtrado combinado de trabajos (carrera, año y búsqueda)
function applyFilters() {
    const docSection = document.querySelector('.documents');
    let cards = Array.from(document.querySelectorAll('.doc-card'));
    cards = cards.filter(card => {
        const cardCarrera = card.getAttribute('data-carrera');
        const cardAno = card.getAttribute('data-ano');
        const infoText = card.querySelector('.doc-info').textContent.toLowerCase();
        const carreraMatch = selectedCarrera ? cardCarrera === selectedCarrera : true;
        const anoMatch = (selectedAno === 'todos') ? true : cardAno === selectedAno;
        const searchMatch = searchText ? infoText.includes(searchText) : true;
        return carreraMatch && anoMatch && searchMatch;
    });

    // Si no hay carrera seleccionada, ordenar por año descendente
    if (!selectedCarrera) {
        cards.sort((a, b) => {
            const yearA = parseInt(a.getAttribute('data-ano'), 10);
            const yearB = parseInt(b.getAttribute('data-ano'), 10);
            return yearB - yearA;
        });
    }

    // Ocultar todos y mostrar solo los filtrados en orden
    document.querySelectorAll('.doc-card').forEach(card => card.style.display = 'none');
    cards.forEach(card => {
        card.style.display = '';
        docSection.appendChild(card); // Reordena en el DOM
    });
}

// Manejo del filtro de año
//establecimiento del año seleccionado y actualización del texto
//además de ocultar el menú y aplicar los filtros
setYear.addEventListener('click', function(e) {
    selectedAno = yearSelect.value;
    selectedDate.textContent = selectedAno === 'todos' ? 'Todos' : selectedAno;
    monthYearMenu.style.display = 'none';
    applyFilters();
});

// Manejo del filtro de carrera
const sidebarButtons = document.querySelectorAll('.sidebar button');
sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const isSelected = btn.classList.contains('selected');
        sidebarButtons.forEach(b => b.classList.remove('selected'));
        if (isSelected) {
            selectedCarrera = null;
        } else {
            btn.classList.add('selected');
            selectedCarrera = btn.getAttribute('data-carrera');
        }
        applyFilters();
    });
});

// Mostrar todos los trabajos si se hace clic en el título "CARRERAS"
document.querySelector('.sidebar-title').addEventListener('click', () => {
    selectedCarrera = null;
    sidebarButtons.forEach(b => b.classList.remove('selected'));
    applyFilters();
});

const searchInput = document.querySelector('.search-bar input');
let searchText = '';

searchInput.addEventListener('input', function() {
    searchText = this.value.trim().toLowerCase();
    applyFilters();
});

// Modal añadir trabajo
const addTrabajoBtn = document.getElementById('addTrabajoBtn');
const addTrabajoModal = document.getElementById('addTrabajoModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addTrabajoForm = document.getElementById('addTrabajoForm');

addTrabajoBtn.addEventListener('click', () => {
    addTrabajoModal.style.display = 'flex';
});
closeModalBtn.addEventListener('click', () => {
    addTrabajoModal.style.display = 'none';
});
addTrabajoModal.addEventListener('click', (e) => {
    if (e.target === addTrabajoModal) addTrabajoModal.style.display = 'none';
});

addTrabajoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('trabajoNombre').value.trim();
    const carrera = document.getElementById('trabajoCarrera').value;
    const ano = document.getElementById('trabajoAno').value;
    const pdfInput = document.getElementById('trabajoPdf');
    const pdfFile = pdfInput.files[0];

    if (!nombre || !carrera || !ano || !pdfFile) return;

    // Formatea la carrera: solo la primera letra en mayúscula
    const carreraFormateada = carrera.charAt(0).toUpperCase() + carrera.slice(1).toLowerCase().replace('_', ' ');

    // Crear nueva tarjeta de trabajo
    const docSection = document.querySelector('.documents');
    const newCard = document.createElement('div');
    newCard.className = 'doc-card';
    newCard.setAttribute('data-carrera', carrera);
    newCard.setAttribute('data-ano', ano);

    // X para trabajos antiguos
    const xDiv = document.createElement('div');
    xDiv.className = 'doc-x';
    xDiv.innerHTML = '&#10006;';
    xDiv.style.display = 'none';
    newCard.appendChild(xDiv);

    // Icono PDF
    const iconDiv = document.createElement('div');
    iconDiv.className = 'doc-icon';
    newCard.appendChild(iconDiv);

    // Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'doc-info';
    infoDiv.textContent = `${nombre}, ${carreraFormateada}, ${ano}`;
    newCard.appendChild(infoDiv);

    // Enlace al PDF (solo en memoria, no persistente)
    const pdfUrl = URL.createObjectURL(pdfFile);
    newCard.addEventListener('click', function() {
        window.open(pdfUrl, '_blank');
    });

    docSection.appendChild(newCard);

    // Marcar si es antiguo
    const yearNum = parseInt(ano, 10);
    if (new Date().getFullYear() - yearNum > 5) {
        newCard.classList.add('old-doc');
        xDiv.style.display = 'block';
    }

    addTrabajoModal.style.display = 'none';
    addTrabajoForm.reset();
    applyFilters();
});
