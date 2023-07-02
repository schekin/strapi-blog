FROM repo.allright.io/base-node:14-classic-app
ARG NODE_ENV=development

ENV PATH /opt/node_modules/.bin:$PATH
ENV NODE_ENV=${NODE_ENV}
ENV NODE_PATH=.
ENV PORT=8080

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f -I http://localhost:8080/_health || exit 1

RUN chown allright:allright /opt

USER allright
RUN yarn config set network-timeout 600000 -g

WORKDIR /opt/
COPY --chown=allright:allright ./package.* ./yarn.* ./
RUN yarn install

WORKDIR /opt/app
COPY --chown=allright:allright ./ ./
RUN yarn build
CMD ["yarn", "start"]
