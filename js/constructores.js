// Configuración de constructores y sus datos visuales
const constructores = [
    {
        id: 'mclaren',
        name: 'McLaren',
        color: 'mclaren',
        logo: 'images/logos/mclaren.png'
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

// Punto de entrada principal
document.addEventListener('DOMContentLoaded', () => {
    fetchConstructorsData();
    
    // Actualizar datos cada 30 minutos
    setInterval(fetchConstructorsData, 30 * 60 * 1000);
});

// Función para obtener datos de la API
async function fetchConstructorsData() {
    try {
        const currentYear = new Date().getFullYear(); // Obtener año actual (2025)
        
        // Verificar si hay datos para la temporada actual
        const response = await fetch(`https://ergast.com/api/f1/${currentYear}/constructorStandings.json`);
        const data = await response.json();
        
        const standings = data.MRData.StandingsTable.StandingsLists;
        
        if (standings.length > 0) {
            // Hay datos para la temporada actual
            const constructorStandings = standings[0].ConstructorStandings;
            
            // Procesar los datos
            const processedData = processApiData(constructorStandings);
            
            // Actualizar la tabla
            updateTable(processedData);
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
        console.error('Error al obtener datos:', error);
        
        // Si hay error, mostrar tabla vacía para el inicio de temporada
        showEmptyStandings();
        
        // Ocultar spinner
        document.getElementById('spinner').style.display = 'none';
    }
}

// Mostrar clasificación vacía para inicio de temporada
function showEmptyStandings() {
    // Crear datos con todos los equipos en cero puntos
    const emptyData = constructores.map((constructor, index) => {
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
    updateTable(emptyData);
    
    // Mostrar mensaje de inicio de temporada
    const statusElement = document.createElement('div');
    statusElement.id = 'season-status';
    statusElement.className = 'season-status';
    statusElement.innerHTML = '<p>Temporada 2025 - Aún no ha comenzado</p>';
    
    // Insertar antes de la tabla
    const tableContainer = document.querySelector('.standings-container');
    const existingStatus = document.getElementById('season-status');
    
    if (!existingStatus && tableContainer) {
        tableContainer.insertBefore(statusElement, tableContainer.firstChild);
    }
}

// Procesar datos de la API
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

// Actualizar la hora de última actualización
function updateLastUpdated() {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    document.getElementById('last-update').textContent = formattedDate;
}

// Función para animar cambios en la tabla
function animateTableChanges(oldData, newData) {
    // Implementación futura para animaciones suaves
}