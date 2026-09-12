# Step 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Support building for either backend at build time
ARG VITE_BACKEND_PROVIDER=pocketbase
ARG VITE_POCKETBASE_URL=https://pb.jchengroa.com
ENV VITE_BACKEND_PROVIDER=$VITE_BACKEND_PROVIDER
ENV VITE_POCKETBASE_URL=$VITE_POCKETBASE_URL

RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
