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
        // Usamos la API gratuita de Ergast para datos de F1
        // Nota: Esta API no tiene datos del 2025 (usamos 2023 como ejemplo)
        // En un entorno real, deberías usar una API que contenga datos actuales
        const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
        const data = await response.json();
        
        // Procesar los datos
        const constructorStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        
        // Convertir datos de la API al formato que necesitamos
        const processedData = processApiData(constructorStandings);
        
        // Actualizar la tabla
        updateTable(processedData);
        
        // Actualizar la hora de última actualización
        updateLastUpdated();
        
        // Ocultar spinner
        document.getElementById('spinner').style.display = 'none';
    } catch (error) {
        console.error('Error al obtener datos:', error);
        
        // Para fines de demostración, usar datos de ejemplo si la API falla
        useExampleData();
        
        // Ocultar spinner
        document.getElementById('spinner').style.display = 'none';
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
        'williams': 'williams',
        'sauber': 'stake'
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

// Usar datos de ejemplo para demostración
function useExampleData() {
    const exampleData = [
        { id: 'mclaren', name: 'McLaren', points: 666, position: 1 },
        { id: 'ferrari', name: 'Ferrari', points: 652, position: 2 },
        { id: 'red_bull', name: 'Red Bull Racing', points: 589, position: 3 },
        { id: 'mercedes', name: 'Mercedes', points: 468, position: 4 },
        { id: 'aston_martin', name: 'Aston Martin', points: 94, position: 5 },
        { id: 'alpine', name: 'Alpine', points: 65, position: 6 },
        { id: 'haas', name: 'Haas', points: 58, position: 7 },
        { id: 'racing_bulls', name: 'Racing Bulls', points: 46, position: 8 },
        { id: 'williams', name: 'Williams', points: 17, position: 9 },
        { id: 'stake', name: 'Stake', points: 4, position: 10 }
    ];
    
    // Enriquecer los datos con información visual
    const processedData = exampleData.map(item => {
        const constructor = constructores.find(c => c.id === item.id);
        return {
            ...item,
            color: constructor.color,
            logo: constructor.logo
        };
    });
    
    updateTable(processedData);
    updateLastUpdated();
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