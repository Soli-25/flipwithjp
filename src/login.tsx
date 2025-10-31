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

          {/* Aviso Especial - Lançamento do Livro */}
          <div class="mb-12 luxury-card p-8 rounded-2xl border-2 border-gold-400 bg-gradient-to-r from-gold-400 from-opacity-10 to-gold-300 to-opacity-5">
            <div class="flex items-start gap-6 flex-col md:flex-row">
              <div class="w-20 h-20 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-star text-black text-3xl"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3 flex-wrap">
                  <span class="px-4 py-1 bg-gold-400 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                    🎉 Lançamento em Breve
                  </span>
                </div>
                <h3 class="font-display text-3xl font-bold gradient-gold mb-3">
                  "The Million Dollar Code"
                </h3>
                <p class="text-gray-300 text-lg mb-4">
                  O livro físico de <strong>Juscelio Cruz</strong> está chegando! Sistema completo de flipping houses revelado em detalhes nunca antes compartilhados.
                </p>
                <div class="flex flex-wrap gap-4 items-center">
                  <div class="text-sm text-gray-400">
                    <i class="fas fa-calendar-check mr-2 text-gold-400"></i>
                    Previsão: 2025
                  </div>
                  <div class="text-sm text-gray-400">
                    <i class="fas fa-book-open mr-2 text-gold-400"></i>
                    200+ páginas de conteúdo premium
                  </div>
                  <a href="#contato" class="text-gold-400 hover:text-gold-300 font-semibold text-sm transition">
                    Ser notificado no lançamento →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Agenda de Mentorias */}
          <div class="mb-12">
            <h2 class="font-display text-3xl font-bold gradient-gold mb-6 text-center">
              <i class="fas fa-calendar-alt mr-3"></i>
              Agenda de Mentorias Ao Vivo
            </h2>
            <p class="text-center text-gray-400 mb-8 max-w-3xl mx-auto">
              Sessões exclusivas com Juscelio Cruz para Q&A, análise de deals e estratégias avançadas.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sessão 1 */}
              <div class="luxury-card p-6 rounded-xl border-l-4 border-gold-400">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gold-400 bg-opacity-20 rounded-full flex items-center justify-center">
                      <i class="fas fa-video text-gold-400"></i>
                    </div>
                    <div>
                      <div class="font-bold text-lg">Q&A Mensal</div>
                      <div class="text-sm text-gray-400">Perguntas e Respostas</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 text-xs font-semibold rounded-full">
                    Próxima
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-calendar w-5 text-gold-400"></i>
                    <span>Primeira Sexta de cada mês</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-clock w-5 text-gold-400"></i>
                    <span>19:00 - 21:00 (EST)</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-users w-5 text-gold-400"></i>
                    <span>Máx 20 participantes</span>
                  </div>
                </div>
                <button class="mt-4 w-full px-4 py-2 bg-gold-400 bg-opacity-20 hover:bg-opacity-30 text-gold-400 rounded-lg font-semibold transition">
                  Reservar Vaga
                </button>
              </div>

              {/* Sessão 2 */}
              <div class="luxury-card p-6 rounded-xl border-l-4 border-blue-400">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center">
                      <i class="fas fa-chart-line text-blue-400"></i>
                    </div>
                    <div>
                      <div class="font-bold text-lg">Deal Analysis</div>
                      <div class="text-sm text-gray-400">Análise de Propriedades</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 text-xs font-semibold rounded-full">
                    Quinzenal
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-calendar w-5 text-gold-400"></i>
                    <span>2ª e 4ª semanas do mês</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-clock w-5 text-gold-400"></i>
                    <span>20:00 - 21:30 (EST)</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-home w-5 text-gold-400"></i>
                    <span>3-5 deals analisados</span>
                  </div>
                </div>
                <button class="mt-4 w-full px-4 py-2 bg-blue-400 bg-opacity-20 hover:bg-opacity-30 text-blue-400 rounded-lg font-semibold transition">
                  Enviar Meu Deal
                </button>
              </div>

              {/* Sessão 3 */}
              <div class="luxury-card p-6 rounded-xl border-l-4 border-purple-400">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-purple-400 bg-opacity-20 rounded-full flex items-center justify-center">
                      <i class="fas fa-graduation-cap text-purple-400"></i>
                    </div>
                    <div>
                      <div class="font-bold text-lg">Masterclass</div>
                      <div class="text-sm text-gray-400">Tópico Avançado</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-purple-500 bg-opacity-20 text-purple-400 text-xs font-semibold rounded-full">
                    Mensal
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-calendar w-5 text-gold-400"></i>
                    <span>Última Terça do mês</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-clock w-5 text-gold-400"></i>
                    <span>19:30 - 22:00 (EST)</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-brain w-5 text-gold-400"></i>
                    <span>Tópico rotativo mensal</span>
                  </div>
                </div>
                <button class="mt-4 w-full px-4 py-2 bg-purple-400 bg-opacity-20 hover:bg-opacity-30 text-purple-400 rounded-lg font-semibold transition">
                  Ver Próximo Tópico
                </button>
              </div>

              {/* Sessão 4 */}
              <div class="luxury-card p-6 rounded-xl border-l-4 border-red-400">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-red-400 bg-opacity-20 rounded-full flex items-center justify-center">
                      <i class="fas fa-handshake text-red-400"></i>
                    </div>
                    <div>
                      <div class="font-bold text-lg">Office Hours</div>
                      <div class="text-sm text-gray-400">Consultoria 1-on-1</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-red-500 bg-opacity-20 text-red-400 text-xs font-semibold rounded-full">
                    Premium
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-calendar w-5 text-gold-400"></i>
                    <span>Agendamento flexível</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-clock w-5 text-gold-400"></i>
                    <span>30-60 minutos</span>
                  </div>
                  <div class="flex items-center text-gray-300">
                    <i class="fas fa-star w-5 text-gold-400"></i>
                    <span>Membros Inner Circle</span>
                  </div>
                </div>
                <button class="mt-4 w-full px-4 py-2 bg-red-400 bg-opacity-20 hover:bg-opacity-30 text-red-400 rounded-lg font-semibold transition">
                  Agendar Sessão
                </button>
              </div>
            </div>
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
              <a href="/biblioteca" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
                Acessar Biblioteca →
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
