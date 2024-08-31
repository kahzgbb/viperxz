const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const SECRET_KEY = "sua_chave_secreta";

module.exports = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        // Gera a nova chave se o token for válido
        const newKey = crypto.randomBytes(16).toString('hex');
        res.status(200).json({ key: newKey });
    });
};
