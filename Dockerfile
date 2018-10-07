FROM node:8.12.0

MAINTAINER cuizaiyong <cuizaiyong@xigua.city>


ENV PROJECT_PATH /usr/xigua_front/


COPY . ${PROJECT_PATH}

WORKDIR ${PROJECT_PATH}

RUN npm install --registry=https://taobao.npm.taobao.org

CMD npm start