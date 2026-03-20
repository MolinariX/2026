// ==========================================
// CALENDARIO INTERACTIVO F1 2026 - ESPN STYLE API AUTOMATION
// ==========================================

// Mapeos rápidos para asociar apellidos o IDs con sus logos e imágenes y colores para el fondo.
const driverData = {
    verstappen: { id: 'verstappen', name: 'VERSTAPPEN', team: 'Red Bull Racing', img: 'images/drivers/verstappen.png', flag: 'nl', bgClass: 'bg-redbull', logo: 'images/logos/redbull.png' },
    leclerc: { id: 'leclerc', name: 'LECLERC', team: 'Ferrari', img: 'images/drivers/leclerc.png', flag: 'mc', bgClass: 'bg-ferrari', logo: 'images/logos/ferrari.png' },
    norris: { id: 'norris', name: 'NORRIS', team: 'McLaren', img: 'images/drivers/norris.png', flag: 'gb', bgClass: 'bg-mclaren', logo: 'images/logos/mclaren.png' },
    antonelli: { id: 'antonelli', name: 'ANTONELLI', team: 'Mercedes', img: 'images/drivers/antonelli.png', flag: 'it', bgClass: 'bg-mercedes', logo: 'images/logos/mercedes.png' },
    russell: { id: 'russell', name: 'RUSSELL', team: 'Mercedes', img: 'images/drivers/russell.png', flag: 'gb', bgClass: 'bg-mercedes', logo: 'images/logos/mercedes.png' },
    colapinto: { id: 'colapinto', name: 'COLAPINTO', team: 'Alpine', img: 'images/drivers/colapinto.png', flag: 'ar', bgClass: 'bg-alpine', logo: 'images/logos/alpine.png' },
    hamilton: { id: 'hamilton', name: 'HAMILTON', team: 'Ferrari', img: 'images/drivers/hamilton.png', flag: 'gb', bgClass: 'bg-ferrari', logo: 'images/logos/ferrari.png' },
    piastri: { id: 'piastri', name: 'PIASTRI', team: 'McLaren', img: 'images/drivers/piastri.png', flag: 'au', bgClass: 'bg-mclaren', logo: 'images/logos/mclaren.png' },
    sainz: { id: 'sainz', name: 'SAINZ', team: 'Williams', img: 'images/drivers/sainz.png', flag: 'es', bgClass: 'bg-williams', logo: 'images/logos/williams.png' },
    alonso: { id: 'alonso', name: 'ALONSO', team: 'Aston Martin', img: 'images/drivers/alonso.png', flag: 'es', bgClass: 'bg-aston', logo: 'images/logos/aston-martin.png' }
    // Puedes continuar poblando esta lista según sea necesario
};

