import axios from 'axios';

async function authenticate(req, res, next) {
    const {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    res.send(req.body)
}

export default { authenticate };
