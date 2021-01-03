FROM node:15.3.0-alpine3.10
WORKDIR /dolifront

ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir /home/react/
COPY ./dolifront /home/react/dolifront/
WORKDIR /home/react/dolifront/
RUN npm install
EXPOSE 80

CMD ["npm", "start"]