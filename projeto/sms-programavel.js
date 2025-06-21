$(document).ready(function() {
    // Controle do tema igual ao login.js
    const themeToggle = $('#themeToggle');
    const htmlElement = $('html');
    const themeIcon = themeToggle.find('i');

    // Verifica se há uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.attr('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Verifica a preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        htmlElement.attr('data-bs-theme', initialTheme);
        updateThemeIcon(initialTheme);
    }

    // Alternar tema ao clicar no botão
    themeToggle.on('click', function() {
        const currentTheme = htmlElement.attr('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.attr('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        // Animação de transição
        $('body').css('transition', 'background-color 0.3s, color 0.3s');
        setTimeout(() => {
            $('body').css('transition', '');
        }, 300);
    });

    function updateThemeIcon(theme) {
        themeIcon.removeClass('fas fa-moon fas fa-sun').addClass(
            theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'
        );
    }

    console.log('Página SMS Programável carregada.');
    // Adicione interações JS/jQuery aqui se necessário
}); 