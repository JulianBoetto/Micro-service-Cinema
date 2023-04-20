const { ObjectId } = require("../src/node_modules/mongodb");

module.exports = [
  {
    cidade: "Gravataí",
    uf: "RS",
    cinemas: [],
  },
  {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [
      {
        _id: new ObjectId(),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baaa"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baaa"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2021-06-01T13:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baab"),
                filme: "Vingadores: Era de Ultron",
                valor: 20,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
          {
            nome: 2,
            sessoes: [
              {
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baab"),
                filme: "Vingadores: Era de Ultron",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2021-03-01T13:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 20,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _id: new ObjectId(),
        nome: "GNC Lindóia",
        salas: [
          {
            nome: 100,
            sessoes: [
              {
                data: new Date("2021-03-30T19:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2021-03-30T11:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baa9"),
                filme: "Vingadores: Ultimato",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2021-03-30T13:00:00Z"),
                idFilme: new ObjectId("63d8791840a077c381f3baab"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
