// ========================================================================
// ===== REEMPLAZA TODO TU ARCHIVO JS/RESULTS.JS CON ESTE CÓDIGO =====
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const raceTitleEl = document.getElementById('race-title');
    const navContainer = document.getElementById('results-nav');
    const tablesContainer = document.getElementById('results-tables-container');
    const SEASON_YEAR = 2025;

    async function loadResults() {
        const params = new URLSearchParams(window.location.search);
        const round = params.get('round');
        if (!round) {
            tablesContainer.innerHTML = "<p>No se ha especificado una carrera.</p>";
            return;
        }

        const raceInfoData = await fetchApi(`https://api.jolpi.ca/ergast/f1/${SEASON_YEAR}/${round}.json`);
        raceTitleEl.textContent = raceInfoData?.MRData?.RaceTable?.Races[0]?.raceName || `Carrera Ronda ${round}`;

        const sessionEndpoints = {
            'race': 'results',
            'sprint': 'sprint',
            'qualifying': 'qualifying',
        };

        const sessionPromises = Object.entries(sessionEndpoints).map(([key, endpoint]) =>
            fetchApi(`https://api.jolpi.ca/ergast/f1/${SEASON_YEAR}/${round}/${endpoint}.json`).then(data => ({ key, data }))
        );

        const results = await Promise.all(sessionPromises);
        
        const validSessions = results.filter(res => res.data && res.data.MRData.RaceTable.Races.length > 0);

        if (validSessions.length === 0) {
            tablesContainer.innerHTML = "<p>No hay resultados disponibles para esta carrera.</p>";
            return;
        }

        buildNavigation(validSessions);
        buildTables(validSessions);
        setupTabEvents();
    }

    function buildNavigation(validSessions) {
        navContainer.innerHTML = '';
        const navOrder = ['race', 'sprint', 'qualifying'];

        navOrder.forEach(key => {
            if (validSessions.some(s => s.key === key)) {
                const button = document.createElement('button');
                button.className = 'nav-tab';
                button.dataset.target = `table-${key}`;
                button.textContent = getSessionName(key);
                navContainer.appendChild(button);
            }
        });
    }

    function buildTables(validSessions) {
        tablesContainer.innerHTML = '';
        validSessions.forEach(({ key, data }) => {
            const raceEvent = data.MRData.RaceTable.Races[0];
            let resultsList;
            if (key === 'race') resultsList = raceEvent.Results;
            else if (key === 'sprint') resultsList = raceEvent.SprintResults;
            else if (key === 'qualifying') resultsList = raceEvent.QualifyingResults;
            
            if (resultsList && resultsList.length > 0) {
                tablesContainer.innerHTML += buildTableHtml(resultsList, getSessionName(key), key);
            }
        });
    }

    function buildTableHtml(results, sessionName, type) {
        const headers = type === 'qualifying'
            ? `<th>Pos</th><th>Piloto</th><th>Equipo</th><th>Q1</th><th>Q2</th><th>Q3</th>`
            : `<th>Pos</th><th>Piloto</th><th>Equipo</th><th>Puntos</th>`;

        const rows = results.map(r => `
            <tr>
                <td class="pos">${r.position}</td>
                <td class="driver">
                    <img src="https://flagcdn.com/w40/${getCountryCode(r.Driver.nationality)}.png" class="driver-flag" alt="${r.Driver.nationality}">
                    ${r.Driver.givenName} ${r.Driver.familyName}
                </td>
                <td class="team">${r.Constructor.name}</td>
                ${type === 'qualifying' ?
                    `<td>${r.Q1 || '-'}</td><td>${r.Q2 || '-'}</td><td>${r.Q3 || '-'}</td>` :
                    `<td>${r.points || 0}</td>`
                }
            </tr>
        `).join('');

        return `<div class="results-table-container" id="table-${type}">
                    <div class="table-wrapper">
                        <table class="results-table">
                            <thead><tr>${headers}</tr></thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                </div>`;
    }

    function setupTabEvents() {
        const tabs = navContainer.querySelectorAll('.nav-tab');
        const tables = tablesContainer.querySelectorAll('.results-table-container');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tables.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.target).classList.add('active');
            });
        });

        if (tabs.length > 0) {
            tabs[0].click();
        }
    }

    async function fetchApi(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            return null;
        }
    }

    function getSessionName(key) {
        const names = { race: 'Carrera', sprint: 'Carrera Sprint', qualifying: 'Clasificación' };
        return names[key] || key;
    }

    // --- FUNCIÓN CORREGIDA Y COMPLETADA ---
    function getCountryCode(nationality) {
        const natCodes = {
            // Nacionalidades comunes
            "Dutch": "nl",
            "British": "gb",
            "Monegasque": "mc",
            "Australian": "au",
            "Spanish": "es",
            "German": "de",
            "French": "fr",
            "Finnish": "fi",
            "Mexican": "mx",
            "Canadian": "ca",
            "Thai": "th",
            "Japanese": "jp",
            "Chinese": "cn",
            "Danish": "dk",
            // --- AÑADIDAS PARA CORREGIR EL ERROR ---
            "Italian": "it",          // Para Antonelli
            "New Zealander": "nz",    // Para Lawson
            "Brazilian": "br",        // Para Bortoleto
            "Argentine": "ar"         // Para Colapinto
        };
        return natCodes[nationality] || "xx"; // 'xx' para bandera genérica si no se encuentra
    }

    loadResults();
});