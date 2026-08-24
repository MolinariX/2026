// Configuración de constructores y sus datos visuales
const constructores = [
    {
        id: 'mclaren',
        name: 'McLaren',
        color: 'mclaren',
        logo: 'images/logos/mclaren2.png'
    },
    {
        id: 'ferrari',
        name: 'Ferrari',
        color: 'ferrari',
        logo: 'images/logos/ferrari.png'
    },
    {
        id: 'red_bull',
        name: 'Red Bull Racing',
        color: 'red-bull',
        logo: 'images/logos/redbull.png'  
    },
    {
        id: 'mercedes',
        name: 'Mercedes',
        color: 'mercedes',
        logo: 'images/logos/mercedes.png'
    },
    {
        id: 'aston_martin',
        name: 'Aston Martin',
        color: 'aston-martin',
        logo: 'images/logos/aston-martin.png'
    },
    {
        id: 'alpine',
        name: 'Alpine',
        color: 'alpine',
        logo: 'images/logos/alpine.png'
    },
    {
        id: 'haas',
        name: 'Haas',
        color: 'haas',
        logo: 'images/logos/haas.png'
    },
    {
        id: 'racing_bulls',
        name: 'Racing Bulls',
        color: 'racing-bulls',
        logo: 'images/logos/rb.png'  
    },
    {
        id: 'williams',
        name: 'Williams',
        color: 'williams',
        logo: 'images/logos/williams.png'
    },
    {
        id: 'audi',
        name: 'Audi',
        color: 'audi',
        logo: 'images/logos/audi.png'
    },
    {
        id: 'cadillac',
        name: 'Cadillac',
        color: 'cadillac',
        logo: 'images/logos/cadillac.png'
    }
];

// Los pilotos por equipo se obtienen dinámicamente desde la API (driverStandings)
// Almacenamiento de datos globales
let constructorData = [];
let driverData = [];

// Punto de entrada principal
document.addEventListener('DOMContentLoaded', () => {
    // --- UPDATE PAGE TITLE ---
    function updatePageTitle() {
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = `Campeonato de Constructores F1 ${currentYear}`;
        }
        // Also update the document title
        document.title = `Constructores F1 ${currentYear}`;
    }

    // --- CUSTOM EVENT LISTENER ---
    window.addEventListener('yearChanged', () => {
        // Since we are showing constructors, we can fully re-fetch easily
        document.getElementById('spinner').style.display = 'flex';
        updatePageTitle(); // Update the title
        fetchConstructorsData();
        fetchDriversData();
        
        // Update season status text
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        const existingStatus = document.getElementById('season-status');
        if (existingStatus) {
            existingStatus.remove();
        }
    });

    // Crear elementos del modal
    createModalElements();
    
    // Update title on load
    updatePageTitle();
    
    // Cargar datos de constructores
    fetchConstructorsData();
    
    // Cargar datos de pilotos
    fetchDriversData();
    
    // Actualizar datos cada 30 minutos
    setInterval(() => {
        fetchConstructorsData();
        fetchDriversData();
    }, 30 * 60 * 1000);
});

// Crear elementos del modal
function createModalElements() {
    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    
    // Crear el modal del constructor
    const modal = document.createElement('div');
    modal.id = 'constructor-modal';
    modal.className = 'constructor-modal';
    
    // Estructura interna inicial del modal
    modal.innerHTML = `
        <div class="close-button" id="close-modal">✕</div>
        <div class="constructor-details" id="constructor-details">
            <!-- Se llenará dinámicamente -->
        </div>
    `;
    
    // Añadir al DOM
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Configurar evento para cerrar el modal
    overlay.addEventListener('click', closeModal);
    document.getElementById('close-modal').addEventListener('click', closeModal);
}

