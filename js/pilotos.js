document.addEventListener('DOMContentLoaded', function() {
    // Datos de pilotos con sus equipos y colores actualizados para 2025
    const driversData = [
        // Red Bull
        { id: "verstappen", name: "Max Verstappen", team: "redbull", logoPath: "images/logos/redbull.png", photoPath: "images/drivers/verstappen.png" },
        { id: "lawson", name: "Liam Lawson", team: "redbull", logoPath: "images/logos/redbull.png", photoPath: "images/drivers/lawson.png" },
        
        // Ferrari
        { id: "leclerc", name: "Charles Leclerc", team: "ferrari", logoPath: "images/logos/ferrari.png", photoPath: "images/drivers/leclerc.png" },
        { id: "hamilton", name: "Lewis Hamilton", team: "ferrari", logoPath: "images/logos/ferrari.png", photoPath: "images/drivers/hamilton.png" },
        
        // Mercedes
        { id: "russell", name: "George Russell", team: "mercedes", logoPath: "images/logos/mercedes.png", photoPath: "images/drivers/russell.png" },
        { id: "antonelli", name: "Andrea Kimi Antonelli", team: "mercedes", logoPath: "images/logos/mercedes.png", photoPath: "images/drivers/antonelli.png" },
        
        // McLaren
        { id: "norris", name: "Lando Norris", team: "mclaren", logoPath: "images/logos/mclaren2.png", photoPath: "images/drivers/norris.png" },
        { id: "piastri", name: "Oscar Piastri", team: "mclaren", logoPath: "images/logos/mclaren2.png", photoPath: "images/drivers/piastri.png" },
        
        // Aston Martin
        { id: "alonso", name: "Fernando Alonso", team: "aston-martin", logoPath: "images/logos/aston-martin.png", photoPath: "images/drivers/alonso.png" },
        { id: "stroll", name: "Lance Stroll", team: "aston-martin", logoPath: "images/logos/aston-martin.png", photoPath: "images/drivers/stroll.png" },
        
        // Alpine
        { id: "gasly", name: "Pierre Gasly", team: "alpine", logoPath: "images/logos/alpine.png", photoPath: "images/drivers/gasly.png" },
        { id: "doohan", name: "Jack Doohan", team: "alpine", logoPath: "images/logos/alpine.png", photoPath: "images/drivers/doohan.png" },
        
        // Williams
        { id: "albon", name: "Alexander Albon", team: "williams", logoPath: "images/logos/williams.png", photoPath: "images/drivers/albon.png" },
        { id: "sainz", name: "Carlos Sainz", team: "williams", logoPath: "images/logos/williams.png", photoPath: "images/drivers/sainz.png" },
        
        // RB
        { id: "tsunoda", name: "Yuki Tsunoda", team: "rb", logoPath: "images/logos/rb.png", photoPath: "images/drivers/tsunoda.png" },
        { id: "hadjar", name: "Isack Hadjar", team: "rb", logoPath: "images/logos/rb.png", photoPath: "images/drivers/hadjar.png" },
        
        // Haas
        { id: "bearman", name: "Oliver Bearman", team: "haas", logoPath: "images/logos/haas.png", photoPath: "images/drivers/bearman.png" },
        { id: "ocon", name: "Esteban Ocon", team: "haas", logoPath: "images/logos/haas.png", photoPath: "images/drivers/ocon.png" },
        
        // Sauber (actualizado a Stake)
        { id: "hulkenberg", name: "Nico Hulkenberg", team: "sauber", logoPath: "images/logos/stake.png", photoPath: "images/drivers/hulkenberg.png" },
        { id: "bortoleto", name: "Gabriel Bortoleto", team: "sauber", logoPath: "images/logos/stake.png", photoPath: "images/drivers/bortoleto.png" }
    ];
    
    // Objeto para almacenar los resultados de las carreras por piloto
    let driverRaceResults = {};
    
    // Función para obtener datos de la API de Jolpi.ca
async function fetchDriverStandings() {
    try {
        // Cambiamos a la API de Jolpi.ca
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2025/driverStandings.json');
        const data = await response.json();
        
        // Verificar si hay datos de clasificación disponibles
        if (data.MRData.StandingsTable.StandingsLists.length === 0) {
            // No hay datos para 2025 aún, mostrar tabla en cero
            return createEmptyStandings();
        }
        
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return createEmptyStandings();
    }
}
    
    // Función para crear clasificación con puntuaciones en cero
    function createEmptyStandings() {
        return driversData.map((driver, index) => ({
            position: (index + 1).toString(),
            Driver: { driverId: driver.id.replace('-', '_') },
            points: "0"
        }));
    }
    
    // Función para obtener resultados de una carrera específica
async function fetchRaceResults(round) {
    try {
        // Cambiamos a la API de Jolpi.ca
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/2025/${round}/results.json`);
        const data = await response.json();
        
        // Verificar si hay resultados disponibles
        if (data.MRData.RaceTable.Races.length === 0) {
            // No hay resultados para esta carrera aún
            return null;
        }
        
        return data.MRData.RaceTable.Races[0].Results;
    } catch (error) {
        console.error(`Error al obtener resultados de R${round}:`, error);
        return null;
    }
}
    
// Función para obtener todos los resultados de todas las carreras
async function fetchAllRaceResults() {
    try {
        // Cambiamos a la API de Jolpi.ca
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2025/results.json?limit=1000');
        const data = await response.json();
        
        if (data.MRData.RaceTable.Races.length === 0) {
            return [];
        }
        
        // Organizar los resultados por piloto
        const races = data.MRData.RaceTable.Races;
        const results = {};
        
        races.forEach(race => {
            const raceNumber = race.round;
            const raceName = `R${raceNumber}`;
            
            race.Results.forEach(result => {
                const driverId = result.Driver.driverId;
                if (!results[driverId]) {
                    results[driverId] = [];
                }
                
                results[driverId].push({
                    race: raceName,
                    position: result.position,
                    points: result.points
                });
            });
        });
        
        return results;
    } catch (error) {
        console.error('Error al obtener todos los resultados:', error);
        return {};
    }
}
    
    // Función para mapear el ID del piloto de la API con nuestros datos
    function mapDriverId(driverId) {
        const mapping = {
            'max_verstappen': 'verstappen',
            'liam_lawson': 'lawson',
            'charles_leclerc': 'leclerc',
            'lewis_hamilton': 'hamilton',
            'george_russell': 'russell',
            'andrea_kimi_antonelli': 'antonelli',
            'lando_norris': 'norris',
            'oscar_piastri': 'piastri',
            'fernando_alonso': 'alonso',
            'lance_stroll': 'stroll',
            'pierre_gasly': 'gasly',
            'jack_doohan': 'doohan',
            'alexander_albon': 'albon',
            'carlos_sainz': 'sainz',
            'yuki_tsunoda': 'tsunoda',
            'isack_hadjar': 'hadjar',
            'oliver_bearman': 'bearman',
            'esteban_ocon': 'ocon',
            'nico_hulkenberg': 'hulkenberg',
            'gabriel_bortoleto': 'bortoleto'
        };
        
        return mapping[driverId] || driverId;
    }
    
    // Función para crear la tabla de pilotos con datos actualizados
    async function createDriversTable(raceData = null) {
        const container = document.getElementById('standings-container');
        container.innerHTML = ''; // Limpiar contenido existente
        
        let standings;
        
        if (raceData === null || raceData === 'championship') {
            // Obtener clasificación general
            standings = await fetchDriverStandings();
        } else {
            // Obtener resultados de una carrera específica
            const round = raceData.replace('R', '');
            const raceResults = await fetchRaceResults(round);
            
            if (!raceResults) {
                // Mostrar mensaje de "Carrera no disputada aún"
                const messageElement = document.createElement('div');
                messageElement.className = 'race-not-available';
                messageElement.textContent = 'Esta carrera aún no se ha disputado en la temporada 2025';
                container.appendChild(messageElement);
                return;
            } else {
                standings = raceResults.map(result => ({
                    position: result.position,
                    Driver: result.Driver,
                    points: result.points
                }));
            }
        }
        
        // Cargar los resultados de carreras para todos los pilotos
        if (Object.keys(driverRaceResults).length === 0) {
            driverRaceResults = await fetchAllRaceResults();
        }
        
        // Crear filas de pilotos
        standings.forEach(driverStanding => {
            const position = driverStanding.position;
            const apiDriverId = driverStanding.Driver.driverId;
            const driverId = mapDriverId(apiDriverId);
            const points = driverStanding.points;
            
            // Buscar los datos del piloto en nuestro array
            const driverInfo = driversData.find(d => d.id === driverId);
            
            if (driverInfo) {
                // Crear la fila del piloto
                const driverRow = document.createElement('div');
                driverRow.className = `driver-row ${driverInfo.team}`;
                driverRow.setAttribute('data-driver-id', apiDriverId);
                
                driverRow.innerHTML = `
                    <div class="position">${position}</div>
                    <img class="team-logo" src="${driverInfo.logoPath}" alt="${driverInfo.team} logo">
                    <div class="driver-name">${driverInfo.name}</div>
                    <img class="driver-photo" src="${driverInfo.photoPath}" alt="${driverInfo.name}">
                    <div class="points">${points}</div>
                `;
                
                // Agregar evento de clic para mostrar detalles del piloto
                driverRow.addEventListener('click', function() {
                    showDriverDetails(apiDriverId, driverInfo, points);
                    openDriverPanel(); // Añadir esta llamada para activar el efecto blur
                });
                
                container.appendChild(driverRow);
            }
        });
    }
    
    // Función para mostrar los detalles del piloto seleccionado
    function showDriverDetails(apiDriverId, driverInfo, points) {
        const detailsPanel = document.getElementById('driver-details-panel');
        
        // Preparar los resultados de las carreras del piloto
        const raceResults = driverRaceResults[apiDriverId] || [];
        
        // Construir el contenido del panel
        detailsPanel.innerHTML = `
            <button class="panel-close">✕</button>
            <img class="panel-logo" src="${driverInfo.photoPath}" alt="${driverInfo.name}">            <h2 class="panel-driver-name">${driverInfo.name}</h2>
            <div class="panel-team">${getTeamName(driverInfo.team)}</div>
            <div class="panel-points">Total Points: ${points}</div>
            <div class="divider"></div>
            <div class="race-results">
                ${raceResults.length > 0 ? 
                    raceResults.map(result => `
                        <div class="race-result-item">
                            <span class="race-name">${result.race}</span>
                            <span class="race-position">P${result.position}</span>
                            <span class="race-points">${result.points} pts</span>
                        </div>
                    `).join('') : 
                    '<div class="no-results">No hay resultados disponibles aún</div>'
                }
            </div>
        `;
        
        // Agregar evento al botón de cerrar
        detailsPanel.querySelector('.panel-close').addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague
            closeDriverPanel();
        });
        
        // Mostrar el panel
        detailsPanel.classList.add('panel-active');
    }
    
    // Función para obtener el nombre completo del equipo
    function getTeamName(teamId) {
        const teamNames = {
            'redbull': 'Red Bull Racing',
            'ferrari': 'Scuderia Ferrari',
            'mercedes': 'Mercedes-AMG F1',
            'mclaren': 'McLaren F1 Team',
            'aston-martin': 'Aston Martin F1',
            'alpine': 'Alpine F1 Team',
            'williams': 'Williams Racing',
            'rb': 'RB F1 Team',
            'haas': 'Haas F1 Team',
            'sauber': 'Stake F1 Team Sauber'
        };
        
        return teamNames[teamId] || teamId;
    }
    
    // Cargar la clasificación inicial
    createDriversTable();
    
    // Configurar eventos para los botones de carreras
    const raceButtons = document.querySelectorAll('.race');
    raceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Desactivar el botón activo actual
            document.querySelector('.race.active').classList.remove('active');
            
            // Activar el botón actual
            this.classList.add('active');
            
            // Actualizar la tabla con los datos de la carrera seleccionada
            const raceData = this.getAttribute('data-race');
            createDriversTable(raceData);
        });
    });
    
    // Actualizar los datos cada 5 minutos
    setInterval(() => {
        const activeRace = document.querySelector('.race.active').getAttribute('data-race');
        createDriversTable(activeRace);
    }, 300000); // 5 minutos
    
    // Función para abrir el panel y aplicar blur
    function openDriverPanel() {
        // Aplicar clase para hacer blur al contenido
        document.getElementById('standings-container').classList.add('blur-content');
        document.querySelector('.races-container').classList.add('blur-content');
        document.querySelector('.navigation-buttons').classList.add('blur-content');
        document.querySelector('h1').classList.add('blur-content');
        
        // Crear y mostrar overlay
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            
            // Agregar evento de clic al overlay para cerrar el panel
            overlay.addEventListener('click', function() {
                closeDriverPanel();
            });
        }
        overlay.style.display = 'block';
    }
    
    // Función para cerrar el panel y quitar blur
    function closeDriverPanel() {
        document.getElementById('driver-details-panel').classList.remove('panel-active');
        
        // Quitar clase de blur
        document.getElementById('standings-container').classList.remove('blur-content');
        document.querySelector('.races-container').classList.remove('blur-content');
        document.querySelector('.navigation-buttons').classList.remove('blur-content');
        document.querySelector('h1').classList.remove('blur-content');
        
        // Ocultar overlay
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
    
    // Detectar clics en la página para cerrar el panel al hacer clic fuera
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('driver-details-panel');
        const isActive = panel.classList.contains('panel-active');
        
        // Si el panel está abierto y se hace clic en la página (fuera del panel)
        if (isActive && !panel.contains(e.target) && !e.target.closest('.driver-row')) {
            closeDriverPanel();
        }
    });
    
    // Evitar la propagación de clics dentro del panel
    document.getElementById('driver-details-panel').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});