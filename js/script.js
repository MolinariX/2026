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
});