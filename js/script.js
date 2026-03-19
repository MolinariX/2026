// ========================================================================
// ===== REEMPLAZA TODO TU ARCHIVO JS/SCRIPT.JS CON ESTE CÓDIGO =====
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    // ---- ESTA ES LA LÍNEA CORREGIDA ----
    // Ahora busca el elemento por su CLASE, que sí existe en tu HTML.
    const menuItems = document.querySelector('.menu-items');

    // Función para abrir o cerrar el menú
    function toggleMenu() {
        // Asegurarse de que los elementos existen antes de usarlos
        if (menuItems && hamburgerBtn) {
            menuItems.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        }
    }

    // Evento para el icono de hamburguesa
    hamburgerBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el clic se propague
        toggleMenu();
    });

    // Evento para cerrar el menú si se hace clic en un botón del menú
    // Esto es útil para que el menú se cierre al navegar a otra página.
    if (menuItems) {
        menuItems.addEventListener('click', function(event) {
            // Se asegura de que el clic fue en un botón y no en el fondo del overlay
            if (event.target.classList.contains('menu-btn')) {
                if (menuItems.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    }
    // --- YEAR SELECTOR LOGIC ---
    function initYearSelector() {
        if (!menuItems) return;

        // 1. Create and Inject "AÑO" Button if it doesn't exist
        if (!document.querySelector('.year-selector-btn')) {
             const currentYear = localStorage.getItem('f1SeasonYear') || '2026';
             const yearBtn = document.createElement('button');
             yearBtn.className = 'menu-btn year-selector-btn';
             yearBtn.innerHTML = `AÑO: ${currentYear} <i class="fas fa-chevron-down" style="margin-left: 10px;"></i>`;
             yearBtn.style.cursor = 'pointer';
             
             // Insert as the first item or append? Let's insert at top for visibility
             menuItems.insertBefore(yearBtn, menuItems.firstChild);

             yearBtn.addEventListener('click', (e) => {
                 e.stopPropagation();
                 openYearModal();
             });
        }

        // 2. Create Modal Structure if it doesn't exist
        if (!document.getElementById('year-modal')) {
            const modal = document.createElement('div');
            modal.id = 'year-modal';
            modal.className = 'modal-overlay'; // Re-use existing class if possible, or new one
            modal.style.display = 'none'; // Hidden by default
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.zIndex = '10000'; // Ensure it is above everything, including the menu
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.flexDirection = 'column';

            const currentYear = parseInt(localStorage.getItem('f1SeasonYear') || '2026');
            let yearsHtml = '<div class="year-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 15px; max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto; padding: 20px;">';
            
            // Generate years from 2026 back to 1950
            for (let y = 2026; y >= 1950; y--) {
                const isActive = y === currentYear ? 'style="background-color: #D4AF37; color: black;"' : '';
                yearsHtml += `<button class="year-option-btn" ${isActive} data-year="${y}" style="padding: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 5px; cursor: pointer; font-size: 1.1rem; transition: all 0.2s;">${y}</button>`;
            }
            yearsHtml += '</div>';

            modal.innerHTML = `
                <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <button id="close-year-modal" style="position: absolute; top: 20px; right: 20px; font-size: 2rem; background: none; border: none; color: white; cursor: pointer;">&times;</button>
                    <h2 style="color: #D4AF37; margin-bottom: 20px; font-size: 2.5rem; text-transform: uppercase;">Seleccionar Año</h2>
                    ${yearsHtml}
                </div>
            `;
            
            document.body.appendChild(modal);

            // Add Event Listeners
            document.getElementById('close-year-modal').addEventListener('click', closeYearModal);
            modal.querySelectorAll('.year-option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const selectedYear = e.target.getAttribute('data-year');
                    localStorage.setItem('f1SeasonYear', selectedYear);
                    
                    // Dispatch custom event instead of reload
                    window.dispatchEvent(new Event('yearChanged'));
                    
                    // Update the button text immediately
                    const yearBtn = document.querySelector('.year-selector-btn');
                    if(yearBtn) yearBtn.innerHTML = `AÑO: ${selectedYear} <i class="fas fa-chevron-down" style="margin-left: 10px;"></i>`;
                    
                    closeYearModal();
                });
            });
            
            // Close on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.parentElement === modal) {
                    closeYearModal();
                }
            });
        }
    }

    function openYearModal() {
        const modal = document.getElementById('year-modal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => { modal.style.opacity = '1'; }, 10);
        }
        // Do NOT close the menu here. This allows the user to return to the menu buttons after selection.
        // if (menuItems.classList.contains('active')) toggleMenu(); 
    }

    function closeYearModal() {
        const modal = document.getElementById('year-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    initYearSelector();
});