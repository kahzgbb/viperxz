const fs = require('fs');
const crypto = require('crypto');
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
    // Gera uma nova chave
    const newKey = crypto.randomBytes(16).toString('hex');

    // Carrega as chaves existentes
    let keys = loadKeys();

    // Adiciona a nova chave ao "banco de dados" de chaves
    keys.push({ key: newKey, used: false });

    // Salva as chaves atualizadas
    saveKeys(keys);

    res.status(200).json({ key: newKey });
};
