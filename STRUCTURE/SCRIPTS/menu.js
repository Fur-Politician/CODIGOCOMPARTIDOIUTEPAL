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
selectedAno = 'todos';
selectedDate.textContent = 'Todos';

dateDropdown.addEventListener('click', function(e) {
    if (!monthYearMenu.contains(e.target)) {
        monthYearMenu.style.display = monthYearMenu.style.display === 'none' ? 'block' : 'none';
    }
});

setYear.addEventListener('click', function(e) {
    selectedAno = yearSelect.value;
    selectedDate.textContent = selectedAno === 'todos' ? 'Todos' : selectedAno;
    monthYearMenu.style.display = 'none';
    applyFilters();
});

// Prevenir default al hacer clic dentro del menú
monthYearMenu.addEventListener('click', function(e) {
    e.stopPropagation();
});

let selectedCarrera = null;
let selectedAno = 'todos';

// Llena el selector de años (desde el año más bajo hasta 2025), dejando "Todos" como primera opción
yearSelect.innerHTML = '<option value="todos" selected>Todos</option>';
for(let y = minYear; y <= 2025; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

// Muestra "Todos" en el texto por defecto
selectedAno = 'todos';
selectedDate.textContent = 'Todos';

// Filtrado combinado de trabajos (carrera y año)
function applyFilters() {
    docCards.forEach(card => {
        const cardCarrera = card.getAttribute('data-carrera');
        const cardAno = card.getAttribute('data-ano');
        const carreraMatch = selectedCarrera ? cardCarrera === selectedCarrera : true;
        const anoMatch = (selectedAno === 'todos') ? true : cardAno === selectedAno;
        card.style.display = (carreraMatch && anoMatch) ? '' : 'none';
    });
}

// Manejo del filtro de año
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
