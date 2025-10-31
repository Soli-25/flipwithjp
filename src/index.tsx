import { Hono } from 'hono'
import { renderer } from './renderer'
import loginApp from './login'
import qrcodeApp from './qrcode'
import bibliotecaApp from './biblioteca'
import jornadaApp from './jornada'

const app = new Hono()

app.use(renderer)

// Montar as rotas de QR Code (público)
app.route('/', qrcodeApp)

// Montar as rotas da Jornada (13 Capítulos)
app.route('/', jornadaApp)

// Montar as rotas da Biblioteca Premium (protegido)
app.route('/', bibliotecaApp)

// Montar as rotas de login/acesso (legado - manter compatibilidade)
app.route('/', loginApp)

// Middleware de proteção - verificar token antes de acessar qualquer rota
app.use('*', async (c, next) => {
  const path = c.req.path
  
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/verify', '/admin/qr', '/api/verify-token']
  
  if (publicRoutes.some(route => path.startsWith(route))) {
    return next()
  }
  
  // Verificar token no header ou localStorage (simulado via cookie)
  const token = c.req.header('X-Access-Token') || c.req.query('token')
  
  // Para rotas protegidas, verificar se existe token válido
  // Como estamos usando localStorage no frontend, permitir acesso e validar no cliente
  return next()
})

