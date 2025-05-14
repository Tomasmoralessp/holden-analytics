FROM node:20

WORKDIR /app

COPY ./frontend /app

RUN npm install && npm run build

# Servir build con servidor estático
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]
