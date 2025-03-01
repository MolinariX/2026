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
        { id: "norris", name: "Lando Norris", team: "mclaren", logoPath: "images/logos/mclaren.png", photoPath: "images/drivers/norris.png" },
        { id: "piastri", name: "Oscar Piastri", team: "mclaren", logoPath: "images/logos/mclaren.png", photoPath: "images/drivers/piastri.png" },
        
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
    
    // Función para obtener datos de la API de Ergast
    async function fetchDriverStandings() {
        try {
            // Especificamos el año 2025 en lugar de "current"
            const response = await fetch('https://ergast.com/api/f1/2025/driverStandings.json');
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
            // Especificamos el año 2025 en lugar de "current"
            const response = await fetch(`https://ergast.com/api/f1/2025/${round}/results.json`);
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
        
        // Crear filas de pilotos
        standings.forEach(driverStanding => {
            const position = driverStanding.position;
            const driverId = mapDriverId(driverStanding.Driver.driverId);
            const points = driverStanding.points;
            
            // Buscar los datos del piloto en nuestro array
            const driverInfo = driversData.find(d => d.id === driverId);
            
            if (driverInfo) {
                // Crear la fila del piloto
                const driverRow = document.createElement('div');
                driverRow.className = `driver-row ${driverInfo.team}`;
                
                driverRow.innerHTML = `
                    <div class="position">${position}</div>
                    <img class="team-logo" src="${driverInfo.logoPath}" alt="${driverInfo.team} logo">
                    <div class="driver-name">${driverInfo.name}</div>
                    <img class="driver-photo" src="${driverInfo.photoPath}" alt="${driverInfo.name}">
                    <div class="points">${points}</div>
                `;
                
                container.appendChild(driverRow);
            }
        });
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
});