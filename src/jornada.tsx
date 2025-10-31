import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

// Rota principal da jornada com os 13 capítulos
app.get('/jornada', (c) => {
  return c.render(
    <div class="min-h-screen">
      {/* Header da Jornada */}
      <header class="navbar fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="font-display text-2xl font-bold gradient-gold">JP GROUP</a>
            <div class="flex items-center gap-6">
              <a href="/" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-home mr-2"></i>Início
              </a>
              <a href="/mentoria" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-crown mr-2"></i>Mentoria
              </a>
              <a href="/biblioteca" class="text-gray-300 hover:text-gold-400 transition text-sm">
                <i class="fas fa-book mr-2"></i>Biblioteca
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero da Jornada */}
      <section class="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <div class="inline-block mb-6 px-6 py-3 luxury-badge rounded-full text-gold-400 text-sm font-semibold tracking-wider">
            <i class="fas fa-route mr-2"></i>
            JORNADA COMPLETA
          </div>
          
          <h1 class="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            OS 13 CAPÍTULOS DO<br />
            <span class="gradient-gold gold-glow">FLIPPING HOUSE</span>
          </h1>
          
          <div class="elegant-separator"></div>
          
          <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Aprenda passo a passo todo o processo revelado por <strong class="text-gold-400">Juscelio Cruz</strong>, 
            desde encontrar a propriedade ideal até concluir a venda com lucro garantido.
          </p>

          {/* Progresso Visual */}
          <div class="mb-12">
            <div class="flex items-center justify-center gap-2 flex-wrap">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(num => (
                <a href={`#capitulo${num}`} class="w-12 h-12 rounded-full bg-gold-400 bg-opacity-20 border-2 border-gold-400 flex items-center justify-center text-gold-400 font-bold hover:bg-opacity-40 transition">
                  {num}
                </a>
              ))}
            </div>
          </div>

          <a href="#capitulo1" class="btn-primary px-12 py-6 rounded-full text-lg font-semibold shadow-2xl inline-block">
            <i class="fas fa-play-circle mr-3"></i>
            Começar Jornada
          </a>
        </div>
      </section>

      {/* CAPÍTULO 1: Como Encontrar Oportunidades */}
      <section id="capitulo1" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              CAPÍTULO 1
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Como Encontrar<br />Oportunidades de Ouro
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Aprenda a usar o Zillow.com e QPublic para descobrir propriedades desvalorizadas 
              com potencial de lucro de 30-100% de ROI.
            </p>
          </div>

          {/* Processo Passo a Passo */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Passo 1.1: Zillow Setup */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center mr-4">
                  <span class="text-gold-400 font-black text-2xl">1.1</span>
                </div>
                <h3 class="font-display text-2xl font-bold">Configuração Zillow.com</h3>
              </div>
              <ul class="space-y-4 text-gray-400">
                <li class="flex items-start">
                  <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                  <span><strong class="text-white">Acesse:</strong> www.zillow.com</span>
                </li>
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
                  <strong class="text-white">Por que esses filtros?</strong> Cada parâmetro foi testado em centenas de transações.
                </p>
              </div>
            </div>

            {/* Passo 1.2: Due Diligence */}
            <div class="luxury-card p-8 rounded-2xl">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-gold-400 bg-opacity-20 flex items-center justify-center mr-4">
                  <span class="text-gold-400 font-black text-2xl">1.2</span>
                </div>
                <h3 class="font-display text-2xl font-bold">Due Diligence (QPublic)</h3>
              </div>
              <ul class="space-y-4 text-gray-400">
                <li class="flex items-start">
                  <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                  <span><strong class="text-white">Acesse:</strong> www.qpublic.schneidercorp.com</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                  <span><strong class="text-white">Parcel Number:</strong> O "CPF" da propriedade</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                  <span><strong class="text-white">Zoning Class:</strong> R3, R4 (subdivisão)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                  <span><strong class="text-white">Appraised Value:</strong> vs. mercado</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-search text-gold-400 mr-3 mt-1"></i>
                  <span><strong class="text-white">Sqft com A/C:</strong> Área climatizada</span>
                </li>
              </ul>
              <div class="mt-6 p-4 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                  <strong class="text-red-400">ALERTA:</strong> Casa no centro do lote pode inviabilizar subdivisão.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Próximo Capítulo */}
          <div class="text-center">
            <a href="#capitulo2" class="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 bg-opacity-20 hover:bg-opacity-30 border-2 border-gold-400 text-gold-400 rounded-full font-bold transition">
              <span>PRÓXIMO: Critérios de Seleção</span>
              <i class="fas fa-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 2: Critérios de Seleção */}
      <section id="capitulo2" class="section gradient-dark">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              CAPÍTULO 2
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Critérios de Seleção<br />de Propriedades
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A dica mais importante: <strong class="text-gold-400">Preste atenção nos detalhes</strong>. 
              Deixe a emoção de fora e foque nos números.
            </p>
          </div>

          {/* 3 Tipos de Reforma */}
          <div class="mb-16">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              Os 3 Tipos de Custos de Reforma
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Reforma Leve */}
              <div class="luxury-card p-8 rounded-2xl border-l-4 border-green-400">
                <div class="text-green-400 text-5xl font-black mb-4">$30-50</div>
                <h4 class="font-display text-2xl font-bold mb-4">Reforma LEVE</h4>
                <p class="text-sm text-gray-400 mb-4">Por sqft</p>
                <ul class="space-y-2 text-gray-400 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Pintura Externa/Interna</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Troca do Piso</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Troca do Banheiro</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Troca da Cozinha</span>
                  </li>
                </ul>
              </div>

              {/* Reforma Média */}
              <div class="luxury-card p-8 rounded-2xl border-l-4 border-blue-400">
                <div class="text-blue-400 text-5xl font-black mb-4">$50-70</div>
                <h4 class="font-display text-2xl font-bold mb-4">Reforma MÉDIA</h4>
                <p class="text-sm text-gray-400 mb-4">Por sqft</p>
                <ul class="space-y-2 text-gray-400 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-blue-400 mr-2 mt-1"></i>
                    <span>Tudo da Leve +</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-blue-400 mr-2 mt-1"></i>
                    <span>Portas e Janelas</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-blue-400 mr-2 mt-1"></i>
                    <span>Às vezes A/C</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-blue-400 mr-2 mt-1"></i>
                    <span>Water Heater</span>
                  </li>
                </ul>
              </div>

              {/* Reforma Inteira */}
              <div class="luxury-card p-8 rounded-2xl border-l-4 border-red-400">
                <div class="text-red-400 text-5xl font-black mb-4">$70-90</div>
                <h4 class="font-display text-2xl font-bold mb-4">Reforma INTEIRA</h4>
                <p class="text-sm text-gray-400 mb-4">Por sqft</p>
                <ul class="space-y-2 text-gray-400 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-red-400 mr-2 mt-1"></i>
                    <span>Tudo das Anteriores +</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-red-400 mr-2 mt-1"></i>
                    <span>Roof (Telhado)</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-red-400 mr-2 mt-1"></i>
                    <span>Siding (Revestimento)</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-red-400 mr-2 mt-1"></i>
                    <span>Elétrica e Hidráulica</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-red-400 mr-2 mt-1"></i>
                    <span>Driveway</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4 Principais Itens de Avaliação */}
          <div class="mb-12">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              4 Itens Essenciais para Avaliar
            </h3>

            <div class="space-y-6">
              {/* Item 1: Criminalidade */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">1</div>
                  <div class="flex-1">
                    <h4 class="font-display text-2xl font-bold mb-3">Checar Criminalidade</h4>
                    <p class="text-gray-400 mb-4">
                      Use <strong class="text-gold-400">https://www.crimemapping.com</strong> para verificar crimes na região.
                    </p>
                    <div class="bg-red-500 bg-opacity-10 p-4 rounded-lg border border-red-500 border-opacity-30">
                      <p class="text-sm text-gray-400">
                        <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                        <strong class="text-red-400">EVITE:</strong> Casas com assaltos no mesmo condomínio ou rua.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2: Escolas */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">2</div>
                  <div class="flex-1">
                    <h4 class="font-display text-2xl font-bold mb-3">Checar Escolas</h4>
                    <p class="text-gray-400 mb-4">
                      Use <strong class="text-gold-400">https://www.greatschools.org</strong> para ver o rating das escolas.
                    </p>
                    <p class="text-sm text-gray-400">
                      Escolas ruins = menos interessados na compra = mais difícil de vender.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3: Áreas em Crescimento */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">3</div>
                  <div class="flex-1">
                    <h4 class="font-display text-2xl font-bold mb-3">Ver Áreas em Crescimento</h4>
                    <p class="text-gray-400">
                      Pesquise no Google por áreas de crescimento no condado. Boas oportunidades surgem em regiões em expansão.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 4: Vendas Recentes */}
              <div class="luxury-card p-8 rounded-2xl">
                <div class="flex items-start">
                  <div class="text-gold-400 text-5xl font-black mr-6 flex-shrink-0">4</div>
                  <div class="flex-1">
                    <h4 class="font-display text-2xl font-bold mb-3">Casas Vendidas (6 Meses)</h4>
                    <p class="text-gray-400">
                      Use Zillow.com e QPublic para ver preços de vendas recentes na região. 
                      Essencial para calcular o valor de revenda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Próximo Capítulo */}
          <div class="text-center">
            <a href="#capitulo3" class="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 bg-opacity-20 hover:bg-opacity-30 border-2 border-gold-400 text-gold-400 rounded-full font-bold transition">
              <span>PRÓXIMO: Estruturação do Flipping</span>
              <i class="fas fa-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 10: Compra de Materiais */}
      <section id="capitulo10" class="section">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-gold-400 bg-opacity-10 border border-gold-400 rounded-full text-gold-400 text-sm font-semibold tracking-wider">
              CAPÍTULO 10
            </div>
            <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
              Compra de Materiais<br />de Forma Estratégica
            </h2>
            <div class="w-20 h-1 gradient-gold-bg mx-auto mb-8"></div>
            <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Aprenda a comprar materiais nos melhores fornecedores com descontos e benefícios exclusivos.
            </p>
          </div>

          {/* Home Depot Pro */}
          <div class="mb-16">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              Home Depot PRO Xtra
            </h3>

            <div class="luxury-card p-10 rounded-2xl mb-8">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-20 h-20 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center">
                  <i class="fas fa-store text-orange-500 text-3xl"></i>
                </div>
                <div>
                  <h4 class="font-display text-3xl font-bold">Home Depot</h4>
                  <p class="text-gray-400">Conta PRO para profissionais</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h5 class="font-bold text-xl mb-4 text-gold-400">Benefícios da Conta PRO:</h5>
                  <ul class="space-y-3 text-gray-400">
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Entrega Rápida:</strong> Next Day Delivery</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Schedule:</strong> Agende entregas</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Cash Back:</strong> Reembolso em compras</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Descontos:</strong> Preços especiais para PRO</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-xl mb-4 text-gold-400">Como Criar Conta:</h5>
                  <ol class="space-y-3 text-gray-400">
                    <li class="flex items-start">
                      <span class="text-gold-400 font-bold mr-3">1.</span>
                      <span>Acesse homedepot.com e clique em Login</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-gold-400 font-bold mr-3">2.</span>
                      <span>Clique em "Learn More" para conta PRO</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-gold-400 font-bold mr-3">3.</span>
                      <span>Preencha dados da empresa</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-gold-400 font-bold mr-3">4.</span>
                      <span>Clique em "Join PRO Xtra"</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div class="bg-orange-500 bg-opacity-10 p-6 rounded-lg border border-orange-500 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-lightbulb text-orange-500 mr-2"></i>
                  <strong class="text-white">DICA:</strong> Crie um relacionamento com seu gerente da Home Depot. 
                  Quanto melhor seu histórico, mais vantagens você terá!
                </p>
              </div>
            </div>
          </div>

          {/* Amazon */}
          <div class="mb-16">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              Amazon - Pequenos Itens
            </h3>

            <div class="luxury-card p-10 rounded-2xl mb-8">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-20 h-20 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                  <i class="fab fa-amazon text-blue-500 text-3xl"></i>
                </div>
                <div>
                  <h4 class="font-display text-3xl font-bold">Amazon</h4>
                  <p class="text-gray-400">Para itens menores e rápidos</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h5 class="font-bold text-xl mb-4 text-gold-400">Vantagens da Amazon:</h5>
                  <ul class="space-y-3 text-gray-400">
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Entrega Rápida:</strong> Prime 1-2 dias</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Variedade:</strong> Milhares de produtos</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Preços:</strong> Competitivos</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check text-gold-400 mr-3 mt-1"></i>
                      <span><strong class="text-white">Tracking:</strong> Rastreamento fácil</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-xl mb-4 text-gold-400">O que JP Compra na Amazon:</h5>
                  <ul class="space-y-2 text-gray-400 text-sm">
                    <li>• Luminárias e acessórios elétricos</li>
                    <li>• Torneiras e chuveiros</li>
                    <li>• Maçanetas e fechaduras</li>
                    <li>• Ferramentas pequenas</li>
                    <li>• Organizadores e prateleiras</li>
                    <li>• Acessórios de banheiro e cozinha</li>
                  </ul>
                </div>
              </div>

              <div class="bg-blue-500 bg-opacity-10 p-6 rounded-lg border border-blue-500 border-opacity-30">
                <p class="text-sm text-gray-400">
                  <i class="fas fa-lightbulb text-blue-500 mr-2"></i>
                  <strong class="text-white">DICA PRO:</strong> Crie uma lista "REHAB" na Amazon com todos os itens padrão 
                  que você usa em todas as casas. Isso acelera muito o processo de compra!
                </p>
              </div>
            </div>
          </div>

          {/* Outros Fornecedores */}
          <div class="mb-12">
            <h3 class="font-display text-3xl font-bold mb-12 text-center gradient-gold">
              Outros Fornecedores Estratégicos
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gabinets */}
              <div class="luxury-card p-6 rounded-xl">
                <div class="w-16 h-16 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i class="fas fa-box-open text-green-400 text-2xl"></i>
                </div>
                <h4 class="font-bold text-xl text-center mb-3">Gabinets</h4>
                <p class="text-sm text-gray-400 text-center mb-4">
                  Fornecedores especializados em armários de cozinha e banheiro
                </p>
                <ul class="space-y-2 text-xs text-gray-400">
                  <li>• Tabela com modelos e preços</li>
                  <li>• Medidas padrão</li>
                  <li>• Melhor custo-benefício</li>
                </ul>
              </div>

              {/* Sherwin Williams */}
              <div class="luxury-card p-6 rounded-xl">
                <div class="w-16 h-16 bg-purple-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i class="fas fa-paint-roller text-purple-400 text-2xl"></i>
                </div>
                <h4 class="font-bold text-xl text-center mb-3">Sherwin Williams</h4>
                <p class="text-sm text-gray-400 text-center mb-4">
                  Tintas de alta qualidade para acabamento premium
                </p>
                <ul class="space-y-2 text-xs text-gray-400">
                  <li>• Conta empresarial</li>
                  <li>• Descontos para volume</li>
                  <li>• Consultoria de cores</li>
                </ul>
              </div>

              {/* Rental Brothers */}
              <div class="luxury-card p-6 rounded-xl">
                <div class="w-16 h-16 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i class="fas fa-tools text-yellow-400 text-2xl"></i>
                </div>
                <h4 class="font-bold text-xl text-center mb-3">Rental Brothers</h4>
                <p class="text-sm text-gray-400 text-center mb-4">
                  Materiais de construção com ótimos preços
                </p>
                <ul class="space-y-2 text-xs text-gray-400">
                  <li>• Preços especiais</li>
                  <li>• Entrega rápida</li>
                  <li>• Condições exclusivas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Próximo Capítulo */}
          <div class="text-center">
            <a href="#capitulo11" class="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 bg-opacity-20 hover:bg-opacity-30 border-2 border-gold-400 text-gold-400 rounded-full font-bold transition">
              <span>PRÓXIMO: Acabamentos</span>
              <i class="fas fa-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="section gradient-dark text-center">
        <div class="max-w-7xl mx-auto px-6">
          <div class="font-display text-2xl font-bold gradient-gold mb-6">JP GROUP CONSTRUCTION</div>
          <p class="text-gray-400 mb-8">
            Processos e Estratégias do Mercado Imobiliário<br />
            Por Juscelio Cruz - www.jpgroupc.com
          </p>
          <div class="flex justify-center gap-6">
            <a href="/" class="text-gray-400 hover:text-gold-400 transition">Início</a>
            <a href="/mentoria" class="text-gray-400 hover:text-gold-400 transition">Mentoria</a>
            <a href="/biblioteca" class="text-gray-400 hover:text-gold-400 transition">Biblioteca</a>
          </div>
        </div>
      </footer>
    </div>
  )
})

export default app
