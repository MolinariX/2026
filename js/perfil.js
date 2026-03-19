// js/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return; // Salir si no estamos en una página de perfil

    // 1. Determinar si es un perfil de piloto o de equipo basado en el nombre del archivo HTML
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Obtiene "perfil_piloto.html" o "perfil_equipo.html"
    const isDriverProfile = page.includes('piloto');

    // 2. Obtener el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // 3. Buscar los datos correctos
    const dataSource = isDriverProfile ? db.pilotos : db.equipos;
    const data = dataSource[id];

    // 4. Si encontramos datos, construir el perfil. Si no, mostrar error.
    if (data) {
        document.title = data.nombreCompleto; // Actualizar el título de la pestaña del navegador
        if (isDriverProfile) {
            renderDriverProfile(data);
        } else {
            renderTeamProfile(data);
        }
    } else {
        renderError();
    }
});

function renderDriverProfile(piloto) {
    const container = document.getElementById('profile-container');
    const edad = calcularEdad(piloto.fechaNacimiento);
    const titulos = piloto.campeonatos.length;

    container.innerHTML = `
        <div class="profile-hero" style="background-image: linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 1)), url('${piloto.imagenCoche || ''}');">
            <div class="hero-content">
                <img src="${piloto.imagenPerfil}" alt="${piloto.nombreCompleto}" class="profile-main-image">
                <h1 class="profile-name">${piloto.nombreCompleto}</h1>
                <div class="profile-country">
                    <img src="https://flagcdn.com/w40/${piloto.nacionalidad.codigo}.png" alt="Bandera de ${piloto.nacionalidad.nombre}">
                    <span>${piloto.nacionalidad.nombre}</span>
                </div>
            </div>
        </div>

        <div class="profile-stats">
            <div class="stat-card">
                <div class="stat-value">${edad}</div>
                <div class="stat-label">Años</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${titulos}</div>
                <div class="stat-label">Campeonatos Mundiales</div>
            </div>
            <div class="stat-card stat-card-full">
                <div class="stat-value">${piloto.campeonatos.join(', ')}</div>
                <div class="stat-label">Años Campeón</div>
            </div>
        </div>

        <div class="profile-bio">
            <h2>Biografía</h2>
            <p>${piloto.biografia}</p>
        </div>
    `;
}

function renderTeamProfile(equipo) {
    const container = document.getElementById('profile-container');
    const titulos = equipo.campeonatos.length;

    container.innerHTML = `
        <div class="profile-hero" style="background-image: linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 1)), url('${equipo.imagenCoche || ''}');">
            <div class="hero-content">
                <img src="${equipo.logo}" alt="${equipo.nombreCompleto}" class="profile-main-image team-logo">
                <h1 class="profile-name">${equipo.nombreCompleto}</h1>
                <div class="profile-country">
                    <img src="https://flagcdn.com/w40/${equipo.paisBase.codigo}.png" alt="Bandera de ${equipo.paisBase.nombre}">
                    <span>Base en ${equipo.paisBase.nombre}</span>
                </div>
            </div>
        </div>

        <div class="profile-stats">
             <div class="stat-card">
                <div class="stat-value">${titulos}</div>
                <div class="stat-label">Campeonatos de Constructores</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${equipo.jefeEquipo}</div>
                <div class="stat-label">Jefe de Equipo</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${equipo.motor}</div>
                <div class="stat-label">Unidad de Potencia</div>
            </div>
        </div>

        <div class="profile-bio">
            <h2>Historia del Equipo</h2>
            <p>${equipo.biografia}</p>
        </div>
    `;
}

function renderError() {
    const container = document.getElementById('profile-container');
    container.innerHTML = `
        <div class="profile-error">
            <h1>Error 404</h1>
            <p>No se encontró el perfil solicitado o aún no ha sido creado.</p>
            <p>Asegúrate de que la entrada exista en <strong>js/database.js</strong></p>
            <a href="campeones.html" class="back-link">Volver a Campeones</a>
        </div>
    `;
}