import { Hono } from 'hono'

const bibliotecaApp = new Hono()

// Nota: Conteúdo Markdown será servido via rotas estáticas
// Cloudflare Workers não suporta fs, então os arquivos .md 
// devem ser copiados para public/content/ e servidos como estáticos

// Rota principal da biblioteca
bibliotecaApp.get('/biblioteca', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Biblioteca Premium - JP Group</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="/static/style.css" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          min-height: 100vh;
        }
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .biblioteca-container {
          padding: 6rem 2rem 4rem;
        }
        
        .biblioteca-card {
          background: rgba(26, 26, 26, 0.95);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .biblioteca-card:hover {
          border-color: rgba(212, 175, 55, 0.6);
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
        }
        
        .doc-badge {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.5);
          color: #d4af37;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .premium-badge {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4b4 100%);
          color: #0a0a0a;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          display: inline-block;
        }
        
        .read-btn {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 228, 180, 0.2) 100%);
          border: 2px solid rgba(212, 175, 55, 0.5);
          color: #d4af37;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }
        
        .read-btn:hover {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4b4 100%);
          color: #0a0a0a;
          transform: translateX(5px);
        }
      </style>
    </head>
    <body>
      <!-- Navbar -->
      <nav class="navbar fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="font-display text-2xl font-bold gradient-gold">JP GROUP</a>
            <div class="flex items-center gap-6">
              <a href="/" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-home mr-2"></i>Home
              </a>
              <a href="/mentoria" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-graduation-cap mr-2"></i>Mentoria
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div class="biblioteca-container">
        <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-16">
            <div class="premium-badge mb-4">
              <i class="fas fa-crown mr-2"></i>CONTEÚDO PREMIUM
            </div>
            <h1 class="font-display text-4xl md:text-6xl font-bold gradient-gold mb-6">
              Biblioteca FlipCode™
            </h1>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Acesso exclusivo aos 5 documentos que compõem o sistema completo de flipping houses mais valioso do mercado americano.
            </p>
          </div>

          <!-- Grid de Documentos -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Documento 1: Manifesto -->
            <div class="biblioteca-card">
              <div class="flex items-start justify-between mb-4">
                <div class="doc-badge">📜 Manifesto</div>
                <div class="text-gold-400 text-sm">
                  <i class="fas fa-clock mr-1"></i>2-3h leitura
                </div>
              </div>
              
              <h3 class="font-display text-2xl font-bold text-gold-400 mb-3">
                Os 21 Princípios Secretos
              </h3>
              
              <p class="text-gray-400 mb-4 text-sm leading-relaxed">
                O manifesto executivo que separa investidores amadores de milionários do real estate. 
                Cada princípio foi validado com sangue, suor e centenas de transações.
              </p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Mentalidade</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Estratégia</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Cases Reais</span>
              </div>
              
              <a href="/biblioteca/manifesto" class="read-btn">
                Ler Agora <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            <!-- Documento 2: Guia de Investimento -->
            <div class="biblioteca-card">
              <div class="flex items-start justify-between mb-4">
                <div class="doc-badge">💰 Investimento</div>
                <div class="text-gold-400 text-sm">
                  <i class="fas fa-clock mr-1"></i>2-3h leitura
                </div>
              </div>
              
              <h3 class="font-display text-2xl font-bold text-gold-400 mb-3">
                Guia Completo de Investimento
              </h3>
              
              <p class="text-gray-400 mb-4 text-sm leading-relaxed">
                Os 7 caminhos para começar no flipping, do capital zero ao capital total. 
                FAQ completa com todas as perguntas que investidores iniciantes fazem.
              </p>
              
              <div class="mb-4 p-3 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-30">
                <div class="text-xs text-blue-400">
                  <i class="fas fa-calendar mr-2"></i>
                  <strong>NOVO:</strong> Inclui agenda completa de mentorias ao vivo!
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Capital Zero</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Wholesaling</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Joint Venture</span>
              </div>
              
              <a href="/biblioteca/investimento" class="read-btn">
                Ler Agora <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            <!-- Documento 3: Calculadoras -->
            <div class="biblioteca-card">
              <div class="flex items-start justify-between mb-4">
                <div class="doc-badge">🧮 Ferramentas</div>
                <div class="text-gold-400 text-sm">
                  <i class="fas fa-clock mr-1"></i>1-2h uso
                </div>
              </div>
              
              <h3 class="font-display text-2xl font-bold text-gold-400 mb-3">
                Calculadoras e Templates
              </h3>
              
              <p class="text-gray-400 mb-4 text-sm leading-relaxed">
                Ferramentas práticas de planejamento financeiro. Calcule quanto capital você precisa, 
                analise ROI de deals e projete seu primeiro ano.
              </p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Calculadora ROI</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Templates</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Checklists</span>
              </div>
              
              <a href="/biblioteca/calculadoras" class="read-btn">
                Ver Ferramentas <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            <!-- Documento 4: Produtos -->
            <div class="biblioteca-card">
              <div class="flex items-start justify-between mb-4">
                <div class="doc-badge">💎 Produtos</div>
                <div class="text-gold-400 text-sm">
                  <i class="fas fa-clock mr-1"></i>1h leitura
                </div>
              </div>
              
              <h3 class="font-display text-2xl font-bold text-gold-400 mb-3">
                Estrutura de Produtos
              </h3>
              
              <p class="text-gray-400 mb-4 text-sm leading-relaxed">
                Todos os níveis de investimento em educação: Academy Online, Bootcamp Virtual, 
                Mentoria 1-on-1 e Inner Circle. Descubra qual é ideal para você.
              </p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Academy</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Bootcamp</span>
                <span class="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">Mentoria</span>
              </div>
              
              <a href="/biblioteca/produtos" class="read-btn">
                Explorar <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            <!-- Documento 5: Índice Master -->
            <div class="biblioteca-card lg:col-span-2">
              <div class="flex items-start justify-between mb-4">
                <div class="doc-badge">📚 Guia</div>
                <div class="text-gold-400 text-sm">
                  <i class="fas fa-clock mr-1"></i>30min leitura
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="font-display text-2xl font-bold text-gold-400 mb-3">
                    Índice Master do Sistema
                  </h3>
                  
                  <p class="text-gray-400 mb-6 text-sm leading-relaxed">
                    Overview completo de todos os materiais. Entenda a estrutura do sistema FlipCode™, 
                    como os documentos se conectam e qual ordem seguir para máximo aproveitamento.
                  </p>
                  
                  <a href="/biblioteca/indice" class="read-btn">
                    Ver Índice <i class="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
                
                <div class="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-800">
                  <div class="text-gold-400 font-bold mb-4 flex items-center">
                    <i class="fas fa-chart-line mr-2"></i>
                    Estatísticas do Sistema
                  </div>
                  <div class="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div class="text-2xl font-bold text-white">5</div>
                      <div class="text-xs text-gray-500">Documentos</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-white">150K+</div>
                      <div class="text-xs text-gray-500">Palavras</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-white">200+</div>
                      <div class="text-xs text-gray-500">Páginas</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-white">10-15h</div>
                      <div class="text-xs text-gray-500">Conteúdo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- CTA Final -->
          <div class="mt-16 text-center bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-2xl border border-gold-400 border-opacity-30">
            <h3 class="font-display text-3xl font-bold gradient-gold mb-4">
              Pronto Para Dominar o Sistema?
            </h3>
            <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
              Este é apenas o começo. Acesse a mentoria completa para implementar 
              tudo que você está aprendendo aqui.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/mentoria" class="inline-block px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-300 text-black font-bold rounded-full hover:shadow-lg transition">
                <i class="fas fa-graduation-cap mr-2"></i>
                Acessar Mentoria
              </a>
              <a href="/#contato" class="inline-block px-8 py-4 bg-transparent border-2 border-gold-400 text-gold-400 font-bold rounded-full hover:bg-gold-400 hover:text-black transition">
                <i class="fas fa-phone mr-2"></i>
                Falar com JP
              </a>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Verificar autenticação
        (function() {
          const token = localStorage.getItem('jpgroup_access_token');
          const expiry = localStorage.getItem('jpgroup_token_expiry');
          
          if (!token || !expiry || Date.now() >= parseInt(expiry)) {
            localStorage.clear();
            window.location.href = '/verify';
          }
        })();
      </script>
    </body>
    </html>
  `)
})

// Helper para criar página de visualização de documento
function createDocumentViewer(title: string, subtitle: string, markdownFile: string, backLink: string = '/biblioteca') {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - JP Group</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
      <link href="/static/style.css" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        .font-display {
          font-family: 'Playfair Display', serif;
        }
      </style>
    </head>
    <body class="min-h-screen">
      <!-- Navbar -->
      <nav class="navbar fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="font-display text-2xl font-bold gradient-gold">JP GROUP</a>
            <div class="flex items-center gap-6">
              <a href="${backLink}" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-arrow-left mr-2"></i>Voltar
              </a>
              <a href="/biblioteca" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-book mr-2"></i>Biblioteca
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content -->
      <div class="pt-32 pb-16 px-6">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="font-display text-4xl md:text-5xl font-bold gradient-gold mb-4">
              ${title}
            </h1>
            <p class="text-xl text-gray-400">
              ${subtitle}
            </p>
          </div>

          <!-- Markdown Content Container -->
          <div id="markdown-container" class="bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-gold-400 border-opacity-30">
            <!-- Conteúdo será carregado aqui -->
          </div>
        </div>
      </div>

      <!-- Scripts -->
      <script src="/static/markdown-viewer.js"></script>
      <script>
        // Verificar autenticação
        (function() {
          const token = localStorage.getItem('jpgroup_access_token');
          const expiry = localStorage.getItem('jpgroup_token_expiry');
          
          if (!token || !expiry || Date.now() >= parseInt(expiry)) {
            localStorage.clear();
            window.location.href = '/verify';
            return;
          }
        })();

        // Carregar conteúdo markdown
        document.addEventListener('DOMContentLoaded', () => {
          loadAndRenderMarkdown('/content/${markdownFile}', 'markdown-container');
        });
      </script>
    </body>
    </html>
  `;
}

