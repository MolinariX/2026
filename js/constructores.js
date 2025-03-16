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
        id: 'stake',
        name: 'Stake',
        color: 'stake',
        logo: 'images/logos/stake.png'
    }
];

// Lista de pilotos por equipo (2025)
const pilotosPorEquipo = {
    'mclaren': [
        { nombre: 'Norris', logo: 'images/logos/mclaren.png' },
        { nombre: 'Piastri', logo: 'images/logos/mclaren.png' }
    ],
    'ferrari': [
        { nombre: 'Leclerc', logo: 'images/logos/ferrari.png' },
        { nombre: 'Hamilton', logo: 'images/logos/ferrari.png' }
    ],
    'red_bull': [
        { nombre: 'Verstappen', logo: 'images/logos/redbull.png' },
        { nombre: 'Lawson', logo: 'images/logos/redbull.png' }
    ],
    'mercedes': [
        { nombre: 'Russell', logo: 'images/logos/mercedes.png' },
        { nombre: 'Antonelli', logo: 'images/logos/mercedes.png' }
    ],
    'aston_martin': [
        { nombre: 'Alonso', logo: 'images/logos/aston-martin.png' },
        { nombre: 'Stroll', logo: 'images/logos/aston-martin.png' }
    ],
    'alpine': [
        { nombre: 'Gasly', logo: 'images/logos/alpine.png' },
        { nombre: 'Doohan', logo: 'images/logos/alpine.png' }
    ],
    'haas': [
        { nombre: 'Ocon', logo: 'images/logos/haas.png' },
        { nombre: 'Bearman', logo: 'images/logos/haas.png' }
    ],
    'racing_bulls': [
        { nombre: 'Tsunoda', logo: 'images/logos/rb.png' },
        { nombre: 'Hadjar', logo: 'images/logos/rb.png' }
    ],
    'williams': [
        { nombre: 'Albon', logo: 'images/logos/williams.png' },
        { nombre: 'Sainz', logo: 'images/logos/williams.png' }
    ],
    'stake': [
        { nombre: 'Hulkenberg', logo: 'images/logos/stake.png' },
        { nombre: 'Bortoleto', logo: 'images/logos/stake.png' }
    ]
};

// Almacenamiento de datos globales
let constructorData = [];
let driverData = [];

// Punto de entrada principal
document.addEventListener('DOMContentLoaded', () => {
    // Crear elementos del modal
    createModalElements();
    
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
        const currentYear = new Date().getFullYear(); // Obtener año actual (2025)
        
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
        const currentYear = new Date().getFullYear();
        
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}/driverStandings.json`);
        const data = await response.json();
        
        const standings = data.MRData.StandingsTable.StandingsLists;
        
        if (standings.length > 0) {
            // Hay datos para la temporada actual
            const driverStandings = standings[0].DriverStandings;
            
            // Almacenar datos de pilotos
            driverData = driverStandings.map(driver => {
                return {
                    driverId: driver.Driver.driverId,
                    name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                    code: driver.Driver.code,
                    teamId: findTeamIdByName(driver.Constructors[0].name),
                    team: driver.Constructors[0].name,
                    points: parseInt(driver.points)
                };
            });
        } else {
            // No hay datos, crear pilotos con 0 puntos
            driverData = [];
            for (const [teamId, drivers] of Object.entries(pilotosPorEquipo)) {
                drivers.forEach(driver => {
                    driverData.push({
                        driverId: driver.nombre.toLowerCase(),
                        name: driver.nombre,
                        code: driver.nombre.substring(0, 3).toUpperCase(),
                        teamId: teamId,
                        team: findTeamNameById(teamId),
                        points: 0
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
        return {
            id: constructor.id,
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
    statusElement.innerHTML = '<p>Temporada 2025 - Aún no ha comenzado</p>';
    
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
        'sauber': 'stake',
        'stake f1 team kick sauber': 'stake'
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
    if (normalizedName.includes('sauber') || normalizedName.includes('stake')) {
        return 'stake';
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
function showConstructorDetails(constructorId) {
    // Encontrar el constructor por ID
    const constructor = constructorData.find(c => c.id === constructorId);
    
    if (!constructor) return;
    
    // Filtrar pilotos de este equipo
    const teamDrivers = driverData.filter(driver => driver.teamId === constructorId);
    
    // Obtener el contenedor de detalles
    const detailsContainer = document.getElementById('constructor-details');
    
    // Generar contenido HTML
    let detailsHTML = `
        <div class="constructor-logo">
            <img src="${constructor.logo}" alt="${constructor.name} logo">
        </div>
        <div class="constructor-title">${constructor.name}</div>
        <div class="constructor-type">Constructor</div>
        <div class="total-points">Total Points: ${constructor.points}</div>
        <div class="divider"></div>
        <div class="team-drivers-title">Team Drivers</div>
        <div class="driver-list">
    `;
    
    // Añadir cada piloto
    teamDrivers.forEach(driver => {
        // Extraer solo el apellido del nombre completo
        const driverNames = driver.name.split(' ');
        const lastName = driverNames[driverNames.length - 1].toLowerCase();
        
        // Normalizar el apellido para quitar caracteres especiales
        const normalizedLastName = lastName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Elimina acentos y diéresis
        
        const driverImagePath = `images/drivers/${normalizedLastName}.png`;
        
        detailsHTML += `
            <div class="driver-item">
                <div class="driver-logo">
                    <img src="${driverImagePath}" alt="${driver.name}">
                </div>
                <div class="driver-name">${driver.name}</div>
                <div class="driver-points">${driver.points} pts</div>
            </div>
        `;
    });
    
    // Cerrar la lista de pilotos y añadir total
    detailsHTML += `
        </div>
        <div class="total-team-points">
            <div class="total-team-label">Total Team Points: </div>
            <div class="total-team-value">${constructor.points}</div>
        </div>
    `;
    
    // Actualizar el contenido
    detailsContainer.innerHTML = detailsHTML;
    
    // Mostrar el overlay y el modal
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('constructor-modal').style.display = 'block';
    
    // Evitar scroll en el body
    document.body.style.overflow = 'hidden';
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