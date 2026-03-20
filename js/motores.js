// ========================================================================
// ===== LÓGICA SVG INTERACTIVA PARA EL GRÁFICO CIRCULAR DE MOTORES =====
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- BASE DE DATOS ESTRUCTURADA ---
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

    // --- GRÁFICO SVG INTERACTIVO ---

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute('viewBox', '-10 -10 120 120');
    svg.classList.add('engine-svg-chart');

    // Añadir definición de filtro glow
    const defs = document.createElementNS(svgNamespace, "defs");
    defs.innerHTML = `
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    `;
    svg.appendChild(defs);

    const totalTeamsOnGrid = suppliers.reduce((acc, s) => acc + s.teams.length, 0);
    let currentAngle = 0;

    // Dimensiones en el espacio de coordenadas (100x100 de las porciones)
    const rInner = 24;  // Radio del hueco central (donde va el logo principal)
    const rOuter = 50;  // Radio exterior
    const rMid = 37;    // Radio donde se sitúan los logos de equipo
    const logoSize = 13; // Tamaño del logo dentro del SVG

    function getPieSliceDef(startAngle, endAngle, innerRadius, outerRadius, cx, cy) {
        // Separación sutil entre las porciones para mejor estética (0.5 grados)
        const padAngle = 0.5;
        const sA = (startAngle + padAngle - 90) * Math.PI / 180;
        const eA = (endAngle - padAngle - 90) * Math.PI / 180;
        const angleDiff = endAngle - startAngle;

        const x1_outer = cx + outerRadius * Math.cos(sA);
        const y1_outer = cy + outerRadius * Math.sin(sA);
        const x2_outer = cx + outerRadius * Math.cos(eA);
        const y2_outer = cy + outerRadius * Math.sin(eA);

        const x1_inner = cx + innerRadius * Math.cos(sA);
        const y1_inner = cy + innerRadius * Math.sin(sA);
        const x2_inner = cx + innerRadius * Math.cos(eA);
        const y2_inner = cy + innerRadius * Math.sin(eA);

        const largeArcFlag = angleDiff > 180 ? 1 : 0;

        return [
            "M", x1_inner, y1_inner,
            "L", x1_outer, y1_outer,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 1, x2_outer, y2_outer,
            "L", x2_inner, y2_inner,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 0, x1_inner, y1_inner,
            "Z"
        ].join(" ");
    }

    suppliers.forEach(supplier => {
        const teamCount = supplier.teams.length;
        if (teamCount === 0) return;

        const angleShare = (teamCount / totalTeamsOnGrid) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angleShare;
        
        // El Grupo central (Gajo + Logos)
        const g = document.createElementNS(svgNamespace, "g");
        g.classList.add('engine-supplier-group');
        g.dataset.supplier = supplier.group;
        g.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        g.style.transformOrigin = '50px 50px';
        g.style.cursor = 'pointer';

        // 1. Crear el Sector (Piece of Pie)
        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute('d', getPieSliceDef(startAngle, endAngle, rInner, rOuter, 50, 50));
        
        // Obtener color desde las CSS variables si está en DOM
        const computedColor = getComputedStyle(document.documentElement).getPropertyValue(`--${supplier.group}`).trim() || supplier.color;
        
        path.setAttribute('fill', computedColor);
        path.classList.add('engine-slice');
        path.style.transition = 'all 0.4s ease';
        g.appendChild(path);

        // 2. Añadir los logos de los equipos correspondientes
        const angleStep = angleShare / (teamCount + 1);
        supplier.teams.forEach((team, index) => {
            const angle = currentAngle + angleStep * (index + 1);
            const angleRad = (angle - 90) * Math.PI / 180;
            const x = 50 + rMid * Math.cos(angleRad);
            const y = 50 + rMid * Math.sin(angleRad);

            const img = document.createElementNS(svgNamespace, "image");
            img.setAttribute('href', team.logo);
            img.setAttribute('x', x - logoSize / 2);
            img.setAttribute('y', y - logoSize / 2);
            img.setAttribute('width', logoSize);
            img.setAttribute('height', logoSize);
            img.classList.add('svg-team-logo', `svg-logo-${team.id}`);
            img.dataset.team = team.id;
            
            // Fix estético para que giren respecto a su centro visual en CSS
            // transform-origin 50% 50% funciona sobre la caja en CSS
            img.style.transformOrigin = `${x}px ${y}px`;
            
            g.appendChild(img);
        });

        // 3. Interacciones y efectos visuales majestuosos
        g.addEventListener('mouseenter', () => {
            const midAngle = startAngle + angleShare / 2;
            const midRad = (midAngle - 90) * Math.PI / 180;
            
            // El vector de desplazamiento outward (hacia afuera)
            const tx = 3 * Math.cos(midRad);
            const ty = 3 * Math.sin(midRad);

            // Resaltar el grupo actual y desvanecer los demás
            document.querySelectorAll('.engine-supplier-group').forEach(group => {
                const slice = group.querySelector('.engine-slice');
                if (group === g) {
                    group.style.transform = `translate(${tx}px, ${ty}px) scale(1.05)`;
                    group.style.opacity = '1';
                    slice.style.stroke = '#ffffff';
                    slice.style.strokeWidth = '0.5';
                    slice.setAttribute('filter', 'url(#glow)');
                } else {
                    group.style.transform = 'scale(0.92)';
                    group.style.opacity = '0.3';
                    slice.style.stroke = 'none';
                    slice.removeAttribute('filter');
                }
            });

            // Animación y recambio del logo central
            centerLogoContainer.innerHTML = `<img src="${supplier.mainLogo}" alt="${supplier.group}" />`;
            
            // Iluminar el contenedor padre sutilmente con el color del equipo
            wheel.style.boxShadow = `0 0 100px ${computedColor}80, inset 0 0 40px rgba(0,0,0,0.8)`;
        });

        g.addEventListener('mouseleave', () => {
            // Restaurar a la vista unificada general
            document.querySelectorAll('.engine-supplier-group').forEach(group => {
                group.style.transform = 'translate(0px, 0px) scale(1)';
                group.style.opacity = '1';
                const slice = group.querySelector('.engine-slice');
                slice.style.stroke = 'none';
                slice.removeAttribute('filter');
            });
            centerLogoContainer.innerHTML = '';
            wheel.style.boxShadow = '0 0 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.8)';
        });

        svg.appendChild(g);
        currentAngle += angleShare;
    });

    // Limpieza de logos viejos basados en el código anterior si existen por algún motivo
    const oldLogos = wheel.querySelectorAll('.team-logo');
    oldLogos.forEach(logo => logo.remove());
    
    // Inyectar el SVG dinámico dentro del Wheel (por detrás del logo central)
    wheel.insertBefore(svg, centerLogoContainer);

    // --- AUDIO DEL MOTOR (una sola vez por sesión) ---
    const MOTOR_AUDIO_KEY = 'f1_motor_audio_played';
    if (!sessionStorage.getItem(MOTOR_AUDIO_KEY)) {
        sessionStorage.setItem(MOTOR_AUDIO_KEY, 'true');

        const motorAudio = new Audio('audio/motor.mp3');
        motorAudio.volume = 0.7;

        const FADE_DURATION = 2; // segundos de fade-out al final

        motorAudio.addEventListener('loadedmetadata', () => {
            const duration = motorAudio.duration;
            const fadeStartTime = Math.max(0, duration - FADE_DURATION);

            // Iniciar monitoreo del tiempo para el fade-out
            const fadeInterval = setInterval(() => {
                if (motorAudio.paused || motorAudio.ended) {
                    clearInterval(fadeInterval);
                    return;
                }

                if (motorAudio.currentTime >= fadeStartTime) {
                    const remaining = duration - motorAudio.currentTime;
                    const newVolume = Math.max(0, (remaining / FADE_DURATION) * 0.7);
                    motorAudio.volume = newVolume;
                }
            }, 50); // Chequear cada 50ms para un fade suave
        });

        motorAudio.addEventListener('ended', () => {
            motorAudio.volume = 0;
        });

        motorAudio.play().catch(() => {
            // Autoplay bloqueado: reproducir al primer click
            const clickHandler = () => {
                motorAudio.play().catch(() => {});
                document.removeEventListener('click', clickHandler);
            };
            document.addEventListener('click', clickHandler);
        });
    }
});