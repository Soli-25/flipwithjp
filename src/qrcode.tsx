import { Hono } from 'hono'

const qrcodeApp = new Hono()

// Base de dados de tokens (em produção, usar Cloudflare D1)
const validTokens = new Map([
  // Formato: [tokenId, { memberId, memberName, expiresAt, accessLevel }]
  ['TOKEN-DEMO-001', { 
    memberId: 'M001', 
    memberName: 'Membro Demo', 
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 dias
    accessLevel: 'premium' 
  }],
  ['TOKEN-VIP-002', { 
    memberId: 'M002', 
    memberName: 'Investidor VIP', 
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
    accessLevel: 'premium' 
  }],
  ['TOKEN-ELITE-003', { 
    memberId: 'M003', 
    memberName: 'Cliente Elite', 
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
    accessLevel: 'premium' 
  }],
])

// Rota de verificação/scan de QR Code
qrcodeApp.get('/verify', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>JP Group - Verificação de Acesso</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="/static/style.css" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .verify-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .verify-card {
          background: rgba(26, 26, 26, 0.95);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 3rem;
          max-width: 500px;
          width: 100%;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .token-input {
          background: rgba(10, 10, 10, 0.8);
          border: 2px solid rgba(212, 175, 55, 0.3);
          color: #f4e4b4;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          width: 100%;
          font-size: 1rem;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        
        .token-input:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
        
        .verify-btn {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4b4 100%);
          color: #0a0a0a;
          font-weight: 700;
          padding: 1rem 2rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          width: 100%;
          font-size: 1rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .verify-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        }
        
        .verify-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .alert {
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1rem;
          text-align: center;
        }
        
        .alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid rgba(34, 197, 94, 0.3);
          color: #4ade80;
        }
        
        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }
        
        .qr-icon {
          font-size: 4rem;
          color: #d4af37;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .spinner {
          border: 3px solid rgba(212, 175, 55, 0.1);
          border-top: 3px solid #d4af37;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="verify-container">
        <div class="verify-card">
          <div class="qr-icon">
            <i class="fas fa-qrcode"></i>
          </div>
          
          <h1 class="font-display text-3xl font-bold text-center gradient-gold mb-2">
            Acesso Exclusivo
          </h1>
          <p class="text-gray-400 text-center mb-8">
            Digite o código do seu QR Code ou Token de Acesso
          </p>
          
          <form id="verifyForm">
            <div class="mb-6">
              <label class="block text-gray-400 text-sm mb-2">
                <i class="fas fa-key mr-2"></i>Token de Acesso
              </label>
              <input 
                type="text" 
                id="tokenInput"
                class="token-input"
                placeholder="TOKEN-XXXX-XXX"
                required
                autocomplete="off"
                maxlength="50"
              />
            </div>
            
            <button type="submit" class="verify-btn" id="verifyBtn">
              <i class="fas fa-shield-check mr-2"></i>
              Verificar Acesso
            </button>
            
            <div id="alertContainer"></div>
          </form>
          
          <div class="mt-8 pt-6 border-t border-gray-800 text-center">
            <p class="text-gray-500 text-sm">
              <i class="fas fa-info-circle mr-2"></i>
              Apenas membros com token válido podem acessar
            </p>
            <a href="/admin/qr" class="text-gold-400 text-sm mt-2 inline-block hover:underline">
              <i class="fas fa-cog mr-1"></i>Gerar Novo Token (Admin)
            </a>
          </div>
        </div>
      </div>
      
      <script>
        const form = document.getElementById('verifyForm');
        const tokenInput = document.getElementById('tokenInput');
        const verifyBtn = document.getElementById('verifyBtn');
        const alertContainer = document.getElementById('alertContainer');
        
        // Verificar se já existe token válido
        window.addEventListener('DOMContentLoaded', () => {
          const savedToken = localStorage.getItem('jpgroup_access_token');
          const savedExpiry = localStorage.getItem('jpgroup_token_expiry');
          
          if (savedToken && savedExpiry) {
            const expiryTime = parseInt(savedExpiry);
            if (Date.now() < expiryTime) {
              // Token ainda válido, redirecionar
              window.location.href = '/';
            } else {
              // Token expirado, limpar
              localStorage.removeItem('jpgroup_access_token');
              localStorage.removeItem('jpgroup_token_expiry');
              localStorage.removeItem('jpgroup_member_name');
            }
          }
        });
        
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const token = tokenInput.value.trim().toUpperCase();
          
          if (!token) {
            showAlert('Por favor, digite um token válido', 'error');
            return;
          }
          
          // Mostrar loading
          verifyBtn.disabled = true;
          verifyBtn.innerHTML = '<div class="spinner"></div>';
          
          try {
            // Verificar token no backend
            const response = await fetch('/api/verify-token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token })
            });
            
            const data = await response.json();
            
            if (data.valid) {
              // Token válido, salvar e redirecionar
              localStorage.setItem('jpgroup_access_token', token);
              localStorage.setItem('jpgroup_token_expiry', data.expiresAt);
              localStorage.setItem('jpgroup_member_name', data.memberName);
              
              showAlert('✓ Acesso concedido! Redirecionando...', 'success');
              
              setTimeout(() => {
                window.location.href = '/';
              }, 1500);
            } else {
              showAlert('✗ Token inválido ou expirado', 'error');
              verifyBtn.disabled = false;
              verifyBtn.innerHTML = '<i class="fas fa-shield-check mr-2"></i>Verificar Acesso';
            }
          } catch (error) {
            showAlert('✗ Erro ao verificar token. Tente novamente.', 'error');
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = '<i class="fas fa-shield-check mr-2"></i>Verificar Acesso';
          }
        });
        
        function showAlert(message, type) {
          alertContainer.innerHTML = \`
            <div class="alert alert-\${type}">
              \${message}
            </div>
          \`;
        }
      </script>
    </body>
    </html>
  `)
})

