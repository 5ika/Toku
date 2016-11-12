FROM node:7.1
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
WORKDIR /app
COPY package.json .
RUN $HOME/.yarn/bin/yarn
COPY . .
EXPOSE 7042
CMD ["node", "app"]
