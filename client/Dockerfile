FROM nginx:alpine

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install

COPY . /frontend/

ENV VITE_title="HELLO TODO APP"

EXPOSE 80

CMD ["nginx","-g","daemon off;"]