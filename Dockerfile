#Build Angular App
FROM node:18.15.0-alpine3.16 as node
WORKDIR /app
RUN echo "STAGE 0, COPY SRC"
COPY . /app/
RUN echo "STAGE 1, YARN INSTALL"
RUN yarn install
RUN echo "STAGE 3, NPM BUILD PROD"
RUN yarn run ng build
RUN ls -a /app/dist
#Add angular app into nginx
FROM nginx:1.15.12-alpine
RUN echo "STAGE 4, COPY DIST TO NGINX"
COPY --from=node /app/dist/full-stack-test /usr/share/nginx/html
COPY --from=node /app/nginx-custom.conf /etc/nginx/conf.d/default.conf