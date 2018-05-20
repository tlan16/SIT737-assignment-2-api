FROM node:9.11.1-alpine

RUN apk --update add \
    bash \
    && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*


WORKDIR /src
ADD . .

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "serve"]