// Rotas individuais para cada documento
bibliotecaApp.get('/biblioteca/manifesto', (c) => {
  return c.html(createDocumentViewer(
    'Os 21 Princípios Secretos',
    'Manifesto Executivo - O Código de Um Milhão de Dólares',
    'manifesto.md'
  ));
})

bibliotecaApp.get('/biblioteca/investimento', (c) => {
  return c.html(createDocumentViewer(
    'Guia Completo de Investimento',
    'Os 7 Caminhos Para Começar (Do Zero ao Capital Total)',
    'investimento_faq.md'
  ));
})

bibliotecaApp.get('/biblioteca/calculadoras', (c) => {
  return c.html(createDocumentViewer(
    'Calculadoras e Templates',
    'Ferramentas Práticas de Planejamento Financeiro',
    'calculadoras.md'
  ));
})

bibliotecaApp.get('/biblioteca/produtos', (c) => {
  return c.html(createDocumentViewer(
    'Estrutura de Produtos e Serviços',
    'FlipCode System™ - Investimento em Educação de Elite',
    'produtos.md'
  ));
})

bibliotecaApp.get('/biblioteca/indice', (c) => {
  return c.html(createDocumentViewer(
    'Índice Master do Sistema',
    'Overview Completo de Todos os Materiais',
    'indice.md'
  ));
})

export default bibliotecaApp
