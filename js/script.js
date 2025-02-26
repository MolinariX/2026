document.addEventListener('DOMContentLoaded', function() {
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
    
    // Configurar estilos iniciales para la animación
    teamSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Iniciar la animación después de un pequeño retraso
    setTimeout(animateEntrance, 300);
});