document.addEventListener('DOMContentLoaded', function() {
    
    // --- VARIABLES GLOBALES ---
    // Esta lista solo se usa para obtener FOTOS de alta calidad de los pilotos actuales.
    // La información del equipo se sacará dinámicamente de la API para respetar la historia.
    const currentDriversPhotos = {
        "max_verstappen": "images/drivers/verstappen.png",
        "tsunoda": "images/drivers/tsunoda.png",
        "leclerc": "images/drivers/leclerc.png",
        "hamilton": "images/drivers/hamilton.png",
        "russell": "images/drivers/russell.png",
        "antonelli": "images/drivers/antonelli.png",
        "norris": "images/drivers/norris.png",
        "piastri": "images/drivers/piastri.png",
        "alonso": "images/drivers/alonso.png",
        "stroll": "images/drivers/stroll.png",
        "gasly": "images/drivers/gasly.png",
        "doohan": "images/drivers/doohan.png",
        "colapinto": "images/drivers/colapinto.png",
        "albon": "images/drivers/albon.png",
        "sainz": "images/drivers/sainz.png",
        "lawson": "images/drivers/lawson.png",
        "hadjar": "images/drivers/hadjar.png",
        "bearman": "images/drivers/bearman.png",
        "ocon": "images/drivers/ocon.png",
        "hulkenberg": "images/drivers/hulkenberg.png",
        "bortoleto": "images/drivers/bortoleto.png",
        "perez": "images/drivers/perez.png",
        "bottas": "images/drivers/bottas.png",
        "lindblad": "images/drivers/lindblad.png"
    };
    
    let currentRaceSelected = 'championship';
    // Rutas por defecto corregidas segun tu file system
    const defaultDriverImg = 'images/default/default.png';
    const defaultTeamLogo = 'images/logos/default.png';

    // --- CUSTOM EVENT LISTENER ---
    window.addEventListener('yearChanged', () => {
        const newYear = localStorage.getItem('f1SeasonYear') || '2026';
        currentRaceSelected = 'championship'; // Reset selection
        updatePageTitle(); // Update the title
        fetchCalendarAndRenderTabs(); // This will read from localStorage inside
        createDriversTable('championship', newYear); // Pass year explicitly
    });

    // --- API HELPER ---
    async function fetchApi(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            return null;
        }
    }

    // --- HELPER: GET LOGO PATH ---
    function getTeamLogo(constructorId) {
        // Mapeo manual para casos donde el ID de la API no coincide exactamente con el nombre del archivo
        const logoMap = {
            "red_bull": "images/logos/redbull.png",
            "ferrari": "images/logos/ferrari.png",
            "mclaren": "images/logos/mclaren.png", // o mclaren2.png
            "mercedes": "images/logos/mercedes.png",
            "aston_martin": "images/logos/aston-martin.png",
            "alpine": "images/logos/alpine.png",
            "williams": "images/logos/williams.png",
            "rb": "images/logos/rb.png",
            "haas": "images/logos/haas.png",
            "sauber": "images/logos/audi.png",
            "kick_sauber": "images/logos/audi.png",
            "alfa": "images/logos/audi.png",
            "audi": "images/logos/audi.png",
            "cadillac": "images/logos/cadillac.png",
            "alphatauri": "images/logos/default.png", // Avoid using RB logo to prevent confusion
            "toro_rosso": "images/logos/default.png", // Avoid using RB logo
            "racing_point": "images/logos/aston-martin.png",
            "renault": "images/logos/renault.png",
            "lotus_f1": "images/logos/lotus.png",
            "tyrrell": "images/logos/tyrrell.png",
            "benetton": "images/logos/benetton.png",
            "brabham": "images/logos/brabham.png",
            "brawn": "images/logos/brawn.png",
            "cooper": "images/logos/cooper.png"
        };
        
        return logoMap[constructorId] || `images/logos/${constructorId}.png`;
    }

    // --- MAIN FUNCTION: CREATE DRIVERS TABLE ---
    async function createDriversTable(raceFilter = 'championship', year = null) {
        // Use passed year OR fetch from storage if null
        const currentYear = year || localStorage.getItem('f1SeasonYear') || '2026';
        
        const container = document.getElementById('standings-container');
        container.innerHTML = '<div class="loading-spinner">Cargando...</div>';
        
        let standings = [];

        if (raceFilter === 'championship') {
            const data = await fetchApi(`https://api.jolpi.ca/ergast/f1/${currentYear}/driverStandings.json`);
            standings = data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || [];
        } else {
            const round = raceFilter.replace(/R|-Sprint/g, '');
            const endpoint = raceFilter.includes('-Sprint') ? 'sprint' : 'results';
            const raceData = await fetchApi(`https://api.jolpi.ca/ergast/f1/${currentYear}/${round}/${endpoint}.json`);
            
            const raceSpecificResults = endpoint === 'sprint' 
                ? raceData?.MRData?.RaceTable?.Races[0]?.SprintResults 
                : raceData?.MRData?.RaceTable?.Races[0]?.Results;
            standings = raceSpecificResults || [];
        }

        container.innerHTML = '';
        
        if (standings.length === 0) {
            if (raceFilter === 'championship') {
                container.innerHTML = `<div class="race-not-available">No hay datos para ${currentYear}.</div>`;
            } else {
                container.innerHTML = '<div class="race-not-available">Aún no se ha disputado esta carrera</div>';
            }
            return;
        }

        standings.forEach(driverStanding => {
            // 1. Datos del Piloto
            const apiDriverId = driverStanding.Driver.driverId;
            const driverName = `${driverStanding.Driver.givenName} ${driverStanding.Driver.familyName}`;
            const driverPhoto = currentDriversPhotos[apiDriverId] || defaultDriverImg;

            // 2. Datos del Equipo (Constructor) - SACADOS DE LA API
            let constructorId = 'unknown';
            let teamName = 'Unknown Team';
            
            if (driverStanding.Constructors && driverStanding.Constructors.length > 0) {
                const constructor = driverStanding.Constructors[0];
                constructorId = constructor.constructorId;
                teamName = constructor.name;
            } else if (driverStanding.Constructor) {
                 // Estructura a veces varia en resultados de carrera
                 constructorId = driverStanding.Constructor.constructorId;
                 teamName = driverStanding.Constructor.name;
            }

            const teamLogo = getTeamLogo(constructorId);

            // 3. Renderizado
            const driverRow = document.createElement('div');
            // Usamos constructorId para la clase CSS (colores de equipo)
            driverRow.className = `driver-row ${constructorId}`; 
            
            driverRow.innerHTML = `
                <div class="position">${driverStanding.position}</div>
                <img class="team-logo" src="${teamLogo}" alt="${teamName}" onerror="this.src='${defaultTeamLogo}';">
                <div class="driver-name">${driverName}</div>
                <img class="driver-photo" src="${driverPhoto}" alt="${driverName}" onerror="this.src='${defaultDriverImg}';">
                <div class="points">${driverStanding.points}</div>
            `;
            
            // Pasamos info estructurada al detalle
            const driverInfoForDetails = {
                id: apiDriverId,
                name: driverName,
                teamId: constructorId, // Para CSS y lógica
                teamName: teamName,    // Nombre real para mostrar
                photoPath: driverPhoto,
                logoPath: teamLogo
            };

            driverRow.addEventListener('click', () => showDriverDetails(apiDriverId, driverInfoForDetails));
            container.appendChild(driverRow);
        });
    }
    
    // --- DRIVER DETAILS PANEL ---
    async function showDriverDetails(apiDriverId, driverInfo) {
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        const detailsPanel = document.getElementById('driver-details-panel');
        
        detailsPanel.innerHTML = `
            <button class="panel-close">✕</button>
            <img class="panel-logo" src="${driverInfo.photoPath}" alt="${driverInfo.name}" onerror="this.src='${defaultDriverImg}';">
            <h2 class="panel-driver-name">${driverInfo.name}</h2>
            <div class="panel-team">${driverInfo.teamName}</div>
            <div class="panel-points" id="panel-total-points">Total Points: ...</div>
            <div class="divider"></div>
            <div class="race-results">
                <div class="loading-spinner">Cargando resultados...</div>
            </div>`;
        detailsPanel.classList.add('panel-active');
        openDriverPanel();
        
        const raceResultsUrl = `https://api.jolpi.ca/ergast/f1/${currentYear}/drivers/${apiDriverId}/results.json?limit=100`;
        const sprintResultsUrl = `https://api.jolpi.ca/ergast/f1/${currentYear}/drivers/${apiDriverId}/sprint.json?limit=100`;
        
        try {
            const [raceData, sprintData] = await Promise.all([
                fetchApi(raceResultsUrl),
                fetchApi(sprintResultsUrl)
            ]);

            const allResults = [];
            let calculatedTotalPoints = 0;

            if (raceData?.MRData?.RaceTable?.Races) {
                raceData.MRData.RaceTable.Races.forEach(raceEvent => {
                    const result = raceEvent.Results[0];
                    if (result) {
                        calculatedTotalPoints += parseInt(result.points, 10);
                        allResults.push({ 
                            race: `R${raceEvent.round}`, 
                            position: result.position, 
                            points: result.points, 
                            type: 'race',
                            country: raceEvent.Circuit.Location.country 
                        });
                    }
                });
            }
            
            if (sprintData?.MRData?.RaceTable?.Races) {
                sprintData.MRData.RaceTable.Races.forEach(raceEvent => {
                    const result = raceEvent.SprintResults[0];
                     if (result) {
                        calculatedTotalPoints += parseInt(result.points, 10);
                        allResults.push({ 
                            race: `Sprint R${raceEvent.round}`, 
                            position: result.position, 
                            points: result.points, 
                            type: 'sprint',
                            country: raceEvent.Circuit.Location.country 
                        });
                    }
                });
            }

            allResults.sort((a, b) => {
                const aNum = parseInt(a.race.match(/\d+/)[0]);
                const bNum = parseInt(b.race.match(/\d+/)[0]);
                if (aNum !== bNum) return aNum - bNum;
                return a.type === 'sprint' ? -1 : 1;
            });

            document.getElementById('panel-total-points').textContent = `Total Points: ${calculatedTotalPoints}`;

            const shouldHighlight = (resultRace) => {
                if (currentRaceSelected === 'championship') return false;
                let targetId = currentRaceSelected;
                if (currentRaceSelected.includes('-Sprint')) {
                    const roundNum = currentRaceSelected.replace('R', '').replace('-Sprint', '');
                    targetId = `Sprint R${roundNum}`;
                }
                return resultRace === targetId;
            };

            const getCountryFlag = (countryName) => {
               const map = { "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahrain": "bh", "Belgium": "be", "Brazil": "br", "Canada": "ca", "China": "cn", "France": "fr", "Germany": "de", "Hungary": "hu", "Italy": "it", "Japan": "jp", "Mexico": "mx", "Monaco": "mc", "Netherlands": "nl", "The Netherlands": "nl", "Qatar": "qa", "Saudi Arabia": "sa", "Singapore": "sg", "Spain": "es", "UAE": "ae", "United Kingdom": "gb", "UK": "gb", "United States": "us", "USA": "us" };
               const code = map[countryName] || "unknown";
               if (code === "unknown") return "";
               return `https://flagcdn.com/w40/${code}.png`;
            };

            const resultsContainer = detailsPanel.querySelector('.race-results');
            resultsContainer.innerHTML = allResults.length > 0 ? allResults.map(result => {
                const flagUrl = getCountryFlag(result.country);
                const flagImg = flagUrl ? `<img src="${flagUrl}" alt="${result.country}" title="${result.race}" class="race-flag" style="width: 25px; height: auto; border-radius: 4px; display: block; margin: 0 auto;">` : result.race;
                
                return `
                <div class="race-result-item ${result.type === 'sprint' ? 'sprint-result' : ''} ${shouldHighlight(result.race) ? 'highlighted-race' : ''}">
                    <span class="race-name" style="display: flex; justify-content: center; align-items: center;">${flagImg}</span>
                    <span class="race-position">P${result.position}</span>
                    <span class="race-points">${result.points} pts</span>
                </div>`;
            }).join('') : '<div class="no-results">No hay resultados disponibles.</div>';

        } catch (error) {
            console.error(error);
            detailsPanel.querySelector('.race-results').innerHTML = `<div class="error-message">Error cargando datos</div>`;
        }
        detailsPanel.querySelector('.panel-close').addEventListener('click', e => { e.stopPropagation(); closeDriverPanel(); });
    }

    // --- HELPER FUNCTIONS ---
    function openDriverPanel() {
        document.getElementById('standings-container').classList.add('blur-content');
        document.querySelector('.races-container').classList.add('blur-content');
        document.querySelector('.navigation-buttons').classList.add('blur-content');
        document.querySelector('h1').classList.add('blur-content');
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeDriverPanel);
        }
        overlay.style.display = 'block';
    }

    function closeDriverPanel() {
        document.getElementById('driver-details-panel').classList.remove('panel-active');
        document.getElementById('standings-container').classList.remove('blur-content');
        document.querySelector('.races-container').classList.remove('blur-content');
        document.querySelector('.navigation-buttons').classList.remove('blur-content');
        document.querySelector('h1').classList.remove('blur-content');
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.style.display = 'none';
    }

    function handleTabClick(element) {
        document.querySelector('.race.active').classList.remove('active');
        element.classList.add('active');
        currentRaceSelected = element.getAttribute('data-race');
        createDriversTable(currentRaceSelected);
    }

    // --- CALENDAR & TABS ---
    async function fetchCalendarAndRenderTabs() {
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        const racesContainer = document.querySelector('.races-container');
        if (!racesContainer) return;

        racesContainer.innerHTML = '<div class="race active" data-race="championship">TOTAL</div>';
        
        racesContainer.querySelector('.race').addEventListener('click', function() {
            handleTabClick(this);
        });

        try {
            const data = await fetchApi(`https://api.jolpi.ca/ergast/f1/${currentYear}.json`);
            const races = data?.MRData?.RaceTable?.Races || [];
            
            const countryMap = { "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahrain": "bh", "Belgium": "be", "Brazil": "br", "Canada": "ca", "China": "cn", "France": "fr", "Germany": "de", "Hungary": "hu", "Italy": "it", "Japan": "jp", "Mexico": "mx", "Monaco": "mc", "Netherlands": "nl", "Qatar": "qa", "Saudi Arabia": "sa", "Singapore": "sg", "Spain": "es", "UAE": "ae", "United Kingdom": "gb", "United States": "us", "USA": "us", "Portugal": "pt", "Turkey": "tr", "Russia": "ru", "Malaysia": "my" };

            races.forEach(race => {
                const round = race.round;
                const country = race.Circuit.Location.country;
                const countryCode = countryMap[country] || 'unknown';
                
                const tab = document.createElement('div');
                tab.className = 'race';
                tab.setAttribute('data-race', `R${round}`);
                
                let content = `R${round}`;
                if (countryCode !== 'unknown') {
                    const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;
                    content = `<img src="${flagUrl}" alt="${country}" title="${race.raceName}" style="width: 24px; height: auto; border-radius: 2px;">`;
                }
                
                tab.innerHTML = content;
                tab.addEventListener('click', function() { handleTabClick(this); });
                racesContainer.appendChild(tab);

                if (race.Sprint) {
                    const sprintTab = document.createElement('div');
                    sprintTab.className = 'race';
                    sprintTab.setAttribute('data-race', `R${round}-Sprint`);
                    sprintTab.innerHTML = `<span style="font-size: 0.7em; display: block;">Sprint</span>${content}`;
                     sprintTab.addEventListener('click', function() { handleTabClick(this); });
                    racesContainer.appendChild(sprintTab);
                }
            });
        } catch (error) { console.error("Error fetching calendar:", error); }
    }

    // --- UPDATE PAGE TITLE ---
    function updatePageTitle() {
        const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = `Campeonato Mundial de Pilotos F1 ${currentYear}`;
        }
        // Also update the document title
        document.title = `Mundial de Pilotos F1 ${currentYear}`;
    }

    // --- INITIALIZATION ---
    updatePageTitle();
    fetchCalendarAndRenderTabs();
    createDriversTable('championship');
});