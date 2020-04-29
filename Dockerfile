FROM node:alpine

EXPOSE 3045

RUN mkdir -p /site
WORKDIR /site
VOLUME /site

COPY . /site
COPY ./entry.sh /

RUN chmod +x /entry.sh
ENTRYPOINT ["/entry.sh"]
