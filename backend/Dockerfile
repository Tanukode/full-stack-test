FROM node:18

# Create app directory
WORKDIR /app

# Install apps dependencies
COPY . /app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE  3000

CMD [ "node", "index.js" ]