# Cinema Micro Service

A personal project with two microservices connected through an API
gateway controlling routing. The API emulates a movie query system.

## Features

- EJS
- MongoDB Cluster
- Node v19

## Installation

### Api-gateway configuration

```bash
   cd api-gateway
   touch .env
   npm install
```

Copy the content of the .env.example file and paste it into the created .env file, completing each variable.

```bash
   npm start
```


### Cinema catalog service configuration

```bash
   cd cinema-catalog-services
   touch .env
   npm install
```

Copy the content of the .env.example file and paste it into the created .env file, completing each variable.

```bash
   npm start
```

### Movies service configuration

```bash
   cd movies-service
   touch .env
   npm install
```

Copy the content of the .env.example file and paste it into the created .env file, completing each variable.

```bash
   npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (see the .env.example file in each service)

`NODE_ENV` - "development" / "production"

`MONGO_CONNECTION` - url string for mongo connection

`MONGO_CONNECTION_TEST` - url string mock for mongo connection test

`MS_NAME` - "cinema-catalog-service" / "movies-service"

`DATABASE_NAME` - "cinema"

`PORT` - port number for each service

`SECRET` - jwt secret for each service

## API Reference

#### Login

```http
  POST /login
```

| Parameter    | Type       | Description           |
| :----------- | :--------- | :-------------------- |
| `email`    | `string` | **Required**.  |
| `password` | `string` | **Required**.   |

#### Get all cities

```http
  GET /cities
```


#### Get all cities

```http
  GET /cities
```

#### Get all movies by city

```http
  GET /cities/:cityId/movies
```

#### Get information movie by movie and city

```http
  GET /cities/:cityId/movies/:movieId
```

#### Get all cinemas by city

```http
  GET /cities/:cityId/cinemas
```

#### Get movies by cinema

```http
  GET /cinemas/:cinemaId/movies
```

#### Get information movie by movie and cinema

```http
  GET /cinemas/:cinemaId/movies/:movieId
```

#### Get movies

```http
  GET /movies
```

#### Get movies by ID

```http
  GET /movies/:id
```

#### Get all premieres

```http
  GET /movies/premieres
```

#### Create a new movie

```http
  POST /movies
```

| Parameter       | Type       | Description                                                                               |
| :-------------- | :--------- | :---------------------------------------------------------------------------------------- |
| `title`       | `string` | **Required**. Minimum length of 2 and a maximum length of 150 characters            |
| `synopsis`    | `string` | Minimum length of 10 and a maximum length of 500 characters.                              |
| `duration`    | `number` | A positive integer representing the length of the movie in minutes.                       |
| `releaseDate` | `date`   | **Required**. A date object representing the date the movie was released.          |
| `image`       | `string` | **Required**. A URL to an image file (either JPG, PNG, GIF, or SVG).               |
| `categories`  | `array`  | **Required**. An array of strings representing the categories the movie belongs to. |

Here's an example of a POST request body to create a new movie:

```
{
  "_id": "63d8791840a077c381f3baa9",
  "title": "Avengers: Endgame",
  "synopsis": "The most powerful heroes on Earth face off against Thanos. Again.",
  "duration": 181,
  "releaseDate": "2022-08-02T00:00:00Z",
  "image": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "categories": ["Adventure", "Action"]
}
```

#### Delete a movie

```http
  DELETE /movies/:id
```

## Author

- [@julianboetto](https://www.github.com/julianboetto)

## Feedback

If you have any feedback, please reach out to us at [julib_8724@hotmail.com](mailto:julib_8724@hotmail.com)
