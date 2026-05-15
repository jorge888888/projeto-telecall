// Aguarda o documento estar pronto
$(document).ready(function() {
  
  // Controle do tema
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

  // Event listener para alternar tema
  themeToggle.on('click', function() {
    const currentTheme = htmlElement.attr('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.attr('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Adicionar animação de transição
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

  // Validação do formulário com jQuery
  $('#loginForm').on('submit', function(event) {
    event.preventDefault();
    
    const login = $('#login').val().trim();
    const senha = $('#senha').val().trim();
    const submitBtn = $(this).find('button[type="submit"]');
    
    // Limpar mensagens anteriores
    $('.alert').hide();
    $('.is-invalid').removeClass('is-invalid');
    
    let isValid = true;
    
    // Validar login
    if (!login) {
      $('#login').addClass('is-invalid');
      $('#loginError').text('Por favor, digite seu login');
      isValid = false;
    } else if (login.length < 3) {
      $('#login').addClass('is-invalid');
      $('#loginError').text('Login deve ter pelo menos 3 caracteres');
      isValid = false;
    }
    
    // Validar senha
    if (!senha) {
      $('#senha').addClass('is-invalid');
      $('#senhaError').text('Por favor, digite sua senha');
      isValid = false;
    } else if (senha.length < 6) {
      $('#senha').addClass('is-invalid');
      $('#senhaError').text('Senha deve ter pelo menos 6 caracteres');
      isValid = false;
    }
    
    if (!isValid) {
      // Adicionar efeito shake nos campos com erro
      $('.is-invalid').addClass('shake');
      setTimeout(() => {
        $('.is-invalid').removeClass('shake');
      }, 500);
      return;
    }
    
    // Desabilitar botão e mostrar loading
    submitBtn.prop('disabled', true);
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Entrando...');
    
    // Simular envio do formulário
    setTimeout(() => {
      // Autenticação via localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = users.find(user => user.login === login && user.password === senha);

      if (foundUser) {
        // Salva o usuário logado e o status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify({
          nome: foundUser.nome,
          login: foundUser.login,
          email: foundUser.email
        }));

        showSuccessMessage('Login realizado com sucesso! Redirecionando...');
        
        // Redirecionar após sucesso
        setTimeout(() => {
          window.location.href = 'inicio.html';
        }, 1500);
      } else {
        showErrorMessage('Login ou senha incorretos');
      }
      
      // Restaurar botão
      submitBtn.prop('disabled', false);
      submitBtn.html(originalText);
    }, 1000);
  });

  // Funções para mostrar mensagens
  function showSuccessMessage(message) {
    $('#successMessage').text(message).fadeIn();
    setTimeout(() => {
      $('#successMessage').fadeOut();
    }, 5000);
  }

  function showErrorMessage(message) {
    $('#errorMessage').text(message).fadeIn();
    setTimeout(() => {
      $('#errorMessage').fadeOut();
    }, 5000);
  }

  // Botão Cadastrar
  $('#btnCadastro').on('click', function() {
    const btn = $(this);
    btn.prop('disabled', true);
    btn.html('<i class="fas fa-spinner fa-spin me-2"></i>Carregando...');
    
    setTimeout(() => {
      window.location.href = 'cadastro (1).html';
    }, 500);
  });

  // Validação em tempo real
  $('#login').on('input', function() {
    if ($(this).hasClass('is-invalid')) {
      $(this).removeClass('is-invalid');
      $('#loginError').text('');
    }
  });

  $('#senha').on('input', function() {
    if ($(this).hasClass('is-invalid')) {
      $(this).removeClass('is-invalid');
      $('#senhaError').text('');
    }
  });

  // Efeitos de hover nos campos
  $('.form-control').on('focus', function() {
    $(this).parent().addClass('focused');
  }).on('blur', function() {
    $(this).parent().removeClass('focused');
  });

  // Animações de entrada
  $('.login-box').hide().fadeIn(600);
  $('.hero-image').hide().fadeIn(800);

  // Efeitos de hover no menu
  $('.nav-link').on('mouseenter', function() {
    $(this).addClass('hover-effect');
  }).on('mouseleave', function() {
    $(this).removeClass('hover-effect');
  });

  // Melhorar acessibilidade
  $(document).on('keydown', function(event) {
    // Alternar tema com Ctrl+T
    if (event.ctrlKey && event.key === 't') {
      event.preventDefault();
      themeToggle.click();
    }
  });

  // Adicionar estilos CSS dinâmicos
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .shake {
        animation: shake 0.5s ease-in-out;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .focused {
        transform: scale(1.02);
        transition: transform 0.2s ease;
      }
      
      .hover-effect {
        transform: translateY(-2px);
        transition: transform 0.3s ease;
      }
      
      .nav-link {
        position: relative;
        overflow: hidden;
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: #9AB8E0;
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }
      
      .nav-link:hover::after {
        width: 100%;
      }
    `)
    .appendTo('head');

  // Efeito de loading nos botões
  $('.btn').on('click', function() {
    if (!$(this).prop('disabled')) {
      $(this).addClass('btn-loading');
      setTimeout(() => {
        $(this).removeClass('btn-loading');
      }, 1000);
    }
  });

  // Tooltip para campos de formulário
  $('.form-control').tooltip({
    placement: 'top',
    trigger: 'focus'
  });

  // Smooth scroll para links internos
  $('a[href^="#"]').on('click', function(event) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  // Efeito parallax suave no hero
  $(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    $('.hero-image').css('transform', `translateY(${scrolled * 0.1}px)`);
  });

  // Adicionar classe ativa ao link do menu atual
  const currentPage = window.location.pathname.split('/').pop();
  $('.nav-link').each(function() {
    const href = $(this).attr('href');
    if (href === currentPage || (currentPage === '' && href === '#')) {
      $(this).addClass('active');
    }
  });

  // Console log para debug
  console.log('Login page loaded successfully with jQuery!');
  console.log('Credenciais de teste: admin / 123456');
});

// Função global para alternar tema (para compatibilidade)
function toggleTheme() {
  $('#themeToggle').click();
}

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