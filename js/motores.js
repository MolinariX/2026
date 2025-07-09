// ========================================================================
// ===== REEMPLAZA TODO TU ARCHIVO JS/MOTORES.JS CON ESTE CÓDIGO =====
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- BASE DE DATOS ESTRUCTURADA Y CORREGIDA ---
    const suppliers = [
        {
            group: 'ferrari',
            color: 'var(--ferrari)',
            mainLogo: 'images/logos/ferrari.png', // Logo del proveedor para el centro
            teams: [
                { id: 'ferrari-team', logo: 'images/logos/ferrari.png' }, // El equipo de fábrica
                { id: 'haas', logo: 'images/logos/haas.png' },
                { id: 'cadillac', logo: 'images/logos/cadillac.png' }
            ]
        },
        {
            group: 'mercedes',
            color: 'var(--mercedes)',
            mainLogo: 'images/logos/mercedes.png',
            teams: [
                { id: 'mercedes-team', logo: 'images/logos/mercedes.png' }, // El equipo de fábrica
                { id: 'mclaren', logo: 'images/logos/mclaren.png' },
                { id: 'williams', logo: 'images/logos/williams.png' },
                { id: 'alpine', logo: 'images/logos/alpine.png' }
            ]
        },
        {
            group: 'rbpt',
            color: 'var(--rbpt)',
            mainLogo: 'images/logos/rbpt-ford.png',
            teams: [
                { id: 'redbull', logo: 'images/logos/redbull.png' },
                { id: 'rb', logo: 'images/logos/rb.png' }
            ]
        },
        {
            group: 'honda',
            color: 'var(--honda)',
            mainLogo: 'images/logos/honda.png',
            teams: [
                { id: 'aston-martin', logo: 'images/logos/aston-martin.png' }
            ]
        },
        {
            group: 'audi',
            color: 'var(--audi)',
            mainLogo: 'images/logos/audi.png',
            teams: [
                { id: 'audi-team', logo: 'images/logos/audi.png' } // El equipo de fábrica
            ]
        }
    ];

    const wheel = document.getElementById('engine-wheel');
    const centerLogoContainer = document.getElementById('center-logo-container');
    if (!wheel || !centerLogoContainer) return;

    // --- LÓGICA DE CONSTRUCCIÓN CORREGIDA ---

    // 1. Calcular el total de EQUIPOS (no de proveedores) para dividir el círculo
    const totalTeamsOnGrid = suppliers.reduce((acc, s) => acc + s.teams.length, 0);
    let gradientStops = [];
    let currentAngle = 0;
    let allTeamLogos = [];

    suppliers.forEach(supplier => {
        const teamCount = supplier.teams.length;
        if (teamCount === 0) return; // No crear una porción si no hay equipos

        const angleShare = (teamCount / totalTeamsOnGrid) * 360;
        gradientStops.push(`${supplier.color} ${currentAngle}deg ${currentAngle + angleShare}deg`);
        
        // Posicionar los logos de los EQUIPOS dentro de su porción de color
        const angleStep = angleShare / (teamCount + 1);
        supplier.teams.forEach((team, index) => {
            const angle = currentAngle + angleStep * (index + 1);
            createLogoElement(team.logo, supplier.group, angle, team.id);
        });

        currentAngle += angleShare;
    });

    wheel.style.background = `conic-gradient(${gradientStops.join(', ')})`;

    function createLogoElement(logoSrc, group, angle, id) {
        const logoDiv = document.createElement('div');
        logoDiv.className = `team-logo logo-${id}`;
        logoDiv.dataset.group = group;

        const img = document.createElement('img');
        img.src = logoSrc;
        
        const radius = 42;
        const angleRad = (angle - 90) * (Math.PI / 180);
        const x = 50 + radius * Math.cos(angleRad);
        const y = 50 + radius * Math.sin(angleRad);

        logoDiv.style.left = `${x}%`;
        logoDiv.style.top = `${y}%`;
        logoDiv.style.transform = `translate(-50%, -50%)`;

        logoDiv.appendChild(img);
        wheel.appendChild(logoDiv);
        allTeamLogos.push(logoDiv);
    }
    
    // --- LÓGICA DE INTERACTIVIDAD ---
    
    allTeamLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => handleMouseEnter(logo.dataset.group));
        logo.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseEnter(group) {
        wheel.classList.add('is-hovering');
        wheel.style.background = `radial-gradient(circle, ${getComputedStyle(document.documentElement).getPropertyValue('--'+group)}90 0%, #101010 70%)`;

        allTeamLogos.forEach(l => {
            if (l.dataset.group === group) {
                l.classList.add('highlight');
            }
        });
        
        const mainLogoData = suppliers.find(s => s.group === group);
        centerLogoContainer.innerHTML = `<img src="${mainLogoData.mainLogo}" alt="${group}" />`;
        
        wheel.classList.add(`group-${group}-active`);
    }

    function handleMouseLeave() {
        wheel.classList.remove('is-hovering');
        wheel.style.background = `conic-gradient(${gradientStops.join(', ')})`;
        
        allTeamLogos.forEach(l => l.classList.remove('highlight'));
        centerLogoContainer.innerHTML = '';
        suppliers.forEach(s => wheel.classList.remove(`group-${s.group}-active`));
    }
});