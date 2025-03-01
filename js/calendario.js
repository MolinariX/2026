document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const currentYear = 2025;
    let carrerasF1 = [];
    
    // Inicializar la aplicación
    initApp();
    
    // Función principal de inicialización
    function initApp() {
        try {
            // Cargar los datos de carreras
            carrerasF1 = obtenerCalendarioF12025();
            
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
    
    // Datos reales del calendario F1 2025 con ganadores incluidos
    function obtenerCalendarioF12025() {
        return [
            {
                id: 'bahrain-2025',
                nombre: 'GP de Bahrein',
                circuito: 'Bahrain International Circuit',
                pais: 'Bahrain',
                bandera: 'https://flagcdn.com/w80/bh.png',
                fechaInicio: new Date(2025, 3, 11), // 11 de abril
                fechaFin: new Date(2025, 3, 13), // 13 de abril
                horarioCarrera: '13 Abril - 12:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052048',
                ganador: null // Aún sin ganador
            },
            {
                id: 'saudi-arabia-2025',
                nombre: 'GP de Arabia Saudita',
                circuito: 'Jeddah Corniche Circuit',
                pais: 'Saudi Arabia',
                bandera: 'https://flagcdn.com/w80/sa.png',
                fechaInicio: new Date(2025, 3, 18), // 18 de abril
                fechaFin: new Date(2025, 3, 20), // 20 de abril
                horarioCarrera: '20 Abril - 14:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052049',
                ganador: null // Aún sin ganador
            },
            {
                id: 'australia-2025',
                nombre: 'GP de Australia',
                circuito: 'Albert Park Circuit',
                pais: 'Australia',
                bandera: 'https://flagcdn.com/w80/au.png',
                fechaInicio: new Date(2025, 2, 13), // 13 de marzo
                fechaFin: new Date(2025, 2, 16), // 16 de marzo
                horarioCarrera: '16 Marzo - 01:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052045',
                ganador: null // Aún sin ganador
            },
            {
                id: 'japan-2025',
                nombre: 'GP de Japón',
                circuito: 'Suzuka International Racing Course',
                pais: 'Japan',
                bandera: 'https://flagcdn.com/w80/jp.png',
                fechaInicio: new Date(2025, 3, 3), // 3 de abril
                fechaFin: new Date(2025, 3, 6), // 6 de abril
                horarioCarrera: '6 Abril - 02:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052047',
                ganador: null // Aún sin ganador
            },
            {
                id: 'china-2025',
                nombre: 'GP de China',
                circuito: 'Shanghai International Circuit',
                pais: 'China',
                bandera: 'https://flagcdn.com/w80/cn.png',
                fechaInicio: new Date(2025, 2, 21), // 21 de marzo
                fechaFin: new Date(2025, 2, 23), // 23 de marzo
                horarioCarrera: '23 Marzo - 04:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052046',
                ganador: null // Aún sin ganador
            },
            {
                id: 'miami-2025',
                nombre: 'GP de Miami',
                circuito: 'Miami International Autodrome',
                pais: 'USA',
                bandera: 'https://flagcdn.com/w80/us.png',
                fechaInicio: new Date(2025, 4, 2), // 2 de mayo
                fechaFin: new Date(2025, 4, 4), // 4 de mayo
                horarioCarrera: '4 Mayo - 17:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052050',
                ganador: null // Aún sin ganador
            },
            {
                id: 'emilia-romagna-2025',
                nombre: 'GP de Emilia Romagna',
                circuito: 'Autodromo Enzo e Dino Ferrari',
                pais: 'Italy',
                bandera: 'https://flagcdn.com/w80/it.png',
                fechaInicio: new Date(2025, 4, 16), // 16 de mayo
                fechaFin: new Date(2025, 4, 18), // 18 de mayo
                horarioCarrera: '18 Mayo - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052051',
                ganador: null // Aún sin ganador
            },
            {
                id: 'monaco-2025',
                nombre: 'GP de Mónaco',
                circuito: 'Circuit de Monaco',
                pais: 'Monaco',
                bandera: 'https://flagcdn.com/w80/mc.png',
                fechaInicio: new Date(2025, 4, 23), // 23 de mayo
                fechaFin: new Date(2025, 4, 25), // 25 de mayo
                horarioCarrera: '25 Mayo - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/f1/circuito/_/id/600052052',
                ganador: null // Aún sin ganador
            },
            {
                id: 'canada-2025',
                nombre: 'GP de Canadá',
                circuito: 'Circuit Gilles Villeneuve',
                pais: 'Canada',
                bandera: 'https://flagcdn.com/w80/ca.png',
                fechaInicio: new Date(2025, 5, 13), // 13 de junio
                fechaFin: new Date(2025, 5, 15), // 15 de junio
                horarioCarrera: '15 Junio - 15:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052054',
                ganador: null // Aún sin ganador
            },
            {
                id: 'spain-2025',
                nombre: 'GP de España',
                circuito: 'Circuit de Barcelona-Catalunya',
                pais: 'Spain',
                bandera: 'https://flagcdn.com/w80/es.png',
                fechaInicio: new Date(2025, 4, 30), // 30 de mayo
                fechaFin: new Date(2025, 5, 1), // 1 de junio
                horarioCarrera: '01 Junio - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052053',
                ganador: null // Aún sin ganador
            },
            {
                id: 'austria-2025',
                nombre: 'GP de Austria',
                circuito: 'Red Bull Ring',
                pais: 'Austria',
                bandera: 'https://flagcdn.com/w80/at.png',
                fechaInicio: new Date(2025, 5, 27), // 27 de junio
                fechaFin: new Date(2025, 5, 29), // 29 de junio
                horarioCarrera: '29 Julio - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052055',
                ganador: null // Aún sin ganador
            },
            {
                id: 'uk-2025',
                nombre: 'GP de Gran Bretaña',
                circuito: 'Silverstone Circuit',
                pais: 'Great Britain',
                bandera: 'https://flagcdn.com/w80/gb.png',
                fechaInicio: new Date(2025, 6, 4), // 4 de julio
                fechaFin: new Date(2025, 6, 6), // 6 de julio
                horarioCarrera: '6 Julio - 11:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052056',
                ganador: null // Aún sin ganador
            },
            {
                id: 'hungary-2025',
                nombre: 'GP de Hungría',
                circuito: 'Hungaroring',
                pais: 'Hungary',
                bandera: 'https://flagcdn.com/w80/hu.png',
                fechaInicio: new Date(2025, 7, 1), // 1 de agosto
                fechaFin: new Date(2025, 7, 3), // 3 de agosto
                horarioCarrera: '3 Julio - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052058',
                ganador: null // Aún sin ganador
            },
            {
                id: 'belgium-2025',
                nombre: 'GP de Bélgica',
                circuito: 'Circuit de Spa-Francorchamps',
                pais: 'Belgium',
                bandera: 'https://flagcdn.com/w80/be.png',
                fechaInicio: new Date(2025, 6, 25), // 25 de julio
                fechaFin: new Date(2025, 6, 27), // 27 de julio
                horarioCarrera: '27 Julio - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052057',
                ganador: null // Aún sin ganador
            },
            {
                id: 'netherlands-2025',
                nombre: 'Dutch GP',
                circuito: 'Circuit Park Zandvoort',
                pais: 'Netherlands',
                bandera: 'https://flagcdn.com/w80/nl.png',
                fechaInicio: new Date(2025, 7, 29), // 29 de agosto
                fechaFin: new Date(2025, 7, 31), // 31 de agosto
                horarioCarrera: '31 Agosto - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052059',
                ganador: null // Aún sin ganador
            },
            {
                id: 'italy-2025',
                nombre: 'GP de Italia',
                circuito: 'Autodromo Nazionale Monza',
                pais: 'Italy',
                bandera: 'https://flagcdn.com/w80/it.png',
                fechaInicio: new Date(2025, 8, 5), // 5 de septiembre
                fechaFin: new Date(2025, 8, 7), // 7 de septiembre
                horarioCarrera: '7 Septiembre - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052060',
                ganador: null // Aún sin ganador
            },
            {
                id: 'azerbaijan-2025',
                nombre: 'GP de Azerbaiyán',
                circuito: 'Baku City Circuit',
                pais: 'Azerbaijan',
                bandera: 'https://flagcdn.com/w80/az.png',
                fechaInicio: new Date(2025, 8, 19), // 19 de septiembre
                fechaFin: new Date(2025, 8, 21), // 21 de septiembre
                horarioCarrera: '21 Septiembre - 08:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052101',
                ganador: null // Aún sin ganador
            },
            {
                id: 'singapore-2025',
                nombre: 'GP de Singapur',
                circuito: 'Marina Bay Street Circuit',
                pais: 'Singapore',
                bandera: 'https://flagcdn.com/w80/sg.png',
                fechaInicio: new Date(2025, 9, 3), // 3 de octubre
                fechaFin: new Date(2025, 9, 5), // 5 de octubre
                horarioCarrera: '5 Octubre - 09:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052102',
                ganador: null // Aún sin ganador
            },
            {
                id: 'usa-2025',
                nombre: 'GP de Estados Unidos',
                circuito: 'Circuit of The Americas',
                pais: 'USA',
                bandera: 'https://flagcdn.com/w80/us.png',
                fechaInicio: new Date(2025, 9, 17), // 17 de octubre
                fechaFin: new Date(2025, 9, 19), // 19 de octubre
                horarioCarrera: '19 Octubre - 16:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052103',
                ganador: null // Aún sin ganador
            },
            {
                id: 'mexico-2025',
                nombre: 'GP de México',
                circuito: 'Autódromo Hermanos Rodríguez',
                pais: 'Mexico',
                bandera: 'https://flagcdn.com/w80/mx.png',
                fechaInicio: new Date(2025, 9, 24), // 24 de octubre
                fechaFin: new Date(2025, 9, 26), // 26 de octubre
                horarioCarrera: '26 Octubre - 17:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052104',
                ganador: null // Aún sin ganador
            },
            {
                id: 'brazil-2025',
                nombre: 'GP de Brasil',
                circuito: 'Autódromo José Carlos Pace',
                pais: 'Brazil',
                bandera: 'https://flagcdn.com/w80/br.png',
                fechaInicio: new Date(2025, 10, 7), // 7 de noviembre
                fechaFin: new Date(2025, 10, 9), // 9 de noviembre
                horarioCarrera: '9 Noviembre - 14:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052105',
                ganador: null // Aún sin ganador
            },
            {
                id: 'las-vegas-2025',
                nombre: 'GP de Las Vegas',
                circuito: 'Las Vegas Strip Circuit',
                pais: 'USA',
                bandera: 'https://flagcdn.com/w80/us.png',
                fechaInicio: new Date(2025, 10, 20), // 20 de noviembre
                fechaFin: new Date(2025, 10, 23), // 23 de noviembre
                horarioCarrera: '23 Noviembre - 01:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052106',
                ganador: null // Aún sin ganador
            },
            {
                id: 'qatar-2025',
                nombre: 'GP de Qatar',
                circuito: 'Lusail International Circuit',
                pais: 'Qatar',
                bandera: 'https://flagcdn.com/w80/qa.png',
                fechaInicio: new Date(2025, 10, 28), // 28 de noviembre
                fechaFin: new Date(2025, 10, 30), // 30 de noviembre
                horarioCarrera: '30 Noviembre - 13:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052107',
                ganador: null // Aún sin ganador
            },
            {
                id: 'abu-dhabi-2025',
                nombre: 'GP de Abu Dhabi',
                circuito: 'Yas Marina Circuit',
                pais: 'UAE',
                bandera: 'https://flagcdn.com/w80/ae.png',
                fechaInicio: new Date(2025, 11, 5), // 5 de diciembre
                fechaFin: new Date(2025, 11, 7), // 7 de diciembre
                horarioCarrera: '7 Diciembre - 10:00 (Argentina)',
                enlace: 'https://www.espn.com.ar/deporte-motor/f1/circuito/_/id/600052108',
                ganador: null // Aún sin ganador
            }
        ];
    }
    
    // Generar el calendario
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
            
            // Agregar nombres de los días
            const nombresDias = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
            nombresDias.forEach(dia => {
                const diaNombre = document.createElement('div');
                diaNombre.className = 'nombre-dia';
                diaNombre.textContent = dia;
                diasContainer.appendChild(diaNombre);
            });
            
            // Obtener primer día del mes y total de días
            const primerDia = new Date(currentYear, mes, 1).getDay();
            const totalDias = new Date(currentYear, mes + 1, 0).getDate();
            
            // Agregar días en blanco para ajustar el primer día del mes
            for (let i = 0; i < primerDia; i++) {
                const diaVacio = document.createElement('div');
                diaVacio.className = 'fecha';
                diasContainer.appendChild(diaVacio);
            }
            
            // Agregar los días del mes
            for (let dia = 1; dia <= totalDias; dia++) {
                const fechaElement = document.createElement('div');
                fechaElement.className = 'fecha';
                fechaElement.textContent = dia;
                
                // Verificar si hay carreras en este día
                const fechaActual = new Date(currentYear, mes, dia);
                
                // Buscar carreras que coincidan con esta fecha
                const carrerasEnFecha = carrerasF1.filter(carrera => {
                    return fechaEnRango(fechaActual, carrera.fechaInicio, carrera.fechaFin);
                });
                
                if (carrerasEnFecha.length > 0) {
                    // Es una fecha de carrera
                    const carrera = carrerasEnFecha[0]; // Tomamos la primera carrera si hay varias
                    fechaElement.classList.add('fecha-carrera');
                    fechaElement.setAttribute('data-carrera', carrera.id);
                    
                    // Crear tooltip con información de la carrera
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    
                    // Crear contenido del tooltip
                    const gpInfo = document.createElement('div');
                    gpInfo.className = 'gp-info';
                    
                    // Agregar nombre del GP y fechas
                    gpInfo.innerHTML = `
                        <strong>${carrera.nombre}</strong>
                        <p>${formatearFecha(carrera.fechaInicio)} - ${formatearFecha(carrera.fechaFin)}</p>
                        <p>${carrera.circuito}</p>
                        <img src="${carrera.bandera}" alt="Bandera de ${carrera.pais}">
                        <p>${carrera.horarioCarrera}</p>
                    `;
                    
                    // Verificar si hay un ganador 
                    if (carrera.ganador) {
                        const ganadorElement = document.createElement('p');
                        ganadorElement.className = 'ganador';
                        ganadorElement.textContent = `Ganador: ${carrera.ganador}`;
                        gpInfo.appendChild(ganadorElement);
                    }
                    
                    tooltip.appendChild(gpInfo);
                    fechaElement.appendChild(tooltip);
                    
                    // Agregar evento de clic para mostrar el modal
                    fechaElement.addEventListener('click', function() {
                        mostrarModal(carrera);
                    });
                }
                
                diasContainer.appendChild(fechaElement);
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
            <p><strong>Horario de carrera:</strong> ${carrera.horarioCarrera}</p>
            <p><a href="${carrera.enlace}" target="_blank" style="color: var(--primary);">Ver detalles en Formula 1</a></p>
        `;
        
        // Verificar si hay un ganador en los datos de la carrera
        if (carrera.ganador) {
            winnerInfo.innerHTML = `<span class="winner-name">${carrera.ganador}</span>`;
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