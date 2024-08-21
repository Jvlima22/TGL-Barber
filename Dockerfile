# Usa uma imagem base com Node.js
FROM node:18

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos de configuração para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Constrói o projeto Next.js
RUN npm run build

# Expõe a porta que o Next.js usará
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "start"]
