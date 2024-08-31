const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const SECRET_KEY = "sua_chave_secreta";

const keyFilePath = path.resolve(__dirname, 'keys.json');

function loadKeys() {
    if (fs.existsSync(keyFilePath)) {
        const data = fs.readFileSync(keyFilePath);
        return JSON.parse(data);
    } else {
        return [];
    }
}

function saveKeys(keys) {
    fs.writeFileSync(keyFilePath, JSON.stringify(keys, null, 2));
}

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

        const { key } = req.query;

        if (!key) {
            return res.status(400).json({ message: "Chave não fornecida" });
        }

        let keys = loadKeys();
        const foundKey = keys.find(k => k.key === key);

        if (foundKey && !foundKey.used) {
            foundKey.used = true;
            saveKeys(keys);
            return res.status(200).json({ message: "Chave válida e aceita!" });
        } else {
            return res.status(400).json({ message: "Chave inválida ou já usada!" });
        }
    });
};