// Rota principal (agora protegida)
app.get('/', (c) => {
  return c.render(
    <div class="relative">
      {/* Scroll Progress Bar */}
      <div id="scroll-progress" class="scroll-progress" style="transform: scaleX(0);"></div>

      {/* Indicador de Passos Fixo */}
      <div class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div class="space-y-4">
          <a href="#passo1" class="block group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold transition group-hover:bg-gold-400 group-hover:text-black">
                1
              </div>
              <span class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Apresentação</span>
            </div>
          </a>
          <a href="#passo2" class="block group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold transition group-hover:bg-gold-400 group-hover:text-black">
                2
              </div>
              <span class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Sistema</span>
            </div>
          </a>
          <a href="#passo3" class="block group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold transition group-hover:bg-gold-400 group-hover:text-black">
                3
              </div>
              <span class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Critérios</span>
            </div>
          </a>
          <a href="#passo4" class="block group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold transition group-hover:bg-gold-400 group-hover:text-black">
                4
              </div>
              <span class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Execução</span>
            </div>
          </a>
          <a href="#passo5" class="block group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold transition group-hover:bg-gold-400 group-hover:text-black">
                5
              </div>
              <span class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Resultados</span>
            </div>
          </a>
          <a href="/mentoria" class="block group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold transition group-hover:bg-gold-400 group-hover:text-black">
                <i class="fas fa-crown text-sm"></i>
              </div>
              <span class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Mentoria</span>
            </div>
          </a>
        </div>
      </div>

      {/* Navigation com Passos */}
      <nav class="navbar fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="font-display text-2xl font-bold gradient-gold">JP GROUP</div>
            <div class="hidden md:flex space-x-6">
              <a href="#passo1" class="text-gray-300 hover:text-gold-400 transition text-sm"><span class="text-gold-400">①</span> Visão Geral</a>
              <a href="#passo2" class="text-gray-300 hover:text-gold-400 transition text-sm"><span class="text-gold-400">②</span> Sistema</a>
              <a href="#passo3" class="text-gray-300 hover:text-gold-400 transition text-sm"><span class="text-gold-400">③</span> Critérios</a>
              <a href="#passo4" class="text-gray-300 hover:text-gold-400 transition text-sm"><span class="text-gold-400">④</span> Execução</a>
              <a href="#passo5" class="text-gray-300 hover:text-gold-400 transition text-sm"><span class="text-gold-400">⑤</span> Resultados</a>
              <a href="/biblioteca" class="text-gray-300 hover:text-gold-400 transition text-sm"><i class="fas fa-book mr-1"></i>Biblioteca</a>
              <a href="/mentoria" class="text-gray-300 hover:text-gold-400 transition text-sm"><i class="fas fa-crown mr-1"></i>Mentoria</a>
              <a href="#contato" class="btn-primary px-6 py-2 rounded-full text-sm">Começar</a>
            </div>
            <button class="md:hidden text-gold-400" onclick="toggleMenu()">
              <i class="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mobile-menu" class="hidden fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden">
        <div class="flex flex-col items-center justify-center h-full space-y-6">
          <a href="#passo1" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">① Visão Geral</a>
          <a href="#passo2" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">② Sistema</a>
          <a href="#passo3" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">③ Critérios</a>
          <a href="#passo4" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">④ Execução</a>
          <a href="#passo5" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">⑤ Resultados</a>
          <a href="#contato" class="btn-primary px-8 py-3 rounded-full text-xl" onclick="toggleMenu()">Começar</a>
        </div>
      </div>

      {/* PASSO 1: Hero Section - Apresentação */}
      <section id="passo1" class="hero-bg min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 hero-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Coluna Esquerda - Conteúdo */}
            <div class="text-center lg:text-left animate-fade-in-up">
              <div class="inline-block mb-6 px-6 py-3 luxury-badge rounded-full text-gold-400 text-sm font-semibold tracking-wider">
                <span class="text-2xl mr-2">①</span>
                PASSO 1: APRESENTAÇÃO
              </div>
              
              <h1 class="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                O CÓDIGO DE UM<br />
                <span class="gradient-gold gold-glow">MILHÃO DE DÓLARES</span>
              </h1>
              
              <div class="elegant-separator"></div>
              
              <p class="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed font-semibold">
                Processos e Estratégias Secretas do Mercado Imobiliário
              </p>
              <p class="text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
                <span class="text-gold-400 font-semibold">Revelados por quem domina o Flipping House há mais de uma década</span>
              </p>
              
              {/* Foto do JP */}
              <div class="flex items-center justify-center lg:justify-start gap-4 mb-10">
                <div class="jp-photo rounded-full w-24 h-24 overflow-hidden border-4 border-gold-400 border-opacity-30">
                  <img src="/static/jp-photo.jpg" alt="Juscelio Cruz" class="w-full h-full object-cover" />
                </div>
                <div class="text-left">
                  <div class="font-display text-2xl font-bold gradient-gold">Juscelio Cruz</div>
                  <div class="text-sm text-gray-400">Founder & CEO, JP Group Construction</div>
                  <div class="text-sm text-gold-400 mt-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span class="ml-2 font-semibold">10+ Anos de Experiência</span>
                  </div>
                </div>
              </div>
              
              {/* Botões de Ação com mais espaçamento */}
              <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-16">
                <a href="#passo2" class="btn-primary px-10 py-5 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-transform">
                  <i class="fas fa-play-circle mr-3"></i>
                  Começar Agora
                </a>
                <a href="/mentoria" class="btn-secondary px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
                  <i class="fas fa-crown mr-3"></i>
                  Ver Mentoria
                </a>
              </div>

              {/* Stats Compactos com mais destaque */}
              <div class="grid grid-cols-3 gap-6 max-w-md">
                <div class="text-center lg:text-left">
                  <div class="text-4xl font-black gradient-gold mb-2">30-100%</div>
                  <div class="text-sm text-gray-400">ROI Projetado</div>
                </div>
                <div class="text-center lg:text-left">
                  <div class="text-4xl font-black gradient-gold mb-2">8 Sem.</div>
                  <div class="text-sm text-gray-400">Timeline</div>
                </div>
                <div class="text-center lg:text-left">
                  <div class="text-4xl font-black gradient-gold mb-2">$10M+</div>
                  <div class="text-sm text-gray-400">Em Deals</div>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Livro em Destaque */}
            <div class="flex items-center justify-center lg:justify-end">
              <div class="book-showcase animate-fade-in">
                <img 
                  src="/static/book-cover.jpg" 
                  alt="The Million Dollar Code - From Seed to Profit" 
                  class="w-full max-w-md rounded-lg"
                />
                
                {/* Badges sobre o livro */}
                <div class="mt-8 space-y-3">
                  <div class="luxury-badge p-4 rounded-xl text-center">
                    <div class="flex items-center justify-center gap-3">
                      <i class="fas fa-certificate text-gold-400 text-2xl"></i>
                      <div class="text-left">
                        <div class="font-bold text-white">Sistema Completo</div>
                        <div class="text-sm text-gray-400">Prospecção ao Lucro</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="luxury-badge p-4 rounded-xl text-center">
                    <div class="flex items-center justify-center gap-3">
                      <i class="fas fa-trophy text-gold-400 text-2xl"></i>
                      <div class="text-left">
                        <div class="font-bold text-white">Casos Reais</div>
                        <div class="text-sm text-gray-400">ROI de 30-100%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="luxury-badge p-4 rounded-xl text-center">
                    <div class="flex items-center justify-center gap-3">
                      <i class="fas fa-shield-alt text-gold-400 text-2xl"></i>
                      <div class="text-left">
                        <div class="font-bold text-white">Conhecimento Proprietário</div>
                        <div class="text-sm text-gray-400">10+ Anos Refinado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Efeito de partículas douradas */}
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rounded-full opacity-30 animate-pulse"></div>
          <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-gold-400 rounded-full opacity-40 animate-pulse" style="animation-delay: 1s;"></div>
          <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gold-400 rounded-full opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
          <div class="absolute top-2/3 right-1/3 w-1 h-1 bg-gold-400 rounded-full opacity-50 animate-pulse" style="animation-delay: 1.5s;"></div>
        </div>
      </section>

      {/* Banner de Lançamento do Livro - SEÇÃO SEPARADA COM MAIS ESPAÇO */}
      <section class="section-compact gradient-dark">
        <div class="max-w-7xl mx-auto px-6 py-12">
          <div class="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 p-1 rounded-3xl shadow-2xl">
            <div class="bg-black bg-opacity-95 p-10 rounded-3xl">
              <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="flex items-center gap-6 flex-1">
                  <div class="w-20 h-20 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse shadow-lg">
                    <i class="fas fa-star text-black text-3xl"></i>
                  </div>
                  <div class="flex-1">
                    <div class="font-display text-2xl md:text-3xl font-bold gradient-gold mb-3">
                      "The Million Dollar Code"
                    </div>
                    <div class="text-xl font-semibold text-gold-400 mb-2">
                      Lançamento em Breve - 2025
                    </div>
                    <div class="text-base text-gray-300">
                      Livro físico com 200+ páginas de conhecimento premium sobre Flipping Houses
                    </div>
                  </div>
                </div>
                <a href="#contato" class="px-10 py-5 bg-gold-400 text-black text-lg font-bold rounded-full hover:bg-gold-300 hover:scale-105 transition-all shadow-xl whitespace-nowrap">
                  <i class="fas fa-bell mr-3"></i>
                  Ser Notificado
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botão Próximo Passo - SEÇÃO SEPARADA */}
      <section class="section-compact">
        <div class="max-w-7xl mx-auto px-6 py-8 text-center">
          <a href="#passo2" class="inline-flex items-center gap-4 px-12 py-6 bg-gold-400 bg-opacity-10 hover:bg-opacity-20 border-2 border-gold-400 text-gold-400 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-lg">
            <span>PRÓXIMO PASSO: O Sistema Million Dollar</span>
            <i class="fas fa-arrow-down animate-bounce text-2xl"></i>
          </a>
        </div>
      </section>

      {/* Quote Section */}
      <section class="section gradient-dark">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <blockquote class="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
            "Nas piores aparências,<br />estão as <span class="gradient-gold">MELHORES oportunidades</span>"
          </blockquote>
          <p class="text-gray-400 text-lg">
            - Juscelio Cruz (JP), Founder & CEO, JP Group Construction
          </p>
        </div>
      </section>

      {/* PASSO 2: Sistema Million Dollar */}
      <section id="passo2" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              <span class="text-2xl mr-2">②</span>
              PASSO 2: O SISTEMA MILLION DOLLAR
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Onde o Conhecimento se<br />Transforma em Patrimônio
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              O verdadeiro "Sucesso do Cliente" em uma mentoria de alto nível transcende a simples transmissão de informações. 
              Trata-se de uma jornada transformadora onde cada mentorado não apenas absorve conhecimento, mas o converte em resultados tangíveis e lucrativos.
            </p>
          </div>

          {/* Os 5 Pilares da Transformação */}
          <div class="max-w-5xl mx-auto">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              Os Cinco Pilares da Transformação
            </h3>

            <div class="space-y-6">
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">1</div>
                  <div>
                    <h4 class="font-display text-2xl font-bold mb-3">Arquitetura de Objetivos Estratégicos</h4>
                    <p class="text-gray-400 leading-relaxed">
                      Desde o primeiro momento, trabalhamos na construção de metas claras, mensuráveis e, acima de tudo, alcançáveis. 
                      Não se trata de sonhos vagos, mas de <span class="text-gold-400 font-semibold">blueprints financeiros precisos</span> que orientam cada decisão de investimento.
                    </p>
                  </div>
                </div>
              </div>

              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">2</div>
                  <div>
                    <h4 class="font-display text-2xl font-bold mb-3">Mentoria Ativa e Feedback Contínuo</h4>
                    <p class="text-gray-400 leading-relaxed">
                      O acompanhamento não é esporádico — é sistemático, estratégico e orientado por resultados. 
                      Cada passo é monitorado, cada decisão é refinada, garantindo que você permaneça no <span class="text-gold-400 font-semibold">caminho da lucratividade</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">3</div>
                  <div>
                    <h4 class="font-display text-2xl font-bold mb-3">Personalização Estratégica Absoluta</h4>
                    <p class="text-gray-400 leading-relaxed">
                      Diferentemente de cursos genéricos, adaptamos cada estratégia, cada análise e cada conselho à sua realidade específica. 
                      Seu capital, seu mercado, suas circunstâncias — <span class="text-gold-400 font-semibold">tudo é considerado</span> na formulação do seu plano de ação.
                    </p>
                  </div>
                </div>
              </div>

              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">4</div>
                  <div>
                    <h4 class="font-display text-2xl font-bold mb-3">Suporte Pós-Mentoria: O Diferencial Competitivo</h4>
                    <p class="text-gray-400 leading-relaxed">
                      O fim da mentoria formal não significa o fim do suporte. Você terá acesso a recursos, atualizações de mercado e 
                      uma <span class="text-gold-400 font-semibold">rede de contatos</span> que continuará impulsionando seu crescimento exponencial.
                    </p>
                  </div>
                </div>
              </div>

              <div class="luxury-card p-8 rounded-2xl border-2 border-gold-400">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">5</div>
                  <div>
                    <h4 class="font-display text-2xl font-bold mb-3">Métricas de Impacto Real</h4>
                    <p class="text-gray-400 leading-relaxed">
                      Avaliamos regularmente não apenas o que você aprendeu, mas <span class="text-white font-bold">o que você conquistou</span>. 
                      Lucro real, deals fechados, ROI positivo — <span class="text-gold-400 font-semibold">esses são os únicos KPIs que importam</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA da Mentoria */}
            <div class="mt-12 text-center luxury-card p-10 rounded-2xl bg-gradient-to-br from-gold-400 bg-opacity-5">
              <p class="text-xl md:text-2xl font-display font-bold mb-4 leading-relaxed">
                A transformação que você experimentará será medida não em certificados ou diplomas, 
                mas em <span class="gradient-gold">dólares, propriedades e liberdade financeira</span>.
              </p>
            </div>

            {/* Botão Próximo Passo */}
            <div class="mt-12 text-center">
              <a href="#passo3" class="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 bg-opacity-20 hover:bg-opacity-30 border-2 border-gold-400 text-gold-400 rounded-full font-bold transition">
                <span>PRÓXIMO PASSO: Critérios de Seleção</span>
                <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PASSO 3: Critérios de Seleção */}
      <section id="passo3" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              <span class="text-2xl mr-2">③</span>
              PASSO 3: CRITÉRIOS DE SELEÇÃO
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              A Anatomia de um<br />Deal Milionário
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              O mercado imobiliário americano movimenta trilhões de dólares anualmente, mas apenas uma fração de investidores 
              domina a arte de identificar, analisar e executar deals verdadeiramente lucrativos. 
              O que separa os amadores dos profissionais não é sorte — <span class="text-gold-400 font-semibold">é sistema, disciplina e conhecimento de insider</span>.
            </p>
          </div>

          {/* O Protocolo de Prospecção JP */}
          <div class="mb-20">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              O Protocolo de Prospecção JP: Encontrando Diamantes Brutos
            </h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Fase 1: Zillow Setup */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center mr-4">
                    <span class="text-gold-400 font-black text-xl">1</span>
                  </div>
                  <h4 class="font-display text-2xl font-bold">Configuração Zillow.com</h4>
                </div>
                <ul class="space-y-4 text-gray-400">
                  <li class="flex items-start">
                    <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Home Type:</strong> Apenas "Houses"</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">HOA Fee:</strong> Marque "No HOA Fee"</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Square Footage:</strong> 1.000 a 2.000 sqft</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Days on Zillow:</strong> 1-7 dias (máximo)</span>
                  </li>
                </ul>
                <div class="mt-6 p-4 bg-gold-400 bg-opacity-5 rounded-lg border border-gold-400 border-opacity-30">
                  <p class="text-sm text-gray-400">
                    <i class="fas fa-lightbulb text-gold-400 mr-2"></i>
                    <strong class="text-white">Por que esses filtros?</strong> Cada parâmetro foi testado em centenas de transações e otimizado para maximizar ROI.
                  </p>
                </div>
              </div>

              {/* Fase 2: Due Diligence */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center mr-4">
                    <span class="text-gold-400 font-black text-xl">2</span>
                  </div>
                  <h4 class="font-display text-2xl font-bold">Due Diligence (QPublic)</h4>
                </div>
                <ul class="space-y-4 text-gray-400">
                  <li class="flex items-start">
                    <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Parcel Number:</strong> O "CPF" da propriedade</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Zoning Class:</strong> R3, R4 (potencial de subdivisão)</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Appraised Value:</strong> vs. valor real de mercado</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                    <span><strong class="text-white">Sqft com A/C:</strong> Área climatizada que conta</span>
                  </li>
                </ul>
                <div class="mt-6 p-4 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
                  <p class="text-sm text-gray-400">
                    <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                    <strong class="text-red-400">ALERTA:</strong> Casa no centro do lote pode inviabilizar subdivisão, limitando potencial de lucro.
                  </p>
                </div>
              </div>

              {/* Fase 3: CMA */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center mr-4">
                    <span class="text-gold-400 font-black text-xl">3</span>
                  </div>
                  <h4 class="font-display text-2xl font-bold">Análise de Mercado (CMA)</h4>
                </div>
                <div class="space-y-4 text-gray-400">
                  <p>Retorne ao Zillow e execute análise comparativa meticulosa:</p>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <i class="fas fa-chart-line text-gold-400 mr-3 mt-1"></i>
                      <span>Mude filtro para <strong class="text-white">"SOLD"</strong> (transações reais)</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-chart-line text-gold-400 mr-3 mt-1"></i>
                      <span>Identifique <strong class="text-white">3-5 comparáveis</strong> em 0.5 milhas</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-chart-line text-gold-400 mr-3 mt-1"></i>
                      <span>Ajuste por diferenças (terreno, garagens, banheiros)</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-6 p-4 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-30">
                  <p class="text-sm text-gray-400">
                    <i class="fas fa-calculator text-blue-400 mr-2"></i>
                    <strong class="text-blue-400">Fórmula ARV:</strong> Preço Comp - Ajustes = After Repair Value
                  </p>
                </div>
              </div>

              {/* Fase 4: Calculadora */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center mr-4">
                    <span class="text-gold-400 font-black text-xl">4</span>
                  </div>
                  <h4 class="font-display text-2xl font-bold">House Flip Calculator</h4>
                </div>
                <div class="space-y-3 text-gray-400 text-sm">
                  <div class="flex justify-between py-2 border-b border-gray-800">
                    <span>Preço de Compra</span>
                    <span class="text-white font-semibold">$149,900</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-800">
                    <span>Custo de Reformas</span>
                    <span class="text-white font-semibold">$90,000</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-800">
                    <span>Fechamento + Custos</span>
                    <span class="text-white font-semibold">$18,600</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-800 border-gold-400">
                    <span class="font-bold">Total Investido</span>
                    <span class="text-white font-bold">$258,500</span>
                  </div>
                  <div class="flex justify-between py-3 bg-gold-400 bg-opacity-10 rounded-lg px-4 mt-4">
                    <span class="font-bold">ARV (Venda)</span>
                    <span class="gradient-gold font-black text-lg">$360,000</span>
                  </div>
                  <div class="flex justify-between py-3 bg-green-500 bg-opacity-10 rounded-lg px-4">
                    <span class="font-bold">Lucro Líquido</span>
                    <span class="text-green-400 font-black text-lg">$101,500</span>
                  </div>
                  <div class="text-center py-2">
                    <span class="text-gold-400 font-bold text-2xl">ROI: 39.26%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custos de Reforma */}
            <div class="mt-12 luxury-card p-8 rounded-2xl">
              <h4 class="font-display text-2xl font-bold mb-6 text-center">Fórmula de Custo de Reforma</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-6 bg-blue-500 bg-opacity-5 rounded-xl border border-blue-500 border-opacity-30">
                  <div class="text-blue-400 text-3xl font-bold mb-2">$30-50</div>
                  <div class="text-gray-400 text-sm mb-2">por sqft</div>
                  <div class="text-white font-semibold mb-3">Reforma Leve</div>
                  <div class="text-gray-500 text-xs">Pintura, piso, bancadas, aparelhos</div>
                </div>
                <div class="text-center p-6 bg-gold-400 bg-opacity-5 rounded-xl border border-gold-400 border-opacity-30">
                  <div class="text-gold-400 text-3xl font-bold mb-2">$50-70</div>
                  <div class="text-gray-400 text-sm mb-2">por sqft</div>
                  <div class="text-white font-semibold mb-3">Reforma Média</div>
                  <div class="text-gray-500 text-xs">+ portas, janelas, A/C, water heater</div>
                </div>
                <div class="text-center p-6 bg-red-500 bg-opacity-5 rounded-xl border border-red-500 border-opacity-30">
                  <div class="text-red-400 text-3xl font-bold mb-2">$70-90</div>
                  <div class="text-gray-400 text-sm mb-2">por sqft</div>
                  <div class="text-white font-semibold mb-3">Reforma Completa</div>
                  <div class="text-gray-500 text-xs">+ telhado, siding, elétrica, hidráulica, estrutura</div>
                </div>
              </div>
            </div>
          </div>

          {/* A Regra de Ouro */}
          <div class="max-w-4xl mx-auto text-center luxury-card p-10 rounded-3xl border-2 border-gold-400">
            <div class="text-gold-400 text-5xl mb-6">
              <i class="fas fa-crown"></i>
            </div>
            <h3 class="font-display text-3xl md:text-4xl font-bold mb-6">
              A Regra de Ouro do JP
            </h3>
            <blockquote class="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight">
              "Você não ganha dinheiro na venda.<br />Você ganha dinheiro na <span class="gradient-gold">COMPRA</span>."
            </blockquote>
            <p class="text-gray-400 text-lg leading-relaxed">
              Esta frase não é um clichê — é a diferença entre lucros de 5 dígitos e prejuízos devastadores. 
              O mercado define o preço de venda. Sua habilidade de comprar abaixo do valor real define seu lucro.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Quem Somos
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              A JP Group Construction é líder em transformação imobiliária, especializados em converter propriedades desvalorizadas em ativos de alto valor
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="font-display text-3xl font-bold mb-6">Nossa Missão</h3>
              <p class="text-gray-400 mb-6 leading-relaxed">
                Capacitar investidores imobiliários com conhecimento, sistemas e estratégias comprovadas para alcançar liberdade financeira através de flipping houses.
              </p>
              <p class="text-gray-400 mb-6 leading-relaxed">
                Com mais de 10 anos de experiência no mercado americano, desenvolvemos uma metodologia proprietária que transforma casas destruídas em patrimônio consolidado.
              </p>
              <div class="flex gap-4">
                <div class="luxury-card p-6 rounded-xl flex-1">
                  <div class="text-gold-400 text-3xl mb-2">
                    <i class="fas fa-home"></i>
                  </div>
                  <div class="text-2xl font-bold mb-2">100+</div>
                  <div class="text-gray-400">Projetos Concluídos</div>
                </div>
                <div class="luxury-card p-6 rounded-xl flex-1">
                  <div class="text-gold-400 text-3xl mb-2">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <div class="text-2xl font-bold mb-2">$10M+</div>
                  <div class="text-gray-400">Em Transações</div>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl">
              <h4 class="font-display text-2xl font-bold mb-6 gradient-gold">Nossos Valores</h4>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div>
                    <div class="font-semibold mb-1">Excelência Operacional</div>
                    <div class="text-gray-400 text-sm">Sistemas e processos refinados ao longo de anos</div>
                  </div>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div>
                    <div class="font-semibold mb-1">Transparência Total</div>
                    <div class="text-gray-400 text-sm">Compartilhamos todo nosso conhecimento sem filtros</div>
                  </div>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div>
                    <div class="font-semibold mb-1">Resultados Mensuráveis</div>
                    <div class="text-gray-400 text-sm">ROI comprovado e documentado em cada projeto</div>
                  </div>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div>
                    <div class="font-semibold mb-1">Parceria de Longo Prazo</div>
                    <div class="text-gray-400 text-sm">Tratamos subs e parceiros como família</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
{/* Sistema de Prospecção Section */}
      <section id="sistema" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Sistema de Prospecção Infalível
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              O protocolo exato para identificar propriedades com potencial de 30-100% de ROI
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Protocolo de 5 Fases */}
            <div>
              <h3 class="font-display text-3xl font-bold mb-8 gradient-gold">As 5 Fases do Protocolo JP</h3>
              
              <div class="space-y-6">
                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-start">
                    <div class="bg-gold-400 bg-opacity-20 text-gold-400 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-2">Configuração Estratégica</h4>
                      <p class="text-gray-400 text-sm">Zillow.com com filtros cirúrgicos: Houses only, No HOA, 1.000-2.000 sqft, atualizações diárias</p>
                    </div>
                  </div>
                </div>

                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-start">
                    <div class="bg-gold-400 bg-opacity-20 text-gold-400 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-2">Due Diligence Profunda</h4>
                      <p class="text-gray-400 text-sm">Análise forense no QPublic: Parcel Number, zoneamento, avaliação municipal, potential de subdivisão</p>
                    </div>
                  </div>
                </div>

                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-start">
                    <div class="bg-gold-400 bg-opacity-20 text-gold-400 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-2">Análise Comparativa (CMA)</h4>
                      <p class="text-gray-400 text-sm">Cálculo preciso de ARV com comps vendidos nos últimos 6 meses dentro de 0.5 milhas</p>
                    </div>
                  </div>
                </div>

                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-start">
                    <div class="bg-gold-400 bg-opacity-20 text-gold-400 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-2">House Flip Calculator</h4>
                      <p class="text-gray-400 text-sm">Planilha completa: compra, reforma ($30-$90/sqft), holding costs, comissão, lucro líquido e ROI</p>
                    </div>
                  </div>
                </div>

                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-start">
                    <div class="bg-gold-400 bg-opacity-20 text-gold-400 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-2">Verificações Críticas</h4>
                      <p class="text-gray-400 text-sm">FEMA Flood Map, sistema de esgoto vs. fossa séptica, impacto em custos finais</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exemplo de Cálculo Real */}
            <div class="luxury-card p-8 rounded-2xl border-2 border-gold-400">
              <h3 class="font-display text-2xl font-bold mb-6 text-center">Exemplo de Cálculo Real</h3>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between pb-2 border-b border-gray-700">
                  <span class="text-gray-400">Preço de Compra</span>
                  <span class="font-bold">$149,900</span>
                </div>
                <div class="flex justify-between pb-2 border-b border-gray-700">
                  <span class="text-gray-400">Custo de Fechamento</span>
                  <span class="font-bold">$2,200</span>
                </div>
                <div class="flex justify-between pb-2 border-b border-gray-700">
                  <span class="text-gray-400">Custo de Reformas</span>
                  <span class="font-bold">$90,000</span>
                </div>
                <div class="flex justify-between pb-2 border-b border-gray-700">
                  <span class="text-gray-400">Utilities & Seguro</span>
                  <span class="font-bold">$2,000</span>
                </div>
                <div class="flex justify-between pb-2 border-b border-gray-700">
                  <span class="text-gray-400">Comissão (4%)</span>
                  <span class="font-bold">$14,400</span>
                </div>
              </div>

              <div class="bg-gray-800 bg-opacity-50 p-4 rounded-xl mb-4">
                <div class="flex justify-between mb-2">
                  <span class="font-bold">Total Investido</span>
                  <span class="font-bold text-xl">$258,500</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold">Preço de Venda (ARV)</span>
                  <span class="font-bold text-xl text-gold-400">$360,000</span>
                </div>
              </div>

              <div class="bg-gold-400 bg-opacity-10 p-6 rounded-xl text-center border-2 border-gold-400">
                <div class="text-sm text-gray-400 mb-2">LUCRO LÍQUIDO</div>
                <div class="text-4xl font-black gradient-gold">$101,500</div>
                <div class="text-lg text-gray-300 mt-2">ROI: 39.26%</div>
              </div>
            </div>
          </div>

          {/* Fórmulas de Reforma */}
          <div class="luxury-card p-8 rounded-2xl">
            <h3 class="font-display text-2xl font-bold mb-6 text-center">Fórmulas de Custo de Reforma</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-gold-400 text-3xl font-bold mb-2">$30-50</div>
                <div class="text-sm text-gray-400 mb-3">por sqft</div>
                <div class="font-semibold mb-2">Reforma Leve</div>
                <div class="text-sm text-gray-400">Pintura, pisos, bancadas, aparelhos</div>
              </div>
              <div class="text-center">
                <div class="text-gold-400 text-3xl font-bold mb-2">$50-70</div>
                <div class="text-sm text-gray-400 mb-3">por sqft</div>
                <div class="font-semibold mb-2">Reforma Média</div>
                <div class="text-sm text-gray-400">+ portas, janelas, A/C, water heater</div>
              </div>
              <div class="text-center">
                <div class="text-gold-400 text-3xl font-bold mb-2">$70-90</div>
                <div class="text-sm text-gray-400 mb-3">por sqft</div>
                <div class="font-semibold mb-2">Reforma Completa</div>
                <div class="text-sm text-gray-400">+ telhado, siding, elétrica, hidráulica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critérios de Seleção Section */}
      <section id="criterios" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Critérios de Seleção de Elite
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Os 4 Pilares que separam oportunidades de armadilhas financeiras
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Pilar 1 */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="bg-red-500 bg-opacity-20 text-red-400 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <i class="fas fa-shield-alt text-xl"></i>
                </div>
                <h3 class="font-display text-2xl font-bold">Análise de Criminalidade</h3>
              </div>
              
              <p class="text-gray-400 mb-4">O fator invisível que afeta o valor em até 30%</p>
              
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="w-4 h-4 rounded-full bg-green-500 mr-3 mt-1"></div>
                  <div>
                    <div class="font-semibold text-green-400">Baixo Impacto</div>
                    <div class="text-sm text-gray-400">DUI, Fraude - aceitáveis</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-4 h-4 rounded-full bg-yellow-500 mr-3 mt-1"></div>
                  <div>
                    <div class="font-semibold text-yellow-400">Médio Impacto</div>
                    <div class="text-sm text-gray-400">Furtos recorrentes - atenção</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-4 h-4 rounded-full bg-red-500 mr-3 mt-1"></div>
                  <div>
                    <div class="font-semibold text-red-400">Alto Impacto</div>
                    <div class="text-sm text-gray-400">Assaltos violentos &lt; 0.2 mi - EVITAR</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div class="text-sm text-gray-400">Ferramenta:</div>
                <div class="text-gold-400 font-mono">crimemapping.com</div>
              </div>
            </div>

            {/* Pilar 2 */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="bg-blue-500 bg-opacity-20 text-blue-400 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <i class="fas fa-graduation-cap text-xl"></i>
                </div>
                <h3 class="font-display text-2xl font-bold">Rating de Escolas</h3>
              </div>
              
              <p class="text-gray-400 mb-4">O multiplicador de valor oculto</p>
              
              <div class="space-y-3">
                <div class="bg-green-500 bg-opacity-10 p-4 rounded-lg border border-green-500 border-opacity-30">
                  <div class="font-bold text-green-400 mb-1">Rating 8-10</div>
                  <div class="text-sm text-gray-400">Valorização premium de 15-25%</div>
                  <div class="text-sm text-gray-400">Tempo de venda: 30 dias</div>
                </div>
                <div class="bg-yellow-500 bg-opacity-10 p-4 rounded-lg border border-yellow-500 border-opacity-30">
                  <div class="font-bold text-yellow-400 mb-1">Rating 4-7</div>
                  <div class="text-sm text-gray-400">Mercado neutro</div>
                  <div class="text-sm text-gray-400">Tempo de venda: 60 dias</div>
                </div>
                <div class="bg-red-500 bg-opacity-10 p-4 rounded-lg border border-red-500 border-opacity-30">
                  <div class="font-bold text-red-400 mb-1">Rating 1-3</div>
                  <div class="text-sm text-gray-400">Desvalorização de 10-20%</div>
                  <div class="text-sm text-gray-400">Tempo de venda: 90+ dias</div>
                </div>
              </div>
              
              <div class="mt-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div class="text-sm text-gray-400">Ferramenta:</div>
                <div class="text-gold-400 font-mono">greatschools.org</div>
              </div>
            </div>

            {/* Pilar 3 */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="bg-purple-500 bg-opacity-20 text-purple-400 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <i class="fas fa-chart-line text-xl"></i>
                </div>
                <h3 class="font-display text-2xl font-bold">Áreas em Crescimento</h3>
              </div>
              
              <p class="text-gray-400 mb-4">Surfando a onda de desenvolvimento</p>
              
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div class="text-gray-400">Novos shopping centers em construção (raio de 5 mi)</div>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div class="text-gray-400">Planejamento de estações de metrô/transporte</div>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div class="text-gray-400">Desenvolvimento de condomínios premium</div>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-gold-400 mr-3 mt-1"></i>
                  <div class="text-gray-400">Chegada de grandes empregadores (Amazon, Google)</div>
                </li>
              </ul>
              
              <div class="mt-6 p-4 bg-gold-400 bg-opacity-10 rounded-lg border border-gold-400">
                <div class="font-bold text-gold-400 mb-2">⏰ Timing Perfeito</div>
                <div class="text-sm text-gray-400">Compre 12-24 meses ANTES do boom estar completo</div>
              </div>
            </div>

            {/* Pilar 4 */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="bg-green-500 bg-opacity-20 text-green-400 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <i class="fas fa-home text-xl"></i>
                </div>
                <h3 class="font-display text-2xl font-bold">Vendas Recentes</h3>
              </div>
              
              <p class="text-gray-400 mb-4">O pulso do mercado (últimos 6 meses)</p>
              
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-400">Tempo Médio de Venda</span>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="bg-green-500 bg-opacity-10 p-3 rounded text-center">
                      <div class="font-bold text-green-400">&lt; 30 dias</div>
                      <div class="text-xs text-gray-400">Mercado aquecido</div>
                    </div>
                    <div class="bg-red-500 bg-opacity-10 p-3 rounded text-center">
                      <div class="font-bold text-red-400">&gt; 90 dias</div>
                      <div class="text-xs text-gray-400">Mercado frio</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="text-gray-400 mb-2">Análise de Tendência</div>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center text-gray-400">
                      <i class="fas fa-arrow-up text-green-400 mr-2"></i>
                      Apreciação nos últimos 6 meses
                    </li>
                    <li class="flex items-center text-gray-400">
                      <i class="fas fa-exchange-alt text-yellow-400 mr-2"></i>
                      Volume de transações (liquidez)
                    </li>
                    <li class="flex items-center text-gray-400">
                      <i class="fas fa-map text-blue-400 mr-2"></i>
                      Uso da visualização "Lot Lines"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Regras de Ouro */}
          <div class="luxury-card p-8 rounded-2xl border-2 border-gold-400">
            <h3 class="font-display text-3xl font-bold mb-8 text-center gradient-gold">As 12 Regras de Ouro do Flipping</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">1. Não é Brincadeira</div>
                <div class="text-sm text-gray-400">Business sério com capital real</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">2. Evite Riscos</div>
                <div class="text-sm text-gray-400">Margem de segurança obrigatória</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">3. Cláusulas de Proteção</div>
                <div class="text-sm text-gray-400">Subject to inspection sempre</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">4. Compre Desvalorizado</div>
                <div class="text-sm text-gray-400">Lucro na compra, não na venda</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">5. É Complexo</div>
                <div class="text-sm text-gray-400">Atenção aos detalhes</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">6. Sem Emoção</div>
                <div class="text-sm text-gray-400">Ou perderá dinheiro</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">7. Ouça os Números</div>
                <div class="text-sm text-gray-400">Eles não mentem</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">8. Mercado Controla Venda</div>
                <div class="text-sm text-gray-400">Você não define preço</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">9. Analise Comps</div>
                <div class="text-sm text-gray-400">Sua bússola de pricing</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">10. Tempo de Venda</div>
                <div class="text-sm text-gray-400">Dinheiro parado perde valor</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">11. Escolas & Crime</div>
                <div class="text-sm text-gray-400">Deal-makers ou breakers</div>
              </div>
              <div class="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <div class="text-gold-400 font-bold mb-2">12. Timing de Área</div>
                <div class="text-sm text-gray-400">Oportunidades de crescimento</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critérios de Seleção Section */}
      <section id="criterios" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              CAPÍTULO 2
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Critérios de Seleção<br />de Elite
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A diferença entre investidores amadores e profissionais está na <span class="text-gold-400 font-semibold">disciplina de seleção</span>. 
              Amadores se deixam levar pela emoção de "uma boa oferta". Profissionais operam com critérios objetivos, mensuráveis e não negociáveis.
            </p>
          </div>

          {/* Os 4 Pilares */}
          <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
            Os 4 Pilares da Due Diligence Avançada
          </h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Pilar 1: Criminalidade */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center mr-4">
                  <i class="fas fa-shield-alt text-red-400 text-2xl"></i>
                </div>
                <div>
                  <h4 class="font-display text-2xl font-bold">Análise de Criminalidade</h4>
                  <p class="text-gray-500 text-sm">crimemapping.com</p>
                </div>
              </div>
              
              <p class="text-gray-400 mb-6">
                Dados forenses sobre criminalidade podem <span class="text-white font-semibold">valorizar ou desvalorizar uma propriedade em até 30%</span>.
              </p>

              <div class="space-y-4">
                <div class="p-4 bg-green-500 bg-opacity-10 rounded-lg border border-green-500 border-opacity-30">
                  <div class="flex items-center mb-2">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span class="font-bold text-green-400">Baixo Impacto (Aceitável)</span>
                  </div>
                  <p class="text-sm text-gray-400">DUI, Fraude - Incidentes isolados, impacto mínimo</p>
                </div>

                <div class="p-4 bg-yellow-500 bg-opacity-10 rounded-lg border border-yellow-500 border-opacity-30">
                  <div class="flex items-center mb-2">
                    <span class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    <span class="font-bold text-yellow-400">Médio Impacto (Atenção)</span>
                  </div>
                  <p class="text-sm text-gray-400">Furtos - Se recorrentes, indicam problemas sistemáticos</p>
                </div>

                <div class="p-4 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
                  <div class="flex items-center mb-2">
                    <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span class="font-bold text-red-400">Alto Impacto (EVITAR)</span>
                  </div>
                  <p class="text-sm text-gray-400">Assaltos, Robbery - Na mesma rua = <strong>deal killer</strong></p>
                </div>
              </div>

              <div class="mt-6 p-4 bg-gold-400 bg-opacity-5 rounded-lg border border-gold-400 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-star text-gold-400 mr-2"></i>
                  <strong class="text-white">Regra de Ouro:</strong> Crimes violentos &lt; 0.2 milhas = deal killer. &gt; 2 milhas = impacto negligenciável.
                </p>
              </div>
            </div>

            {/* Pilar 2: Escolas */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mr-4">
                  <i class="fas fa-graduation-cap text-blue-400 text-2xl"></i>
                </div>
                <div>
                  <h4 class="font-display text-2xl font-bold">Rating de Escolas</h4>
                  <p class="text-gray-500 text-sm">greatschools.org</p>
                </div>
              </div>

              <p class="text-gray-400 mb-6">
                O multiplicador de valor oculto que define velocidade de venda e pricing power.
              </p>

              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-green-500 bg-opacity-5 rounded-lg border border-green-500 border-opacity-30">
                  <div>
                    <div class="font-bold text-green-400 mb-1">Rating 8-10</div>
                    <div class="text-sm text-gray-400">Escolas excelentes</div>
                  </div>
                  <div class="text-right">
                    <div class="text-green-400 font-bold text-xl">+15-25%</div>
                    <div class="text-xs text-gray-500">valorização</div>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-700 bg-opacity-30 rounded-lg">
                  <div>
                    <div class="font-bold text-gray-300 mb-1">Rating 4-7</div>
                    <div class="text-sm text-gray-400">Mercado neutro</div>
                  </div>
                  <div class="text-right">
                    <div class="text-gray-400 font-bold text-xl">±0%</div>
                    <div class="text-xs text-gray-500">estável</div>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-red-500 bg-opacity-5 rounded-lg border border-red-500 border-opacity-30">
                  <div>
                    <div class="font-bold text-red-400 mb-1">Rating 1-3</div>
                    <div class="text-sm text-gray-400">Escolas fracas</div>
                  </div>
                  <div class="text-right">
                    <div class="text-red-400 font-bold text-xl">-10-20%</div>
                    <div class="text-xs text-gray-500">desvalorização</div>
                  </div>
                </div>
              </div>

              <div class="mt-6 p-4 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-clock text-blue-400 mr-2"></i>
                  <strong class="text-white">Impacto:</strong> Escolas 8+ reduzem tempo de venda de 90 dias para 30 dias e permitem pricing agressivo.
                </p>
              </div>
            </div>

            {/* Pilar 3: Áreas em Crescimento */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mr-4">
                  <i class="fas fa-chart-line text-green-400 text-2xl"></i>
                </div>
                <div>
                  <h4 class="font-display text-2xl font-bold">Áreas em Crescimento</h4>
                  <p class="text-gray-500 text-sm">Surfando a onda de desenvolvimento</p>
                </div>
              </div>

              <p class="text-gray-400 mb-6">
                Identifique no Google Maps e portais locais:
              </p>

              <ul class="space-y-3 mb-6">
                <li class="flex items-start text-gray-400">
                  <i class="fas fa-shopping-cart text-green-400 mr-3 mt-1"></i>
                  <span>Novos shopping centers em construção (raio de 5 milhas)</span>
                </li>
                <li class="flex items-start text-gray-400">
                  <i class="fas fa-subway text-green-400 mr-3 mt-1"></i>
                  <span>Planejamento de estações de metrô/transporte público</span>
                </li>
                <li class="flex items-start text-gray-400">
                  <i class="fas fa-building text-green-400 mr-3 mt-1"></i>
                  <span>Desenvolvimento de condomínios médio-alto padrão</span>
                </li>
                <li class="flex items-start text-gray-400">
                  <i class="fas fa-briefcase text-green-400 mr-3 mt-1"></i>
                  <span>Chegada de grandes empregadores (Amazon, Google, etc)</span>
                </li>
              </ul>

              <div class="p-4 bg-gold-400 bg-opacity-5 rounded-lg border border-gold-400 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-lightbulb text-gold-400 mr-2"></i>
                  <strong class="text-white">Timing:</strong> Compre 12-24 meses ANTES do boom. Tarde = preços inflados. Cedo = capital preso.
                </p>
              </div>
            </div>

            {/* Pilar 4: Vendas Recentes */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-4">
                  <i class="fas fa-history text-purple-400 text-2xl"></i>
                </div>
                <div>
                  <h4 class="font-display text-2xl font-bold">Vendas Recentes (6 meses)</h4>
                  <p class="text-gray-500 text-sm">O pulso do mercado</p>
                </div>
              </div>

              <p class="text-gray-400 mb-6">
                No Zillow.com, analise:
              </p>

              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-clock text-purple-400 mr-3"></i>
                    <span class="text-gray-300">Tempo médio de venda</span>
                  </div>
                  <div class="text-sm">
                    <span class="text-green-400">&lt;30d</span> <span class="text-gray-500">aquecido</span> / 
                    <span class="text-red-400">&gt;90d</span> <span class="text-gray-500">frio</span>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-chart-area text-purple-400 mr-3"></i>
                    <span class="text-gray-300">Tendência de preços</span>
                  </div>
                  <span class="text-sm text-gray-400">Últimos 6 meses</span>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-exchange-alt text-purple-400 mr-3"></i>
                    <span class="text-gray-300">Volume de transações</span>
                  </div>
                  <span class="text-sm text-gold-400 font-semibold">Liquidez é rei</span>
                </div>
              </div>

              <div class="mt-6 p-4 bg-purple-500 bg-opacity-10 rounded-lg border border-purple-500 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-map text-purple-400 mr-2"></i>
                  <strong class="text-white">Ferramenta Premium:</strong> Use visualização "Lot Lines" para análise de densidade e subdivisão.
                </p>
              </div>
            </div>
          </div>

          {/* As 12 Regras de Ouro */}
          <div class="max-w-6xl mx-auto">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              As 12 Regras de Ouro do Flipping Profissional
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "FLIPPING NÃO É BRINCADEIRA - É business sério com capital real em risco",
                "NÃO VALE CORRER RISCOS DESNECESSÁRIOS - Margem de segurança é obrigatória",
                "INSIRA CLÁUSULAS DE PROTEÇÃO - 'Subject to inspection up to $X'",
                "O SEGREDO É COMPRAR DESVALORIZADO - Lucro se faz na compra, não na venda",
                "FLIPPING É COMPLEXO - Requer atenção aos mínimos detalhes",
                "DEIXE A EMOÇÃO DO LADO DE FORA - Ou perderá dinheiro e sanidade",
                "OUÇA OS NÚMEROS - Eles não mentem, você sim",
                "VOCÊ NÃO CONTROLA O PREÇO DE VENDA - O mercado controla",
                "ANALISE PROFUNDAMENTE AS COMPS - Sua bússola de pricing",
                "TEMPO MÉDIO DE VENDA IMPORTA - Dinheiro parado perde valor",
                "ESCOLAS E CRIMINALIDADE - Deal-makers ou deal-breakers",
                "ÁREAS EM CRESCIMENTO - Oportunidades de timing perfeito"
              ].map((regra, index) => (
                <div class="luxury-card p-6 rounded-xl hover:border-gold-400 transition-all">
                  <div class="flex items-start">
                    <div class="text-gold-400 font-black text-2xl mr-3 flex-shrink-0">{index + 1}</div>
                    <p class="text-sm text-gray-400 leading-relaxed">{regra}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PASSO 4: Metodologia de Execução */}
      <section id="passo4" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              <span class="text-2xl mr-2">④</span>
              PASSO 4: METODOLOGIA DE EXECUÇÃO
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Sistema de 8 Semanas
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              O processo exato que transforma propriedades destruídas em máquinas de lucro
            </p>
          </div>

          {/* Timeline */}
          <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
              <div class="timeline-item">
                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-center mb-3">
                    <div class="text-gold-400 font-bold mr-3">Semana 1-2</div>
                    <h4 class="font-display text-xl font-bold">Setup & Rough-In</h4>
                  </div>
                  <p class="text-gray-400">Limpeza, demolição, permits, rough-in de elétrica, hidráulica e HVAC</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-center mb-3">
                    <div class="text-gold-400 font-bold mr-3">Semana 3-4</div>
                    <h4 class="font-display text-xl font-bold">Fechamento & Acabamento Base</h4>
                  </div>
                  <p class="text-gray-400">Insulation, drywall, textura e primeira demão de pintura</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-center mb-3">
                    <div class="text-gold-400 font-bold mr-3">Semana 5-6</div>
                    <h4 class="font-display text-xl font-bold">Acabamentos Premium</h4>
                  </div>
                  <p class="text-gray-400">Pisos LVP, gabinetes, countertops, fixtures e iluminação</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="luxury-card p-6 rounded-xl">
                  <div class="flex items-center mb-3">
                    <div class="text-gold-400 font-bold mr-3">Semana 7-8</div>
                    <h4 class="font-display text-xl font-bold">Detalhes Finais & Marketing</h4>
                  </div>
                  <p class="text-gray-400">Touch-ups, aparelhos, landscape, fotografia profissional e listagem</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pilares da Metodologia */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-gold-400 text-4xl mb-4">
                <i class="fas fa-search-dollar"></i>
              </div>
              <h4 class="font-bold text-xl mb-3">Análise de Deal</h4>
              <p class="text-gray-400 text-sm">Critérios rigorosos de seleção para garantir ROI de 30-100%</p>
            </div>

            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-gold-400 text-4xl mb-4">
                <i class="fas fa-hard-hat"></i>
              </div>
              <h4 class="font-bold text-xl mb-3">Execução Precisa</h4>
              <p class="text-gray-400 text-sm">Gerenciamento militar de obras com BuilderTrend</p>
            </div>

            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-gold-400 text-4xl mb-4">
                <i class="fas fa-paint-roller"></i>
              </div>
              <h4 class="font-bold text-xl mb-3">Padronização</h4>
              <p class="text-gray-400 text-sm">Acabamentos luxuosos padronizados que maximizam appeal</p>
            </div>

            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-gold-400 text-4xl mb-4">
                <i class="fas fa-handshake"></i>
              </div>
              <h4 class="font-bold text-xl mb-3">Parcerias</h4>
              <p class="text-gray-400 text-sm">Network de vendors premium com termos favoráveis</p>
            </div>
          </div>
        </div>
      </section>

      {/* PASSO 5: Resultados Comprovados */}
      <section id="passo5" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              <span class="text-2xl mr-2">⑤</span>
              PASSO 5: RESULTADOS REAIS
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Provas de Sucesso
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Números reais, projetos reais, lucros reais com nosso sistema
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-5xl font-black gradient-gold mb-2">$50K+</div>
              <div class="text-gray-400">Economia Anual em Plantas</div>
              <div class="text-sm text-gray-500 mt-2">vs. Contratar Arquitetos</div>
            </div>

            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-5xl font-black gradient-gold mb-2">$150K+</div>
              <div class="text-gray-400">Economia em Vendors</div>
              <div class="text-sm text-gray-500 mt-2">Parcerias Pro Xtra Platinum</div>
            </div>

            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-5xl font-black gradient-gold mb-2">95%</div>
              <div class="text-gray-400">Taxa de Aproveitamento</div>
              <div class="text-sm text-gray-500 mt-2">Materiais entre Projetos</div>
            </div>

            <div class="luxury-card p-8 rounded-2xl text-center">
              <div class="text-5xl font-black gradient-gold mb-2">8 Sem.</div>
              <div class="text-gray-400">Timeline Médio</div>
              <div class="text-sm text-gray-500 mt-2">Da Compra à Listagem</div>
            </div>
          </div>

          {/* Case Studies */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="luxury-card rounded-2xl overflow-hidden">
              <div class="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <i class="fas fa-home text-6xl text-gold-400"></i>
              </div>
              <div class="p-6">
                <h4 class="font-display text-2xl font-bold mb-3">Projeto Atlanta</h4>
                <div class="space-y-2 mb-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Compra:</span>
                    <span class="font-semibold">$85,000</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Reforma:</span>
                    <span class="font-semibold">$45,000</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Venda:</span>
                    <span class="font-semibold text-gold-400">$195,000</span>
                  </div>
                  <div class="border-t border-gray-700 pt-2 mt-2">
                    <div class="flex justify-between font-bold">
                      <span>Lucro Líquido:</span>
                      <span class="gradient-gold">$50,000</span>
                    </div>
                    <div class="text-sm text-gray-400 mt-1">ROI: 38.5%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="luxury-card rounded-2xl overflow-hidden">
              <div class="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <i class="fas fa-home text-6xl text-gold-400"></i>
              </div>
              <div class="p-6">
                <h4 class="font-display text-2xl font-bold mb-3">Projeto Charlotte</h4>
                <div class="space-y-2 mb-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Compra:</span>
                    <span class="font-semibold">$120,000</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Reforma:</span>
                    <span class="font-semibold">$55,000</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Venda:</span>
                    <span class="font-semibold text-gold-400">$265,000</span>
                  </div>
                  <div class="border-t border-gray-700 pt-2 mt-2">
                    <div class="flex justify-between font-bold">
                      <span>Lucro Líquido:</span>
                      <span class="gradient-gold">$73,000</span>
                    </div>
                    <div class="text-sm text-gray-400 mt-1">ROI: 41.7%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="luxury-card rounded-2xl overflow-hidden">
              <div class="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <i class="fas fa-home text-6xl text-gold-400"></i>
              </div>
              <div class="p-6">
                <h4 class="font-display text-2xl font-bold mb-3">Projeto Nashville</h4>
                <div class="space-y-2 mb-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Compra:</span>
                    <span class="font-semibold">$95,000</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Reforma:</span>
                    <span class="font-semibold">$38,000</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Venda:</span>
                    <span class="font-semibold text-gold-400">$215,000</span>
                  </div>
                  <div class="border-t border-gray-700 pt-2 mt-2">
                    <div class="flex justify-between font-bold">
                      <span>Lucro Líquido:</span>
                      <span class="gradient-gold">$65,000</span>
                    </div>
                    <div class="text-sm text-gray-400 mt-1">ROI: 48.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Projeção de ROI
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Veja o potencial de retorno com nossa metodologia comprovada
            </p>
          </div>

          <div class="max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Cenário Conservador */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="text-center mb-6">
                  <div class="inline-block px-4 py-2 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-sm font-semibold mb-4">
                    CONSERVADOR
                  </div>
                  <h3 class="font-display text-3xl font-bold mb-2">Ano 1-2</h3>
                  <p class="text-gray-400">3-5 Flips/Ano</p>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-800">
                    <span class="text-gray-400">Número de Flips</span>
                    <span class="font-bold text-xl">4</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-800">
                    <span class="text-gray-400">Lucro Médio/Flip</span>
                    <span class="font-bold text-xl">$35,000</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-800">
                    <span class="text-gray-400">Custos Operacionais</span>
                    <span class="font-bold text-xl text-red-400">-$20,000</span>
                  </div>
                  <div class="flex justify-between items-center py-4 bg-gold-400 bg-opacity-10 rounded-xl px-4 mt-6">
                    <span class="font-bold">Lucro Anual</span>
                    <span class="font-black text-2xl gradient-gold">$120,000</span>
                  </div>
                </div>
              </div>

              {/* Cenário Agressivo */}
              <div class="luxury-card p-8 rounded-2xl border-2 border-gold-400">
                <div class="text-center mb-6">
                  <div class="inline-block px-4 py-2 bg-gold-400 bg-opacity-20 text-gold-400 rounded-full text-sm font-semibold mb-4">
                    AGRESSIVO
                  </div>
                  <h3 class="font-display text-3xl font-bold mb-2">Ano 3-5</h3>
                  <p class="text-gray-400">8-12 Flips/Ano</p>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-800">
                    <span class="text-gray-400">Número de Flips</span>
                    <span class="font-bold text-xl">10</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-800">
                    <span class="text-gray-400">Lucro Médio/Flip</span>
                    <span class="font-bold text-xl">$55,000</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-800">
                    <span class="text-gray-400">Custos Operacionais</span>
                    <span class="font-bold text-xl text-red-400">-$50,000</span>
                  </div>
                  <div class="flex justify-between items-center py-4 bg-gold-400 bg-opacity-20 rounded-xl px-4 mt-6">
                    <span class="font-bold">Lucro Anual</span>
                    <span class="font-black text-2xl gradient-gold">$500,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios Adicionais */}
            <div class="mt-12 luxury-card p-8 rounded-2xl">
              <h4 class="font-display text-2xl font-bold mb-6 text-center">Benefícios Não Monetários</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="text-gold-400 text-3xl mb-3">
                    <i class="fas fa-user-tie"></i>
                  </div>
                  <div class="font-semibold mb-2">Liberdade</div>
                  <div class="text-sm text-gray-400">Seja seu próprio chefe</div>
                </div>
                <div class="text-center">
                  <div class="text-gold-400 text-3xl mb-3">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <div class="font-semibold mb-2">Escalabilidade</div>
                  <div class="text-sm text-gray-400">Crescimento ilimitado</div>
                </div>
                <div class="text-center">
                  <div class="text-gold-400 text-3xl mb-3">
                    <i class="fas fa-trophy"></i>
                  </div>
                  <div class="font-semibold mb-2">Legado</div>
                  <div class="text-sm text-gray-400">Patrimônio duradouro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Princípios Section */}
      <section class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Os 7 Princípios Inegociáveis
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Fundamentos que separam milionários de espectadores
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-start mb-4">
                <div class="text-gold-400 text-4xl font-black mr-4">1</div>
                <div>
                  <h4 class="font-bold text-xl mb-2">Compre Desvalorizado</h4>
                  <p class="text-gray-400 text-sm">Lucro se faz na compra. Período.</p>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-start mb-4">
                <div class="text-gold-400 text-4xl font-black mr-4">2</div>
                <div>
                  <h4 class="font-bold text-xl mb-2">Emoção no Estacionamento</h4>
                  <p class="text-gray-400 text-sm">Números decidem, não sentimentos.</p>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-start mb-4">
                <div class="text-gold-400 text-4xl font-black mr-4">3</div>
                <div>
                  <h4 class="font-bold text-xl mb-2">Sistemas Vencem Talento</h4>
                  <p class="text-gray-400 text-sm">Disciplina + Processo = Resultados</p>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-start mb-4">
                <div class="text-gold-400 text-4xl font-black mr-4">4</div>
                <div>
                  <h4 class="font-bold text-xl mb-2">Padronize Tudo</h4>
                  <p class="text-gray-400 text-sm">Eficiência através de repetição</p>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-start mb-4">
                <div class="text-gold-400 text-4xl font-black mr-4">5</div>
                <div>
                  <h4 class="font-bold text-xl mb-2">Network = Net Worth</h4>
                  <p class="text-gray-400 text-sm">Relacionamentos são ativos valiosos</p>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-start mb-4">
                <div class="text-gold-400 text-4xl font-black mr-4">6</div>
                <div>
                  <h4 class="font-bold text-xl mb-2">Velocidade é Lucro</h4>
                  <p class="text-gray-400 text-sm">Cada dia de atraso é dinheiro perdido</p>
                </div>
              </div>
            </div>

            <div class="luxury-card p-8 rounded-2xl border-2 border-gold-400 col-span-1 md:col-span-2 lg:col-span-3">
              <div class="flex items-start mb-4 justify-center">
                <div class="text-gold-400 text-4xl font-black mr-4">7</div>
                <div class="text-center">
                  <h4 class="font-bold text-2xl mb-2">Nunca Pare de Aprender</h4>
                  <p class="text-gray-400">Mercado muda. Códigos mudam. Você precisa mudar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" class="section gradient-dark">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="luxury-card p-12 rounded-3xl">
            <h2 class="font-display text-4xl md:text-5xl font-bold mb-6">
              Pronto Para Transformar Seu Futuro Financeiro?
            </h2>
            <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudá-lo a alcançar seus objetivos no mercado imobiliário
            </p>
            
            <div class="space-y-4 mb-8">
              <div class="flex items-center justify-center text-gray-400">
                <i class="fas fa-envelope text-gold-400 mr-3"></i>
                <a href="mailto:contato@jpgroupc.com" class="hover:text-gold-400 transition">contato@jpgroupc.com</a>
              </div>
              <div class="flex items-center justify-center text-gray-400">
                <i class="fas fa-globe text-gold-400 mr-3"></i>
                <a href="http://www.jpgroupc.com" target="_blank" rel="noopener" class="hover:text-gold-400 transition">www.jpgroupc.com</a>
              </div>
            </div>

            <a href="mailto:contato@jpgroupc.com" class="btn-primary px-10 py-4 rounded-full text-lg font-semibold inline-block">
              <i class="fas fa-paper-plane mr-2"></i>
              Entrar em Contato
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer py-12">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div class="font-display text-2xl font-bold gradient-gold mb-4">JP GROUP</div>
              <p class="text-gray-400 text-sm mb-4">
                Transformando propriedades desvalorizadas em ativos de alto valor desde 2010+
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-gold-400 transition">
                  <i class="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gold-400 transition">
                  <i class="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gold-400 transition">
                  <i class="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gold-400 transition">
                  <i class="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 class="font-bold mb-4">Links Rápidos</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><a href="#sobre" class="hover:text-gold-400 transition">Sobre Nós</a></li>
                <li><a href="#metodologia" class="hover:text-gold-400 transition">Metodologia</a></li>
                <li><a href="#resultados" class="hover:text-gold-400 transition">Resultados</a></li>
                <li><a href="#roi" class="hover:text-gold-400 transition">ROI</a></li>
                <li><a href="#contato" class="hover:text-gold-400 transition">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold mb-4">Nossos Serviços</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li>Flipping Houses</li>
                <li>Consultoria Imobiliária</li>
                <li>Gerenciamento de Obras</li>
                <li>Análise de Investimentos</li>
                <li>Mentoria Personalizada</li>
              </ul>
            </div>
          </div>

          <div class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 JP Group Construction. Todos os Direitos Reservados.</p>
            <p class="mt-2 text-xs">
              Este material contém estratégias proprietárias desenvolvidas ao longo de mais de uma década de operação no mercado imobiliário.
            </p>
          </div>
        </div>
      </footer>

      {/* JavaScript para interatividade */}
      <script dangerouslySetInnerHTML={{__html: `
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        });

        // Scroll progress bar
        const scrollProgress = document.getElementById('scroll-progress');
        window.addEventListener('scroll', () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (scrollTop / scrollHeight);
          scrollProgress.style.transform = 'scaleX(' + scrolled + ')';
        });

        // Mobile menu toggle
        function toggleMenu() {
          const mobileMenu = document.getElementById('mobile-menu');
          mobileMenu.classList.toggle('hidden');
        }

        // ====================================
        // SISTEMA DE PROTEÇÃO VIA QR CODE
        // ====================================
        (function() {
          // Verificar se existe token válido
          function checkAccessToken() {
            const token = localStorage.getItem('jpgroup_access_token');
            const expiry = localStorage.getItem('jpgroup_token_expiry');
            
            if (!token || !expiry) {
              // Sem token, redirecionar para verificação
              window.location.href = '/verify';
              return false;
            }
            
            const expiryTime = parseInt(expiry);
            if (Date.now() >= expiryTime) {
              // Token expirado, limpar e redirecionar
              localStorage.removeItem('jpgroup_access_token');
              localStorage.removeItem('jpgroup_token_expiry');
              localStorage.removeItem('jpgroup_member_name');
              window.location.href = '/verify';
              return false;
            }
            
            return true;
          }
          
          // Executar verificação imediatamente
          if (!checkAccessToken()) {
            return; // Parar execução se não tiver acesso
          }
          
          // Mostrar mensagem de boas-vindas ao membro
          const memberName = localStorage.getItem('jpgroup_member_name');
          if (memberName) {
            console.log('Bem-vindo, ' + memberName + '!');
          }
        })();
        
        // Intersection Observer para animações
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        }, observerOptions);

        // Observar elementos com animação
        document.querySelectorAll('.luxury-card, .stat-card, .timeline-item').forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(el);
        });
      `}}>
      </script>
    </div>
  )
})

