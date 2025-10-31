# 🔐 Sistema de Acesso via QR Code - JP Group Construction

## 📋 Visão Geral

Sistema moderno de autenticação e proteção do site usando **QR Codes únicos** e **tokens personalizados**. Todo o conteúdo do site agora está protegido e acessível apenas para membros autenticados.

---

## 🎯 Recursos Implementados

### ✅ Funcionalidades Principais

1. **Proteção Total do Site**
   - Todo o conteúdo principal está bloqueado
   - Redirecionamento automático para página de verificação
   - Apenas membros com token válido podem acessar

2. **Sistema de QR Codes**
   - QR Codes únicos para cada membro
   - Geração automática via painel administrativo
   - Download individual dos QR Codes
   - Tokens alfanuméricos seguros

3. **Validação de Tokens**
   - API backend para verificação de tokens
   - Expiração automática após 30 dias
   - Verificação em tempo real
   - Armazenamento seguro em localStorage

4. **Painel de Administração**
   - Geração de múltiplos QR Codes
   - Visualização de tokens ativos
   - Cópia rápida de tokens
   - Download de QR Codes em PNG

---

## 🔑 Tokens Disponíveis (Demo)

| Token | Nome do Membro | Validade | Nível de Acesso |
|-------|----------------|----------|-----------------|
| `TOKEN-DEMO-001` | Membro Demo | 30 dias | Premium |
| `TOKEN-VIP-002` | Investidor VIP | 30 dias | Premium |
| `TOKEN-ELITE-003` | Cliente Elite | 30 dias | Premium |

---

## 🌐 URLs do Sistema

### Páginas Públicas (Não Requerem Autenticação)

| Página | URL | Descrição |
|--------|-----|-----------|
| **Verificação de Acesso** | `/verify` | Página para inserir token ou escanear QR Code |
| **Admin QR Codes** | `/admin/qr` | Painel para gerar e gerenciar QR Codes |
| **API Verificação** | `/api/verify-token` | Endpoint para validar tokens (POST) |

### Páginas Protegidas (Requerem Token Válido)

| Página | URL | Descrição |
|--------|-----|-----------|
| **Site Principal** | `/` | Todo o conteúdo do site (hero, sistema, critérios, etc.) |
| **Área de Membros** | `/mentoria` | Conteúdo exclusivo da mentoria (legado) |
| **Login Legado** | `/acesso` | Sistema de login antigo (mantido para compatibilidade) |

---

## 🚀 Como Funciona

### Fluxo de Acesso para Membros

```
1. Membro recebe QR Code por email/WhatsApp
   ↓
2. Escaneia QR Code com câmera do celular
   ↓
3. Abre link automático: https://site.com/verify?token=TOKEN-XXX-XXX
   ↓
4. Sistema valida token no backend
   ↓
5. Token válido = Salva em localStorage + Redireciona para /
   ↓
6. Acesso completo ao site por 30 dias
   ↓
7. Após 30 dias = Token expira + Solicita novo QR Code
```

### Fluxo de Proteção Automática

```javascript
// Executado em TODAS as páginas protegidas
window.addEventListener('DOMContentLoaded', () => {
  // 1. Verificar se existe token
  const token = localStorage.getItem('jpgroup_access_token');
  const expiry = localStorage.getItem('jpgroup_token_expiry');
  
  // 2. Se não existe ou expirou
  if (!token || Date.now() >= parseInt(expiry)) {
    // Limpar dados
    localStorage.clear();
    // Redirecionar para verificação
    window.location.href = '/verify';
  }
  
  // 3. Token válido = Continuar navegação
});
```

---

## 🛠️ Arquitetura Técnica

### Backend (Hono + TypeScript)

**Arquivo:** `/src/qrcode.tsx`

```typescript
// Base de tokens (em produção, migrar para Cloudflare D1)
const validTokens = new Map([
  ['TOKEN-DEMO-001', {
    memberId: 'M001',
    memberName: 'Membro Demo',
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
    accessLevel: 'premium'
  }]
]);

// Rota de verificação
qrcodeApp.get('/verify', (c) => { ... })

// API de validação
qrcodeApp.post('/api/verify-token', async (c) => { ... })

// Admin para gerar QR Codes
qrcodeApp.get('/admin/qr', (c) => { ... })
```

### Frontend (JavaScript Vanilla)

**Proteção em** `/src/index.tsx`:

