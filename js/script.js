document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del menú hamburguesa
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const menuItems = document.querySelector('.menu-items');
    
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        menuItems.classList.toggle('active');
    });

    // Cerrar menú cuando se hace clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menuItems.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && menuItems.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            menuItems.classList.remove('active');
        }
    });

    // Efecto de hover para los logos
    const logoLinks = document.querySelectorAll('.logo-link');
    
    logoLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Efecto de hover para los pilotos
    const driverLinks = document.querySelectorAll('.driver-link');
    
    driverLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Efecto de hover para las filas de equipos
    const teamRows = document.querySelectorAll('.team-row');
    
    teamRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.7)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        });
    });

    // Efecto de parallax suave para las imágenes de los pilotos
    const driverImages = document.querySelectorAll('.driver-image');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        driverImages.forEach(image => {
            const position = scrollPosition * 0.05;
            image.style.transform = `translateY(${position}px)`;
        });
    });

    // Animación de carga inicial
    const teamSections = document.querySelectorAll('.team-section');
    
    function animateEntrance() {
        teamSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Iniciar la animación después de un pequeño retraso
    setTimeout(animateEntrance, 300);

    // Animación para el menú al cargar la página
    setTimeout(() => {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        hamburgerMenu.style.opacity = '1';
        hamburgerMenu.style.transform = 'translateY(0)';
    }, 500);
});