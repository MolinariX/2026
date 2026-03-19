document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const currentYear = 2026;
    let carrerasF1 = [];
    
    // Mapa de colores para cada GP (colores vibrantes y únicos)
    const coloresGP = {
        'australia': '#FFA500',      // Naranja (tierra naranja australiana)
        'china': '#DC143C',          // Rojo carmesí  
        'japan': '#FF1493',          // Rosa fuerte (flores de cerezo)
        'bahrain': '#FFD700',        // Dorado (desierto)
        'saudi-arabia': '#00CED1',   // Turquesa (Mar Rojo)
        'miami': '#FF69B4',          // Rosa Miami
        'canada': '#FF0000',         // Rojo brillante
        'monaco': '#0047AB',         // Azul cobalto (yates del puerto)
        'spain-barcelona': '#FFFF00', // Amarillo (sol español)
        'austria': '#8B0000',        // Rojo oscuro (Red Bull)
        'uk': '#006400',             // Verde oscuro (Silverstone)
        'belgium': '#FF4500',        // Rojo naranja
        'hungary': '#32CD32',        // Verde lima
        'netherlands': '#FF8C00',    // Naranja oscuro (bandera holandesa)
        'italy': '#228B22',          // Verde bosque (Monza)
        'spain-madrid': '#9400D3',   // Violeta oscuro (NUEVO circuito)
        'azerbaijan': '#4169E1',     // Azul real (Caspian)
        'singapore': '#FF1493',      // Magenta (luces nocturnas)
        'usa-austin': '#1E90FF',     // Azul Dodger (Texas)
        'mexico': '#00FF00',         // Verde brillante
        'brazil': '#FFD700',         // Amarillo dorado (bandera Brasil)
        'las-vegas': '#8A2BE2',      // Violeta azulado (luces de Vegas)
        'qatar': '#800080',          // Púrpura (lujo del desierto)
        'abu-dhabi': '#FF6347'       // Tomate (atardecer)
    };
    
    // Inicializar la aplicación
    initApp();
    
    // Función principal de inicialización
    function initApp() {
        try {
            // Cargar los datos de carreras
            carrerasF1 = obtenerCalendarioF12026();
            
            // Generar el calendario
            generarCalendario();
        } catch (error) {
            console.error('Error al inicializar la aplicación:', error);
            document.getElementById('calendario').innerHTML = `
                <div class="error-message">
                    <h3>Error al cargar los datos</h3>
                    <p>${error.message}</p>
                    <p>Por favor, intente nuevamente más tarde.</p>
                </div>
            `;
        }
    }
    
    // Datos del calendario F1 2026 - Temporada oficial
    function obtenerCalendarioF12026() {
        return [
            {
                id: 'australia-2026',
                nombre: 'GP de Australia',
                circuito: 'Albert Park Circuit',
                pais: 'Australia',
                bandera: 'https://flagcdn.com/w80/au.png',
                color: coloresGP['australia'],
                fechaInicio: new Date(2026, 2, 6), // 6 de marzo
                fechaFin: new Date(2026, 2, 8), // 8 de marzo
                horarioCarrera: '8 Marzo - 01:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 6/03 - 23:30 (5/03 ARG)', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Sábado 7/03 - 03:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 7/03 - 23:30 (6/03 ARG)', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Domingo 8/03 - 03:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 8/03 - 01:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'china-2026',
                nombre: 'GP de China',
                circuito: 'Shanghai International Circuit',
                pais: 'China',
                bandera: 'https://flagcdn.com/w80/cn.png',
                color: coloresGP['china'],
                fechaInicio: new Date(2026, 2, 13), // 13 de marzo
                fechaFin: new Date(2026, 2, 15), // 15 de marzo
                horarioCarrera: '15 Marzo - 04:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 13/03 - 06:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación Sprint', horario: 'Viernes 13/03 - 10:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera Sprint', horario: 'Sábado 14/03 - 06:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 14/03 - 10:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 15/03 - 04:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'japan-2026',
                nombre: 'GP de Japón',
                circuito: 'Suzuka International Racing Course',
                pais: 'Japón',
                bandera: 'https://flagcdn.com/w80/jp.png',
                color: coloresGP['japan'],
                fechaInicio: new Date(2026, 2, 27), // 27 de marzo
                fechaFin: new Date(2026, 2, 29), // 29 de marzo
                horarioCarrera: '29 Marzo - 02:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 27/03 - 22:30 (26/03 ARG)', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Sábado 28/03 - 02:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 28/03 - 22:30 (27/03 ARG)', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Domingo 29/03 - 02:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 29/03 - 02:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'bahrain-2026',
                nombre: 'GP de Bahrein',
                circuito: 'Bahrain International Circuit',
                pais: 'Bahrein',
                bandera: 'https://flagcdn.com/w80/bh.png',
                color: coloresGP['bahrain'],
                fechaInicio: new Date(2026, 3, 10), // 10 de abril
                fechaFin: new Date(2026, 3, 12), // 12 de abril
                horarioCarrera: '12 Abril - 12:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 10/04 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 10/04 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 11/04 - 09:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 11/04 - 13:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 12/04 - 12:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'saudi-arabia-2026',
                nombre: 'GP de Arabia Saudita',
                circuito: 'Jeddah Corniche Circuit',
                pais: 'Arabia Saudita',
                bandera: 'https://flagcdn.com/w80/sa.png',
                color: coloresGP['saudi-arabia'],
                fechaInicio: new Date(2026, 3, 17), // 17 de abril
                fechaFin: new Date(2026, 3, 19), // 19 de abril
                horarioCarrera: '19 Abril - 15:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 17/04 - 11:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 17/04 - 15:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 18/04 - 12:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 18/04 - 16:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 19/04 - 15:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'miami-2026',
                nombre: 'GP de Miami',
                circuito: 'Miami International Autodrome',
                pais: 'Estados Unidos',
                bandera: 'https://flagcdn.com/w80/us.png',
                color: coloresGP['miami'],
                fechaInicio: new Date(2026, 4, 1), // 1 de mayo
                fechaFin: new Date(2026, 4, 3), // 3 de mayo
                horarioCarrera: '3 Mayo - 17:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 1/05 - 14:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación Sprint', horario: 'Viernes 1/05 - 18:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera Sprint', horario: 'Sábado 2/05 - 13:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 2/05 - 17:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 3/05 - 17:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'canada-2026',
                nombre: 'GP de Canadá',
                circuito: 'Circuit Gilles Villeneuve',
                pais: 'Canadá',
                bandera: 'https://flagcdn.com/w80/ca.png',
                color: coloresGP['canada'],
                fechaInicio: new Date(2026, 4, 22), // 22 de mayo
                fechaFin: new Date(2026, 4, 24), // 24 de mayo
                horarioCarrera: '24 Mayo - 15:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 22/05 - 14:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación Sprint', horario: 'Viernes 22/05 - 18:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera Sprint', horario: 'Sábado 23/05 - 13:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 23/05 - 17:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 24/05 - 15:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'monaco-2026',
                nombre: 'GP de Mónaco',
                circuito: 'Circuit de Monaco',
                pais: 'Mónaco',
                bandera: 'https://flagcdn.com/w80/mc.png',
                color: coloresGP['monaco'],
                fechaInicio: new Date(2026, 5, 5), // 5 de junio
                fechaFin: new Date(2026, 5, 7), // 7 de junio
                horarioCarrera: '7 Junio - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 5/06 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 5/06 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 6/06 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 6/06 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 7/06 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'spain-barcelona-2026',
                nombre: 'GP de España (Barcelona)',
                circuito: 'Circuit de Barcelona-Catalunya',
                pais: 'España',
                bandera: 'https://flagcdn.com/w80/es.png',
                color: coloresGP['spain-barcelona'],
                fechaInicio: new Date(2026, 5, 12), // 12 de junio
                fechaFin: new Date(2026, 5, 14), // 14 de junio
                horarioCarrera: '14 Junio - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 12/06 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 12/06 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 13/06 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 13/06 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 14/06 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'austria-2026',
                nombre: 'GP de Austria',
                circuito: 'Red Bull Ring',
                pais: 'Austria',
                bandera: 'https://flagcdn.com/w80/at.png',
                color: coloresGP['austria'],
                fechaInicio: new Date(2026, 5, 26), // 26 de junio
                fechaFin: new Date(2026, 5, 28), // 28 de junio
                horarioCarrera: '28 Junio - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 26/06 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 26/06 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 27/06 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 27/06 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 28/06 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'uk-2026',
                nombre: 'GP de Gran Bretaña',
                circuito: 'Silverstone Circuit',
                pais: 'Reino Unido',
                bandera: 'https://flagcdn.com/w80/gb.png',
                color: coloresGP['uk'],
                fechaInicio: new Date(2026, 6, 3), // 3 de julio
                fechaFin: new Date(2026, 6, 5), // 5 de julio
                horarioCarrera: '5 Julio - 11:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 3/07 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación Sprint', horario: 'Viernes 3/07 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera Sprint', horario: 'Sábado 4/07 - 07:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 4/07 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 5/07 - 11:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'belgium-2026',
                nombre: 'GP de Bélgica',
                circuito: 'Circuit de Spa-Francorchamps',
                pais: 'Bélgica',
                bandera: 'https://flagcdn.com/w80/be.png',
                color: coloresGP['belgium'],
                fechaInicio: new Date(2026, 6, 17), // 17 de julio
                fechaFin: new Date(2026, 6, 19), // 19 de julio
                horarioCarrera: '19 Julio - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 17/07 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 17/07 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 18/07 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 18/07 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 19/07 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'hungary-2026',
                nombre: 'GP de Hungría',
                circuito: 'Hungaroring',
                pais: 'Hungría',
                bandera: 'https://flagcdn.com/w80/hu.png',
                color: coloresGP['hungary'],
                fechaInicio: new Date(2026, 6, 24), // 24 de julio
                fechaFin: new Date(2026, 6, 26), // 26 de julio
                horarioCarrera: '26 Julio - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 24/07 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 24/07 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 25/07 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 25/07 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 26/07 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'netherlands-2026',
                nombre: 'GP de Países Bajos',
                circuito: 'Circuit Park Zandvoort',
                pais: 'Países Bajos',
                bandera: 'https://flagcdn.com/w80/nl.png',
                color: coloresGP['netherlands'],
                fechaInicio: new Date(2026, 7, 21), // 21 de agosto
                fechaFin: new Date(2026, 7, 23), // 23 de agosto
                horarioCarrera: '23 Agosto - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 21/08 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación Sprint', horario: 'Viernes 21/08 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera Sprint', horario: 'Sábado 22/08 - 07:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 22/08 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 23/08 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'italy-2026',
                nombre: 'GP de Italia',
                circuito: 'Autodromo Nazionale Monza',
                pais: 'Italia',
                bandera: 'https://flagcdn.com/w80/it.png',
                color: coloresGP['italy'],
                fechaInicio: new Date(2026, 8, 5), // 5 de septiembre
                fechaFin: new Date(2026, 8, 7), // 7 de septiembre
                horarioCarrera: '7 Septiembre - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 5/09 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 5/09 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 6/09 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 6/09 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 7/09 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'spain-madrid-2026',
                nombre: 'GP de España (Madrid) ⭐ NUEVO',
                circuito: 'Madrid Street Circuit',
                pais: 'España',
                bandera: 'https://flagcdn.com/w80/es.png',
                color: coloresGP['spain-madrid'],
                fechaInicio: new Date(2026, 8, 11), // 11 de septiembre
                fechaFin: new Date(2026, 8, 13), // 13 de septiembre
                horarioCarrera: '13 Septiembre - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 11/09 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 11/09 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 12/09 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 12/09 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 13/09 - 10:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'azerbaijan-2026',
                nombre: 'GP de Azerbaiyán',
                circuito: 'Baku City Circuit',
                pais: 'Azerbaiyán',
                bandera: 'https://flagcdn.com/w80/az.png',
                color: coloresGP['azerbaijan'],
                fechaInicio: new Date(2026, 8, 25), // 25 de septiembre
                fechaFin: new Date(2026, 8, 27), // 27 de septiembre
                horarioCarrera: '27 Septiembre - 08:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 25/09 - 06:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 25/09 - 10:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 26/09 - 06:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 26/09 - 10:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 27/09 - 08:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'singapore-2026',
                nombre: 'GP de Singapur',
                circuito: 'Marina Bay Street Circuit',
                pais: 'Singapur',
                bandera: 'https://flagcdn.com/w80/sg.png',
                color: coloresGP['singapore'],
                fechaInicio: new Date(2026, 9, 9), // 9 de octubre
                fechaFin: new Date(2026, 9, 11), // 11 de octubre
                horarioCarrera: '11 Octubre - 09:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 9/10 - 06:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación Sprint', horario: 'Viernes 9/10 - 10:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera Sprint', horario: 'Sábado 10/10 - 06:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 10/10 - 10:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 11/10 - 09:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'usa-austin-2026',
                nombre: 'GP de Estados Unidos',
                circuito: 'Circuit of the Americas',
                pais: 'Estados Unidos',
                bandera: 'https://flagcdn.com/w80/us.png',
                color: coloresGP['usa-austin'],
                fechaInicio: new Date(2026, 9, 23), // 23 de octubre
                fechaFin: new Date(2026, 9, 25), // 25 de octubre
                horarioCarrera: '25 Octubre - 16:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 23/10 - 14:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 23/10 - 18:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 24/10 - 13:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 24/10 - 17:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 25/10 - 16:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'mexico-2026',
                nombre: 'GP de México',
                circuito: 'Autódromo Hermanos Rodríguez',
                pais: 'México',
                bandera: 'https://flagcdn.com/w80/mx.png',
                color: coloresGP['mexico'],
                fechaInicio: new Date(2026, 9, 30), // 30 de octubre
                fechaFin: new Date(2026, 10, 1), // 1 de noviembre
                horarioCarrera: '1 Noviembre - 17:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 30/10 - 14:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 30/10 - 18:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 31/10 - 13:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 31/10 - 17:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 1/11 - 17:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'brazil-2026',
                nombre: 'GP de Brasil',
                circuito: 'Autódromo José Carlos Pace (Interlagos)',
                pais: 'Brasil',
                bandera: 'https://flagcdn.com/w80/br.png',
                color: coloresGP['brazil'],
                fechaInicio: new Date(2026, 10, 6), // 6 de noviembre
                fechaFin: new Date(2026, 10, 8), // 8 de noviembre
                horarioCarrera: '8 Noviembre - 15:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 6/11 - 12:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 6/11 - 16:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 7/11 - 11:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 7/11 - 15:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 8/11 - 15:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'las-vegas-2026',
                nombre: 'GP de Las Vegas',
                circuito: 'Las Vegas Street Circuit',
                pais: 'Estados Unidos',
                bandera: 'https://flagcdn.com/w80/us.png',
                color: coloresGP['las-vegas'],
                fechaInicio: new Date(2026, 10, 20), // 20 de noviembre
                fechaFin: new Date(2026, 10, 22), // 22 de noviembre
                horarioCarrera: '23 Noviembre - 03:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 20/11 - 01:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 20/11 - 05:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 21/11 - 01:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 21/11 - 05:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 22/11 - 03:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'qatar-2026',
                nombre: 'GP de Qatar',
                circuito: 'Lusail International Circuit',
                pais: 'Qatar',
                bandera: 'https://flagcdn.com/w80/qa.png',
                color: coloresGP['qatar'],
                fechaInicio: new Date(2026, 10, 27), // 27 de noviembre
                fechaFin: new Date(2026, 10, 29), // 29 de noviembre
                horarioCarrera: '29 Noviembre - 13:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 27/11 - 10:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 27/11 - 14:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 28/11 - 11:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 28/11 - 15:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 29/11 - 13:00', ganador: '', ganadorBandera: null }
                ]
            },
            {
                id: 'abu-dhabi-2026',
                nombre: 'GP de Abu Dhabi',
                circuito: 'Yas Marina Circuit',
                pais: 'Emiratos Árabes Unidos',
                bandera: 'https://flagcdn.com/w80/ae.png',
                color: coloresGP['abu-dhabi'],
                fechaInicio: new Date(2026, 11, 4), // 4 de diciembre
                fechaFin: new Date(2026, 11, 6), // 6 de diciembre
                horarioCarrera: '6 Diciembre - 10:00 (Argentina)',
                enlace: 'https://www.formula1.com',
                ganador: null,
                sesiones: [
                    { nombre: 'Práctica Libre 1', horario: 'Viernes 4/12 - 07:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 2', horario: 'Viernes 4/12 - 11:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Práctica Libre 3', horario: 'Sábado 5/12 - 08:30', ganador: '', ganadorBandera: '' },
                    { nombre: 'Clasificación', horario: 'Sábado 5/12 - 12:00', ganador: '', ganadorBandera: '' },
                    { nombre: 'Carrera', horario: 'Domingo 6/12 - 10:00', ganador: '', ganadorBandera: null }
                ]
            }
        ];
    }
    
    function generarCalendario() {
        const calendarContainer = document.getElementById('calendario');
        calendarContainer.innerHTML = ''; // Limpiar el contenedor
        
        // Para cada mes desde enero (0) hasta diciembre (11)
        for (let mes = 0; mes < 12; mes++) {
            const mesElement = document.createElement('div');
            mesElement.className = 'mes';
            
            // Crear encabezado del mes
            const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const mesHeader = document.createElement('div');
            mesHeader.className = 'mes-header';
            mesHeader.textContent = nombresMeses[mes];
            mesElement.appendChild(mesHeader);
            
            // Crear contenedor de días
            const diasContainer = document.createElement('div');
            diasContainer.className = 'dias';
            
            // Agregar nombres de los días (Lunes a Domingo)
            const nombresDias = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
            nombresDias.forEach(dia => {
                const diaNombre = document.createElement('div');
                diaNombre.className = 'nombre-dia';
                diaNombre.textContent = dia;
                diasContainer.appendChild(diaNombre);
            });
            
            // Obtener primer día del mes (ajustado a Lunes=0)
            let primerDia = new Date(currentYear, mes, 1).getDay();
            primerDia = (primerDia === 0) ? 6 : primerDia - 1; // Ajustar: Domingo=0 -> 6, Lunes=1 -> 0, etc.
            
            const totalDias = new Date(currentYear, mes + 1, 0).getDate();
            
            // Agregar días en blanco para ajustar el primer día
            for (let i = 0; i < primerDia; i++) {
                const diaVacio = document.createElement('div');
                diaVacio.className = 'fecha';
                diasContainer.appendChild(diaVacio);
            }
            
            // Agregar los días del mes
            for (let dia = 1; dia <= totalDias; dia++) {
                const fechaActual = new Date(currentYear, mes, dia);
                
                // Buscar si hay una carrera hoy
                const carrera = carrerasF1.find(c => 
                    fechaEnRango(fechaActual, c.fechaInicio, c.fechaFin)
                );

                // Determinar si debemos empezar un bloque de carrera hoy
                // Es inicio si: empieza hoy O (es el día 1 del mes y la carrera ya empezó)
                const esInicioDeBloque = carrera && (
                    fechaActual.getTime() === carrera.fechaInicio.getTime() || 
                    (dia === 1)
                );

                if (esInicioDeBloque) {
                    // Calcular cuánto dura este bloque
                    // Limitado por: fin de carrera, fin de mes, y fin de SEMANA (columna 7)
                    let colEnSemana = (fechaActual.getDay() === 0) ? 7 : fechaActual.getDay(); // L=1, D=7
                    let diasHastaFinSemana = 7 - colEnSemana + 1;
                    
                    let duracion = 0;
                    let tempFecha = new Date(fechaActual);
                    while (tempFecha <= carrera.fechaFin && tempFecha.getMonth() === mes && duracion < diasHastaFinSemana) {
                        duracion++;
                        tempFecha.setDate(tempFecha.getDate() + 1);
                    }

                    // Crear el elemento que ocupa varios días
                    const fechaElement = document.createElement('div');
                    fechaElement.className = 'fecha fecha-carrera';
                    fechaElement.style.gridColumn = `span ${duracion}`;
                    fechaElement.style.backgroundColor = carrera.color || '#e10600';
                    fechaElement.setAttribute('data-carrera', carrera.id);
                    
                    // Contenedor de números de día
                    const numerosContenedor = document.createElement('div');
                    numerosContenedor.className = 'carrera-dias-numeros';
                    for (let n = 0; n < duracion; n++) {
                        const num = document.createElement('span');
                        num.textContent = dia + n;
                        numerosContenedor.appendChild(num);
                    }
                    fechaElement.appendChild(numerosContenedor);

                    // Nombre del GP
                    const nombreGP = document.createElement('div');
                    nombreGP.className = 'carrera-nombre-texto';
                    nombreGP.innerHTML = `
                        <div class="gp-main-name">GRAN PREMIO DE</div>
                        <div class="gp-sub-name">${carrera.pais.toUpperCase()} <img src="${carrera.bandera}" class="gp-flag-mini"></div>
                    `;
                    fechaElement.appendChild(nombreGP);

                    // Tooltip logic
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    const gpInfo = document.createElement('div');
                    gpInfo.className = 'gp-info';
                    gpInfo.innerHTML = `
                        <strong>${carrera.nombre}</strong>
                        <p>${formatearFecha(carrera.fechaInicio)} - ${formatearFecha(carrera.fechaFin)}</p>
                        <p>${carrera.circuito}</p>
                        <img src="${carrera.bandera}" alt="Bandera" style="width: 30px; margin-top: 5px;">
                    `;
                    
                    if (carrera.sesiones && carrera.sesiones.length > 0) {
                        const sesionesContainer = document.createElement('div');
                        sesionesContainer.className = 'sesiones-container';
                        const list = document.createElement('ul');
                        list.className = 'sesiones-list';
                        carrera.sesiones.forEach(s => {
                            const li = document.createElement('li');
                            li.textContent = `${s.nombre.replace('Práctica Libre ', 'FP')}: ${s.horario}`;
                            list.appendChild(li);
                        });
                        sesionesContainer.appendChild(list);
                        gpInfo.appendChild(sesionesContainer);
                    }
                    
                    tooltip.appendChild(gpInfo);
                    fechaElement.appendChild(tooltip);

                    fechaElement.addEventListener('click', () => mostrarModal(carrera));
                    diasContainer.appendChild(fechaElement);
                    
                    dia += (duracion - 1); // Adelantar el bucle
                } else {
                    // Día normal
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
    
    // Verificar si una fecha está dentro de un rango
    function fechaEnRango(fecha, inicio, fin) {
        return fecha >= inicio && fecha <= fin;
    }
    
    // Formatear fecha para mostrar
    function formatearFecha(fecha) {
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('es-ES', { month: 'short' });
        return `${dia} ${mes}`;
    }
    
    // Mostrar el modal con la información de la carrera
    function mostrarModal(carrera) {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        const winnerInfo = document.getElementById('winner-info');
        const closeButton = document.querySelector('.close-button');
        
        // Llenar contenido del modal
        modalContent.innerHTML = `
            <h2>${carrera.nombre}</h2>
            <p><strong>Circuito:</strong> ${carrera.circuito}</p>
            <p><strong>País:</strong> ${carrera.pais} <img src="${carrera.bandera}" alt="Bandera de ${carrera.pais}" style="width: 30px; vertical-align: middle;"></p>
            <p><strong>Fechas:</strong> ${formatearFecha(carrera.fechaInicio)} - ${formatearFecha(carrera.fechaFin)}</p>
        `;
        
        // Agregar sesiones al modal si existen
if (carrera.sesiones && carrera.sesiones.length > 0) {
    let sesionesHTML = '<div class="sesiones-modal"><h3>Horarios:</h3><ul>';
    
    carrera.sesiones.forEach(sesion => {
        let sesionInfo = `<li><strong>${sesion.nombre}:</strong> ${sesion.horario}`;
        
        // Agregar información del ganador si existe
        if (sesion.ganador) {
            sesionInfo += ` - <span class="winner-name">${sesion.ganador}`;
            
            // Agregar bandera del ganador si existe
            if (sesion.ganadorBandera) {
                sesionInfo += ` <img src="${sesion.ganadorBandera}" alt="Bandera" class="ganador-bandera-modal">`;
            }
            
            sesionInfo += `</span>`;
        }
        
        sesionInfo += `</li>`;
        sesionesHTML += sesionInfo;
    });
    
    sesionesHTML += '</ul></div>';
    modalContent.innerHTML += sesionesHTML;
} else {
    // Si no hay sesiones definidas, mostrar solo el horario de carrera
    modalContent.innerHTML += `<p><strong>Horario de carrera:</strong> ${carrera.horarioCarrera}</p>`;
}
        
        // Agregar enlace
        modalContent.innerHTML += `<p><a href="${carrera.enlace}" target="_blank" style="color: var(--primary);">Ver detalles en Formula 1</a></p>`;
        
        // Verificar si hay un ganador en los datos de la carrera
        if (carrera.ganador) {
            let ganadorHTML = '';
            
            // Agregar imagen del ganador primero
            if (carrera.ganadorImagen) {
                ganadorHTML += `<div class="ganador-imagen-container">
                    <img src="${carrera.ganadorImagen}" alt="${carrera.ganador}" class="ganador-imagen-modal">
                </div>`;
            }
            
            // Agregar nombre y bandera después de la imagen
            ganadorHTML += `<span class="winner-name">${carrera.ganador}`;
            
            // Agregar bandera del país del ganador al lado del nombre
            if (carrera.ganadorBandera) {
                ganadorHTML += ` <img src="${carrera.ganadorBandera}" alt="Bandera" class="ganador-bandera-modal">`;
            }
            
            ganadorHTML += `</span>`;
            
            winnerInfo.innerHTML = ganadorHTML;
        } else {
            winnerInfo.innerHTML = `<span class="empty">Aún no hay ganador registrado</span>`;
        }
        
        // Mostrar el modal
        modal.style.display = 'block';
        
        // Configurar el botón de cerrar
        closeButton.onclick = function() {
            modal.style.display = 'none';
        };
        
        // Cerrar el modal cuando se hace clic fuera de él
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
});
