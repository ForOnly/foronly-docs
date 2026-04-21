# 构建阶段
FROM registry.cn-hangzhou.aliyuncs.com/foronly_common_registry/node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run docs:build

# 运行阶段
FROM registry.cn-hangzhou.aliyuncs.com/foronly_common_registry/nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
