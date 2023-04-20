const movies = [
    {
        "_id": "63d8791840a077c381f3baa9",
        "title": "Os Vingadores: Ultimato",
        "synopsis": "Os heróis mais poderosos da Terra enfrentando o Thanos. De novo.",
        "duration": 181,
        "releaseDate": new Date("2022-12-25T00:00:00Z"),
        "image": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categories": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "63d8791840a077c381f3baaa",
        "title": "Os Vingadores: Guerra Infinita",
        "synopsis": "Os heróis mais poderosos da Terra enfrentando o Thanos",
        "duration": 149,
        "releaseDate": new Date("2018-04-26T00:00:00Z"),
        "image": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categories": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "63d8791840a077c381f3baab",
        "title": "Os Vingadores: Era de Ultron",
        "synopsis": "Os heróis mais poderosos da Terra enfrentando o Ultron",
        "duration": 141,
        "releaseDate": new Date("2023-01-23T00:00:00Z"),
        "image": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categories": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "63d8791840a077c381f3baac",
        "title": "Os Vingadores",
        "synopsis": "Os heróis mais poderosos da Terra enfrentando o Loki",
        "duration": 143,
        "releaseDate": new Date("2012-04-27T00:00:00Z"),
        "image": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "categories": [
            "Aventura",
            "Ação"
        ]
    }
]

async function getAllMovies() {
    return movies;
}

async function getMovieById(id) {
    if (id == -1) return null;
    
    movies[0]._id = id;
    return movies[0];
}

async function getMoviePremieres() {
    movies[0].releaseDate = new Date();
    return [movies[0]];
}

async function addMovie(movie) {
    return movies[0];
}

async function deleteMovie(id) {
    if (!id) throw new Error('Não foi possível excluir este filme!');
    return true;
}

export default { getAllMovies, getMovieById, getMoviePremieres, addMovie, deleteMovie }