// Función para obtener datos de constructores de la API
async function fetchConstructorsData() {
    try {
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        
        // Usar la API de Jolpica
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}/constructorStandings.json`);
        const data = await response.json();
        
        const standings = data.MRData.StandingsTable.StandingsLists;
        
        // El resto del código permanece igual
        if (standings.length > 0) {
            // Hay datos para la temporada actual
            const constructorStandings = standings[0].ConstructorStandings;
            
            // Procesar los datos
            constructorData = processApiData(constructorStandings);
            
            // Actualizar la tabla
            updateTable(constructorData);
        } else {
            // No hay datos para la temporada actual (es inicio de temporada)
            // Mostrar tabla con puntos en cero
            showEmptyStandings();
        }
        
        // Actualizar la hora de última actualización
        updateLastUpdated();
        
        // Ocultar spinner
        document.getElementById('spinner').style.display = 'none';
    } catch (error) {
        console.error('Error al obtener datos de constructores:', error);
        
        // Si hay error, mostrar tabla vacía para el inicio de temporada
        showEmptyStandings();
        
        // Ocultar spinner
        document.getElementById('spinner').style.display = 'none';
    }
}

// Función para obtener datos de pilotos de la API
async function fetchDriversData() {
    try {
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}/driverStandings.json`);
        const data = await response.json();
        
        const standings = data.MRData.StandingsTable.StandingsLists;
        
        if (standings.length > 0) {
            // Hay datos para la temporada actual
            const driverStandings = standings[0].DriverStandings;
            
            // Almacenar datos de pilotos
            driverData = driverStandings.map(driver => {
                const driverId = driver.Driver.driverId.toLowerCase();
                let teamId = 'unknown';
                let teamName = 'Unknown Team';
                if (driver.Constructors && driver.Constructors.length > 0) {
                    const latestConstructor = driver.Constructors[driver.Constructors.length - 1];
                    teamId = findTeamIdByName(latestConstructor.name);
                    teamName = latestConstructor.name;
                }
                let points = parseInt(driver.points);
                
                return {
                    driverId: driverId,
                    name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                    code: driver.Driver.code,
                    teamId: teamId,
                    team: teamName,
                    points: points,
                    cambio: null
                };
            });
        } else {
            // No hay datos, crear pilotos con 0 puntos
            driverData = [];
            for (const [teamId, drivers] of Object.entries(pilotosPorEquipo)) {
                drivers.forEach(driver => {
                    const driverId = driver.nombre.toLowerCase();
                    driverData.push({
                        driverId: driverId,
                        name: driver.nombre,
                        code: driver.nombre.substring(0, 3).toUpperCase(),
                        teamId: teamId,
                        team: findTeamNameById(teamId),
                        points: 0,
                        cambio: null
                    });
                });
            }
        }
    } catch (error) {
        console.error('Error al obtener datos de pilotos:', error);
        // Crear datos de pilotos vacíos en caso de error
        driverData = [];
    }
}

// Mostrar clasificación vacía para inicio de temporada
function showEmptyStandings() {
    // Crear datos con todos los equipos en cero puntos
    constructorData = constructores.map((constructor, index) => {
        let apiId = constructor.id;
        if (constructor.id === 'racing_bulls') apiId = 'rb';
        else if (constructor.id === 'audi') apiId = 'sauber';
        
        return {
            id: constructor.id,
            apiConstructorId: apiId,
            name: constructor.name,
            points: 0,
            position: index + 1,
            color: constructor.color,
            logo: constructor.logo
        };
    });
    
    // Actualizar tabla con datos en cero
    updateTable(constructorData);
    
    // Mostrar mensaje de inicio de temporada
    const statusElement = document.createElement('div');
    statusElement.id = 'season-status';
    statusElement.className = 'season-status';
    statusElement.innerHTML = '<p>Temporada 2026 - Aún no ha comenzado</p>';
    
    // Insertar antes de la tabla
    const tableContainer = document.querySelector('.table-container');
    const existingStatus = document.getElementById('season-status');
    
    if (!existingStatus && tableContainer) {
        tableContainer.insertBefore(statusElement, tableContainer.firstChild);
    }
}

// Procesar datos de la API de constructores
function processApiData(apiData) {
    // Mapear los datos de la API a nuestro formato
    return apiData.map(item => {
        // Encontrar el constructor en nuestra configuración
        const constructor = findConstructorByName(item.Constructor.name);
        
        return {
            id: constructor ? constructor.id : 'unknown',
            apiConstructorId: item.Constructor.constructorId,
            name: item.Constructor.name,
            points: parseInt(item.points),
            position: parseInt(item.position),
            color: constructor ? constructor.color : 'default',
            logo: constructor ? constructor.logo : 'images/logos/default.png'
        };
    });
}

