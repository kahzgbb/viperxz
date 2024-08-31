const { validateKey } = require('./generate-key');

module.exports = (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ message: "Chave não fornecida" });
    }

    const isValid = validateKey(key);

    if (isValid) {
        return res.status(200).json({ message: "Chave válida e aceita!" });
    } else {
        return res.status(400).json({ message: "Chave inválida ou já usada!" });
    }
};
