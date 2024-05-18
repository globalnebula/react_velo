function toggleMenu() {
    const navOverlay = document.getElementById('navOverlay');
    const menuToggler = document.querySelector('.menu-toggler');

    navOverlay.classList.toggle('open'); 
    menuToggler.classList.toggle('open');
}
