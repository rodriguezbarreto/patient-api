## Requirements
- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started
### Run

1. install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/).

2. To install the packages, run : `yarn install`

3. Start the app using: `docker-compose up`.

4. After that, go to: `http://localhost:4000/v1`

5. To tests, run: `yarn test`

6. To stop the app, run: `docker down`


### Available routes

| Method   | Resource        | Description                                                                                                                                 |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`   | `/list`     | List all patient in the data base.
| `POST`   | `/create`     | Create a new patient in the data base. You need to specify in the body the following datas: name, gender, weight, height and bith date.
| `PUT`   | `/update/{id}`     | It is necessary to specify in the requisition body which data should be updated.
| `POST`   | `/delete/{id}`     | Delete a patient in data base.


### Architectural diagram

[![PEBMED-API-1.png](https://i.postimg.cc/QN4zmMLk/PEBMED-API-1.png)](https://postimg.cc/MXBtKqpv)