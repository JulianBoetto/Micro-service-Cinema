const cinemaCatalog = [{
    cidade: "Gravataí",
    uf: "RS",
    cinemas: []
}, {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [{
        _id: new ObjectId("605e57238ed0562b5da2f87d"),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [{
            nome: 1,
            sessoes: [{
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: "63d8791840a077c381f3baaa",
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }]
            }, {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baaa"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-06-01T13:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baab"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }, {
            nome: 2,
            sessoes: [{
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baab"),
                filme: "Vingadores: Era de Ultron",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-03-01T13:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }, {
        _id: new ObjectId("605e57238ed0562b5da2f87c"),
        nome: "GNC Lindóia",
        salas: [{
            nome: 100,
            sessoes: [{
                data: new Date("2021-03-30T19:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2021-03-30T11:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-03-30T13:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baab"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }]
}]

async function getAllMovies() {
    return movies;
}

async function getMovieById(id) {
    if (id == -1) return null;
    
    movies[0]._id = id;
    return movies[0];
}

async function getMoviePremieres() {
    movies[0].dataLancamento = new Date();
    return [movies[0]];
}

export default { getAllMovies, getMovieById, getMoviePremieres }