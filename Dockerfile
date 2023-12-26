FROM ubuntu

# INSTALL MYSQL
RUN apt update && \
    apt install my-sql

# INSTALL NODEJS
RUN apt update && \
    apt install nodejs && \
    npm install -g npm

# modify this line if you make a change to APP_PORT in .env
EXPOSE 3000 3000

WORKDIR /app

COPY . /app

CMD ["npm", "start"]