# Base image
FROM node:latest

WORKDIR /app

RUN apt-get update -y

COPY ./tools/entrypoint.sh /entrypoint.sh
Run chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["tail", "-f", "/dev/null"]
#CMD ["npx", "run", "start:dev"]
