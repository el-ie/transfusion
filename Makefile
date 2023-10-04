all: build node_modules

build:
	docker-compose -f ./docker-compose.yml up -d --build

stop:
	docker-compose -f ./docker-compose.yml stop

start:
	docker-compose -f ./docker-compose.yml start

down:
	docker-compose -f ./docker-compose.yml down

clean: down
	docker system prune -af

fclean : clean

re: fclean all

log :
	docker-compose -f ./docker-compose.yml logs

.PHONY: all build stop start down clean fclean re log node_modules
