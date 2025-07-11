// Contenido para: js/campeones.js

document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const selectionScreen = document.getElementById('selection-screen');
    const contentView = document.getElementById('content-view');
    const championsGrid = document.getElementById('champions-grid');
    const rankingList = document.getElementById('ranking-list');
    const gridTitle = document.getElementById('grid-title');
    const backBtn = document.getElementById('back-btn');
    const viewToggleBtn = document.getElementById('view-toggle-btn');
    const championModal = document.getElementById('champion-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');

    // --- BASE DE DATOS DE CAMPEONES (INTACTA) ---
    const championsData = [ { year: 1950, driver: 'Giuseppe Farina', team: 'Alfa Romeo', countryCode: 'it', image: 'images/drivers/farina.png' }, { year: 1951, driver: 'Juan Manuel Fangio', team: 'Alfa Romeo', countryCode: 'ar', image: 'images/drivers/fangio.png' }, { year: 1952, driver: 'Alberto Ascari', team: 'Ferrari', countryCode: 'it', image: 'images/drivers/ascari.png' }, { year: 1953, driver: 'Alberto Ascari', team: 'Ferrari', countryCode: 'it', image: 'images/drivers/ascari.png' }, { year: 1954, driver: 'Juan Manuel Fangio', team: 'Maserati', countryCode: 'ar', image: 'images/drivers/fangio.png' }, { year: 1955, driver: 'Juan Manuel Fangio', team: 'Mercedes', countryCode: 'ar', image: 'images/drivers/fangio.png' }, { year: 1956, driver: 'Juan Manuel Fangio', team: 'Ferrari', countryCode: 'ar', image: 'images/drivers/fangio.png' }, { year: 1957, driver: 'Juan Manuel Fangio', team: 'Maserati', countryCode: 'ar', image: 'images/drivers/fangio.png' }, { year: 1958, driver: 'Mike Hawthorn', team: 'Ferrari', countryCode: 'gb', image: 'images/drivers/hawthorn.png' }, { year: 1959, driver: 'Jack Brabham', team: 'Cooper', countryCode: 'au', image: 'images/drivers/brabham.png' }, { year: 1960, driver: 'Jack Brabham', team: 'Cooper', countryCode: 'au', image: 'images/drivers/brabham.png' }, { year: 1961, driver: 'Phil Hill', team: 'Ferrari', countryCode: 'us', image: 'images/drivers/p_hill.png' }, { year: 1962, driver: 'Graham Hill', team: 'BRM', countryCode: 'gb', image: 'images/drivers/g_hill.png' }, { year: 1963, driver: 'Jim Clark', team: 'Lotus', countryCode: 'gb', image: 'images/drivers/clark.png' }, { year: 1964, driver: 'John Surtees', team: 'Ferrari', countryCode: 'gb', image: 'images/drivers/surtees.png' }, { year: 1965, driver: 'Jim Clark', team: 'Lotus', countryCode: 'gb', image: 'images/drivers/clark.png' }, { year: 1966, driver: 'Jack Brabham', team: 'Brabham', countryCode: 'au', image: 'images/drivers/brabham.png' }, { year: 1967, driver: 'Denny Hulme', team: 'Brabham', countryCode: 'nz', image: 'images/drivers/hulme.png' }, { year: 1968, driver: 'Graham Hill', team: 'Lotus', countryCode: 'gb', image: 'images/drivers/g_hill.png' }, { year: 1969, driver: 'Jackie Stewart', team: 'Matra', countryCode: 'gb', image: 'images/drivers/stewart.png' }, { year: 1970, driver: 'Jochen Rindt', team: 'Lotus', countryCode: 'at', image: 'images/drivers/rindt.png' }, { year: 1971, driver: 'Jackie Stewart', team: 'Tyrrell', countryCode: 'gb', image: 'images/drivers/stewart.png' }, { year: 1972, driver: 'Emerson Fittipaldi', team: 'Lotus', countryCode: 'br', image: 'images/drivers/fittipaldi.png' }, { year: 1973, driver: 'Jackie Stewart', team: 'Tyrrell', countryCode: 'gb', image: 'images/drivers/stewart.png' }, { year: 1974, driver: 'Emerson Fittipaldi', team: 'McLaren', countryCode: 'br', image: 'images/drivers/fittipaldi.png' }, { year: 1975, driver: 'Niki Lauda', team: 'Ferrari', countryCode: 'at', image: 'images/drivers/lauda.png' }, { year: 1976, driver: 'James Hunt', team: 'McLaren', countryCode: 'gb', image: 'images/drivers/hunt.png' }, { year: 1977, driver: 'Niki Lauda', team: 'Ferrari', countryCode: 'at', image: 'images/drivers/lauda.png' }, { year: 1978, driver: 'Mario Andretti', team: 'Lotus', countryCode: 'us', image: 'images/drivers/andretti.png' }, { year: 1979, driver: 'Jody Scheckter', team: 'Ferrari', countryCode: 'za', image: 'images/drivers/scheckter.png' }, { year: 1980, driver: 'Alan Jones', team: 'Williams', countryCode: 'au', image: 'images/drivers/jones.png' }, { year: 1981, driver: 'Nelson Piquet', team: 'Brabham', countryCode: 'br', image: 'images/drivers/piquet.png' }, { year: 1982, driver: 'Keke Rosberg', team: 'Williams', countryCode: 'fi', image: 'images/drivers/rosberg.png' }, { year: 1983, driver: 'Nelson Piquet', team: 'Brabham', countryCode: 'br', image: 'images/drivers/piquet.png' }, { year: 1984, driver: 'Niki Lauda', team: 'McLaren', countryCode: 'at', image: 'images/drivers/lauda.png' }, { year: 1985, driver: 'Alain Prost', team: 'McLaren', countryCode: 'fr', image: 'images/drivers/prost.png' }, { year: 1986, driver: 'Alain Prost', team: 'McLaren', countryCode: 'fr', image: 'images/drivers/prost.png' }, { year: 1987, driver: 'Nelson Piquet', team: 'Williams', countryCode: 'br', image: 'images/drivers/piquet.png' }, { year: 1988, driver: 'Ayrton Senna', team: 'McLaren', countryCode: 'br', image: 'images/drivers/senna.png' }, { year: 1989, driver: 'Alain Prost', team: 'McLaren', countryCode: 'fr', image: 'images/drivers/prost.png' }, { year: 1990, driver: 'Ayrton Senna', team: 'McLaren', countryCode: 'br', image: 'images/drivers/senna.png' }, { year: 1991, driver: 'Ayrton Senna', team: 'McLaren', countryCode: 'br', image: 'images/drivers/senna.png' }, { year: 1992, driver: 'Nigel Mansell', team: 'Williams', countryCode: 'gb', image: 'images/drivers/mansell.png' }, { year: 1993, driver: 'Alain Prost', team: 'Williams', countryCode: 'fr', image: 'images/drivers/prost.png' }, { year: 1994, driver: 'Michael Schumacher', team: 'Benetton', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 1995, driver: 'Michael Schumacher', team: 'Benetton', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 1996, driver: 'Damon Hill', team: 'Williams', countryCode: 'gb', image: 'images/drivers/d_hill.png' }, { year: 1997, driver: 'Jacques Villeneuve', team: 'Williams', countryCode: 'ca', image: 'images/drivers/villeneuve.png' }, { year: 1998, driver: 'Mika Häkkinen', team: 'McLaren', countryCode: 'fi', image: 'images/drivers/hakkinen.png' }, { year: 1999, driver: 'Mika Häkkinen', team: 'McLaren', countryCode: 'fi', image: 'images/drivers/hakkinen.png' }, { year: 2000, driver: 'Michael Schumacher', team: 'Ferrari', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 2001, driver: 'Michael Schumacher', team: 'Ferrari', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 2002, driver: 'Michael Schumacher', team: 'Ferrari', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 2003, driver: 'Michael Schumacher', team: 'Ferrari', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 2004, driver: 'Michael Schumacher', team: 'Ferrari', countryCode: 'de', image: 'images/drivers/schumacher.png' }, { year: 2005, driver: 'Fernando Alonso', team: 'Renault', countryCode: 'es', image: 'images/drivers/alonso.png' }, { year: 2006, driver: 'Fernando Alonso', team: 'Renault', countryCode: 'es', image: 'images/drivers/alonso.png' }, { year: 2007, driver: 'Kimi Räikkönen', team: 'Ferrari', countryCode: 'fi', image: 'images/drivers/raikkonen.png' }, { year: 2008, driver: 'Lewis Hamilton', team: 'McLaren', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2009, driver: 'Jenson Button', team: 'Brawn GP', countryCode: 'gb', image: 'images/drivers/button.png' }, { year: 2010, driver: 'Sebastian Vettel', team: 'Red Bull Racing', countryCode: 'de', image: 'images/drivers/vettel.png' }, { year: 2011, driver: 'Sebastian Vettel', team: 'Red Bull Racing', countryCode: 'de', image: 'images/drivers/vettel.png' }, { year: 2012, driver: 'Sebastian Vettel', team: 'Red Bull Racing', countryCode: 'de', image: 'images/drivers/vettel.png' }, { year: 2013, driver: 'Sebastian Vettel', team: 'Red Bull Racing', countryCode: 'de', image: 'images/drivers/vettel.png' }, { year: 2014, driver: 'Lewis Hamilton', team: 'Mercedes', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2015, driver: 'Lewis Hamilton', team: 'Mercedes', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2016, driver: 'Nico Rosberg', team: 'Mercedes', countryCode: 'de', image: 'images/drivers/n_rosberg.png' }, { year: 2017, driver: 'Lewis Hamilton', team: 'Mercedes', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2018, driver: 'Lewis Hamilton', team: 'Mercedes', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2019, driver: 'Lewis Hamilton', team: 'Mercedes', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2020, driver: 'Lewis Hamilton', team: 'Mercedes', countryCode: 'gb', image: 'images/drivers/hamilton.png' }, { year: 2021, driver: 'Max Verstappen', team: 'Red Bull Racing', countryCode: 'nl', image: 'images/drivers/verstappen.png' }, { year: 2022, driver: 'Max Verstappen', team: 'Red Bull Racing', countryCode: 'nl', image: 'images/drivers/verstappen.png' }, { year: 2023, driver: 'Max Verstappen', team: 'Red Bull Racing', countryCode: 'nl', image: 'images/drivers/verstappen.png' }, { year: 2024, driver: 'Max Verstappen', team: 'Red Bull Racing', countryCode: 'nl', image: 'images/drivers/verstappen.png' } ];
    const constructorsData = [ { year: 1958, team: 'Vanwall', logo: 'images/logos/vanwall.png' }, { year: 1959, team: 'Cooper', logo: 'images/logos/cooper.png' }, { year: 1960, team: 'Cooper', logo: 'images/logos/cooper.png' }, { year: 1961, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1962, team: 'BRM', logo: 'images/logos/brm.png' }, { year: 1963, team: 'Lotus', logo: 'images/logos/lotus.png' }, { year: 1964, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1965, team: 'Lotus', logo: 'images/logos/lotus.png' }, { year: 1966, team: 'Brabham', logo: 'images/logos/brabham.png' }, { year: 1967, team: 'Brabham', logo: 'images/logos/brabham.png' }, { year: 1968, team: 'Lotus', logo: 'images/logos/lotus.png' }, { year: 1969, team: 'Matra', logo: 'images/logos/matra.png' }, { year: 1970, team: 'Lotus', logo: 'images/logos/lotus.png' }, { year: 1971, team: 'Tyrrell', logo: 'images/logos/tyrrell.png' }, { year: 1972, team: 'Lotus', logo: 'images/logos/lotus.png' }, { year: 1973, team: 'Tyrrell', logo: 'images/logos/tyrrell.png' }, { year: 1974, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1975, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1976, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1977, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1978, team: 'Lotus', logo: 'images/logos/lotus.png' }, { year: 1979, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1980, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1981, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1982, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1983, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 1984, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1985, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1986, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1987, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1988, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1989, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1990, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1991, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1992, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1993, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1994, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1995, team: 'Benetton', logo: 'images/logos/benetton.png' }, { year: 1996, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1997, team: 'Williams', logo: 'images/logos/williams.png' }, { year: 1998, team: 'McLaren', logo: 'images/logos/mclaren.png' }, { year: 1999, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2000, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2001, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2002, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2003, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2004, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2005, team: 'Renault', logo: 'images/logos/renault.png' }, { year: 2006, team: 'Renault', logo: 'images/logos/renault.png' }, { year: 2007, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2008, team: 'Ferrari', logo: 'images/logos/ferrari.png' }, { year: 2009, team: 'Brawn GP', logo: 'images/logos/brawn.png' }, { year: 2010, team: 'Red Bull Racing', logo: 'images/logos/redbull.png' }, { year: 2011, team: 'Red Bull Racing', logo: 'images/logos/redbull.png' }, { year: 2012, team: 'Red Bull Racing', logo: 'images/logos/redbull.png' }, { year: 2013, team: 'Red Bull Racing', logo: 'images/logos/redbull.png' }, { year: 2014, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2015, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2016, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2017, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2018, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 19, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2020, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2021, team: 'Mercedes', logo: 'images/logos/mercedes.png' }, { year: 2022, team: 'Red Bull Racing', logo: 'images/logos/redbull.png' }, { year: 2023, team: 'Red Bull Racing', logo: 'images/logos/redbull.png' }, { year: 2024, team: 'McLaren', logo: 'images/logos/mclaren.png' } ];
    const defaultDriverImg = 'images/defaults/default.png';
    const defaultTeamLogo = 'images/defaults/default.png';

    // --- VARIABLES DE ESTADO ---
    let currentData = [];
    let currentIndex = 0;
    let currentView = 'selection'; // 'selection', 'grid', 'ranking'
    let currentType = ''; // 'drivers' o 'constructors'

    // --- CAMBIO 1: AÑADIR FUNCIÓN AUXILIAR PARA CREAR IDs ---
    // Esta función convierte un nombre en un ID simple para usar en los enlaces.
    function createIdFromName(name) {
        if (!name) return '';
        return name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '_');
    }

    // --- LÓGICA DE NAVEGACIÓN ---
    document.querySelectorAll('.selection-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentType = button.dataset.type;
            switchToView('grid');
        });
    });

    backBtn.addEventListener('click', () => {
        switchToView('selection');
    });
    
    viewToggleBtn.addEventListener('click', () => {
        const targetView = (currentView === 'grid') ? 'ranking' : 'grid';
        switchToView(targetView);
    });

    function switchToView(view) {
        currentView = view;
        selectionScreen.classList.toggle('active', view === 'selection');
        contentView.classList.toggle('active', view === 'grid' || view === 'ranking');

        if (view === 'grid') {
            rankingList.style.display = 'none';
            championsGrid.style.display = 'grid';
            viewToggleBtn.textContent = 'Ver Ranking';
            populateGrid(currentType);
        } else if (view === 'ranking') {
            championsGrid.style.display = 'none';
            rankingList.style.display = 'block';
            viewToggleBtn.textContent = 'Ver por Año';
            populateRanking(currentType);
        }
    }

    // --- LÓGICA PARA POBLAR CONTENIDO ---
    function populateGrid(type) {
        championsGrid.innerHTML = '';
        const data = (type === 'drivers') ? championsData : constructorsData;
        const sortedData = [...data].sort((a, b) => b.year - a.year);
        gridTitle.textContent = `CAMPEONES DE ${type === 'drivers' ? 'PILOTOS' : 'CONSTRUCTORES'}`;
        
        sortedData.forEach((champ, index) => {
            const card = (type === 'drivers') ? createDriverCard(champ) : createConstructorCard(champ);
            // --- CAMBIO 2: MODIFICAR EL EVENTO CLICK PARA QUE IGNORE LOS ENLACES ---
            card.addEventListener('click', (e) => {
                // Si el usuario hace click en un enlace, no abras el modal. Deja que el enlace funcione.
                if (e.target.tagName === 'A') {
                    e.stopPropagation(); // Detiene el evento para que no se propague a la tarjeta
                    return;
                }
                currentData = sortedData;
                currentIndex = index;
                openModal(champ);
            });
            championsGrid.appendChild(card);
        });
    }

    function populateRanking(type) {
        rankingList.innerHTML = '';
        const sourceData = (type === 'drivers') ? championsData : constructorsData;
        const nameKey = (type === 'drivers') ? 'driver' : 'team';
        
        const counts = sourceData.reduce((acc, champ) => {
            acc[champ[nameKey]] = (acc[champ[nameKey]] || 0) + 1;
            return acc;
        }, {});

        const rankedData = Object.entries(counts).map(([name, titles]) => {
            const lastChampionship = sourceData.find(c => c[nameKey] === name);
            return {
                name,
                titles,
                image: type === 'drivers' ? lastChampionship.image : lastChampionship.logo
            };
        }).sort((a, b) => b.titles - a.titles);

        rankedData.forEach((item, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'ranking-item';

            // --- CAMBIO 3: ENVOLVER EL NOMBRE DEL RANKING EN UN ENLACE ---
            const profileId = createIdFromName(item.name);
            const profileUrl = (type === 'drivers') ? 'perfil_piloto.html' : 'perfil_equipo.html';
            const nameHtml = `<a href="${profileUrl}?id=${profileId}">${item.name}</a>`;

            rankItem.innerHTML = `
                <div class="ranking-pos">${index + 1}</div>
                <img src="${item.image || (type === 'drivers' ? defaultDriverImg : defaultTeamLogo)}" alt="${item.name}" class="ranking-img ${type === 'constructors' ? 'constructor' : ''}">
                <div class="ranking-name">${nameHtml}</div>
                <div class="ranking-titles">
                    ${item.titles}
                    <div class="ranking-titles-label">Títulos</div>
                </div>
            `;
            rankingList.appendChild(rankItem);
        });
    }

    function createDriverCard(champ) {
        const card = document.createElement('div');
        card.className = 'champion-card';
        // --- CAMBIO 4 (A): ENVOLVER EL NOMBRE DEL PILOTO EN UN ENLACE ---
        const driverId = createIdFromName(champ.driver);
        const nameHtml = `<a href="perfil_piloto.html?id=${driverId}">${champ.driver}</a>`;
        card.innerHTML = `<img src="${champ.image || defaultDriverImg}" alt="${champ.driver}"><div class="champion-card-info"><div class="year">${champ.year}</div><div class="name">${nameHtml}</div></div>`;
        return card;
    }

    function createConstructorCard(champ) {
        const card = document.createElement('div');
        card.className = 'champion-card';
        // --- CAMBIO 4 (B): ENVOLVER EL NOMBRE DEL EQUIPO EN UN ENLACE ---
        const teamId = createIdFromName(champ.team);
        const nameHtml = `<a href="perfil_equipo.html?id=${teamId}">${champ.team}</a>`;
        card.innerHTML = `<img src="${champ.logo || defaultTeamLogo}" alt="${champ.team}" class="constructor-logo"><div class="champion-card-info"><div class="year">${champ.year}</div><div class="name">${nameHtml}</div></div>`;
        return card;
    }

    // --- LÓGICA DEL MODAL ---
    function openModal(champ) {
        updateModalContent(champ);
        championModal.classList.add('visible');
    }

    function updateModalContent(champ) {
        // --- CAMBIO 4 (C): AÑADIR ENLACES TAMBIÉN EN EL MODAL ---
        if (currentType === 'drivers') {
            const driverId = createIdFromName(champ.driver);
            const nameHtml = `<a href="perfil_piloto.html?id=${driverId}">${champ.driver}</a>`;
            modalBody.innerHTML = `<div class="modal-year">${champ.year}</div><img src="${champ.image || defaultDriverImg}" alt="${champ.driver}" class="modal-img"><h2 class="modal-name">${nameHtml}</h2><div class="modal-details"><img src="https://flagcdn.com/w40/${champ.countryCode}.png" alt="Bandera" class="modal-flag"><span>${champ.team}</span></div>`;
        } else {
            const teamId = createIdFromName(champ.team);
            const nameHtml = `<a href="perfil_equipo.html?id=${teamId}">${champ.team}</a>`;
            modalBody.innerHTML = `<div class="modal-year">${champ.year}</div><img src="${champ.logo || defaultTeamLogo}" alt="${champ.team}" class="modal-img constructor"><h2 class="modal-name">${nameHtml}</h2>`;
        }
    }

    function navigateModal(direction) {
        currentIndex += direction;
        if (currentIndex < 0) { currentIndex = currentData.length - 1; }
        else if (currentIndex >= currentData.length) { currentIndex = 0; }
        
        modalBody.classList.add('fade');
        setTimeout(() => {
            updateModalContent(currentData[currentIndex]);
            modalBody.classList.remove('fade');
        }, 200);
    }

    modalPrevBtn.addEventListener('click', () => navigateModal(-1));
    modalNextBtn.addEventListener('click', () => navigateModal(1));
    modalCloseBtn.addEventListener('click', () => championModal.classList.remove('visible'));
    championModal.addEventListener('click', (e) => {
        if (e.target === championModal) championModal.classList.remove('visible');
    });
    
    // Iniciar la aplicación
    switchToView('selection');
});