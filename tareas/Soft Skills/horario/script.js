let workers = {};
let currentLanguage = 'en';
let currentWorker = null;

const translations = {
    es: {
        title: 'Sistema de Fichajes',
        'add-employee-title': 'Añadir Trabajador',
        'employee-name-label': 'Nombre del Trabajador:',
        'add-employee-button': 'Añadir Trabajador',
        'employee-list-title': 'Lista de Trabajadores y Horas Totales',
        'select-employee-label': 'Seleccionar Trabajador:',
        'work-date-label': 'Fecha de Trabajo (AAAA-MM-DD):',
        'start-time-label': 'Hora de Entrada (HH:MM):',
        'end-time-label': 'Hora de Salida (HH:MM):',
        'add-shift-title': 'Añadir Horario',
        'add-shift-button': 'Añadir Horario',
        'worked-shifts-title': 'Horarios Trabajados para ',
        'hours worked': 'horas trabajadas'
    },
    en: {
        title: 'Time Tracking System',
        'add-employee-title': 'Add Employee',
        'employee-name-label': 'Employee Name:',
        'add-employee-button': 'Add Employee',
        'employee-list-title': 'Employee List and Total Hours',
        'select-employee-label': 'Select Employee:',
        'work-date-label': 'Work Date (YYYY-MM-DD):',
        'start-time-label': 'Start Time (HH:MM):',
        'end-time-label': 'End Time (HH:MM):',
        'add-shift-title': 'Add Shift',
        'add-shift-button': 'Add Shift',
        'worked-shifts-title': 'Worked Shifts for ',
        'hours worked': 'hours worked'
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
}

function updateLanguage() {
    document.getElementById('main-title').textContent = translations[currentLanguage].title;
    document.getElementById('add-employee-title').textContent = translations[currentLanguage]['add-employee-title'];
    document.getElementById('employee-name-label').textContent = translations[currentLanguage]['employee-name-label'];
    document.getElementById('add-employee-button').textContent = translations[currentLanguage]['add-employee-button'];
    document.getElementById('employee-list-title').textContent = translations[currentLanguage]['employee-list-title'];
    document.getElementById('select-employee-label').textContent = translations[currentLanguage]['select-employee-label'];
    document.getElementById('work-date-label').textContent = translations[currentLanguage]['work-date-label'];
    document.getElementById('start-time-label').textContent = translations[currentLanguage]['start-time-label'];
    document.getElementById('end-time-label').textContent = translations[currentLanguage]['end-time-label'];
    document.getElementById('add-shift-title').textContent = translations[currentLanguage]['add-shift-title'];
    document.getElementById('add-shift-button').textContent = translations[currentLanguage]['add-shift-button'];
    updateWorkerSelect();
    if (currentWorker) {
        document.getElementById('worked-shifts-title').textContent = translations[currentLanguage]['worked-shifts-title'] + currentWorker;
        updateShiftTable();
    }
}

function addWorker() {
    const workerName = document.getElementById('worker-name').value;
    if (!workers[workerName]) {
        workers[workerName] = [];
        updateWorkerList();
        document.getElementById('worker-name').value = '';
    } else {
        alert(translations[currentLanguage]['worker already exists']);
    }
}

function selectWorker(workerName) {
    currentWorker = workerName;
    document.getElementById('shift-form').style.display = 'block';
    document.getElementById('worker-list').style.display = 'none';
    document.getElementById('shift-table').style.display = 'block';
    document.getElementById('worked-shifts-title').textContent = translations[currentLanguage]['worked-shifts-title'] + currentWorker;
    updateShiftTable();
}

function addShift() {
    const selectedWorker = document.getElementById('selected-worker').value;
    if (selectedWorker) {
        const workDate = document.getElementById('work-date').value;
        const entryTime = document.getElementById('entry-time').value;
        const exitTime = document.getElementById('exit-time').value;
        if (!workers[selectedWorker]) {
            workers[selectedWorker] = [];
        }
        workers[selectedWorker].push({ date: workDate, entry: entryTime, exit: exitTime });
        updateWorkerList();
        updateShiftTable();
        clearShiftForm();
    } else {
        alert(translations[currentLanguage]['please select an employee']);
    }
}

function calcularHorasTrabajadas(horaEntrada, horaSalida) {
    const [horasEntrada, minutosEntrada] = horaEntrada.split(':').map(Number);
    const [horasSalida, minutosSalida] = horaSalida.split(':').map(Number);

    const totalMinutosEntrada = horasEntrada * 60 + minutosEntrada;
    const totalMinutosSalida = horasSalida * 60 + minutosSalida;

    const horasTrabajadas = (totalMinutosSalida - totalMinutosEntrada) / 60;
    return horasTrabajadas;
}

function updateWorkerList() {
    const workerEntries = document.getElementById('worker-entries');
    workerEntries.innerHTML = '';

    for (const workerName in workers) {
        let totalHours = 0;
        for (const shift of workers[workerName]) {
            totalHours += calcularHorasTrabajadas(shift.entry, shift.exit);
        }

        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${workerName}</span>: <span>${totalHours.toFixed(2)} ${translations[currentLanguage]['hours worked']}</span>`;
        listItem.onclick = () => selectWorker(workerName);
        workerEntries.appendChild(listItem);
    }

    updateWorkerSelect();
}

function updateWorkerSelect() {
    const workerSelect = document.getElementById('selected-worker');
    workerSelect.innerHTML = '<option value="" disabled selected>' + translations[currentLanguage]['select-employee-label'] + '</option>';
    for (const workerName in workers) {
        const option = document.createElement('option');
        option.value = workerName;
        option.textContent = workerName;
        workerSelect.appendChild(option);
    }
}

function clearShiftForm() {
    document.getElementById('selected-worker').value = '';
    document.getElementById('work-date').value = '';
    document.getElementById('entry-time').value = '';
    document.getElementById('exit-time').value = '';
}

// Inicializar el lenguaje al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
});