// Buscar constructor por nombre (correspondencia aproximada)
function findConstructorByName(apiName) {
    // Normalizar nombres para comparación
    const normalizedApiName = apiName.toLowerCase();
    
    // Mapeo de nombres de la API a nuestros IDs
    const mappings = {
        'mclaren': 'mclaren',
        'ferrari': 'ferrari',
        'red bull': 'red_bull',
        'mercedes': 'mercedes',
        'aston martin': 'aston_martin',
        'alpine': 'alpine',
        'haas': 'haas',
        'rb': 'racing_bulls', 
        'visa cash app rb': 'racing_bulls',
        'williams': 'williams',
        'sauber': 'audi',
        'stake': 'audi',
        'audi': 'audi',
        'cadillac': 'cadillac'
    };
    
    // Buscar en el mapeo
    for (const [key, value] of Object.entries(mappings)) {
        if (normalizedApiName.includes(key)) {
            return constructores.find(c => c.id === value);
        }
    }
    
    // Si no se encuentra, intentar buscar por coincidencia directa
    return constructores.find(c => 
        c.name.toLowerCase().includes(normalizedApiName) || 
        normalizedApiName.includes(c.name.toLowerCase())
    );
}

// Encontrar ID de equipo por nombre
function findTeamIdByName(teamName) {
    const normalizedName = teamName.toLowerCase();
    
    // Mapeo directo para casos problemáticos
    if (normalizedName.includes('rb') || normalizedName.includes('visa cash app')) {
        return 'racing_bulls';
    }
    if (normalizedName.includes('sauber') || normalizedName.includes('stake') || normalizedName.includes('audi')) {
        return 'audi';
    }
    if (normalizedName.includes('cadillac')) {
        return 'cadillac';
    }
    
    // Buscar en el mapeo para otros casos
    for (const constructor of constructores) {
        if (normalizedName.includes(constructor.name.toLowerCase()) || 
            constructor.name.toLowerCase().includes(normalizedName)) {
            return constructor.id;
        }
    }
    
    return 'unknown';
}

// Encontrar nombre de equipo por ID
function findTeamNameById(teamId) {
    const constructor = constructores.find(c => c.id === teamId);
    return constructor ? constructor.name : 'Unknown';
}

// Actualizar la tabla con los datos
function updateTable(data) {
    // Ordenar por puntos (de mayor a menor)
    data.sort((a, b) => b.points - a.points);
    
    // Obtener la tabla
    const table = document.getElementById('constructores-table');
    table.innerHTML = '';
    
    // Crear filas para cada constructor
    data.forEach((constructor, index) => {
        // Asignar posición basada en el orden actual
        const position = index + 1;
        
        const row = document.createElement('tr');
        row.className = `constructor-row ${constructor.color}`;
        row.setAttribute('data-constructor-id', constructor.id);
        
        // Añadir evento de clic para mostrar detalles
        row.addEventListener('click', () => showConstructorDetails(constructor.id));
        
        // Añadir la clase position-number para estilizar específicamente
        row.innerHTML = `
            <td class="position position-${position}">${position}</td>
            <td class="logo"><img src="${constructor.logo}" alt="${constructor.name} logo"></td>
            <td class="constructor-name">${constructor.name}</td>
            <td class="points">${constructor.points}</td>
        `;
        
        table.appendChild(row);
    });
}