```javascript
// Sistema de proteção executado em todas as páginas
(function() {
  function checkAccessToken() {
    const token = localStorage.getItem('jpgroup_access_token');
    const expiry = localStorage.getItem('jpgroup_token_expiry');
    
    if (!token || !expiry) {
      window.location.href = '/verify';
      return false;
    }
    
    if (Date.now() >= parseInt(expiry)) {
      localStorage.removeItem('jpgroup_access_token');
      localStorage.removeItem('jpgroup_token_expiry');
      localStorage.removeItem('jpgroup_member_name');
      window.location.href = '/verify';
      return false;
    }
    
    return true;
  }
  
  checkAccessToken();
})();
```

### Biblioteca QR Code

**CDN:** `qrcode@1.5.3`

```javascript
// Gerar QR Code com URL de verificação
const verifyUrl = window.location.origin + '/verify?token=' + token;

QRCode.toCanvas(canvasElement, verifyUrl, {
  width: 200,
  margin: 2,
  color: {
    dark: '#0a0a0a',
    light: '#ffffff'
  }
});
```

---

## 📱 Como Usar (Administrador)

### 1. Acessar Painel de QR Codes

```
URL: https://seu-site.com/admin/qr
```

### 2. Visualizar Tokens Disponíveis

O painel mostra:
- QR Code visual de cada token
- Token alfanumérico
- Nome do membro
- Validade (30 dias)

### 3. Compartilhar com Membros

**Opção A: Enviar QR Code (Imagem)**
```
1. Clicar em "Baixar QR Code"
2. Salvar PNG localmente
3. Enviar por WhatsApp/Email
```

**Opção B: Copiar Token (Texto)**
```
1. Clicar em "Copiar Token"
2. Enviar token por texto
3. Membro digita manualmente em /verify
```

### 4. Instruções para o Membro

```
Olá [Nome],

Seu acesso exclusivo ao JP Group Construction está pronto!

🔐 MÉTODO 1 - QR Code (Recomendado):
1. Abra a câmera do seu celular
2. Aponte para o QR Code anexo
3. Toque no link que aparecer
4. Pronto! Acesso liberado por 30 dias

🔑 MÉTODO 2 - Token Manual:
1. Acesse: https://seu-site.com/verify
2. Digite o token: TOKEN-XXX-XXX
3. Clique em "Verificar Acesso"
4. Pronto! Acesso liberado por 30 dias

⏰ Validade: 30 dias a partir da primeira verificação

Dúvidas? contato@jpgroupc.com
```

---

## 🔒 Segurança

### Camadas de Proteção

1. **Client-Side (localStorage)**
   - Token armazenado localmente
   - Expiração automática após 30 dias
   - Verificação em cada carregamento de página

2. **Server-Side (API)**
   - Validação de token no backend
   - Verificação de expiração
   - Tokens únicos e não reutilizáveis

3. **Redirecionamento Automático**
   - Sem token = Bloqueio imediato
   - Token expirado = Limpeza e bloqueio
   - Token inválido = Erro e nova tentativa

### Limitações Conhecidas (Demo)

⚠️ **Atual (Desenvolvimento):**
- Tokens armazenados em memória (Map)
- Reiniciar servidor = Tokens resetam
- Não há invalidação manual de tokens

✅ **Para Produção (Recomendado):**
- Migrar tokens para Cloudflare D1
- Implementar invalidação manual
- Adicionar logs de acesso
- Implementar rate limiting

---

## 🚀 Deploy para Produção

### 1. Migrar Tokens para Cloudflare D1

```bash
# Criar banco de dados D1
npx wrangler d1 create jpgroup-tokens

# Criar tabela de tokens
CREATE TABLE tokens (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  member_name TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  access_level TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

# Inserir tokens iniciais
INSERT INTO tokens VALUES 
  ('TOKEN-DEMO-001', 'M001', 'Membro Demo', ..., 'premium', ...);
```

### 2. Atualizar wrangler.jsonc

```jsonc
{
  "name": "webapp",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "jpgroup-tokens",
      "database_id": "your-database-id"
    }
  ]
}
```

### 3. Atualizar src/qrcode.tsx

