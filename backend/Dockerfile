FROM node


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

#DEBUG CONFIG
EXPOSE 9229

CMD ["npm", "run", "dev"]
