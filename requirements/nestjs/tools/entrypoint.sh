#!/bin/bash

cd /app
npm install

# Change directory to /app/src
#cd /app/src

# Run migrations and seeding
#npx prisma migrate dev --name "init"
#npx prisma db push
#npx prisma db seed

# # Run prisma studio
# npx prisma studio

exec "$@"
