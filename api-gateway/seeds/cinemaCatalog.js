const { ObjectId } = require("../src/node_modules/mongodb");

module.exports = [
  {
    city: "Gravataí",
    state: "RS",
    movieTheaters: [],
  },
  {
    city: "Porto Alegre",
    state: "RS",
    country: "BR",
    movieTheaters: [
      {
        _id: new ObjectId("605e57238ed0562b5da2f87d"),
        name: "Cinemark Bourbon Ipiranga",
        screens: [
          {
            name: 1,
            sessions: [
              {
                date: new Date("2021-03-01T09:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baaa"),
                movie: "Vingadores: Guerra Infinita",
                value: 25,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: false,
                  },
                ],
              },
              {
                date: new Date("2021-03-01T11:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baaa"),
                movie: "Vingadores: Guerra Infinita",
                value: 25,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: true,
                  },
                ],
              },
              {
                date: new Date("2021-06-01T13:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baab"),
                movie: "Avengers: Age of Ultron",
                value: 20,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: false,
                  },
                  {
                    number: 2,
                    available: true,
                  },
                ],
              },
            ],
          },
          {
            name: 2,
            sessions: [
              {
                date: new Date("2021-03-01T09:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baab"),
                movie: "Vingadores: Era de Ultron",
                value: 25,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: false,
                  },
                ],
              },
              {
                date: new Date("2021-03-01T11:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baa9"),
                movie: "Vingadores: Ultimato",
                value: 25,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: true,
                  },
                ],
              },
              {
                date: new Date("2021-03-01T13:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baa9"),
                movie: "Vingadores: Ultimato",
                value: 20,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: false,
                  },
                  {
                    number: 2,
                    available: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _id: new ObjectId("605e57238ed0562b5da2f87c"),
        name: "GNC Lindóia",
        screens: [
          {
            name: 100,
            sessions: [
              {
                date: new Date("2021-03-30T19:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baa9"),
                movie: "Vingadores: Ultimato",
                value: 25,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: false,
                  },
                ],
              },
              {
                date: new Date("2021-03-30T11:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baa9"),
                movie: "Vingadores: Ultimato",
                value: 25,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: true,
                  },
                ],
              },
              {
                date: new Date("2021-03-30T13:00:00Z"),
                movieId: new ObjectId("63d8791840a077c381f3baab"),
                movie: "Avengers: Age of Ultron",
                value: 20.0,
                seats: [
                  {
                    number: 1,
                    available: true,
                  },
                  {
                    number: 2,
                    available: false,
                  },
                  {
                    number: 2,
                    available: true,
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
