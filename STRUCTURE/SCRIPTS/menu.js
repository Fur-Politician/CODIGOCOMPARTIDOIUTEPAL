const dateDropdown = document.getElementById('dateDropdown');
const selectedDate = document.getElementById('selectedDate');
const monthYearMenu = document.getElementById('monthYearMenu');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const setMonthYear = document.getElementById('setMonthYear');

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();

// Populate years (from 2000 to 2025) with full year text
for(let y = 2000; y <= 2025; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if(y === currentYear) opt.selected = true;
    yearSelect.appendChild(opt);
}

// Selecciona el mes actual en el selector de mes
monthSelect.value = currentMonth;

// Muestra la fecha actual en el texto
selectedDate.textContent = `${String(currentMonth).padStart(2, '0')}/${currentYear}`;

dateDropdown.addEventListener('click', function(e) {
    if (!monthYearMenu.contains(e.target)) {
        monthYearMenu.style.display = monthYearMenu.style.display === 'none' ? 'block' : 'none';
    }
});

setMonthYear.addEventListener('click', function(e) {
    const month = monthSelect.value.padStart(2, '0');
    const year = yearSelect.value;
    selectedDate.textContent = `${month}/${year}`;
    monthYearMenu.style.display = 'none';
});

// Prevent closing when clicking inside menu
monthYearMenu.addEventListener('click', function(e) {
    e.stopPropagation();
});
