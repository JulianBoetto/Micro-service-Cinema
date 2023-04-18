export default (app, repository) => {
    app.get('/movies/premieres', async (req, res, next) => {
        const movies = await repository.getMoviePremieres();
        res.json(movies);
    })
    
    app.get('/movies', async (req, res, next) => {
        const movies = await repository.getAllMovies();
        res.json(movies);
    })
    
    app.get('/movies/:id', async (req, res, next) => {
        const movie = await repository.getMovieById(req.params.id);
        if (!movie) return res.sendStatus(404);
        
        res.json(movie);
    })

    app.post('/movies', async (req, res, next) => {
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = parseInt(req.body.duracao);
        const dataLancamento = new Date(req.body.dataLancamento);
        const imagem = req.body.imagem;
        const categorias = req.body.categorias;

        const result = await repository.addMovie({ titulo, sinopse, duracao, dataLancamento, imagem, categorias });

        console.log(`User ${res.locals.userId} added the movie ${result._id} at ${new Date()}`);
        res.status(201).json(result);
    })
}