```typescript
// Substituir Map por queries D1
qrcodeApp.post('/api/verify-token', async (c) => {
  const { env } = c;
  const { token } = await c.req.json();
  
  const result = await env.DB.prepare(
    'SELECT * FROM tokens WHERE id = ? AND expires_at > ?'
  ).bind(token, Date.now()).first();
  
  if (!result) {
    return c.json({ valid: false, error: 'Token inválido' });
  }
  
  return c.json({
    valid: true,
    memberName: result.member_name,
    memberId: result.member_id,
    accessLevel: result.access_level,
    expiresAt: result.expires_at
  });
});
```

### 4. Deploy

```bash
# Build
npm run build

# Deploy para Cloudflare Pages
npx wrangler pages deploy dist --project-name webapp
```

---

## 📊 Estatísticas do Sistema

| Métrica | Valor |
|---------|-------|
| **Tokens Demo Ativos** | 3 |
| **Validade Padrão** | 30 dias |
| **Páginas Protegidas** | Todas (exceto /verify, /admin/qr) |
| **Tamanho Bundle** | 163.38 KB |
| **Tempo de Build** | ~785ms |
| **Biblioteca QR Code** | qrcode@1.5.3 (CDN) |

---

## 🎨 Design

### Página de Verificação (/verify)

- ✨ Design luxuoso consistente com site principal
- 🎨 Paleta dourada (#d4af37)
- 📱 Totalmente responsivo
- 🔐 Input especial para tokens (monospace, uppercase)
- ⚡ Feedback visual de sucesso/erro
- 🔄 Loading spinner durante verificação

### Painel Admin (/admin/qr)

- 📋 Grid responsivo de QR Codes
- 🖼️ QR Codes gerados em canvas HTML5
- 📥 Botão de download individual
- 📋 Botão de copiar token
- ℹ️ Informações de validade
- 🎨 Cards com efeitos glassmorphism

---

## 🧪 Testes

### Testar Manualmente

```bash
# 1. Acessar página de verificação
Abrir: https://seu-site.com/verify

# 2. Testar token válido
Token: TOKEN-DEMO-001
Resultado esperado: ✓ Acesso concedido + Redirecionamento

# 3. Testar token inválido
Token: TOKEN-INVALIDO
Resultado esperado: ✗ Token inválido ou expirado

# 4. Acessar sem token
Abrir: https://seu-site.com/
Resultado esperado: Redirecionamento automático para /verify

# 5. Acessar com token válido
Inserir token em /verify
Abrir: https://seu-site.com/
Resultado esperado: Acesso normal ao site
```

### Testar via API

```bash
# Token válido
curl -X POST http://localhost:3000/api/verify-token \
  -H "Content-Type: application/json" \
  -d '{"token":"TOKEN-DEMO-001"}'

# Resposta esperada:
# {"valid":true,"memberName":"Membro Demo","memberId":"M001",...}

# Token inválido
curl -X POST http://localhost:3000/api/verify-token \
  -H "Content-Type: application/json" \
  -d '{"token":"TOKEN-INVALIDO"}'

# Resposta esperada:
# {"valid":false,"error":"Token não encontrado"}
```

---

## 📝 Próximos Passos

### Melhorias Recomendadas

1. **Migração para D1** (Prioridade Alta)
   - [ ] Criar schema de banco de dados
   - [ ] Migrar lógica de tokens para D1
   - [ ] Implementar CRUD de tokens

2. **Dashboard Admin Completo**
   - [ ] Criar/revogar tokens via interface
   - [ ] Visualizar logs de acesso
   - [ ] Estatísticas de uso
   - [ ] Gestão de membros

3. **Notificações**
   - [ ] Email automático ao expirar token
   - [ ] Lembrete 5 dias antes de expirar
   - [ ] Webhook para integrações

4. **Segurança Avançada**
   - [ ] Rate limiting na API
   - [ ] CAPTCHA em /verify
   - [ ] IP whitelisting (opcional)
   - [ ] 2FA para admin

5. **Analytics**
   - [ ] Rastrear acessos por token
   - [ ] Páginas mais visitadas
   - [ ] Tempo médio de sessão
   - [ ] Dispositivos utilizados

---

## 🤝 Suporte

**Dúvidas ou problemas?**

- 📧 Email: contato@jpgroupc.com
- 🌐 Website: http://www.jpgroupc.com
- 📱 WhatsApp: (solicitar ao administrador)

---

## 📄 Licença

© 2024 JP Group Construction. Sistema proprietário de acesso exclusivo.

**Desenvolvido com ❤️ usando Hono + Cloudflare Workers + QR Code.js**
