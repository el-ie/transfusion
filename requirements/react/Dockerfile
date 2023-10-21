# Base image
FROM node:latest

# Set working directory
WORKDIR /app

COPY ./tools/launch_script.sh /

RUN chmod +x /launch_script.sh \
		&& apt-get update -y \
		&& apt-get install vim -y


ENTRYPOINT ["/launch_script.sh"]

CMD ["npm", "run", "start"]

#debug
#CMD ["tail", "-f", "/dev/null"]
