#!/bin/bash

# 🚀 SCRIPT PARA ENVIAR CÓDIGO PARA GITHUB
# Execute este script após criar o token e repositório

echo "================================================"
echo "🚀 ENVIANDO CÓDIGO PARA GITHUB"
echo "================================================"
echo ""
echo "⚠️  ANTES DE CONTINUAR:"
echo "   1. Você criou o token no GitHub?"
echo "   2. Você criou o repositório 'flipwithjp'?"
echo ""
read -p "Se sim, pressione ENTER para continuar..."
echo ""

# Solicitar o token
echo "📝 Cole aqui o token que você copiou do GitHub:"
echo "   (O token começa com 'ghp_...')"
echo ""
read -s GITHUB_TOKEN
echo ""

# Validar se o token foi fornecido
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ ERRO: Você não colou o token!"
    echo "   Execute o script novamente e cole o token."
    exit 1
fi

# Configurar git credential
echo "🔧 Configurando credenciais..."
git config --global credential.helper store

# Criar arquivo de credenciais
echo "https://Soli-25:${GITHUB_TOKEN}@github.com" > ~/.git-credentials

# Fazer push
echo ""
echo "📤 Enviando código para GitHub..."
echo ""

cd /home/user/webapp

# Tentar push
if git push -u origin main; then
    echo ""
    echo "================================================"
    echo "✅ SUCESSO! CÓDIGO ENVIADO PARA GITHUB!"
    echo "================================================"
    echo ""
    echo "🌐 Veja seu código aqui:"
    echo "   https://github.com/Soli-25/flipwithjp"
    echo ""
    echo "🎉 Próximo passo: Deploy no Cloudflare Pages"
    echo ""
else
    echo ""
    echo "================================================"
    echo "❌ ERRO AO ENVIAR CÓDIGO"
    echo "================================================"
    echo ""
    echo "Possíveis causas:"
    echo "1. Token inválido ou sem permissão 'repo'"
    echo "2. Repositório não foi criado"
    echo "3. Nome do repositório está errado"
    echo ""
    echo "Verifique e execute o script novamente."
    echo ""
fi

# Limpar credenciais por segurança
rm -f ~/.git-credentials
