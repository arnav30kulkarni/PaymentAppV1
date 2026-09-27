FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite embeds this value into the static bundle at build time. It must be
# reachable from the browser, not just from another container.
ARG VITE_API_URL=http://localhost:4500
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

FROM nginx:stable-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]