// Calendario Base Local (por si la API falla o no tiene aún los horarios 2026 completos)
// Basado en las fechas oficiales publicadas para 2026, modifiables
const calendarStore = [
    { round: 1, country: 'AUSTRALIA', location: 'MELBOURNE', month: 'MAR', days: '06-08', flagUrl: 'https://flagcdn.com/w80/au.png', status: 'scheduled', sessions: [ {id: 'fp1', name: 'Práctica 1'}, {id: 'fp2', name: 'Práctica 2'}, {id: 'fp3', name: 'Práctica 3'}, {id: 'quali', name: 'Clasificación'}, {id: 'race', name: 'Carrera'} ]},
    { round: 2, country: 'CHINA', location: 'SHANGHAI', month: 'MAR', days: '13-15', flagUrl: 'https://flagcdn.com/w80/cn.png', status: 'scheduled', isSprint: true, sessions: [ {id: 'fp1', name: 'Práctica 1'}, {id: 'sprintQuali', name: 'Clasif. Sprint'}, {id: 'sprint', name: 'Sprint'}, {id: 'quali', name: 'Clasificación'}, {id: 'race', name: 'Carrera'} ]},
    { round: 3, country: 'JAPAN', location: 'SUZUKA', month: 'MAR', days: '26-29', flagUrl: 'https://flagcdn.com/w80/jp.png', status: 'scheduled', sessions: [ {id: 'fp1', name: 'Práctica 1'}, {id: 'fp2', name: 'Práctica 2'}, {id: 'fp3', name: 'Práctica 3'}, {id: 'quali', name: 'Clasificación'}, {id: 'race', name: 'Carrera'} ]},
    { round: 4, country: 'BAHRAIN', location: 'SAKHIR', month: 'APR', days: '10-12', flagUrl: 'https://flagcdn.com/w80/bh.png', status: 'cancelled', sessions: [] },
    { round: 5, country: 'SAUDI ARABIA', location: 'JEDDAH', month: 'APR', days: '17-19', flagUrl: 'https://flagcdn.com/w80/sa.png', status: 'cancelled', sessions: [] },
    { round: 6, country: 'MIAMI', location: 'MIAMI', month: 'MAY', days: '01-03', flagUrl: 'https://flagcdn.com/w80/us.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 7, country: 'CANADA', location: 'MONTREAL', month: 'MAY', days: '22-24', flagUrl: 'https://flagcdn.com/w80/ca.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 8, country: 'MONACO', location: 'MONACO', month: 'JUN', days: '05-07', flagUrl: 'https://flagcdn.com/w80/mc.png', status: 'scheduled', sessions: [] },
    { round: 9, country: 'SPAIN', location: 'BARCELONA', month: 'JUN', days: '12-14', flagUrl: 'https://flagcdn.com/w80/es.png', status: 'scheduled', sessions: [] },
    { round: 10, country: 'AUSTRIA', location: 'SPIELBERG', month: 'JUN', days: '26-28', flagUrl: 'https://flagcdn.com/w80/at.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 11, country: 'GREAT BRITAIN', location: 'SILVERSTONE', month: 'JUL', days: '03-05', flagUrl: 'https://flagcdn.com/w80/gb.png', status: 'scheduled', sessions: [] },
    { round: 12, country: 'BELGIUM', location: 'SPA-FRANCORCHAMPS', month: 'JUL', days: '17-19', flagUrl: 'https://flagcdn.com/w80/be.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 13, country: 'HUNGARY', location: 'BUDAPEST', month: 'JUL', days: '24-26', flagUrl: 'https://flagcdn.com/w80/hu.png', status: 'scheduled', sessions: [] },
    { round: 14, country: 'NETHERLANDS', location: 'ZANDVOORT', month: 'AUG', days: '21-23', flagUrl: 'https://flagcdn.com/w80/nl.png', status: 'scheduled', sessions: [] },
    { round: 15, country: 'ITALY', location: 'MONZA', month: 'SEP', days: '04-06', flagUrl: 'https://flagcdn.com/w80/it.png', status: 'scheduled', sessions: [] },
    { round: 16, country: 'SPAIN', location: 'MADRID', month: 'SEP', days: '11-13', flagUrl: 'https://flagcdn.com/w80/es.png', status: 'scheduled', sessions: [] },
    { round: 17, country: 'AZERBAIJAN', location: 'BAKU', month: 'SEP', days: '24-26', flagUrl: 'https://flagcdn.com/w80/az.png', status: 'scheduled', sessions: [] },
    { round: 18, country: 'SINGAPORE', location: 'SINGAPORE', month: 'OCT', days: '09-11', flagUrl: 'https://flagcdn.com/w80/sg.png', status: 'scheduled', sessions: [] },
    { round: 19, country: 'UNITED STATES', location: 'AUSTIN', month: 'OCT', days: '23-25', flagUrl: 'https://flagcdn.com/w80/us.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 20, country: 'MEXICO', location: 'MEXICO CITY', month: 'OCT/NOV', days: '30-01', flagUrl: 'https://flagcdn.com/w80/mx.png', status: 'scheduled', sessions: [] },
    { round: 21, country: 'BRAZIL', location: 'SÃO PAULO', month: 'NOV', days: '06-08', flagUrl: 'https://flagcdn.com/w80/br.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 22, country: 'LAS VEGAS', location: 'LAS VEGAS', month: 'NOV', days: '19-21', flagUrl: 'https://flagcdn.com/w80/us.png', status: 'scheduled', sessions: [] },
    { round: 23, country: 'QATAR', location: 'LUSAIL', month: 'NOV', days: '27-29', flagUrl: 'https://flagcdn.com/w80/qa.png', status: 'scheduled', isSprint: true, sessions: [] },
    { round: 24, country: 'ABU DHABI', location: 'YAS ISLAND', month: 'DEC', days: '04-06', flagUrl: 'https://flagcdn.com/w80/ae.png', status: 'scheduled', sessions: [] }
];

let currentYear = 2026;

document.addEventListener('DOMContentLoaded', () => {
    // Bindear botones de modal
    document.getElementById('gp-modal-close').addEventListener('click', () => { document.getElementById('gp-modal').style.display = 'none'; });
    document.getElementById('table-modal-close').addEventListener('click', () => { document.getElementById('table-modal').style.display = 'none'; });
    
    // Controles de vista
    const btnGrilla = document.getElementById('btn-vista-grilla');
    const btnAnual = document.getElementById('btn-vista-anual');
    const vistaGrilla = document.getElementById('vista-grilla');
    const vistaAnual = document.getElementById('vista-anual');

    if (btnGrilla && btnAnual) {
        btnGrilla.addEventListener('click', function() {
            vistaGrilla.style.display = 'block';
            vistaAnual.style.display = 'none';
            btnGrilla.classList.add('active');
            btnAnual.classList.remove('active');
        });

        btnAnual.addEventListener('click', function() {
            vistaGrilla.style.display = 'none';
            vistaAnual.style.display = 'block';
            btnAnual.classList.add('active');
            btnGrilla.classList.remove('active');
            
            // Posicionar en el mes actual
            setTimeout(() => {
                const targetMonth = document.querySelector('.mes.current-month');
                if (targetMonth) {
                    targetMonth.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
    }

    // Iniciar carga automática de ambos
    loadCalendarData();
    initAppAnual();
});

async function fetchAPI(url) {
    try {
        const res = await fetch(url);
        if(!res.ok) throw new Error();
        return await res.json();
    } catch (e) {
        return null;
    }
}

// FORMATO ESPN DE COMPATIBILIDAD - Convierte fechas UTC de la API al huso horario del usuario (Argentina -03:00)
function fetchLocalTime(ds, ts) {
    if(!ds || !ts) return "Horario a confirmar";
    const dateObj = new Date(`${ds}T${ts}`);
    return dateObj.toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        weekday: 'short', day: '2-digit', month: '2-digit', 
        hour: '2-digit', minute: '2-digit'
    }).toUpperCase() + " (ARG)";
}

async function loadCalendarData() {
    const grid = document.getElementById('f1-calendar-grid');
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:20px; color:#aaa; font-size:1.5rem;">CONECTANDO CON API F1 (ESPN STYLE)...</div>';

    // 1. Obtener calendario oficial de la temporada seleccionada de rescate.
    const scheduleData = await fetchAPI(`https://api.jolpi.ca/ergast/f1/${currentYear}.json`);
    
    // 2. Obtener resultados de la carrera actuales para marcar automáticamente al ganador.
    const resultsData = await fetchAPI(`https://api.jolpi.ca/ergast/f1/${currentYear}/results/1.json`);
    
    // Combinar la data
    if(scheduleData && scheduleData.MRData && scheduleData.MRData.RaceTable.Races.length > 0) {
        const apiRaces = scheduleData.MRData.RaceTable.Races;
        const apiResults = (resultsData && resultsData.MRData.RaceTable.Races) ? resultsData.MRData.RaceTable.Races : [];
        
        apiRaces.forEach(apiRace => {
            const roundNum = parseInt(apiRace.round);
            const storeGp = calendarStore.find(r => r.round === roundNum);
            
            if(storeGp) {
                // Actualizar horarios de sesiones
                const sess = [];
                if(apiRace.FirstPractice) sess.push({ id: 'fp1', name: 'Práctica Libre 1', timeText: fetchLocalTime(apiRace.FirstPractice.date, apiRace.FirstPractice.time) });
                if(apiRace.SecondPractice) sess.push({ id: 'fp2', name: 'Práctica Libre 2', timeText: fetchLocalTime(apiRace.SecondPractice.date, apiRace.SecondPractice.time) });
                if(apiRace.ThirdPractice) sess.push({ id: 'fp3', name: 'Práctica Libre 3', timeText: fetchLocalTime(apiRace.ThirdPractice.date, apiRace.ThirdPractice.time) });
                if(apiRace.SprintShootout || apiRace.Qualifying) sess.push({ id: 'quali', name: 'Clasificación', timeText: fetchLocalTime(apiRace.Qualifying.date, apiRace.Qualifying.time) });
                if(apiRace.Sprint) sess.push({ id: 'sprint', name: 'Sprint', timeText: fetchLocalTime(apiRace.Sprint.date, apiRace.Sprint.time) });
                sess.push({ id: 'race', name: 'Carrera', timeText: fetchLocalTime(apiRace.date, apiRace.time) });
                
                storeGp.sessions = sess.length > 0 ? sess : storeGp.sessions;

                // Verificar ganador automático
                const resultMatch = apiResults.find(r => parseInt(r.round) === roundNum);
                if(resultMatch) {
                    storeGp.status = 'completed';
                    storeGp.winnerRaw = resultMatch.Results[0].Driver.driverId; // "verstappen", etc
                    storeGp.winnerTeam = resultMatch.Results[0].Constructor.name;
                }
            }
        });
    }

    // Renderizar
    renderMainGrid();
}

function renderMainGrid() {
    const grid = document.getElementById('f1-calendar-grid');
    grid.innerHTML = '';

    calendarStore.forEach((gp) => {
        const card = document.createElement('div');
        
        // DISEÑO ESPN CUANDO LA CARRERA ESTÁ COMPLETADA
        if (gp.status === 'completed') {
            // Emparejar piloto de API con driverData local
            let dr = Object.values(driverData).find(d => d.id === gp.winnerRaw); 
            // Fallbacks for testing si no está en config:
            if (!dr) dr = driverData.leclerc; // default de muestra
            if(gp.winnerRaw === 'verstappen') dr = driverData.verstappen;
            if(gp.winnerRaw === 'norris') dr = driverData.norris;

            card.className = `gp-card completed ${dr.bgClass || 'bg-mclaren'}`;
            card.innerHTML = `
                <div class="completed-left">
                    <img src="${gp.flagUrl}" class="flag-section">
                    <div class="completed-text">
                        <div class="completed-country">${gp.country}</div>
                        <div class="completed-date">${gp.days} ${gp.month}</div>
                    </div>
                </div>
                <div class="completed-right">
                    <img src="${dr.logo}" class="team-logo-bg" onerror="this.style.display='none'">
                    <img src="${dr.img}" class="winner-photo" onerror="this.src='images/default/default.png'">
                </div>
            `;
        } 
        // DISEÑO CLÁSICO PARA CARRERAS FUTURAS O SUSPENDIDAS
        else {
            let daysText = gp.days;
            if (gp.status === 'cancelled') daysText = 'SUSPENDIDA';
            
            card.className = `gp-card ${gp.status}`;
            card.innerHTML = `
                <div class="scheduled-content">
                    <img src="${gp.flagUrl}" class="flag-section">
                    <div class="date-section">
                        <div class="date-month">${gp.month}</div>
                        <div class="date-days" style="${gp.status === 'cancelled' ? 'font-size:1.1rem;' : ''}">${daysText}</div>
                    </div>
                    <div class="info-section">
                        <div class="info-top">ROUND ${gp.round} <span>|</span> ${gp.location}</div>
                        <div class="info-country">${gp.country}</div>
                    </div>
                </div>
            `;
        }

        card.addEventListener('click', () => openGPModal(gp));
        grid.appendChild(card);
    });
}

const nationalityToFlag = {
    "Dutch": "nl", "Monegasque": "mc", "British": "gb", "Spanish": "es",
    "Argentine": "ar", "Mexican": "mx", "Australian": "au", "French": "fr",
    "Thai": "th", "Japanese": "jp", "Canadian": "ca", "Finnish": "fi",
    "Chinese": "cn", "Danish": "dk", "German": "de", "American": "us",
    "Brazilian": "br", "Italian": "it", "New Zealander": "nz", "Colombian": "co"
};

function getFlagUrl(nationality) {
    const code = nationalityToFlag[nationality];
    if(code) return `https://flagcdn.com/w20/${code}.png`;
    return null; // fallback
}

async function openGPModal(gp) {
    const bgModal = document.getElementById('gp-modal');
    const body = document.getElementById('gp-modal-body');
    
    // Header
    let html = `
        <div class="modal-header">
            <h2>${gp.country} - ROUND ${gp.round}</h2>
            <div class="gp-location">${gp.location} (${gp.isSprint ? 'Formato Sprint' : 'Formato Regular'})</div>
        </div>
    `;

    if (gp.status === 'cancelled') {
        html += `<div style="padding:40px; text-align:center; color:#e10600; font-size:1.5rem; font-weight:800;">ESTE EVENTO FUE SUSPENDIDO</div>`;
        body.innerHTML = html;
        bgModal.style.display = 'flex';
        return;
    } 
    
    if (!gp.sessions || gp.sessions.length === 0) {
        html += `<div class="sessions-list"><div style="color:#aaa; text-align:center;">Horarios y resultados pendientes de confirmación...</div></div>`;
        body.innerHTML = html;
        bgModal.style.display = 'flex';
        return;
    }

    html += `<div class="sessions-list" id="sessions-list-container">
                <div style="text-align:center; color:#aaa;">Cargando ganadores de la API...</div>
             </div>`;
    
    body.innerHTML = html;
    bgModal.style.display = 'flex';

    // Fetch winners in background to inject into the modal
    let qualiWinner = null, sprintWinner = null, raceWinner = null;
    
    // Solo consultamos si la fecha ya pasó o está en curso (simplificado a: consultamos siempre y perdonamos los 404/vacíos)
    try {
        const [qData, sData, rData] = await Promise.all([
            fetchAPI(`https://api.jolpi.ca/ergast/f1/${currentYear}/${gp.round}/qualifying.json`),
            gp.isSprint ? fetchAPI(`https://api.jolpi.ca/ergast/f1/${currentYear}/${gp.round}/sprint.json`) : Promise.resolve(null),
            fetchAPI(`https://api.jolpi.ca/ergast/f1/${currentYear}/${gp.round}/results.json`)
        ]);

        if(qData?.MRData?.RaceTable?.Races[0]?.QualifyingResults) qualiWinner = qData.MRData.RaceTable.Races[0].QualifyingResults[0].Driver;
        if(sData?.MRData?.RaceTable?.Races[0]?.SprintResults) sprintWinner = sData.MRData.RaceTable.Races[0].SprintResults[0].Driver;
        if(rData?.MRData?.RaceTable?.Races[0]?.Results) raceWinner = rData.MRData.RaceTable.Races[0].Results[0].Driver;
    } catch(e) { console.error("Error consultando ganadores", e); }

    const listContainer = document.getElementById('sessions-list-container');
    if(!listContainer) return; // Si el modal se cerró antes de cargar
    
    let listHtml = '';
    gp.sessions.forEach(sess => {
        let winnerDrv = null;
        if(sess.id === 'quali') winnerDrv = qualiWinner;
        else if (sess.id === 'sprint') winnerDrv = sprintWinner;
        else if (sess.id === 'race') winnerDrv = raceWinner;

        // Nota: Ergast no tiene endpoints para ganadores de FP1, FP2, FP3. Dejamos el espacio disponible visualmente.
        let winnerHtml = '';
        if(winnerDrv) {
            const flagUrl = getFlagUrl(winnerDrv.nationality);
            const flagImg = flagUrl ? `<img src="${flagUrl}" style="width:28px; height:18px; object-fit:cover; margin-right:10px; border-radius:3px; box-shadow:0 0 5px rgba(0,0,0,0.6);">` : '';
            winnerHtml = `
                <div style="display:flex; align-items:center; background:rgba(255,215,0,0.1); border:1px solid rgba(255,215,0,0.25); padding:8px 14px; border-radius:8px; gap:8px;">
                    <span style="font-size:1.2rem;">🏆</span>
                    <span style="color:gold; font-weight:900; font-size:0.9rem;">1º</span>
                    ${flagImg}
                    <span style="color:#fff; font-weight:800; font-size:1.1rem; text-transform:uppercase; letter-spacing:0.5px;">${winnerDrv.familyName}</span>
                </div>
            `;
        } else if (sess.id === 'race' || sess.id === 'quali' || sess.id === 'sprint') {
             winnerHtml = `<span style="color:#fff; background:rgba(225,6,0,0.2); border:1px solid rgba(225,6,0,0.4); padding:6px 14px; border-radius:20px; font-size:0.8rem; font-weight:700; letter-spacing:0.5px;">VER RESULTADOS ›</span>`;
        }

        listHtml += `
            <div class="session-item" onclick="openTableModal('${gp.country}', '${sess.name}', ${gp.round})">
                <div class="session-info">
                    <div class="session-name">${sess.name}</div>
                    <div class="session-time" style="color:#d4d4d4;">🕒 ${sess.timeText || 'Pendiente'}</div>
                </div>
                ${winnerHtml}
            </div>
        `;
    });
    
    listContainer.innerHTML = listHtml;
}

// FORMATO DE TABLA ESPN
async function openTableModal(gpName, sessionName, roundNum) {
    const bgModal = document.getElementById('table-modal');
    const body = document.getElementById('table-modal-body');

    body.innerHTML = '<div style="padding:40px; text-align:center; color:#aaa; font-size:1.2rem;">Cargando resultados de ESPN / API...</div>';
    bgModal.style.display = 'flex';

    let url = `https://api.jolpi.ca/ergast/f1/${currentYear}/${roundNum}/results.json`;
    if(sessionName.includes('Sprint')) url = `https://api.jolpi.ca/ergast/f1/${currentYear}/${roundNum}/sprint.json`;
    if(sessionName.includes('Clasif')) url = `https://api.jolpi.ca/ergast/f1/${currentYear}/${roundNum}/qualifying.json`;

    // Si es Práctica, Ergast no tiene resultados libres, mostraremos un aviso.
    if(sessionName.includes('Práctica')) {
        body.innerHTML = `
            <div class="modal-header">
                <h2>RESULTADOS: ${sessionName}</h2>
                <div class="gp-location">${gpName}</div>
            </div>
            <div style="padding:40px; text-align:center; color:#888;">La API de F1 no proporciona tiempos oficiales de Prácticas Libres. Solo Clasificación, Sprint y Carrera.</div>
        `;
        return;
    }

    const rawData = await fetchAPI(url);
    
    let resultsArray = [];
    if(rawData && rawData.MRData && rawData.MRData.RaceTable.Races[0]) {
        if (sessionName.includes('Sprint')) resultsArray = rawData.MRData.RaceTable.Races[0].SprintResults;
        else if(sessionName.includes('Clasif')) resultsArray = rawData.MRData.RaceTable.Races[0].QualifyingResults;
        else resultsArray = rawData.MRData.RaceTable.Races[0].Results;
    }

    let content = `
        <div class="modal-header">
            <h2>RESULTADOS: ${sessionName}</h2>
            <div class="gp-location">${gpName} - API Data Automática</div>
        </div>
        <div class="table-wrapper">
            <table class="espn-table">
                <thead>
                    <tr>
                        <th style="width:30px; text-align:center;">POS</th>
                        <th>PILOTO</th>
                        <th>ESCUDERÍA</th>
                        <th style="text-align:right;">TIEMPO / RESTO</th>
                        ${sessionName.includes('Carrera') || sessionName.includes('Sprint') ? `<th style="text-align:right;">PTS</th>` : ''}
                    </tr>
                </thead>
                <tbody>
    `;

    if(!resultsArray || resultsArray.length === 0) {
        content += `<tr><td colspan="5" style="text-align:center; padding: 30px; color:#888;">La sesión aún no se ha completado o no hay datos disponibles.</td></tr></tbody></table></div>`;
        body.innerHTML = content;
        return;
    }

    resultsArray.forEach((r, idx) => {
        const timeVal = r.Time ? r.Time.time : (r.status || r.Q3 || r.Q2 || r.Q1 || 'NO TIME');
        const flagUrl = getFlagUrl(r.Driver.nationality);
        const flagHtml = flagUrl ? `<img src="${flagUrl}" style="width:22px; height:15px; margin-right:8px; border-radius:3px; object-fit:cover;">` : '';
        
        content += `
            <tr>
                <td class="espn-pos">${r.position}</td>
                <td>
                    <div class="espn-driver">
                        ${flagHtml}
                        <span style="font-weight:400; font-size:0.9rem; color:#aaa; margin-right:5px;">${r.Driver.givenName}</span>
                        ${r.Driver.familyName}
                    </div>
                </td>
                <td class="espn-team">${r.Constructor.name}</td>
                <td class="espn-time" style="text-align:right;">${timeVal}</td>
                ${sessionName.includes('Carrera') || sessionName.includes('Sprint') ? `<td class="espn-pts" style="text-align:right;">${r.points || 0}</td>` : ''}
            </tr>
        `;
    });

    content += `</tbody></table></div>`;
    body.innerHTML = content;
}

// ==========================================
// VISTA ANUAL (CALENDARIO ANTIGUO) LOGIC
// ==========================================

let carrerasF1 = [];

const coloresGP = {
    'australia': '#FFA500', 'china': '#DC143C', 'japan': '#FF1493', 'bahrain': '#FFD700',
    'saudi-arabia': '#00CED1', 'miami': '#FF69B4', 'canada': '#FF0000', 'monaco': '#0047AB',
    'spain-barcelona': '#FFFF00', 'austria': '#8B0000', 'uk': '#006400', 'belgium': '#FF4500',
    'hungary': '#32CD32', 'netherlands': '#FF8C00', 'italy': '#228B22', 'spain-madrid': '#9400D3',
    'azerbaijan': '#4169E1', 'singapore': '#FF1493', 'usa-austin': '#1E90FF', 'mexico': '#00FF00',
    'brazil': '#FFD700', 'las-vegas': '#8A2BE2', 'qatar': '#800080', 'abu-dhabi': '#FF6347'
};

function initAppAnual() {
    try {
        carrerasF1 = obtenerCalendarioF12026();
        generarCalendario();
    } catch (error) {
        console.error('Error al inicializar anual:', error);
        document.getElementById('calendario').innerHTML = `
            <div class="error-message">
                <h3>Error al cargar los datos anuales</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function obtenerCalendarioF12026() {
    return [
        { id: 'australia-2026', nombre: 'GP de Australia', circuito: 'Albert Park Circuit', pais: 'Australia', bandera: 'https://flagcdn.com/w80/au.png', color: coloresGP['australia'], fechaInicio: new Date(2026, 2, 6), fechaFin: new Date(2026, 2, 8), horarioCarrera: '8 Marzo - 01:00 (Argentina)', enlace: 'https://www.formula1.com', ganador: null, sesiones: [ { nombre: 'Práctica Libre 1', horario: 'Viernes 6/03 - 23:30' }, { nombre: 'Práctica Libre 2', horario: 'Sábado 7/03 - 03:00' }, { nombre: 'Clasificación', horario: 'Domingo 8/03 - 03:00' }, { nombre: 'Carrera', horario: 'Domingo 8/03 - 01:00' } ] },
        { id: 'china-2026', nombre: 'GP de China', circuito: 'Shanghai International Circuit', pais: 'China', bandera: 'https://flagcdn.com/w80/cn.png', color: coloresGP['china'], fechaInicio: new Date(2026, 2, 13), fechaFin: new Date(2026, 2, 15), horarioCarrera: '15 Marzo - 04:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'japan-2026', nombre: 'GP de Japón', circuito: 'Suzuka Circuit', pais: 'Japón', bandera: 'https://flagcdn.com/w80/jp.png', color: coloresGP['japan'], fechaInicio: new Date(2026, 2, 27), fechaFin: new Date(2026, 2, 29), horarioCarrera: '29 Marzo - 02:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'bahrain-2026', nombre: 'GP de Bahrein', circuito: 'Bahrain International Circuit', pais: 'Bahrein', bandera: 'https://flagcdn.com/w80/bh.png', color: coloresGP['bahrain'], fechaInicio: new Date(2026, 3, 10), fechaFin: new Date(2026, 3, 12), horarioCarrera: '12 Abril - 12:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'saudi-arabia-2026', nombre: 'GP de Arabia Saudita', circuito: 'Jeddah Corniche Circuit', pais: 'Arabia Saudita', bandera: 'https://flagcdn.com/w80/sa.png', color: coloresGP['saudi-arabia'], fechaInicio: new Date(2026, 3, 17), fechaFin: new Date(2026, 3, 19), horarioCarrera: '19 Abril - 15:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'miami-2026', nombre: 'GP de Miami', circuito: 'Miami International Autodrome', pais: 'Estados Unidos', bandera: 'https://flagcdn.com/w80/us.png', color: coloresGP['miami'], fechaInicio: new Date(2026, 4, 1), fechaFin: new Date(2026, 4, 3), horarioCarrera: '3 Mayo - 17:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'canada-2026', nombre: 'GP de Canadá', circuito: 'Circuit Gilles Villeneuve', pais: 'Canadá', bandera: 'https://flagcdn.com/w80/ca.png', color: coloresGP['canada'], fechaInicio: new Date(2026, 4, 22), fechaFin: new Date(2026, 4, 24), horarioCarrera: '24 Mayo - 15:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'monaco-2026', nombre: 'GP de Mónaco', circuito: 'Circuit de Monaco', pais: 'Mónaco', bandera: 'https://flagcdn.com/w80/mc.png', color: coloresGP['monaco'], fechaInicio: new Date(2026, 5, 5), fechaFin: new Date(2026, 5, 7), horarioCarrera: '7 Junio - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'spain-barcelona-2026', nombre: 'GP de España', circuito: 'Circuit de Barcelona-Catalunya', pais: 'España', bandera: 'https://flagcdn.com/w80/es.png', color: coloresGP['spain-barcelona'], fechaInicio: new Date(2026, 5, 12), fechaFin: new Date(2026, 5, 14), horarioCarrera: '14 Junio - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'austria-2026', nombre: 'GP de Austria', circuito: 'Red Bull Ring', pais: 'Austria', bandera: 'https://flagcdn.com/w80/at.png', color: coloresGP['austria'], fechaInicio: new Date(2026, 5, 26), fechaFin: new Date(2026, 5, 28), horarioCarrera: '28 Junio - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'uk-2026', nombre: 'GP de Gran Bretaña', circuito: 'Silverstone Circuit', pais: 'Reino Unido', bandera: 'https://flagcdn.com/w80/gb.png', color: coloresGP['uk'], fechaInicio: new Date(2026, 6, 3), fechaFin: new Date(2026, 6, 5), horarioCarrera: '5 Julio - 11:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'belgium-2026', nombre: 'GP de Bélgica', circuito: 'Spa-Francorchamps', pais: 'Bélgica', bandera: 'https://flagcdn.com/w80/be.png', color: coloresGP['belgium'], fechaInicio: new Date(2026, 6, 17), fechaFin: new Date(2026, 6, 19), horarioCarrera: '19 Julio - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'hungary-2026', nombre: 'GP de Hungría', circuito: 'Hungaroring', pais: 'Hungría', bandera: 'https://flagcdn.com/w80/hu.png', color: coloresGP['hungary'], fechaInicio: new Date(2026, 6, 24), fechaFin: new Date(2026, 6, 26), horarioCarrera: '26 Julio - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'netherlands-2026', nombre: 'GP de Países Bajos', circuito: 'Zandvoort', pais: 'Países Bajos', bandera: 'https://flagcdn.com/w80/nl.png', color: coloresGP['netherlands'], fechaInicio: new Date(2026, 7, 22), fechaFin: new Date(2026, 7, 24), horarioCarrera: '24 Agosto - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'monza-2026', nombre: 'GP de Italia', circuito: 'Autodromo Nazionale Monza', pais: 'Italia', bandera: 'https://flagcdn.com/w80/it.png', color: coloresGP['italy'], fechaInicio: new Date(2026, 8, 5), fechaFin: new Date(2026, 8, 7), horarioCarrera: '7 Septiembre - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'spain-madrid-2026', nombre: 'GP de España (Madrid)', circuito: 'Madrid Street Circuit', pais: 'España', bandera: 'https://flagcdn.com/w80/es.png', color: coloresGP['spain-madrid'], fechaInicio: new Date(2026, 8, 11), fechaFin: new Date(2026, 8, 13), horarioCarrera: '13 Septiembre - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'azerbaijan-2026', nombre: 'GP de Azerbaiyán', circuito: 'Baku City Circuit', pais: 'Azerbaiyán', bandera: 'https://flagcdn.com/w80/az.png', color: coloresGP['azerbaijan'], fechaInicio: new Date(2026, 8, 25), fechaFin: new Date(2026, 8, 27), horarioCarrera: '27 Septiembre - 08:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'singapore-2026', nombre: 'GP de Singapur', circuito: 'Marina Bay', pais: 'Singapur', bandera: 'https://flagcdn.com/w80/sg.png', color: coloresGP['singapore'], fechaInicio: new Date(2026, 9, 9), fechaFin: new Date(2026, 9, 11), horarioCarrera: '11 Octubre - 09:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'austin-2026', nombre: 'GP de EE.UU.', circuito: 'COTA', pais: 'Estados Unidos', bandera: 'https://flagcdn.com/w80/us.png', color: coloresGP['usa-austin'], fechaInicio: new Date(2026, 9, 23), fechaFin: new Date(2026, 9, 25), horarioCarrera: '25 Octubre - 16:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'mexico-2026', nombre: 'GP de México', circuito: 'Hermanos Rodríguez', pais: 'México', bandera: 'https://flagcdn.com/w80/mx.png', color: coloresGP['mexico'], fechaInicio: new Date(2026, 9, 30), fechaFin: new Date(2026, 10, 1), horarioCarrera: '1 Noviembre - 17:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'brazil-2026', nombre: 'GP de Brasil', circuito: 'Interlagos', pais: 'Brasil', bandera: 'https://flagcdn.com/w80/br.png', color: coloresGP['brazil'], fechaInicio: new Date(2026, 10, 6), fechaFin: new Date(2026, 10, 8), horarioCarrera: '8 Noviembre - 15:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'vegas-2026', nombre: 'GP de Las Vegas', circuito: 'Las Vegas Strip', pais: 'Estados Unidos', bandera: 'https://flagcdn.com/w80/us.png', color: coloresGP['las-vegas'], fechaInicio: new Date(2026, 10, 20), fechaFin: new Date(2026, 10, 22), horarioCarrera: '22 Noviembre - 03:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'qatar-2026', nombre: 'GP de Qatar', circuito: 'Lusail', pais: 'Qatar', bandera: 'https://flagcdn.com/w80/qa.png', color: coloresGP['qatar'], fechaInicio: new Date(2026, 10, 27), fechaFin: new Date(2026, 10, 29), horarioCarrera: '29 Noviembre - 13:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] },
        { id: 'abu-dhabi-2026', nombre: 'GP de Abu Dhabi', circuito: 'Yas Marina Circuit', pais: 'Emiratos Árabes', bandera: 'https://flagcdn.com/w80/ae.png', color: coloresGP['abu-dhabi'], fechaInicio: new Date(2026, 11, 4), fechaFin: new Date(2026, 11, 6), horarioCarrera: '6 Diciembre - 10:00', enlace: 'https://www.formula1.com', ganador: null, sesiones: [] }
    ];
}

function generarCalendario() {
    const calendarContainer = document.getElementById('calendario');
    if(!calendarContainer) return;
    calendarContainer.innerHTML = '';

    const today = new Date();
    const isCurrentYear = today.getFullYear() === currentYear;
    const currentMonthNum = today.getMonth();

    // Encontrar próxima carrera si es el año actual
    let upcomingRaceId = null;
    if (isCurrentYear) {
        let upcomingRace = carrerasF1.find(c => c.fechaFin >= today);
        if (upcomingRace) upcomingRaceId = upcomingRace.id;
    }

    for (let mes = 0; mes < 12; mes++) {
        const mesElement = document.createElement('div');
        mesElement.className = 'mes';
        
        if (isCurrentYear && mes === currentMonthNum) {
            mesElement.classList.add('current-month');
        }

        const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const mesHeader = document.createElement('div');
        mesHeader.className = 'mes-header';
        mesHeader.textContent = nombresMeses[mes];
        mesElement.appendChild(mesHeader);

        const diasContainer = document.createElement('div');
        diasContainer.className = 'dias';

        const nombresDias = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
        nombresDias.forEach(dia => {
            const diaNombre = document.createElement('div');
            diaNombre.className = 'nombre-dia';
            diaNombre.textContent = dia;
            diasContainer.appendChild(diaNombre);
        });

        let primerDia = new Date(currentYear, mes, 1).getDay();
        primerDia = (primerDia === 0) ? 6 : primerDia - 1;

        const totalDias = new Date(currentYear, mes + 1, 0).getDate();

        for (let i = 0; i < primerDia; i++) {
            const diaVacio = document.createElement('div');
            diaVacio.className = 'fecha';
            diasContainer.appendChild(diaVacio);
        }

        for (let dia = 1; dia <= totalDias; dia++) {
            const fechaActual = new Date(currentYear, mes, dia);

            const carrera = carrerasF1.find(c =>
                fechaEnRango(fechaActual, c.fechaInicio, c.fechaFin)
            );

            const esInicioDeBloque = carrera && (
                fechaActual.getTime() === carrera.fechaInicio.getTime() ||
                (dia === 1)
            );

            if (esInicioDeBloque) {
                let colEnSemana = (fechaActual.getDay() === 0) ? 7 : fechaActual.getDay();
                let diasHastaFinSemana = 7 - colEnSemana + 1;

                let duracion = 0;
                let tempFecha = new Date(fechaActual);
                while (tempFecha <= carrera.fechaFin && tempFecha.getMonth() === mes && duracion < diasHastaFinSemana) {
                    duracion++;
                    tempFecha.setDate(tempFecha.getDate() + 1);
                }

                const fechaElement = document.createElement('div');
                fechaElement.className = 'fecha fecha-carrera';
                if (upcomingRaceId === carrera.id) {
                    fechaElement.classList.add('upcoming-race');
                }
                fechaElement.style.gridColumn = `span ${duracion}`;
                fechaElement.style.backgroundColor = carrera.color || '#e10600';
                fechaElement.setAttribute('data-carrera', carrera.id);

                const numerosContenedor = document.createElement('div');
                numerosContenedor.className = 'carrera-dias-numeros';
                for (let n = 0; n < duracion; n++) {
                    const num = document.createElement('span');
                    num.textContent = dia + n;
                    numerosContenedor.appendChild(num);
                }
                fechaElement.appendChild(numerosContenedor);

                const nombreGP = document.createElement('div');
                nombreGP.className = 'carrera-nombre-texto';
                nombreGP.innerHTML = `
                    <div class="gp-main-name">GRAN PREMIO DE</div>
                    <div class="gp-sub-name">${carrera.pais.toUpperCase()} <img src="${carrera.bandera}" class="gp-flag-mini"></div>
                `;
                fechaElement.appendChild(nombreGP);

                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                const gpInfo = document.createElement('div');
                gpInfo.className = 'gp-info';
                gpInfo.innerHTML = `
                    <strong>${carrera.nombre}</strong>
                    <p>${formatearFechaAnual(carrera.fechaInicio)} - ${formatearFechaAnual(carrera.fechaFin)}</p>
                    <p>${carrera.circuito}</p>
                    <img src="${carrera.bandera}" alt="Bandera">
                `;

                if (carrera.sesiones && carrera.sesiones.length > 0) {
                    const sesionesContainer = document.createElement('div');
                    sesionesContainer.className = 'sesiones-container';
                    const list = document.createElement('ul');
                    list.className = 'sesiones-list';
                    carrera.sesiones.forEach(s => {
                        const li = document.createElement('li');
                        li.textContent = `${s.nombre}: ${s.horario}`;
                        list.appendChild(li);
                    });
                    sesionesContainer.appendChild(list);
                    gpInfo.appendChild(sesionesContainer);
                }

                tooltip.appendChild(gpInfo);
                fechaElement.appendChild(tooltip);

                fechaElement.addEventListener('click', () => mostrarModalAnual(carrera));
                diasContainer.appendChild(fechaElement);

                dia += (duracion - 1);
            } else {
                const fechaElement = document.createElement('div');
                fechaElement.className = 'fecha';
                fechaElement.textContent = dia;
                diasContainer.appendChild(fechaElement);
            }
        }

        mesElement.appendChild(diasContainer);
        calendarContainer.appendChild(mesElement);
    }
}

function fechaEnRango(fecha, inicio, fin) {
    return fecha >= inicio && fecha <= fin;
}

function formatearFechaAnual(fecha) {
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'short' });
    return `${dia} ${mes}`;
}

function mostrarModalAnual(carrera) {
    const modal = document.getElementById('anual-modal');
    const modalContent = document.querySelector('.modal-content-anual #modal-content');
    const winnerInfo = document.querySelector('.modal-content-anual #winner-info');
    const closeButton = document.querySelector('.close-button-anual');

    modalContent.innerHTML = `
        <h2>${carrera.nombre}</h2>
        <p><strong>Circuito:</strong> ${carrera.circuito}</p>
        <p><strong>País:</strong> ${carrera.pais} <img src="${carrera.bandera}" alt="Bandera" style="width: 30px; vertical-align: middle;"></p>
        <p><strong>Fechas:</strong> ${formatearFechaAnual(carrera.fechaInicio)} - ${formatearFechaAnual(carrera.fechaFin)}</p>
    `;

    if (carrera.sesiones && carrera.sesiones.length > 0) {
        let sesionesHTML = '<div class="sesiones-modal"><h3>Horarios:</h3><ul>';
        carrera.sesiones.forEach(sesion => {
            sesionesHTML += `<li><strong>${sesion.nombre}:</strong> ${sesion.horario}</li>`;
        });
        sesionesHTML += '</ul></div>';
        modalContent.innerHTML += sesionesHTML;
    } else {
        modalContent.innerHTML += `<p><strong>Horario de carrera:</strong> ${carrera.horarioCarrera}</p>`;
    }

    modalContent.innerHTML += `<p><a href="${carrera.enlace}" target="_blank" style="color: var(--f1-red);">Ver detalles en Formula 1</a></p>`;

    if (carrera.ganador) {
        winnerInfo.innerHTML = `<span class="winner-name">${carrera.ganador}</span>`;
    } else {
        winnerInfo.innerHTML = `<span class="empty">Aún no hay ganador registrado</span>`;
    }

    modal.style.display = 'block';

    closeButton.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}