// ========================================================================
// ===== REEMPLAZA TODO TU ARCHIVO JS/CALENDAR.JS CON ESTE CÓDIGO =====
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const tooltip = document.getElementById('race-tooltip');
    const modal = document.getElementById('race-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // ==================================================================
    // ========= CONTROL MANUAL PARA RESALTAR EL GP ACTUAL =========
    // ==================================================================
    // Para cambiar la carrera resaltada, solo tienes que cambiar
    // el texto dentro de las comillas. Usa el 'id' de la carrera.
    // Ejemplos: 'spa', 'hungaroring', 'monza', etc.
    // Si no quieres resaltar ninguna, déjalo en comillas vacías: ''
    
    const GP_A_RESALTAR = 'spa';

    // ==================================================================

    // --- BASE DE DATOS ÚNICA Y COMPLETA ---
    const calendarData = [
        { round: 1, id: 'australia', name: 'GP de Australia', country: 'Australia', date: '14-16 MAR', fechaFin: new Date('2025-03-16T23:59:59Z'), ganadorCarrera: { nombre: "Lando Norris", imagen: "images/drivers/norris.png", bandera: 'https://flagcdn.com/w40/gb.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Leclerc', bandera: 'https://flagcdn.com/w40/mc.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } } ] },
        { round: 2, id: 'china', name: 'GP de China', country: 'China', date: '21-23 MAR', fechaFin: new Date('2025-03-23T23:59:59Z'), ganadorCarrera: { nombre: "Oscar Piastri", imagen: "images/drivers/piastri.png", bandera: 'https://flagcdn.com/w40/au.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación Sprint', ganador: { nombre: 'Hamilton', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Carrera Sprint', ganador: { nombre: 'Hamilton', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } } ] },
        { round: 3, id: 'suzuka', name: 'GP de Japón', country: 'Japan', date: '04-06 APR', fechaFin: new Date('2025-04-06T23:59:59Z'), ganadorCarrera: { nombre: "Max Verstappen", imagen: "images/drivers/verstappen.png", bandera: 'https://flagcdn.com/w40/nl.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Verstappen', bandera: 'https://flagcdn.com/w40/nl.png' } } ] },
        { round: 4, id: 'bahrain', name: 'GP de Bahréin', country: 'Bahrain', date: '11-13 APR', fechaFin: new Date('2025-04-13T23:59:59Z'), ganadorCarrera: { nombre: "Oscar Piastri", imagen: "images/drivers/piastri.png", bandera: 'https://flagcdn.com/w40/au.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación Sprint', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Carrera Sprint', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } } ] },
        { round: 5, id: 'jeddah', name: 'GP de Arabia Saudita', country: 'Saudi Arabia', date: '18-20 APR', fechaFin: new Date('2025-04-20T23:59:59Z'), ganadorCarrera: { nombre: "Oscar Piastri", imagen: "images/drivers/piastri.png", bandera: 'https://flagcdn.com/w40/au.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Gasly', bandera: 'https://flagcdn.com/w40/fr.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } } ] },
        { round: 6, id: 'miami', name: 'GP de Miami', country: 'United States', date: '02-04 MAY', fechaFin: new Date('2025-05-04T23:59:59Z'), ganadorCarrera: { nombre: "Oscar Piastri", imagen: "images/drivers/piastri.png", bandera: 'https://flagcdn.com/w40/au.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Clasificación Sprint', ganador: { nombre: 'Antonelli', bandera: 'https://flagcdn.com/w40/it.png' } }, { nombre: 'Carrera Sprint', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Verstappen', bandera: 'https://flagcdn.com/w40/nl.png' } } ] },
        { round: 7, id: 'imola', name: 'GP de Emilia Romagna', country: 'Italy', date: '16-18 MAY', fechaFin: new Date('2025-05-18T23:59:59Z'), ganadorCarrera: { nombre: "Max Verstappen", imagen: "images/drivers/verstappen.png", bandera: 'https://flagcdn.com/w40/nl.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } } ] },
        { round: 8, id: 'monaco', name: 'GP de Mónaco', country: 'Monaco', date: '23-25 MAY', fechaFin: new Date('2025-05-25T23:59:59Z'), ganadorCarrera: { nombre: "Lando Norris", imagen: "images/drivers/norris.png", bandera: 'https://flagcdn.com/w40/gb.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Leclerc', bandera: 'https://flagcdn.com/w40/mc.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Leclerc', bandera: 'https://flagcdn.com/w40/mc.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Leclerc', bandera: 'https://flagcdn.com/w40/mc.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } } ] },
        { round: 9, id: 'barcelona', name: 'GP de España', country: 'Spain', date: '30-01 MAY/JUN', fechaFin: new Date('2025-06-01T23:59:59Z'), ganadorCarrera: { nombre: "Oscar Piastri", imagen: "images/drivers/piastri.png", bandera: 'https://flagcdn.com/w40/au.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Piastri', bandera: 'https://flagcdn.com/w40/au.png' } } ] },
        { round: 10, id: 'montreal', name: 'GP de Canadá', country: 'Canada', date: '13-15 JUN', fechaFin: new Date('2025-06-15T23:59:59Z'), ganadorCarrera: { nombre: "George Russell", imagen: "images/drivers/russell.png", bandera: 'https://flagcdn.com/w40/gb.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Verstappen', bandera: 'https://flagcdn.com/w40/nl.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Russell', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Russell', bandera: 'https://flagcdn.com/w40/gb.png' } } ] },
        { round: 11, id: 'red_bull_ring', name: 'GP de Austria', country: 'Austria', date: '27-29 JUN', fechaFin: new Date('2025-06-29T23:59:59Z'), ganadorCarrera: { nombre: "Lando Norris", imagen: "images/drivers/norris.png", bandera: 'https://flagcdn.com/w40/gb.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Russell', bandera: 'https://flagcdn.com/w40/gb.png' } },{ nombre: 'Práctica 2', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } } ] },
        { round: 12, id: 'silverstone', name: 'GP de Gran Bretaña', country: 'Great Britain', date: '04-06 JUL', fechaFin: new Date('2025-07-06T23:59:59Z'), ganadorCarrera: { nombre: "Lando Norris", imagen: "images/drivers/norris.png", bandera: 'https://flagcdn.com/w40/gb.png' }, sesiones: [ { nombre: 'Práctica 1', ganador: { nombre: 'Hamilton', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 2', ganador: { nombre: 'Norris', bandera: 'https://flagcdn.com/w40/gb.png' } }, { nombre: 'Práctica 3', ganador: { nombre: 'Leclerc', bandera: 'https://flagcdn.com/w40/mc.png' } }, { nombre: 'Clasificación', ganador: { nombre: 'Verstappen', bandera: 'https://flagcdn.com/w40/nl.png' } } ] },
        { round: 13, id: 'spa', name: 'GP de Bélgica', country: 'Belgium', date: '25-27 JUL', fechaFin: new Date('2025-07-27T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 25/07 - 07:30' }, { nombre: 'Clasificación Sprint', horarioLocal: 'Viernes 25/07 - 11:30' }, { nombre: 'Carrera Sprint', horarioLocal: 'Sábado 26/07 - 07:00' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 26/07 - 11:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 27/07 - 10:00' } ] },
        { round: 14, id: 'hungaroring', name: 'GP de Hungría', country: 'Hungary', date: '01-03 AUG', fechaFin: new Date('2025-08-03T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Vie 01/08 - 08:30' }, { nombre: 'Práctica 2', horarioLocal: 'Vie 01/08 - 12:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sáb 02/08 - 07:30' }, { nombre: 'Clasificación', horarioLocal: 'Sáb 02/08 - 11:00' }, { nombre: 'Carrera', horarioLocal: 'Dom 03/08 - 10:00' } ] },
        { round: 15, id: 'zandvoort', name: 'GP de Países Bajos', country: 'The Netherlands', date: '29-31 AUG', fechaFin: new Date('2025-08-31T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Vie 29/08 - 07:30' }, { nombre: 'Práctica 2', horarioLocal: 'Vie 29/08 - 11:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sáb 30/08 - 06:30' }, { nombre: 'Clasificación', horarioLocal: 'Sáb 30/08 - 10:00' }, { nombre: 'Carrera', horarioLocal: 'Dom 31/08 - 10:00' } ] },
        { round: 16, id: 'monza', name: 'GP de Italia', country: 'Italy', date: '05-07 SEP', fechaFin: new Date('2025-09-07T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Vie 05/09 - 08:30' }, { nombre: 'Práctica 2', horarioLocal: 'Vie 05/09 - 12:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sáb 06/09 - 07:30' }, { nombre: 'Clasificación', horarioLocal: 'Sáb 06/09 - 11:00' }, { nombre: 'Carrera', horarioLocal: 'Dom 07/09 - 10:00' } ] },
        { round: 17, id: 'baku', name: 'GP de Azerbaiyán', country: 'Azerbaijan', date: '19-21 SEP', fechaFin: new Date('2025-09-21T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Vie 19/09 - 06:30' }, { nombre: 'Práctica 2', horarioLocal: 'Vie 19/09 - 10:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sáb 20/09 - 05:30' }, { nombre: 'Clasificación', horarioLocal: 'Sáb 20/09 - 09:00' }, { nombre: 'Carrera', horarioLocal: 'Dom 21/09 - 08:00' } ] },
        { round: 18, id: 'marina_bay', name: 'GP de Singapur', country: 'Singapore', date: '03-05 OCT', fechaFin: new Date('2025-10-05T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 03/10 - 06:30' }, { nombre: 'Práctica 2', horarioLocal: 'Viernes 03/10 - 10:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sábado 04/10 - 06:30' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 04/10 - 10:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 05/10 - 09:00' } ] },
        { round: 19, id: 'austin', name: 'GP de EE.UU.', country: 'United States', date: '17-19 OCT', fechaFin: new Date('2025-10-19T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 17/10 - 14:30' }, { nombre: 'Clasificación Sprint', horarioLocal: 'Viernes 17/10 - 18:30' }, { nombre: 'Carrera Sprint', horarioLocal: 'Sábado 18/10 - 15:00' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 18/10 - 19:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 19/10 - 16:00' } ] },
        { round: 20, id: 'mexico_city', name: 'GP de Ciudad de México', country: 'Mexico', date: '24-26 OCT', fechaFin: new Date('2025-10-26T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 24/10 - 14:30' }, { nombre: 'Práctica 2', horarioLocal: 'Viernes 24/10 - 18:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sábado 25/10 - 13:30' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 25/10 - 17:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 26/10 - 16:00' } ] },
        { round: 21, id: 'interlagos', name: 'GP de Brasil', country: 'Brazil', date: '07-09 NOV', fechaFin: new Date('2025-11-09T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 07/11 - 11:30' }, { nombre: 'Clasificación Sprint', horarioLocal: 'Viernes 07/11 - 15:30' }, { nombre: 'Carrera Sprint', horarioLocal: 'Sábado 08/11 - 11:00' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 08/11 - 15:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 09/11 - 14:00' } ] },
        { round: 22, id: 'las_vegas', name: 'GP de Las Vegas', country: 'United States', date: '20-22 NOV', fechaFin: new Date('2025-11-22T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Jueves 20/11 - 21:00' }, { nombre: 'Práctica 2', horarioLocal: 'Viernes 21/11 - 00:00' }, { nombre: 'Práctica 3', horarioLocal: 'Viernes 21/11 - 21:00' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 22/11 - 00:00' }, { nombre: 'Carrera', horarioLocal: 'Sábado 22/11 - 22:00' } ] },
        { round: 23, id: 'losail', name: 'GP de Qatar', country: 'Qatar', date: '28-30 NOV', fechaFin: new Date('2025-11-30T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 28/11 - 10:30' }, { nombre: 'Clasificación Sprint', horarioLocal: 'Viernes 28/11 - 14:30' }, { nombre: 'Carrera Sprint', horarioLocal: 'Sábado 29/11 - 10:00' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 29/11 - 14:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 30/11 - 13:00' } ] },
        { round: 24, id: 'yas_marina', name: 'GP de Abu Dhabi', country: 'UAE', date: '05-07 DEC', fechaFin: new Date('2025-12-07T23:59:59Z'), ganadorCarrera: null, sesiones: [ { nombre: 'Práctica 1', horarioLocal: 'Viernes 05/12 - 06:30' }, { nombre: 'Práctica 2', horarioLocal: 'Viernes 05/12 - 10:00' }, { nombre: 'Práctica 3', horarioLocal: 'Sábado 06/12 - 07:30' }, { nombre: 'Clasificación', horarioLocal: 'Sábado 06/12 - 11:00' }, { nombre: 'Carrera', horarioLocal: 'Domingo 07/12 - 10:00' } ] }
    ];

    // ----------------------------------------------------------------------------------
    // -------- LÓGICA DE LA APLICACIÓN (NO ES NECESARIO TOCAR) --------
    // ----------------------------------------------------------------------------------

    function initApp() {
        calendarData.sort((a, b) => a.round - b.round);
        generateCalendarCards();
        highlightAndScrollToCurrentRace();
        setupEventListeners();
    }

    function generateCalendarCards() {
        calendarGrid.innerHTML = '';
        calendarData.forEach(race => {
            const card = document.createElement('div');
            card.className = 'race-card';
            card.id = `race-${race.round}`;
            card.dataset.raceId = race.id;
            card.innerHTML = `
                <div class="circuit-img-container">
                    <img src="images/circuits/${race.id}.png" alt="${race.name}" class="circuit-img">
                </div>
                <div class="race-info">
                    <img src="https://flagcdn.com/w40/${getCountryCode(race.country)}.png" alt="${race.country}" class="flag">
                    <div class="race-details">
                        <h3>${race.name}</h3>
                        <p>${race.country}</p>
                    </div>
                </div>
                <p class="race-date">${race.date}</p>
            `;
            calendarGrid.appendChild(card);
        });
    }

    // --- ESTA ES LA FUNCIÓN CORREGIDA Y VERIFICADA ---
    function highlightAndScrollToCurrentRace() {
        if (!GP_A_RESALTAR) {
            console.log("No hay GP especificado para resaltar.");
            return;
        }

        // Encuentra la carrera en base al ID manual
        const raceToHighlight = calendarData.find(race => race.id === GP_A_RESALTAR);

        if (raceToHighlight) {
            const cardToHighlight = document.getElementById(`race-${raceToHighlight.round}`);
            if (cardToHighlight) {
                cardToHighlight.classList.add('current-race-week');
                // Hacer scroll a la tarjeta resaltada
                setTimeout(() => {
                    cardToHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500); // Un pequeño retraso para asegurar que la página se haya renderizado
            }
        }
    }

    function createInfoHtml(race) {
        const raceHasPassed = !!race.ganadorCarrera;
        const sessionsHtml = (race.sesiones || []).map(session => {
            if (session.nombre === 'Carrera' && raceHasPassed) return '';
            if (raceHasPassed && session.ganador) {
                return `<li>
                            <span class="session-name">${session.nombre}</span>
                            <span class="session-winner">
                                ${session.ganador.nombre}
                                <img src="${session.ganador.bandera}" alt="Bandera" class="session-winner-flag">
                            </span>
                        </li>`;
            } else if (!raceHasPassed && session.horarioLocal) {
                return `<li><span class="session-name">${session.nombre}</span> <span class="session-time">${session.horarioLocal}</span></li>`;
            }
            return '';
        }).join('');

        let raceWinnerHtml = '';
        if (race.ganadorCarrera) {
            raceWinnerHtml = `
                <div class="winner-block">
                    <div class="winner-label">Ganador de la carrera</div>
                    <div class="winner-details">
                        <img src="${race.ganadorCarrera.imagen}" alt="${race.ganadorCarrera.nombre}" class="winner-img">
                        <div class="winner-name-flag">
                            <div class="winner-name">${race.ganadorCarrera.nombre}</div>
                            <img src="${race.ganadorCarrera.bandera}" alt="Bandera del ganador" class="winner-flag">
                        </div>
                    </div>
                </div>`;
        }
        const resultsButtonHtml = raceHasPassed ? `<a href="results.html?round=${race.round}" class="results-btn">Ver Resultados Completos</a>` : '';
        return `
            <div class="tooltip-title">${race.name}</div>
            <ul class="tooltip-sessions-list">${sessionsHtml}</ul>
            ${raceWinnerHtml}
            <div class="results-btn-container">${resultsButtonHtml}</div>
        `;
    }

    function setupEventListeners() {
        let hoverTimeout;
        calendarGrid.addEventListener('mouseover', e => {
            const card = e.target.closest('.race-card');
            if (card && window.innerWidth > 768) {
                clearTimeout(hoverTimeout);
                const race = calendarData.find(r => r.id === card.dataset.raceId);
                tooltip.innerHTML = createInfoHtml(race);
                tooltip.style.display = 'block';
                moveTooltip(e);
            }
        });
        calendarGrid.addEventListener('mouseout', () => {
             if (window.innerWidth > 768) {
                 hoverTimeout = setTimeout(() => { tooltip.style.display = 'none'; }, 100);
             }
        });
        calendarGrid.addEventListener('mousemove', e => {
            if (window.innerWidth > 768) moveTooltip(e);
        });
        calendarGrid.addEventListener('click', e => {
            const card = e.target.closest('.race-card');
            if (card) {
                const race = calendarData.find(r => r.id === card.dataset.raceId);
                modalBody.innerHTML = createInfoHtml(race);
                modal.style.display = 'flex';
            }
        });
        modalCloseBtn.addEventListener('click', () => modal.style.display = 'none');
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    function moveTooltip(e) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        let left = e.clientX + 15;
        let top = e.clientY + 15;
        if (left + tooltipWidth > viewportWidth) { left = e.clientX - tooltipWidth - 15; }
        if (top + tooltipHeight > viewportHeight) { top = e.clientY - tooltipHeight - 15; }
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    function getCountryCode(country) {
        const codes = { "Australia": "au", "China": "cn", "Japan": "jp", "Bahrain": "bh", "Saudi Arabia": "sa", "United States": "us", "Italy": "it", "Monaco": "mc", "Spain": "es", "Canada": "ca", "Austria": "at", "Great Britain": "gb", "Belgium": "be", "Hungary": "hu", "The Netherlands": "nl", "Azerbaijan": "az", "Singapore": "sg", "Mexico": "mx", "Brazil": "br", "Qatar": "qa", "UAE": "ae" };
        return codes[country] || "";
    }

    initApp();
});