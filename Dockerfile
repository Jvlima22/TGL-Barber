# Use a imagem oficial do Node.js como imagem base
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o container
COPY . .

# Exponha a porta na qual a aplicação vai rodar
EXPOSE 3000

# Defina o comando para rodar a aplicação
CMD ["npm", "start"]
