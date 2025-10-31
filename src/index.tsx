import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div class="relative">
      {/* Scroll Progress Bar */}
      <div id="scroll-progress" class="scroll-progress" style="transform: scaleX(0);"></div>

      {/* Navigation */}
      <nav class="navbar fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="font-display text-2xl font-bold gradient-gold">JP GROUP</div>
            <div class="hidden md:flex space-x-6">
              <a href="#sobre" class="text-gray-300 hover:text-gold-400 transition text-sm">Sobre</a>
              <a href="#sistema" class="text-gray-300 hover:text-gold-400 transition text-sm">Sistema</a>
              <a href="#criterios" class="text-gray-300 hover:text-gold-400 transition text-sm">Critérios</a>
              <a href="#metodologia" class="text-gray-300 hover:text-gold-400 transition text-sm">Metodologia</a>
              <a href="#resultados" class="text-gray-300 hover:text-gold-400 transition text-sm">Resultados</a>
              <a href="#contato" class="btn-primary px-6 py-2 rounded-full text-sm">Contato</a>
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
          <a href="#sobre" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">Sobre</a>
          <a href="#sistema" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">Sistema</a>
          <a href="#criterios" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">Critérios</a>
          <a href="#metodologia" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">Metodologia</a>
          <a href="#resultados" class="text-xl text-gray-300 hover:text-gold-400" onclick="toggleMenu()">Resultados</a>
          <a href="#contato" class="btn-primary px-8 py-3 rounded-full text-xl" onclick="toggleMenu()">Contato</a>
        </div>
      </div>

      {/* Hero Section */}
      <section class="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <div class="animate-fade-in-up">
            <div class="inline-block mb-6 px-6 py-2 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              SISTEMA COMPROVADO
            </div>
            <h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              O CÓDIGO DE UM<br />
              <span class="gradient-gold">MILHÃO DE DÓLARES</span>
            </h1>
            <p class="text-xl text-gray-400 mb-4 max-w-4xl mx-auto leading-relaxed font-semibold">
              Processos e Estratégias Secretas do Mercado Imobiliário Revelados por Quem Domina o Flipping House há Mais de uma Década
            </p>
            <p class="text-lg md:text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
              Transforme propriedades desvalorizadas em lucros extraordinários com o sistema testado e comprovado da JP Group Construction
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
              <a href="#contato" class="btn-primary px-10 py-4 rounded-full text-lg font-semibold">
                <i class="fas fa-rocket mr-2"></i>
                Começar Agora
              </a>
              <a href="#metodologia" class="btn-secondary px-10 py-4 rounded-full text-lg font-semibold">
                <i class="fas fa-play-circle mr-2"></i>
                Ver Metodologia
              </a>
            </div>

            {/* Stats Hero */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div class="stat-card p-8 rounded-2xl">
                <div class="number-display gradient-gold mb-2">30-100%</div>
                <div class="text-gray-400 text-lg">ROI Projetado</div>
              </div>
              <div class="stat-card p-8 rounded-2xl">
                <div class="number-display gradient-gold mb-2">8 Sem.</div>
                <div class="text-gray-400 text-lg">Timeline Médio</div>
              </div>
              <div class="stat-card p-8 rounded-2xl">
                <div class="number-display gradient-gold mb-2">10+ Anos</div>
                <div class="text-gray-400 text-lg">de Experiência</div>
              </div>
            </div>
          </div>
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

      {/* Mentoria Master Flip Section */}
      <section class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              MENTORIA MASTER FLIP
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
          </div>
        </div>
      </section>

      {/* Sistema de Prospecção Section */}
      <section id="sistema" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              CAPÍTULO 1
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

      {/* Metodologia Section */}
      <section id="metodologia" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Nossa Metodologia
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              O sistema de 8 semanas que transforma propriedades em máquinas de lucro
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

      {/* Resultados Section */}
      <section id="resultados" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Resultados Comprovados
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Números reais de projetos executados com nosso sistema
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

export default app
