// ========================================================================
// ===== REEMPLAZA TODO EL CONTENIDO DE TU ARCHIVO JS/PILOTOS.JS CON ESTO =====
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const SEASON_YEAR = '2025';

    const driversData = [
        { id: "max_verstappen", name: "Max Verstappen", team: "redbull", logoPath: "images/logos/redbull.png", photoPath: "images/drivers/verstappen.png" },
        { id: "tsunoda", name: "Yuki Tsunoda", team: "redbull", logoPath: "images/logos/redbull.png", photoPath: "images/drivers/tsunoda.png" },
        { id: "leclerc", name: "Charles Leclerc", team: "ferrari", logoPath: "images/logos/ferrari.png", photoPath: "images/drivers/leclerc.png" },
        { id: "hamilton", name: "Lewis Hamilton", team: "ferrari", logoPath: "images/logos/ferrari.png", photoPath: "images/drivers/hamilton.png" },
        { id: "russell", name: "George Russell", team: "mercedes", logoPath: "images/logos/mercedes.png", photoPath: "images/drivers/russell.png" },
        { id: "antonelli", name: "Andrea Kimi Antonelli", team: "mercedes", logoPath: "images/logos/mercedes.png", photoPath: "images/drivers/antonelli.png" },
        { id: "norris", name: "Lando Norris", team: "mclaren", logoPath: "images/logos/mclaren2.png", photoPath: "images/drivers/norris.png" },
        { id: "piastri", name: "Oscar Piastri", team: "mclaren", logoPath: "images/logos/mclaren2.png", photoPath: "images/drivers/piastri.png" },
        { id: "alonso", name: "Fernando Alonso", team: "aston-martin", logoPath: "images/logos/aston-martin.png", photoPath: "images/drivers/alonso.png" },
        { id: "stroll", name: "Lance Stroll", team: "aston-martin", logoPath: "images/logos/aston-martin.png", photoPath: "images/drivers/stroll.png" },
        { id: "gasly", name: "Pierre Gasly", team: "alpine", logoPath: "images/logos/alpine.png", photoPath: "images/drivers/gasly.png" },
        { id: "doohan", name: "Jack Doohan", team: "alpine", logoPath: "images/logos/alpine.png", photoPath: "images/drivers/doohan.png" },
        { id: "colapinto", name: "Franco Colapinto", team: "alpine", logoPath: "images/logos/alpine.png", photoPath: "images/drivers/colapinto.png" },
        { id: "albon", name: "Alexander Albon", team: "williams", logoPath: "images/logos/williams.png", photoPath: "images/drivers/albon.png" },
        { id: "sainz", name: "Carlos Sainz", team: "williams", logoPath: "images/logos/williams.png", photoPath: "images/drivers/sainz.png" },
        { id: "lawson", name: "Liam Lawson", team: "rb", logoPath: "images/logos/rb.png", photoPath: "images/drivers/lawson.png" },
        { id: "hadjar", name: "Isack Hadjar", team: "rb", logoPath: "images/logos/rb.png", photoPath: "images/drivers/hadjar.png" },
        { id: "bearman", name: "Oliver Bearman", team: "haas", logoPath: "images/logos/haas.png", photoPath: "images/drivers/bearman.png" },
        { id: "ocon", name: "Esteban Ocon", team: "haas", logoPath: "images/logos/haas.png", photoPath: "images/drivers/ocon.png" },
        { id: "hulkenberg", name: "Nico Hulkenberg", team: "sauber", logoPath: "images/logos/stake.png", photoPath: "images/drivers/hulkenberg.png" },
        { id: "bortoleto", name: "Gabriel Bortoleto", team: "sauber", logoPath: "images/logos/stake.png", photoPath: "images/drivers/bortoleto.png" }
    ];

    let currentRaceSelected = 'championship';

    async function fetchApi(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            return null;
        }
    }

    // --- ESTA ES LA FUNCIÓN CON LA LÓGICA FINAL ---
    async function createDriversTable(raceFilter = 'championship') {
        const container = document.getElementById('standings-container');
        container.innerHTML = '<div class="loading-spinner">Cargando...</div>';
        
        let standings = [];

        if (raceFilter === 'championship') {
            const data = await fetchApi(`https://api.jolpi.ca/ergast/f1/${SEASON_YEAR}/driverStandings.json`);
            standings = data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || [];
        } else {
            // ---- LÓGICA SIMPLIFICADA Y CORREGIDA ----
            const round = raceFilter.replace(/R|-Sprint/g, '');
            const endpoint = raceFilter.includes('-Sprint') ? 'sprint' : 'results';
            
            // 1. Pedimos los resultados de la carrera específica
            const raceData = await fetchApi(`https://api.jolpi.ca/ergast/f1/${SEASON_YEAR}/${round}/${endpoint}.json`);
            
            const raceSpecificResults = endpoint === 'sprint' 
                ? raceData?.MRData?.RaceTable?.Races[0]?.SprintResults 
                : raceData?.MRData?.RaceTable?.Races[0]?.Results;

            // 2. Si hay resultados, esa es nuestra tabla. Si no, estará vacía.
            standings = raceSpecificResults || [];
        }

        container.innerHTML = '';
        
        // 3. Verificamos si la tabla está vacía para mostrar el mensaje correspondiente
        if (standings.length === 0) {
            if (raceFilter === 'championship') {
                container.innerHTML = '<div class="race-not-available">No hay datos de campeonato disponibles.</div>';
            } else {
                container.innerHTML = '<div class="race-not-available">Aún no se ha disputado esta carrera</div>';
            }
            return;
        }

        standings.forEach(driverStanding => {
            const apiDriverId = driverStanding.Driver.driverId;
            const driverInfo = driversData.find(d => d.id === apiDriverId);
            if (driverInfo) {
                const driverRow = document.createElement('div');
                driverRow.className = `driver-row ${driverInfo.team}`;
                driverRow.innerHTML = `
                    <div class="position">${driverStanding.position}</div>
                    <img class="team-logo" src="${driverInfo.logoPath}" alt="${driverInfo.team} logo">
                    <div class="driver-name">${driverInfo.name}</div>
                    <img class="driver-photo" src="${driverInfo.photoPath}" alt="${driverInfo.name}">
                    <div class="points">${driverStanding.points}</div>
                `;
                driverRow.addEventListener('click', () => showDriverDetails(apiDriverId, driverInfo));
                container.appendChild(driverRow);
            }
        });
    }
    
    // El panel de detalles ya funciona perfecto, no se toca.
    async function showDriverDetails(apiDriverId, driverInfo) {
        const detailsPanel = document.getElementById('driver-details-panel');
        detailsPanel.innerHTML = `
            <button class="panel-close">✕</button>
            <img class="panel-logo" src="${driverInfo.photoPath}" alt="${driverInfo.name}">
            <h2 class="panel-driver-name">${driverInfo.name}</h2>
            <div class="panel-team">${getTeamName(driverInfo.team)}</div>
            <div class="panel-points" id="panel-total-points">Total Points: ...</div>
            <div class="divider"></div>
            <div class="race-results">
                <div class="loading-spinner">Cargando resultados...</div>
            </div>`;
        detailsPanel.classList.add('panel-active');
        openDriverPanel();
        
        const raceResultsUrl = `https://api.jolpi.ca/ergast/f1/${SEASON_YEAR}/drivers/${apiDriverId}/results.json?limit=100`;
        const sprintResultsUrl = `https://api.jolpi.ca/ergast/f1/${SEASON_YEAR}/drivers/${apiDriverId}/sprint.json?limit=100`;
        
        const [raceData, sprintData] = await Promise.all([
            fetchApi(raceResultsUrl),
            fetchApi(sprintResultsUrl)
        ]);

        const allResults = [];
        let calculatedTotalPoints = 0;

        if (raceData?.MRData?.RaceTable?.Races) {
            raceData.MRData.RaceTable.Races.forEach(raceEvent => {
                const result = raceEvent.Results[0];
                if (result) {
                    calculatedTotalPoints += parseInt(result.points, 10);
                    allResults.push({ race: `R${raceEvent.round}`, position: result.position, points: result.points, type: 'race' });
                }
            });
        }
        
        if (sprintData?.MRData?.RaceTable?.Races) {
            sprintData.MRData.RaceTable.Races.forEach(raceEvent => {
                const result = raceEvent.SprintResults[0];
                 if (result) {
                    calculatedTotalPoints += parseInt(result.points, 10);
                    allResults.push({ race: `Sprint R${raceEvent.round}`, position: result.position, points: result.points, type: 'sprint' });
                }
            });
        }

        allResults.sort((a, b) => {
            const aNum = parseInt(a.race.match(/\d+/)[0]);
            const bNum = parseInt(b.race.match(/\d+/)[0]);
            if (aNum !== bNum) return aNum - bNum;
            return a.type === 'sprint' ? -1 : 1;
        });

        document.getElementById('panel-total-points').textContent = `Total Points: ${calculatedTotalPoints}`;

        const shouldHighlight = (resultRace) => {
            if (currentRaceSelected === 'championship') return false;
            const raceId = currentRaceSelected.includes('-Sprint') ? `Sprint ${currentRaceSelected.replace('-Sprint','')}` : currentRaceSelected;
            return resultRace.replace(/\s/g, '') === raceId.replace(/\s/g, '');
        };

        const resultsContainer = detailsPanel.querySelector('.race-results');
        resultsContainer.innerHTML = allResults.length > 0 ? allResults.map(result => `
            <div class="race-result-item ${result.type === 'sprint' ? 'sprint-result' : ''} ${shouldHighlight(result.race) ? 'highlighted-race' : ''}">
                <span class="race-name">${result.race}</span>
                <span class="race-position">P${result.position}</span>
                <span class="race-points">${result.points} pts</span>
            </div>`).join('') : '<div class="no-results">No hay resultados disponibles.</div>';

        detailsPanel.querySelector('.panel-close').addEventListener('click', e => { e.stopPropagation(); closeDriverPanel(); });
    }

    function getTeamName(teamId) {
        const names = { 'redbull': 'Red Bull Racing', 'ferrari': 'Scuderia Ferrari', 'mercedes': 'Mercedes-AMG F1', 'mclaren': 'McLaren F1 Team', 'aston-martin': 'Aston Martin F1', 'alpine': 'Alpine F1 Team', 'williams': 'Williams Racing', 'rb': 'RB F1 Team', 'haas': 'Haas F1 Team', 'sauber': 'Stake F1 Team Sauber' };
        return names[teamId] || teamId;
    }

    document.querySelectorAll('.race').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.race.active').classList.remove('active');
            this.classList.add('active');
            currentRaceSelected = this.getAttribute('data-race');
            createDriversTable(currentRaceSelected);
        });
    });

    createDriversTable('championship');
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            createDriversTable(document.querySelector('.race.active').getAttribute('data-race'));
        }
    }, 300000); // 5 minutos

    function openDriverPanel() {
        document.getElementById('standings-container').classList.add('blur-content');
        document.querySelector('.races-container').classList.add('blur-content');
        document.querySelector('.navigation-buttons').classList.add('blur-content');
        document.querySelector('h1').classList.add('blur-content');
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeDriverPanel);
        }
        overlay.style.display = 'block';
    }

    function closeDriverPanel() {
        document.getElementById('driver-details-panel').classList.remove('panel-active');
        document.getElementById('standings-container').classList.remove('blur-content');
        document.querySelector('.races-container').classList.remove('blur-content');
        document.querySelector('.navigation-buttons').classList.remove('blur-content');
        document.querySelector('h1').classList.remove('blur-content');
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.style.display = 'none';
    }
});