FROM node:9.11.1-alpine

WORKDIR /src
ADD . .

RUN npm install --quiet --loglevel=error

EXPOSE 3000

CMD ["npm", "run", "serve"]
