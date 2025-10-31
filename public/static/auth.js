// Sistema de Autenticação JP Group
// Senha de acesso: jpgroup2024 (pode ser alterada)

const AUTH_CONFIG = {
  password: 'jpgroup2024', // Altere esta senha
  sessionKey: 'jpgroup_auth',
  expiryHours: 24
};

// Função para fazer login
function login(password) {
  if (password === AUTH_CONFIG.password) {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + AUTH_CONFIG.expiryHours);
    
    const authData = {
      authenticated: true,
      expiry: expiry.getTime(),
      timestamp: new Date().getTime()
    };
    
    localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(authData));
    sessionStorage.setItem(AUTH_CONFIG.sessionKey, 'true');
    return true;
  }
  return false;
}

// Função para verificar se está autenticado
function isAuthenticated() {
  const authData = localStorage.getItem(AUTH_CONFIG.sessionKey);
  const sessionAuth = sessionStorage.getItem(AUTH_CONFIG.sessionKey);
  
  if (!authData || !sessionAuth) {
    return false;
  }
  
  try {
    const data = JSON.parse(authData);
    const now = new Date().getTime();
    
    if (now > data.expiry) {
      logout();
      return false;
    }
    
    return data.authenticated === true;
  } catch (e) {
    return false;
  }
}

// Função para fazer logout
function logout() {
  localStorage.removeItem(AUTH_CONFIG.sessionKey);
  sessionStorage.removeItem(AUTH_CONFIG.sessionKey);
  window.location.href = '/login';
}

// Função para proteger páginas
function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = '/login';
  }
}

// Função para processar o formulário de login
function handleLogin(event) {
  event.preventDefault();
  
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message');
  const submitButton = document.getElementById('submit-button');
  
  const password = passwordInput.value;
  
  // Desabilitar botão durante processamento
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Verificando...';
  
  setTimeout(() => {
    if (login(password)) {
      // Login bem-sucedido
      submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Acesso Liberado!';
      submitButton.classList.remove('btn-primary');
      submitButton.classList.add('bg-green-500');
      
      setTimeout(() => {
        window.location.href = '/membros';
      }, 500);
    } else {
      // Senha incorreta
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = '❌ Senha incorreta. Tente novamente.';
      passwordInput.value = '';
      passwordInput.focus();
      
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-unlock mr-2"></i>Acessar Conteúdo';
      
      // Adicionar shake animation
      passwordInput.classList.add('animate-shake');
      setTimeout(() => {
        passwordInput.classList.remove('animate-shake');
      }, 500);
    }
  }, 800);
}

// Exportar funções
if (typeof window !== 'undefined') {
  window.jpAuth = {
    login,
    logout,
    isAuthenticated,
    protectPage,
    handleLogin
  };
}
