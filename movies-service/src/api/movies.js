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
}