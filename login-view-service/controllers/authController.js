import axios from "axios";

async function authenticate(req, res, next) {
  const { email, password } = req.body;
  const loginUrl = `${process.env.API_GATEWAY_URL}/login`;
  if (!email || !password) return res.sendStatus(400);
  try {
    const response = await axios.post(loginUrl, {
      email,
      password,
    });
    res.cookie("token", response.data.token, { maxAge: 3600000 });
    res.redirect("/index");
  } catch (error) {
    const errorMessage = 'Incorrect email or password';
    return res.render('login', { errorMessage, title: "Login", message: null, error: null });
  }
}

async function validateToken(req, res, next) {
  const token = req.cookies.token;
  console.log(token)
  if (!token) return res.redirect("/login");
  next();
}

export default { authenticate, validateToken };
