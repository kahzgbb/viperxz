const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON onde as chaves serão armazenadas
const keyFilePath = path.resolve(__dirname, 'keys.json');

// Função para carregar as chaves armazenadas
function loadKeys() {
    if (fs.existsSync(keyFilePath)) {
        const data = fs.readFileSync(keyFilePath);
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Função para salvar as chaves no arquivo
function saveKeys(keys) {
    fs.writeFileSync(keyFilePath, JSON.stringify(keys, null, 2));
}

module.exports = (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ message: "Chave não fornecida" });
    }

    // Carrega as chaves do arquivo
    let keys = loadKeys();

    // Procura pela chave no arquivo
    const foundKey = keys.find(k => k.key === key);

    if (foundKey && !foundKey.used) {
        // Marca a chave como usada
        foundKey.used = true;
        saveKeys(keys);

        return res.status(200).json({ message: "Chave válida e aceita!" });
    } else {
        return res.status(400).json({ message: "Chave inválida ou já usada!" });
    }
};
