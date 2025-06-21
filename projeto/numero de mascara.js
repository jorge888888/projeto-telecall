// Controle do tema
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Verifica se há uma preferência salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  // Verifica a preferência do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDark ? 'dark' : 'light';
  htmlElement.setAttribute('data-bs-theme', initialTheme);
  updateThemeIcon(initialTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Validação do Bootstrap
(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      if (!form.checkValidity()) {
        event.stopPropagation()
      } else {
        // Simula envio
        document.getElementById('successMessage').textContent = 'Login realizado com sucesso!'
        document.getElementById('successMessage').style.display = 'block'
        form.reset()
      }
      form.classList.add('was-validated')
    })
  })
})()

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  sidebar.classList.toggle('active');
  container.classList.toggle('sidebar-active');
});

// Fechar sidebar ao clicar em um link
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    sidebar.classList.remove('active');
    container.classList.remove('sidebar-active');
  });
});

// Fechar sidebar ao clicar fora

// Botão Cadastrar
document.getElementById('btnCadastro').addEventListener('click', function() {
  alert('Funcionalidade de cadastro estará disponível em breve!');
});