// API para verificar token
qrcodeApp.post('/api/verify-token', async (c) => {
  const { token } = await c.req.json()
  
  if (!token) {
    return c.json({ valid: false, error: 'Token não fornecido' })
  }
  
  const tokenData = validTokens.get(token.toUpperCase())
  
  if (!tokenData) {
    return c.json({ valid: false, error: 'Token não encontrado' })
  }
  
  // Verificar se token não expirou
  if (Date.now() > tokenData.expiresAt) {
    return c.json({ valid: false, error: 'Token expirado' })
  }
  
  return c.json({
    valid: true,
    memberName: tokenData.memberName,
    memberId: tokenData.memberId,
    accessLevel: tokenData.accessLevel,
    expiresAt: tokenData.expiresAt
  })
})

// Página de administração para gerar QR Codes
qrcodeApp.get('/admin/qr', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>JP Group - Gerador de QR Codes</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
      <link href="/static/style.css" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .admin-container {
          min-height: 100vh;
          padding: 4rem 2rem;
        }
        
        .token-card {
          background: rgba(26, 26, 26, 0.95);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }
        
        .qr-canvas {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          display: inline-block;
        }
        
        .token-badge {
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid rgba(212, 175, 55, 0.5);
          color: #d4af37;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-weight: 700;
          letter-spacing: 2px;
        }
        
        .copy-btn {
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.5);
          color: #d4af37;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .copy-btn:hover {
          background: rgba(212, 175, 55, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="admin-container">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="font-display text-4xl font-bold gradient-gold mb-4">
              <i class="fas fa-qrcode mr-3"></i>
              Gerador de QR Codes
            </h1>
            <p class="text-gray-400">
              Gere QR Codes únicos para acesso exclusivo ao site JP Group
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="tokensList">
            <!-- QR Codes serão gerados aqui -->
          </div>
          
          <div class="mt-8 text-center">
            <a href="/verify" class="inline-block px-8 py-3 bg-gradient-to-r from-gold-400 to-gold-300 text-black font-bold rounded-full hover:shadow-lg transition">
              <i class="fas fa-shield-check mr-2"></i>
              Testar Verificação
            </a>
          </div>
        </div>
      </div>
      
      <script>
        const validTokens = [
          { 
            token: 'TOKEN-DEMO-001', 
            name: 'Membro Demo',
            expires: '30 dias'
          },
          { 
            token: 'TOKEN-VIP-002', 
            name: 'Investidor VIP',
            expires: '30 dias'
          },
          { 
            token: 'TOKEN-ELITE-003', 
            name: 'Cliente Elite',
            expires: '30 dias'
          }
        ];
        
        const tokensList = document.getElementById('tokensList');
        
        validTokens.forEach((tokenData, index) => {
          const card = document.createElement('div');
          card.className = 'token-card';
          
          const qrId = 'qr-' + index;
          const verifyUrl = window.location.origin + '/verify?token=' + tokenData.token;
          
          card.innerHTML = \`
            <div class="text-center">
              <h3 class="text-xl font-bold text-gold-400 mb-2">\${tokenData.name}</h3>
              <div id="\${qrId}" class="mb-4 flex justify-center"></div>
              <div class="token-badge mb-4">\${tokenData.token}</div>
              <div class="text-gray-400 text-sm mb-4">
                <i class="fas fa-clock mr-2"></i>Válido por \${tokenData.expires}
              </div>
              <button onclick="copyToken('\${tokenData.token}')" class="copy-btn w-full">
                <i class="fas fa-copy mr-2"></i>Copiar Token
              </button>
              <button onclick="downloadQR('\${qrId}', '\${tokenData.token}')" class="copy-btn w-full mt-2">
                <i class="fas fa-download mr-2"></i>Baixar QR Code
              </button>
            </div>
          \`;
          
          tokensList.appendChild(card);
          
          // Gerar QR Code
          QRCode.toCanvas(document.getElementById(qrId), verifyUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#0a0a0a',
              light: '#ffffff'
            }
          });
        });
        
        function copyToken(token) {
          navigator.clipboard.writeText(token);
          alert('Token copiado: ' + token);
        }
        
        function downloadQR(qrId, token) {
          const canvas = document.querySelector('#' + qrId + ' canvas');
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = 'jpgroup-qr-' + token + '.png';
          a.click();
        }
      </script>
    </body>
    </html>
  `)
})

export default qrcodeApp
