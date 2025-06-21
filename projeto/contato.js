document.addEventListener('DOMContentLoaded', () => {
    // Lógica de troca de tema (reutilizada de outros scripts)
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i'); // Seleciona o ícone diretamente

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
    };

    const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferredTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Lógica do formulário de contato
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Simular envio
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Mensagem';
            contactForm.reset();

            // Mostrar mensagem de sucesso
            formFeedback.innerHTML = '<div class="alert alert-success">Mensagem enviada com sucesso! Entraremos em contato em breve.</div>';
            setTimeout(() => {
                formFeedback.innerHTML = '';
            }, 5000); // Remove a mensagem após 5 segundos
        }, 2000);
    });
}); 