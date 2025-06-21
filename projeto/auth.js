document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const userInfo = document.getElementById('user-info');
    const userLogin = document.getElementById('user-login');
    const logoutBtn = document.getElementById('logout-btn');

    if (isLoggedIn && loggedInUser) {
        // Esconde os links de login/cadastro
        if (loginLink) loginLink.classList.add('d-none');
        if (registerLink) registerLink.classList.add('d-none');

        // Mostra as informações do usuário
        if (userInfo) {
            userInfo.classList.remove('d-none');
            userInfo.classList.add('d-flex');
        }
        if (userLogin) {
            userLogin.textContent = `Olá, ${loggedInUser.nome}`;
        }

    } else {
        // Mostra os links de login/cadastro
        if (loginLink) loginLink.classList.remove('d-none');
        if (registerLink) registerLink.classList.remove('d-none');

        // Esconde as informações do usuário
        if (userInfo) {
            userInfo.classList.add('d-none');
            userInfo.classList.remove('d-flex');
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login 2.html';
        });
    }
}); 