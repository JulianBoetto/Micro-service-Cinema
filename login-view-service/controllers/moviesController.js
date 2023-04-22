import movies from "../repository/movies.js";

async function getMovies(req, res, next) {
  const token = req.cookies.token;
  const response = await movies.getMovies(token);
  
  if (response && response.error) return res.redirect("/logout");

  res.render("index", {
    title: "title",
    docs: [],
    qtd: 2,
    qtdPaginas: 4,
    profile: "req.user.profile",
    data: response,
  });
}

export default { getMovies };
