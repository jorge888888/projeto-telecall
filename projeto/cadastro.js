// Controle do tema
document.addEventListener('DOMContentLoaded', function() {
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
    
    console.log('Tema alterado para:', newTheme); // Debug
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
    } else {
      themeIcon.className = 'fas fa-sun';
    }
  }
});

// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  
  let soma = 0;
  let resto;
  
  if (cpf === '00000000000') return false;
  
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

// Máscaras para inputs
function mascara(input, mascara) {
  input.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    let padrao = '';
    
    for (let i = 0, j = 0; i < mascara.length && j < valor.length; i++) {
      if (mascara[i] === '#') {
        padrao += valor[j];
        j++;
      } else {
        padrao += mascara[i];
      }
    }
    
    e.target.value = padrao;
  });
}

// Aplicando máscaras
mascara(document.getElementById('cpf'), '###.###.###-##');
mascara(document.getElementById('celular'), '(##) #####-####');
mascara(document.getElementById('fixo'), '(##) ####-####');

// Validação de senha
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmar_senha');
const requirements = document.querySelectorAll('.requirement');

function validarSenha(value) {
  const validacoes = {
    length: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[!@#$%^&*]/.test(value)
  };

  requirements.forEach(req => {
    const tipo = req.dataset.requirement;
    if (validacoes[tipo]) {
      req.classList.add('valid');
    } else {
      req.classList.remove('valid');
    }
  });

  return Object.values(validacoes).every(v => v);
}

senha.addEventListener('input', (e) => {
  validarSenha(e.target.value);
});

// Validação do formulário
const form = document.getElementById('cadastroForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btnCadastrar = form.querySelector('.btn.cadastrar');
  const loading = btnCadastrar.querySelector('.loading');
  
  // Validações
  if (!validarCPF(document.getElementById('cpf').value)) {
    alert('CPF inválido!');
    return;
  }

  if (!validarSenha(senha.value)) {
    alert('A senha não atende aos requisitos!');
    return;
  }

  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem!');
    return;
  }

  // Simulando envio
  try {
    btnCadastrar.disabled = true;
    loading.classList.add('active');
    
    // Simula uma requisição
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Coleta e salva os dados no localStorage
    const nome = document.getElementById('nome').value;
    const login = document.getElementById('login').value;
    const email = document.getElementById('email').value;
    const userPassword = document.getElementById('senha').value;

    const user = { nome, login, email, password: userPassword };
    
    // Pega a lista de usuários existente ou cria uma nova
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Loga o usuário recém-cadastrado
    localStorage.setItem('loggedInUser', JSON.stringify({ nome, login, email }));
    localStorage.setItem('isLoggedIn', 'true');

    alert('Cadastro realizado com sucesso! Redirecionando...');
    
    // Redireciona para a página inicial
    window.location.href = 'inicio.html';

  } catch (error) {
    alert('Erro ao realizar cadastro. Tente novamente.');
  } finally {
    btnCadastrar.disabled = false;
    loading.classList.remove('active');
  }
});

// Validação de idade
document.getElementById('nascimento').addEventListener('change', (e) => {
  const data = new Date(e.target.value);
  const hoje = new Date();
  const idade = hoje.getFullYear() - data.getFullYear();
  
  if (idade < 18) {
    alert('Você deve ter pelo menos 18 anos para se cadastrar.');
    e.target.value = '';
  }
});

// Prevenir envio do form com Enter
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});