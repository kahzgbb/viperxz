const jwt = require('jsonwebtoken');

const SECRET_KEY = "828OXmjum2*SJn2kuP00000xGgsw2";  // Use uma chave forte

module.exports = (req, res) => {
    const { username, password } = req.body;

    // Simulação simples de autenticação
    if (username === 'admin' && password === 'ntisy2') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
};
