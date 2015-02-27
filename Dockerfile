FROM node:0.10-onbuild
MAINTAINER dinks

EXPOSE 5000

ENV DBURL mongodb://db:27017/meetingminutes

CMD ["node", "server.js"]
