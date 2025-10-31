#!/bin/bash

# Script para enviar flipwithjp para o GitHub
# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   FlipWithJP - Push para GitHub       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script de dentro de /home/user/webapp${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Configuração do Repositório${NC}"
echo ""
echo "Nome do repositório: flipwithjp"
echo "Branch: main"
echo ""

# Pedir o nome de usuário do GitHub
echo -e "${YELLOW}Digite seu nome de usuário do GitHub:${NC}"
read -r GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}❌ Nome de usuário não pode estar vazio${NC}"
    exit 1
fi

# URL do repositório
REPO_URL="https://github.com/${GITHUB_USER}/flipwithjp.git"

echo ""
echo -e "${GREEN}🔧 Configurando repositório...${NC}"

# Remover origin se já existir
git remote remove origin 2>/dev/null

# Adicionar novo origin
git remote add origin "$REPO_URL"

# Verificar se foi adicionado
if git remote -v | grep -q "origin"; then
    echo -e "${GREEN}✅ Remote 'origin' configurado: $REPO_URL${NC}"
else
    echo -e "${RED}❌ Erro ao configurar remote${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📊 Status do Git:${NC}"
git status --short

echo ""
echo -e "${YELLOW}📝 Últimos commits:${NC}"
git log --oneline -5

echo ""
echo -e "${GREEN}🚀 Fazendo push para GitHub...${NC}"
echo ""
echo -e "${YELLOW}⚠️  ATENÇÃO:${NC}"
echo "1. O GitHub pedirá autenticação"
echo "2. Use seu Personal Access Token (não senha)"
echo "3. Token: https://github.com/settings/tokens"
echo ""
echo -e "${YELLOW}Pressione ENTER para continuar ou CTRL+C para cancelar${NC}"
read

# Fazer push
git push -u origin main

# Verificar resultado
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✅ PUSH REALIZADO COM SUCESSO!      ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}🌐 Seu repositório está em:${NC}"
    echo "   https://github.com/${GITHUB_USER}/flipwithjp"
    echo ""
    echo -e "${YELLOW}📋 Próximos passos:${NC}"
    echo "   1. Acesse o repositório no GitHub"
    echo "   2. Configure Cloudflare Pages (opcional)"
    echo "   3. Deploy para produção"
    echo ""
else
    echo ""
    echo -e "${RED}╔════════════════════════════════════════╗${NC}"
    echo -e "${RED}║   ❌ ERRO NO PUSH                      ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Possíveis soluções:${NC}"
    echo "1. Verifique se o repositório 'flipwithjp' existe no GitHub"
    echo "2. Crie em: https://github.com/new"
    echo "3. Use Personal Access Token, não senha"
    echo "4. Token: https://github.com/settings/tokens"
    echo ""
    echo -e "${YELLOW}Ou tente o push manual:${NC}"
    echo "   git push -u origin main"
    echo ""
fi