// Rota de Login
app.get('/login', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Acesso à Mentoria - JP Group</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
      <div class="login-container">
        <div class="login-box">
          <div class="text-center mb-8">
            <div class="font-display text-3xl font-bold gradient-gold mb-2">JP GROUP</div>
            <h1 class="text-2xl font-bold text-white mb-2"><i class="fas fa-crown mr-1"></i>Área de Membros</h1>
            <p class="text-gray-400 text-sm">Entre com sua senha de acesso para visualizar o conteúdo exclusivo da mentoria</p>
          </div>

          <form onsubmit="jpAuth.handleLogin(event)" class="space-y-6">
            <div>
              <label for="password" class="block text-sm font-semibold text-gray-300 mb-2">
                <i class="fas fa-lock mr-2 text-gold-400"></i>
                Senha de Acesso
              </label>
              <input 
                type="password" 
                id="password" 
                class="login-input" 
                placeholder="Digite sua senha"
                required
                autocomplete="current-password"
              />
            </div>

            <div id="error-message" class="hidden text-red-400 text-sm p-3 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
            </div>

            <button 
              type="submit" 
              id="submit-button"
              class="btn-primary w-full py-4 rounded-xl text-base font-semibold transition-all"
            >
              <i class="fas fa-unlock mr-2"></i>
              Acessar Conteúdo
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-gray-800">
            <div class="text-center text-sm text-gray-400">
              <i class="fas fa-shield-alt text-gold-400 mr-2"></i>
              Acesso seguro e protegido
            </div>
            <div class="text-center mt-4">
              <a href="/" class="text-gold-400 hover:text-gold-300 text-sm transition">
                <i class="fas fa-arrow-left mr-2"></i>
                Voltar ao site
              </a>
            </div>
          </div>

          <div class="mt-8 p-4 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-30">
            <div class="text-sm text-blue-400 mb-2">
              <i class="fas fa-info-circle mr-2"></i>
              <strong>Não tem acesso ainda?</strong>
            </div>
            <div class="text-xs text-gray-400">
              Entre em contato conosco para obter sua senha de acesso à mentoria exclusiva.
            </div>
            <a href="#contato" class="text-gold-400 hover:text-gold-300 text-sm font-semibold mt-2 inline-block">
              Solicitar Acesso →
            </a>
          </div>
        </div>
      </div>

      <script src="/static/auth.js"></script>
      <script>
        // Redirecionar se já estiver autenticado
        if (jpAuth.isAuthenticated()) {
          window.location.href = '/membros';
        }
      </script>
    </body>
    </html>
  `)
})

// Rota da <i class="fas fa-crown mr-1"></i>Área de Membros
app.get('/membros', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title><i class="fas fa-crown mr-1"></i>Área de Membros - Mentoria Master Flip</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <link href="/static/style.css" rel="stylesheet">
    </head>
    <body class="bg-black">
      <!-- Navbar <i class="fas fa-crown mr-1"></i>Área de Membros -->
      <nav class="navbar fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-8">
              <div class="font-display text-2xl font-bold gradient-gold">JP GROUP</div>
              <div class="protected-badge hidden md:flex">
                <i class="fas fa-crown"></i>
                <span><i class="fas fa-crown mr-1"></i>Área de Membros</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="hidden md:block text-sm text-gray-400">
                <i class="fas fa-user-circle mr-2 text-gold-400"></i>
                Bem-vindo, Membro
              </div>
              <button onclick="toggleSidebar()" class="md:hidden text-gold-400">
                <i class="fas fa-bars text-xl"></i>
              </button>
              <button onclick="jpAuth.logout()" class="btn-secondary px-4 py-2 rounded-full text-sm">
                <i class="fas fa-sign-out-alt mr-2"></i>
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Sidebar -->
      <aside id="sidebar" class="members-sidebar">
        <div class="mb-8">
          <h3 class="text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">Módulos da Mentoria</h3>
          <nav class="space-y-2">
            <a href="#modulo-1" class="block px-4 py-3 rounded-lg bg-gold-400 bg-opacity-10 border border-gold-400 text-white">
              <i class="fas fa-book mr-3 text-gold-400"></i>
              Módulo 1: Sistema de Prospecção
            </a>
            <a href="#modulo-2" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-chart-line mr-3"></i>
              Módulo 2: Análise de Deals
            </a>
            <a href="#modulo-3" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-tools mr-3"></i>
              Módulo 3: Execução da Obra
            </a>
            <a href="#modulo-4" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-money-bill-wave mr-3"></i>
              Módulo 4: Financiamento
            </a>
            <a href="#modulo-5" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-handshake mr-3"></i>
              Módulo 5: Venda e Lucro
            </a>
          </nav>
        </div>

        <div class="pt-6 border-t border-gray-800">
          <h3 class="text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">Recursos</h3>
          <nav class="space-y-2">
            <a href="#calculadoras" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-calculator mr-3"></i>
              Calculadoras
            </a>
            <a href="#templates" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-file-alt mr-3"></i>
              Templates
            </a>
            <a href="#comunidade" class="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <i class="fas fa-users mr-3"></i>
              Comunidade
            </a>
          </nav>
        </div>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="members-content members-area">
        <div class="max-w-6xl mx-auto">
          <!-- Header -->
          <div class="mb-12">
            <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
              Bem-vindo à <span class="gradient-gold">Mentoria Master Flip</span>
            </h1>
            <p class="text-xl text-gray-400 mb-6">
              Acesso completo ao sistema de flipping houses que transformou centenas de vidas
            </p>
            
            <!-- Progress do aluno -->
            <div class="luxury-card p-6 rounded-2xl">
              <div class="flex justify-between items-center mb-3">
                <div>
                  <div class="text-sm text-gray-400 mb-1">Seu Progresso</div>
                  <div class="text-2xl font-bold gradient-gold">20% Completo</div>
                </div>
                <div class="text-right">
                  <div class="text-sm text-gray-400 mb-1">Módulos</div>
                  <div class="text-2xl font-bold">1/5</div>
                </div>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 20%"></div>
              </div>
            </div>
          </div>

          <!-- Grid de Módulos -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <!-- Módulo 1 - Desbloqueado -->
            <div id="modulo-1" class="module-card">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center">
                    <i class="fas fa-book text-gold-400 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm text-gold-400 font-semibold">MÓDULO 1</div>
                    <div class="text-lg font-bold">Sistema de Prospecção</div>
                  </div>
                </div>
                <div class="bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                  <i class="fas fa-unlock mr-1"></i>
                  DESBLOQUEADO
                </div>
              </div>
              
              <p class="text-gray-400 text-sm mb-4">
                Aprenda o protocolo de 5 fases para encontrar propriedades com potencial de 30-100% de ROI
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-800">
                <div class="flex items-center gap-4 text-sm text-gray-400">
                  <span><i class="fas fa-video mr-1 text-gold-400"></i> 8 vídeos</span>
                  <span><i class="fas fa-file-pdf mr-1 text-gold-400"></i> 3 PDFs</span>
                </div>
                <a href="/membros/modulo-1" class="btn-primary px-6 py-2 rounded-full text-sm">
                  Acessar →
                </a>
              </div>
            </div>

            <!-- Módulo 2 - Bloqueado -->
            <div class="module-card module-locked">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <i class="fas fa-chart-line text-gray-500 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 font-semibold">MÓDULO 2</div>
                    <div class="text-lg font-bold text-gray-400">Análise de Deals</div>
                  </div>
                </div>
                <div class="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">
                  <i class="fas fa-lock mr-1"></i>
                  BLOQUEADO
                </div>
              </div>
              
              <p class="text-gray-500 text-sm mb-4">
                Complete o Módulo 1 para desbloquear este conteúdo
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-800">
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span><i class="fas fa-video mr-1"></i> 6 vídeos</span>
                  <span><i class="fas fa-file-pdf mr-1"></i> 2 PDFs</span>
                </div>
                <button disabled class="px-6 py-2 rounded-full text-sm bg-gray-800 text-gray-500 cursor-not-allowed">
                  Bloqueado
                </button>
              </div>
            </div>

            <!-- Módulo 3 - Bloqueado -->
            <div class="module-card module-locked">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <i class="fas fa-tools text-gray-500 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 font-semibold">MÓDULO 3</div>
                    <div class="text-lg font-bold text-gray-400">Execução da Obra</div>
                  </div>
                </div>
                <div class="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">
                  <i class="fas fa-lock mr-1"></i>
                  BLOQUEADO
                </div>
              </div>
              
              <p class="text-gray-500 text-sm mb-4">
                Complete o Módulo 2 para desbloquear este conteúdo
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-800">
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span><i class="fas fa-video mr-1"></i> 10 vídeos</span>
                  <span><i class="fas fa-file-pdf mr-1"></i> 5 PDFs</span>
                </div>
                <button disabled class="px-6 py-2 rounded-full text-sm bg-gray-800 text-gray-500 cursor-not-allowed">
                  Bloqueado
                </button>
              </div>
            </div>

            <!-- Módulo 4 - Bloqueado -->
            <div class="module-card module-locked">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <i class="fas fa-money-bill-wave text-gray-500 text-xl"></i>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 font-semibold">MÓDULO 4</div>
                    <div class="text-lg font-bold text-gray-400">Financiamento</div>
                  </div>
                </div>
                <div class="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">
                  <i class="fas fa-lock mr-1"></i>
                  BLOQUEADO
                </div>
              </div>
              
              <p class="text-gray-500 text-sm mb-4">
                Complete o Módulo 3 para desbloquear este conteúdo
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-800">
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span><i class="fas fa-video mr-1"></i> 7 vídeos</span>
                  <span><i class="fas fa-file-pdf mr-1"></i> 4 PDFs</span>
                </div>
                <button disabled class="px-6 py-2 rounded-full text-sm bg-gray-800 text-gray-500 cursor-not-allowed">
                  Bloqueado
                </button>
              </div>
            </div>
          </div>

          <!-- CTA para suporte -->
          <div class="luxury-card p-8 rounded-2xl text-center border-2 border-gold-400">
            <div class="text-gold-400 text-4xl mb-4">
              <i class="fas fa-headset"></i>
            </div>
            <h3 class="font-display text-2xl font-bold mb-3">Precisa de Ajuda?</h3>
            <p class="text-gray-400 mb-6">
              Nossa equipe está disponível para responder suas dúvidas e ajudá-lo em sua jornada
            </p>
            <a href="mailto:contato@jpgroupc.com" class="btn-primary px-8 py-3 rounded-full inline-block">
              <i class="fas fa-envelope mr-2"></i>
              Entrar em Contato
            </a>
          </div>
        </div>
      </main>

      <script src="/static/auth.js"></script>
      <script>
        // Proteger a página
        jpAuth.protectPage();

        // Toggle sidebar mobile
        function toggleSidebar() {
          const sidebar = document.getElementById('sidebar');
          sidebar.classList.toggle('open');
        }
      </script>
    </body>
    </html>
  `)
})

export default app
