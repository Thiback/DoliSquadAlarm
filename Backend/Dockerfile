FROM node:15.3.0-alpine3.10

COPY ./ /app/
WORKDIR /app/
EXPOSE 8000
RUN npm install

CMD ["node", "src/app.js"]
