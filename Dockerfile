FROM node:12-stretch
WORKDIR /app
COPY . .
RUN yarn && PUBLIC_URL=/ yarn build 

FROM nginx:1.17
COPY --from=0 /app/build /usr/share/nginx/html
