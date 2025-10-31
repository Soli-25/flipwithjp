// Markdown Viewer para Biblioteca JP Group
// Usa marked.js para renderizar markdown com estilo luxuoso

async function loadAndRenderMarkdown(markdownUrl, containerId) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error('Container não encontrado:', containerId);
    return;
  }
  
  // Mostrar loading
  container.innerHTML = `
    <div class="flex items-center justify-center py-20">
      <div class="spinner"></div>
      <span class="ml-4 text-gray-400">Carregando conteúdo...</span>
    </div>
  `;
  
  try {
    // Fetch do arquivo markdown
    const response = await fetch(markdownUrl);
    
    if (!response.ok) {
      throw new Error('Arquivo não encontrado');
    }
    
    const markdownText = await response.text();
    
    // Renderizar markdown para HTML
    const htmlContent = marked.parse(markdownText);
    
    // Inserir no container com estilos
    container.innerHTML = `
      <div class="markdown-content">
        ${htmlContent}
      </div>
    `;
    
    // Adicionar estilos customizados para markdown
    addMarkdownStyles();
    
  } catch (error) {
    container.innerHTML = `
      <div class="text-center py-20">
        <i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
        <p class="text-red-400 text-xl">Erro ao carregar conteúdo</p>
        <p class="text-gray-500 mt-2">${error.message}</p>
        <a href="/biblioteca" class="mt-6 inline-block px-6 py-3 bg-gold-400 text-black rounded-lg hover:bg-gold-300 transition">
          Voltar à Biblioteca
        </a>
      </div>
    `;
  }
}

function addMarkdownStyles() {
  // Adicionar estilos customizados se ainda não existirem
  if (document.getElementById('markdown-custom-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'markdown-custom-styles';
  style.textContent = `
    .markdown-content {
      color: #e5e7eb;
      line-height: 1.8;
    }
    
    .markdown-content h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 900;
      background: linear-gradient(135deg, #d4af37 0%, #f4e4b4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 2rem 0 1.5rem;
    }
    
    .markdown-content h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-weight: 800;
      color: #d4af37;
      margin: 2rem 0 1rem;
      border-bottom: 2px solid rgba(212, 175, 55, 0.3);
      padding-bottom: 0.5rem;
    }
    
    .markdown-content h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #f4e4b4;
      margin: 1.5rem 0 0.75rem;
    }
    
    .markdown-content h4,
    .markdown-content h5,
    .markdown-content h6 {
      color: #d4af37;
      margin: 1rem 0 0.5rem;
      font-weight: 600;
    }
    
    .markdown-content p {
      margin: 1rem 0;
      color: #d1d5db;
    }
    
    .markdown-content strong {
      color: #ffffff;
      font-weight: 700;
    }
    
    .markdown-content em {
      color: #f4e4b4;
      font-style: italic;
    }
    
    .markdown-content ul,
    .markdown-content ol {
      margin: 1rem 0;
      padding-left: 2rem;
      color: #d1d5db;
    }
    
    .markdown-content li {
      margin: 0.5rem 0;
    }
    
    .markdown-content blockquote {
      border-left: 4px solid #d4af37;
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: #f4e4b4;
      font-style: italic;
      background: rgba(212, 175, 55, 0.05);
      padding: 1rem 1.5rem;
      border-radius: 0 8px 8px 0;
    }
    
    .markdown-content code {
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #f4e4b4;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    .markdown-content pre {
      background: #1a1a1a;
      border: 2px solid rgba(212, 175, 55, 0.3);
      border-radius: 12px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
    
    .markdown-content pre code {
      background: none;
      border: none;
      padding: 0;
      color: #f4e4b4;
    }
    
    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: rgba(26, 26, 26, 0.5);
      border-radius: 12px;
      overflow: hidden;
    }
    
    .markdown-content th {
      background: rgba(212, 175, 55, 0.2);
      color: #d4af37;
      font-weight: 700;
      padding: 1rem;
      text-align: left;
      border-bottom: 2px solid rgba(212, 175, 55, 0.5);
    }
    
    .markdown-content td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      color: #d1d5db;
    }
    
    .markdown-content a {
      color: #d4af37;
      text-decoration: underline;
      transition: color 0.3s ease;
    }
    
    .markdown-content a:hover {
      color: #f4e4b4;
    }
    
    .markdown-content hr {
      border: none;
      border-top: 2px solid rgba(212, 175, 55, 0.3);
      margin: 2rem 0;
    }
    
    .markdown-content img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      border: 2px solid rgba(212, 175, 55, 0.3);
      margin: 1.5rem 0;
    }
    
    /* Spinner para loading */
    .spinner {
      border: 3px solid rgba(212, 175, 55, 0.1);
      border-top: 3px solid #d4af37;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  document.head.appendChild(style);
}

// Expor função globalmente
window.loadAndRenderMarkdown = loadAndRenderMarkdown;
