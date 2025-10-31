# 🔐 Sistema de Acesso à Mentoria JP Group

## 📋 Visão Geral

O sistema de acesso permite controlar quem pode visualizar o conteúdo exclusivo da Mentoria Master Flip. Foi implementado com autenticação client-side (localStorage) para demonstração.

---

## 🌐 URLs do Sistema

### Páginas Públicas
- **Home**: `/` ou `https://seu-dominio.com/`
- **Página de Login**: `/acesso` ou `https://seu-dominio.com/acesso`

### Páginas Protegidas (Requer Login)
- **Área de Membros**: `/mentoria` ou `https://seu-dominio.com/mentoria`

---

## 🔑 Credenciais de Demonstração

### Usuário 1 - Demo
```
Email: demo@jpgroup.com
Senha: mentoria2024
```

### Usuário 2 - Contato
```
Email: contato@jpgroupc.com
Senha: jpgroup2024
```

### Usuário 3 - Admin
```
Email: admin@jpgroup.com
Senha: admin2024
```

**Nota:** Estas credenciais são para demonstração e testes. Em produção, você deve integrar com um sistema de autenticação real.

---

## 🎯 Como Funciona

### 1. **Página de Login** (`/acesso`)

**Elementos:**
- ✅ Formulário de login elegante com campos de email e senha
- ✅ Validação client-side
- ✅ Mensagens de erro/sucesso
- ✅ Credenciais de demonstração visíveis para facilitar testes
- ✅ Link para voltar ao site principal
- ✅ Link para solicitar acesso à mentoria

**Fluxo:**
1. Usuário acessa `/acesso`
2. Preenche email e senha
3. Clica em "Acessar Conteúdo"
4. Sistema valida as credenciais
5. Se válido: salva token no localStorage e redireciona para `/mentoria`
6. Se inválido: mostra mensagem de erro

### 2. **Área de Membros** (`/mentoria`)

**Proteção:**
- Verifica se existe token no localStorage
- Se não existe: redireciona automaticamente para `/acesso`
- Se existe: mostra o conteúdo exclusivo

**Conteúdo:**
- 📚 **Módulo 1**: Ebook Completo (Partes 1 e 2)
- 🎥 **Módulo 2**: Aulas em Vídeo
- 📊 **Módulo 3**: Planilhas e Calculadoras
- 👥 **Módulo 4**: Comunidade Exclusiva
- 📅 **Módulo 5**: Sessões Ao Vivo
- 🛠️ **Módulo 6**: Recursos Extras

**Funcionalidades:**
- Header com email do usuário logado
- Botão de logout
- Grid de módulos com ícones coloridos
- Links para cada tipo de conteúdo
- Botão para voltar ao site principal

---

## 🔧 Como Personalizar

### Adicionar Novas Credenciais

Edite o arquivo `/home/user/webapp/src/login.tsx`:

```typescript
const validCredentials = {
  'demo@jpgroup.com': 'mentoria2024',
  'contato@jpgroupc.com': 'jpgroup2024',
  'admin@jpgroup.com': 'admin2024',
  // Adicione novas credenciais aqui
  'novo@email.com': 'nova_senha'
};
```

### Adicionar Novos Módulos de Conteúdo

No arquivo `/home/user/webapp/src/login.tsx`, na rota `/mentoria`, adicione novos cards:

```tsx
<div class="luxury-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition">
  <div class="w-16 h-16 bg-CORDE-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
    <i class="fas fa-ICONE text-COR-400 text-2xl"></i>
  </div>
  <h3 class="font-display text-2xl font-bold mb-3">Título do Módulo</h3>
  <p class="text-gray-400 mb-4">
    Descrição do conteúdo
  </p>
  <a href="#" class="text-gold-400 hover:text-gold-300 text-sm font-semibold">
    Texto do Link →
  </a>
</div>
```

---

## 🚀 Para Produção (Sistema Real)

### Opções de Autenticação Backend

