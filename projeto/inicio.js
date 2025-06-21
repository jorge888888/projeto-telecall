document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = document.createElement('i');
    sunIcon.className = 'fas fa-sun';

    // Função para definir o tema
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        if (theme === 'dark') {
            if (moonIcon) themeToggle.replaceChild(sunIcon, moonIcon);
            localStorage.setItem('theme', 'dark');
        } else {
            if (sunIcon.parentNode === themeToggle) themeToggle.replaceChild(moonIcon, sunIcon);
            localStorage.setItem('theme', 'light');
        }
    };

    // Verifica o tema salvo no localStorage ou a preferência do sistema
    const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferredTheme);

    // Evento de clique no botão
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // Mudar o tema se o usuário mudar a preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Só muda se o usuário não tiver definido uma preferência manualmente
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}); 