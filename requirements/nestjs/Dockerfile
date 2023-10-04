# Base image
FROM node:latest

WORKDIR /app

RUN apt-get update -y \
  && apt-get install vim -y

COPY ./tools/entrypoint.sh /entrypoint.sh
Run chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "start:dev"]
