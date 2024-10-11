// scripts.js

// Initialiser AOS
AOS.init({
    duration: 1200,
    once: true,
});

// Fonctionnalité 1 : Navigation Fluide
document.querySelectorAll('.table-of-contents a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Jouer le son de clic
        const sound = new Audio('sounds/click.mp3'); // Assure-toi d'avoir ce fichier dans le dossier 'sounds'
        sound.play();

        // Fermer la sidebar sur les petits écrans après la navigation
        if (window.innerWidth <= 768) {
            document.body.classList.remove('sidebar-open');
        }
    });
});

// Fonctionnalité 2 : Thème Sombre/Clair
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️';
} else {
    themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
});

// Fonctionnalité 3 : Retour en Haut
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fonctionnalité 4 : Recherche de Poèmes
const searchInput = document.getElementById('search-input');
const poemeSections = document.querySelectorAll('.poeme');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    poemeSections.forEach(section => {
        const title = section.querySelector('h2').textContent.toLowerCase();
        if (title.includes(query)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

// Fonctionnalité 5 : Marquage des Poèmes comme Lus
const markReadButtons = document.querySelectorAll('.mark-read');

markReadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const poeme = button.closest('.poeme');
        poeme.classList.toggle('read');
        // Sauvegarder l'état dans localStorage
        const poemeId = poeme.id;
        let readPoemes = JSON.parse(localStorage.getItem('readPoemes')) || [];
        if (poeme.classList.contains('read')) {
            readPoemes.push(poemeId);
        } else {
            readPoemes = readPoemes.filter(id => id !== poemeId);
        }
        localStorage.setItem('readPoemes', JSON.stringify(readPoemes));
    });
});

// Charger l'état des poèmes lus au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const readPoemes = JSON.parse(localStorage.getItem('readPoemes')) || [];
   readPoemes.forEach(id => {
        const poeme = document.getElementById(id);
        if (poeme) {
            poeme.classList.add('read');
        }
    });
});

// Fonctionnalité 6 : Ouverture/Fermeture de la Sidebar sur Petits Écrans
const menuToggleBtn = document.getElementById('menu-toggle');

if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
    });
}

// Fermer la sidebar lorsque l'utilisateur clique en dehors (optionnel)
document.addEventListener('click', (event) => {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && window.innerWidth <= 768) {
        document.body.classList.remove('sidebar-open');
    }
});
