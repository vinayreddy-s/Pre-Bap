FROM node:16-alpine3.11 AS builder

RUN npm install -g @angular/cli@12.1.1

RUN mkdir /user-proboarding

WORKDIR /user-proboarding

COPY . .

RUN npm ci

RUN npm run ng build

FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /user-proboarding/dist/user-onboarding/ /usr/share/nginx/html