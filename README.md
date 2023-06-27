# Hello there :wave:

This is a simple ecommerce application backend built using the microservices architecture. [Here's](https://dev.to/sainig/series/23469) a series of articles I'm writing to document my journey throught the process.

---

## Runing the application

For ease of use and easier maintainability, I've split the docker-compose files into separate based on the type of services they run.

### Setting up the pre-requisites

We can setup/initialize all the pre-requisites needed for our app in `docker-compose.setup.yml`. These items could include stuff such as database migrations, seed data creation, creating networks and volumes, etc.

```bash
docker-compose --file docker-compose.setup.yml up
```

### Starting the dependencies

The `docker-compose.deps.yml` file is used to start up all the application level dependencies such as the database, messaging broker, mailing server, etc.

```bash
docker-compose --file docker-compose.deps.yml up
```

### Starting the services

The `docker-compose.services.yml` is used to start up all the application level dependencies such as the database, messaging broker, mailing server, etc.

```bash
docker-compose --file docker-compose.services.yml up
```

### Starting the Nginx gateway

I've only put the Nginx service in the last `docker-compose.gateway.yml`. This is the final piece that'll make out app accessible from the outside internet.

```bash
docker-compose --file docker-compose.gateway.yml up
```

---

## Application Design

![Application architecture diagram](app_design.png)

---

## Technologies & Tools Used
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/)
- [Nginx](https://www.nginx.com/)
- [Nats](https://github.com/nats-io/nats.js)
