import { Hono } from 'hono'
import { renderer } from './renderer'

const loginApp = new Hono()

loginApp.use(renderer)

// Rota de Login/Acesso
loginApp.get('/acesso', (c) => {
  return c.render(
    <div class="relative min-h-screen flex items-center justify-center hero-bg">
      <div class="hero-content w-full">
        <div class="max-w-md mx-auto px-6">
          
          {/* Logo e Título */}
          <div class="text-center mb-8">
            <div class="font-display text-3xl font-bold gradient-gold mb-2">JP GROUP</div>
            <h1 class="font-display text-3xl font-bold mb-2">Área de Membros</h1>
            <p class="text-gray-400">Acesse o conteúdo exclusivo da Mentoria Master Flip</p>
          </div>

          {/* Card de Login */}
          <div class="luxury-card p-8 rounded-2xl">
            <form id="loginForm" class="space-y-6">
              
              {/* Campo de Email */}
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-300 mb-2">
                  <i class="fas fa-envelope mr-2 text-gold-400"></i>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 text-white transition"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Campo de Senha */}
              <div>
                <label for="password" class="block text-sm font-semibold text-gray-300 mb-2">
                  <i class="fas fa-lock mr-2 text-gold-400"></i>
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  class="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 text-white transition"
                  placeholder="••••••••"
                />
              </div>

              {/* Botão de Login */}
              <button
                type="submit"
                class="w-full btn-primary px-6 py-4 rounded-lg text-lg font-semibold"
              >
                <i class="fas fa-sign-in-alt mr-2"></i>
                Acessar Conteúdo
              </button>

              {/* Mensagem de Erro */}
              <div id="errorMessage" class="hidden p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-400 text-sm"></div>

              {/* Mensagem de Sucesso */}
              <div id="successMessage" class="hidden p-4 bg-green-500 bg-opacity-10 border border-green-500 rounded-lg text-green-400 text-sm"></div>
            </form>

            {/* Informações de Ajuda */}
            <div class="mt-6 pt-6 border-t border-gray-700">
              <p class="text-sm text-gray-400 text-center mb-3">
                <i class="fas fa-info-circle mr-2"></i>
                Ainda não tem acesso?
              </p>
              <div class="flex flex-col gap-2">
                <a href="#contato" class="text-center text-sm text-gold-400 hover:text-gold-300 transition">
                  <i class="fas fa-envelope mr-2"></i>
                  Solicitar Acesso à Mentoria
                </a>
                <a href="/" class="text-center text-sm text-gray-400 hover:text-white transition">
                  <i class="fas fa-arrow-left mr-2"></i>
                  Voltar ao Site
                </a>
              </div>
            </div>
          </div>

          {/* Credenciais de Demonstração */}
          <div class="mt-6 luxury-card p-6 rounded-xl border-2 border-gold-400">
            <div class="text-center">
              <div class="text-sm text-gold-400 font-semibold mb-3">
                <i class="fas fa-key mr-2"></i>
                Credenciais de Demonstração
              </div>
              <div class="text-xs text-gray-400 space-y-1">
                <div><strong>Email:</strong> demo@jpgroup.com</div>
                <div><strong>Senha:</strong> mentoria2024</div>
              </div>
              <div class="mt-3 text-xs text-gray-500">
                Use estas credenciais para testar o acesso
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* JavaScript para Login */}
      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const errorMsg = document.getElementById('errorMessage');
          const successMsg = document.getElementById('successMessage');
          
          // Limpar mensagens anteriores
          errorMsg.classList.add('hidden');
          successMsg.classList.add('hidden');
          
          // Credenciais de demonstração (em produção, isso seria uma API)
          const validCredentials = {
            'demo@jpgroup.com': 'mentoria2024',
            'contato@jpgroupc.com': 'jpgroup2024',
            'admin@jpgroup.com': 'admin2024'
          };
          
          // Validar credenciais
          if (validCredentials[email] && validCredentials[email] === password) {
            // Login bem-sucedido
            successMsg.textContent = '✓ Login bem-sucedido! Redirecionando...';
            successMsg.classList.remove('hidden');
            
            // Salvar token de acesso (simulado)
            localStorage.setItem('jp_access_token', btoa(email + ':' + Date.now()));
            localStorage.setItem('jp_user_email', email);
            
            // Redirecionar após 1.5 segundos
            setTimeout(() => {
              window.location.href = '/mentoria';
            }, 1500);
          } else {
            // Login falhou
            errorMsg.textContent = '✗ Email ou senha incorretos. Tente novamente.';
            errorMsg.classList.remove('hidden');
          }
        });
      `}}>
      </script>
    </div>
  )
})

// Rota da Área de Membros (Protegida)
loginApp.get('/mentoria', (c) => {
  return c.render(
    <div class="relative min-h-screen hero-bg">
      <div class="hero-content">
        
        {/* Header da Área de Membros */}
        <nav class="navbar fixed w-full top-0 z-50">
          <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
              <div class="font-display text-2xl font-bold gradient-gold">JP GROUP</div>
              <div class="flex items-center gap-4">
                <span id="userEmail" class="text-sm text-gray-400"></span>
                <button onclick="logout()" class="btn-secondary px-4 py-2 rounded-full text-sm">
                  <i class="fas fa-sign-out-alt mr-2"></i>
                  Sair
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Conteúdo da Mentoria */}
        <div class="max-w-7xl mx-auto px-6 pt-32 pb-20">
          
          <div class="text-center mb-12">
            <div class="inline-block mb-4 px-6 py-2 luxury-badge rounded-full text-gold-400 text-sm font-semibold">
              <i class="fas fa-crown mr-2"></i>
              ÁREA EXCLUSIVA
            </div>
            <h1 class="font-display text-4xl md:text-6xl font-bold mb-4">
              Mentoria <span class="gradient-gold">Master Flip</span>
            </h1>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Bem-vindo ao conteúdo exclusivo. Aqui você tem acesso a todo material da mentoria.
            </p>
          </div>

          {/* Grid de Conteúdos */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Módulo 1 */}
            <div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
              <div class="w-16 h-16 bg-gold-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-book text-gold-400 text-2xl"></i>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">Ebook Completo</h3>
              <p class="text-gray-400 mb-4">
                O Código de Um Milhão de Dólares - Partes 1 e 2
              </p>
              <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Acessar PDF →
              </a>
            </div>

            {/* Módulo 2 */}
            <div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
              <div class="w-16 h-16 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-video text-blue-400 text-2xl"></i>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">Aulas em Vídeo</h3>
              <p class="text-gray-400 mb-4">
                Masterclasses com Juscelio Cruz
              </p>
              <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Assistir Aulas →
              </a>
            </div>

            {/* Módulo 3 */}
            <div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
              <div class="w-16 h-16 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-calculator text-green-400 text-2xl"></i>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">Planilhas</h3>
              <p class="text-gray-400 mb-4">
                Flip Calculator e ferramentas de análise
              </p>
              <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Download Planilhas →
              </a>
            </div>

            {/* Módulo 4 */}
            <div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
              <div class="w-16 h-16 bg-purple-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-users text-purple-400 text-2xl"></i>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">Comunidade</h3>
              <p class="text-gray-400 mb-4">
                Grupo exclusivo de membros
              </p>
              <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Entrar no Grupo →
              </a>
            </div>

            {/* Módulo 5 */}
            <div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
              <div class="w-16 h-16 bg-red-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-calendar text-red-400 text-2xl"></i>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">Sessões Ao Vivo</h3>
              <p class="text-gray-400 mb-4">
                Q&A mensal com Juscelio Cruz
              </p>
              <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Agendar Sessão →
              </a>
            </div>

            {/* Módulo 6 */}
            <div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
              <div class="w-16 h-16 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-tools text-yellow-400 text-2xl"></i>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">Recursos Extras</h3>
              <p class="text-gray-400 mb-4">
                Templates, contratos e checklists
              </p>
              <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Ver Recursos →
              </a>
            </div>
          </div>

          {/* Botão de Voltar */}
          <div class="text-center mt-12">
            <a href="/" class="btn-secondary px-8 py-3 rounded-full">
              <i class="fas fa-home mr-2"></i>
              Voltar ao Site Principal
            </a>
          </div>
        </div>
      </div>

      {/* JavaScript para Verificação de Acesso */}
      <script dangerouslySetInnerHTML={{__html: `
        // Verificar se usuário está logado
        const token = localStorage.getItem('jp_access_token');
        const userEmail = localStorage.getItem('jp_user_email');
        
        if (!token) {
          // Redirecionar para login se não estiver autenticado
          window.location.href = '/acesso';
        } else {
          // Mostrar email do usuário
          document.getElementById('userEmail').textContent = userEmail;
        }
        
        // Função de logout
        function logout() {
          localStorage.removeItem('jp_access_token');
          localStorage.removeItem('jp_user_email');
          window.location.href = '/acesso';
        }
      `}}>
      </script>
    </div>
  )
})

export default loginApp
