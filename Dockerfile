FROM node:18 AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:18 AS deloy

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN yarn --prod
CMD ["node","index.js"]