#### Opção 1: Cloudflare D1 + Workers
```typescript
// Criar tabela de usuários no D1
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

// Usar bcrypt para hash de senhas
// Implementar JWT tokens
```

#### Opção 2: Supabase Auth
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

#### Opção 3: Auth0
```typescript
// Integração com Auth0
// Fornece OAuth, MFA, gestão de usuários completa
```

### Recomendações de Segurança

1. **Nunca armazene senhas em texto plano**
   - Use bcrypt ou argon2 para hash
   
2. **Implemente HTTPS**
   - Cloudflare Pages já fornece SSL automático
   
3. **Use JWT Tokens**
   - Tokens com expiração
   - Refresh tokens
   
4. **Rate Limiting**
   - Limite tentativas de login
   - Previne ataques de força bruta
   
5. **Validação Server-Side**
   - Nunca confie apenas em validação client-side

---

## 📱 Responsividade

O sistema de acesso é totalmente responsivo:

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

---

## 🎨 Personalização Visual

### Cores das Áreas

```css
/* Login/Acesso - Dourado Premium */
--primary: #d4af37;
--primary-light: #f4e4b4;

/* Mensagens */
--success: rgb(34, 197, 94);   /* Verde */
--error: rgb(239, 68, 68);     /* Vermelho */

/* Módulos (Área de Membros) */
--module-1: rgb(59, 130, 246);   /* Azul */
--module-2: rgb(34, 197, 94);    /* Verde */
--module-3: rgb(168, 85, 247);   /* Roxo */
--module-4: rgb(239, 68, 68);    /* Vermelho */
--module-5: rgb(234, 179, 8);    /* Amarelo */
```

---

## 📊 Fluxo do Usuário

```
┌─────────────────┐
│   Home Page     │
│  (Pública)      │
└────────┬────────┘
         │
         ├─ Click "Área de Membros"
         │
         v
┌─────────────────┐
│  Página Login   │
│    (/acesso)    │
└────────┬────────┘
         │
         ├─ Preenche Credenciais
         │
         v
┌─────────────────┐      SIM      ┌──────────────────┐
│   Validação     │ ─────────────> │  Área de Membros │
│                 │                │   (/mentoria)    │
└────────┬────────┘                └──────────────────┘
         │                                  │
         │ NÃO                              │
         │                                  │
         v                                  │
┌─────────────────┐                         │
│ Mensagem Erro   │                         │
│ "Tente Again"   │                         │
└─────────────────┘                         │
                                            │
                                            │ Logout
                                            │
                                            v
                                    ┌──────────────┐
                                    │ Volta Login  │
                                    └──────────────┘
```

---

## 🛠️ Comandos Úteis

### Desenvolvimento Local
```bash
cd /home/user/webapp
npm run build
pm2 restart webapp
```

### Testar Login
```bash
# Testar página de login
curl http://localhost:3000/acesso

# Testar área de membros (deve redirecionar sem autenticação)
curl http://localhost:3000/mentoria
```

### Ver Logs
```bash
pm2 logs webapp --nostream --lines 50
```

---

## 📝 TODO - Melhorias Futuras

### Curto Prazo
- [ ] Adicionar "Esqueci minha senha"
- [ ] Implementar registro de novos usuários
- [ ] Adicionar verificação de email
- [ ] Implementar "Lembrar-me"

### Médio Prazo
- [ ] Integrar com API backend real
- [ ] Adicionar autenticação com Google/Facebook
- [ ] Implementar níveis de acesso (Basic, Pro, Premium)
- [ ] Dashboard de progresso do usuário

### Longo Prazo
- [ ] Sistema de pagamento integrado
- [ ] Emissão de certificados
- [ ] Gamificação (pontos, badges)
- [ ] Análise de progresso com gráficos

---

## 📞 Suporte

Para adicionar novos usuários ou modificar o sistema de acesso, entre em contato:

- **Email**: contato@jpgroupc.com
- **Website**: www.jpgroupc.com

---

**© 2024 JP Group Construction - Sistema de Acesso à Mentoria**
