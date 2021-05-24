FROM node:14

WORKDIR /usr/app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]