// Mostrar detalles del constructor seleccionado
async function showConstructorDetails(constructorId) {
    const constructor = constructorData.find(c => c.id === constructorId);
    if (!constructor) return;
    
    const detailsContainer = document.getElementById('constructor-details');
    
    // Mostrar el modal de inmediato con un spinner mientras carga
    detailsContainer.innerHTML = `
        <div class="constructor-logo">
            <img src="${constructor.logo}" alt="${constructor.name} logo">
        </div>
        <div class="constructor-title">${constructor.name}</div>
        <div class="constructor-type">Constructor</div>
        <div class="total-points">Total Points: ${constructor.points}</div>
        <div class="divider"></div>
        <div class="team-drivers-title">Team Drivers</div>
        <div class="driver-list" id="modal-driver-list">
            <div class="loading-spinner" style="display: flex; justify-content: center; align-items: center; padding: 20px;">
                <div class="spinner"></div>
                <p style="margin-left: 10px; color: #aaa;">Cargando pilotos...</p>
            </div>
        </div>
        <div class="total-team-points">
            <div class="total-team-label">Total Team Points: </div>
            <div class="total-team-value">${constructor.points}</div>
        </div>
    `;
    
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('constructor-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // IDs de pilotos actuales del equipo (desde standings de pilotos)
    const currentDriverIds = new Set(
        driverData
            .filter(d => d.teamId === constructorId)
            .map(d => d.driverId)
    );
    
    // Consultar resultados de carrera y sprint para este constructor
    const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
    const apiConstructorId = constructor.apiConstructorId || constructorId;
    
    const resultsUrl = `https://api.jolpi.ca/ergast/f1/${currentYear}/constructors/${apiConstructorId}/results.json?limit=100`;
    const sprintUrl = `https://api.jolpi.ca/ergast/f1/${currentYear}/constructors/${apiConstructorId}/sprint.json?limit=100`;
    
    let raceData = null;
    let sprintData = null;
    
    try {
        const [raceRes, sprintRes] = await Promise.all([
            fetch(resultsUrl),
            fetch(sprintUrl)
        ]);
        if (raceRes.ok) raceData = await raceRes.json();
        if (sprintRes.ok) sprintData = await sprintRes.json();
    } catch (error) {
        console.error('Error al obtener detalles del constructor:', error);
    }
    
    // Construir mapa de pilotos desde resultados reales de la API
    const driversMap = {};
    
    // Procesar resultados de carreras
    const races = raceData?.MRData?.RaceTable?.Races || [];
    races.forEach(race => {
        (race.Results || []).forEach(res => {
            const dId = res.Driver.driverId.toLowerCase();
            const pts = parseFloat(res.points) || 0;
            if (!driversMap[dId]) {
                driversMap[dId] = {
                    driverId: dId,
                    name: `${res.Driver.givenName} ${res.Driver.familyName}`,
                    code: res.Driver.code,
                    points: 0
                };
            }
            driversMap[dId].points += pts;
            driversMap[dId].name = `${res.Driver.givenName} ${res.Driver.familyName}`;
            driversMap[dId].code = res.Driver.code;
        });
    });
    
    // Procesar resultados de sprints
    const sprints = sprintData?.MRData?.RaceTable?.Races || [];
    sprints.forEach(race => {
        (race.SprintResults || []).forEach(res => {
            const dId = res.Driver.driverId.toLowerCase();
            const pts = parseFloat(res.points) || 0;
            if (!driversMap[dId]) {
                driversMap[dId] = {
                    driverId: dId,
                    name: `${res.Driver.givenName} ${res.Driver.familyName}`,
                    code: res.Driver.code,
                    points: 0
                };
            }
            driversMap[dId].points += pts;
        });
    });
    
    // Agregar pilotos actuales que aún no hayan puntuado (inicio de temporada)
    driverData
        .filter(d => d.teamId === constructorId && !driversMap[d.driverId])
        .forEach(d => {
            driversMap[d.driverId] = {
                driverId: d.driverId,
                name: d.name,
                code: d.code,
                points: 0
            };
        });
    
    // Convertir a array: pilotos actuales primero, luego por puntos
    const teamDrivers = Object.values(driversMap);
    teamDrivers.sort((a, b) => {
        const aIsCurrent = currentDriverIds.has(a.driverId);
        const bIsCurrent = currentDriverIds.has(b.driverId);
        if (aIsCurrent !== bIsCurrent) return aIsCurrent ? -1 : 1;
        return b.points - a.points;
    });
    
    // Renderizar la lista de pilotos en el modal
    const driverListContainer = document.getElementById('modal-driver-list');
    if (driverListContainer) {
        let driverHTML = '';
        
        teamDrivers.forEach(driver => {
            const lastName = driver.name.split(' ').pop().toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const driverImagePath = `images/drivers/${lastName}.png`;
            const isCurrent = currentDriverIds.has(driver.driverId);
            
            driverHTML += `
                <div class="driver-item${isCurrent ? '' : ' former-driver'}">
                    <div class="driver-logo">
                        <img src="${driverImagePath}" alt="${driver.name}" onerror="this.src='images/default/default.png';">
                    </div>
                    <div class="driver-name">${driver.name}</div>
                    <div class="driver-points">${driver.points} pts</div>
                </div>
            `;
        });
        
        driverListContainer.innerHTML = driverHTML ||
            '<div style="padding: 10px; text-align: center; color: #aaa;">No hay pilotos registrados</div>';
    }
}


// Cerrar el modal
function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('constructor-modal').style.display = 'none';
    
    // Restaurar scroll en el body
    document.body.style.overflow = 'auto';
}

// Actualizar la hora de última actualización
function updateLastUpdated() {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    document.getElementById('last-update').textContent = formattedDate;
}