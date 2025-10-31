#!/bin/bash
# 🚀 Script Automático para Enviar para GitHub
# Uso: bash PUSH_AUTOMATICO.sh

echo "════════════════════════════════════════════════════════"
echo "🚀 ENVIANDO FLIPWITHJP PARA GITHUB"
echo "════════════════════════════════════════════════════════"
echo ""

# Verificar se git está configurado
if [ -z "$(git config user.name)" ]; then
    echo "⚙️  Configurando Git..."
    git config user.name "Soli-25"
    git config user.email "soli25@example.com"
    echo "✅ Git configurado!"
    echo ""
fi

# Verificar se há mudanças para commitar
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Salvando mudanças locais..."
    git add .
    git commit -m "Atualização automática - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ Mudanças salvas!"
    echo ""
else
    echo "✅ Nenhuma mudança nova para salvar"
    echo ""
fi

# Verificar se remote está configurado
if ! git remote | grep -q "origin"; then
    echo "🔗 Configurando remote do GitHub..."
    git remote add origin https://github.com/Soli-25/flipwithjp.git
    echo "✅ Remote configurado!"
    echo ""
else
    echo "✅ Remote já configurado"
    echo ""
fi

# Mostrar status
echo "════════════════════════════════════════════════════════"
echo "📊 STATUS ATUAL:"
echo "════════════════════════════════════════════════════════"
echo "📁 Repositório: flipwithjp"
echo "👤 Usuário: Soli-25"
echo "🌐 URL: https://github.com/Soli-25/flipwithjp"
echo ""
echo "📦 Arquivos prontos para enviar:"
git log --oneline -5 2>/dev/null || echo "  - Código completo do FlipWithJP"
echo ""

echo "════════════════════════════════════════════════════════"
echo "🎯 PRONTO PARA ENVIAR!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "⚠️  IMPORTANTE: Você vai precisar de:"
echo "   1. Token do GitHub (seu 'password' especial)"
echo "   2. Criar o repositório 'flipwithjp' no GitHub"
echo ""
echo "Quer que eu te mostre como fazer isso? (s/n)"
read -r resposta

if [[ "$resposta" =~ ^[Ss]$ ]]; then
    echo ""
    echo "════════════════════════════════════════════════════════"
    echo "📋 PASSO 1: CRIAR TOKEN"
    echo "════════════════════════════════════════════════════════"
    echo ""
    echo "1. Abra esta URL no navegador:"
    echo "   👉 https://github.com/settings/tokens/new"
    echo ""
    echo "2. Preencha:"
    echo "   - Note: 'Token para flipwithjp'"
    echo "   - Expiration: 90 days (ou No expiration)"
    echo "   - Marque APENAS: ✅ repo"
    echo ""
    echo "3. Clique em 'Generate token'"
    echo ""
    echo "4. COPIE o token (começa com ghp_...)"
    echo "   ⚠️  IMPORTANTE: Você só verá o token UMA VEZ!"
    echo ""
    read -p "Pressione ENTER quando tiver o token copiado..."
    echo ""
    
    echo "════════════════════════════════════════════════════════"
    echo "📋 PASSO 2: CRIAR REPOSITÓRIO"
    echo "════════════════════════════════════════════════════════"
    echo ""
    echo "1. Abra esta URL no navegador:"
    echo "   👉 https://github.com/new"
    echo ""
    echo "2. Preencha:"
    echo "   - Repository name: flipwithjp"
    echo "   - Description: Sistema completo de Flipping Houses por JP"
    echo "   - ⚠️  DEIXE TUDO DESMARCADO (não adicione README)"
    echo ""
    echo "3. Clique em 'Create repository'"
    echo ""
    read -p "Pressione ENTER quando o repositório estiver criado..."
    echo ""
    
    echo "════════════════════════════════════════════════════════"
    echo "📋 PASSO 3: ENVIAR CÓDIGO"
    echo "════════════════════════════════════════════════════════"
    echo ""
    echo "Agora vou enviar o código..."
    echo ""
    echo "Quando pedir:"
    echo "  Username: Soli-25"
    echo "  Password: [COLE SEU TOKEN AQUI]"
    echo ""
    read -p "Pressione ENTER para continuar..."
    echo ""
    
    echo "🚀 Enviando..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "════════════════════════════════════════════════════════"
        echo "✅ SUCESSO! CÓDIGO ENVIADO!"
        echo "════════════════════════════════════════════════════════"
        echo ""
        echo "🎉 Seu código está no GitHub!"
        echo "🌐 Veja em: https://github.com/Soli-25/flipwithjp"
        echo ""
        echo "Próximos passos:"
        echo "  1. ✅ Código no GitHub"
        echo "  2. 🚀 Deploy no Cloudflare Pages (quando quiser)"
        echo ""
    else
        echo ""
        echo "════════════════════════════════════════════════════════"
        echo "❌ ERRO AO ENVIAR"
        echo "════════════════════════════════════════════════════════"
        echo ""
        echo "Possíveis problemas:"
        echo "  1. Token incorreto ou sem permissão 'repo'"
        echo "  2. Repositório não foi criado"
        echo "  3. Nome do repositório diferente de 'flipwithjp'"
        echo ""
        echo "💡 Dica: Tente novamente e verifique o token"
    fi
else
    echo ""
    echo "Ok! Quando estiver pronto, execute:"
    echo "  git push -u origin main"
    echo ""
    echo "E use:"
    echo "  Username: Soli-25"
    echo "  Password: [SEU TOKEN]"
fi

echo ""
echo "════════════════════════════════════════════════════════"
