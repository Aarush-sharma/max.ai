FROM node:20 

WORKDIR /src/app

COPY package.json package-lock.json ./
COPY /prisma .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","docker:dev" ]