const crypto = require('crypto');

// Simulando um banco de dados em memória
let usedKeys = [];

module.exports = (req, res) => {
    // Gera uma nova chave
    const newKey = crypto.randomBytes(16).toString('hex');
    
    // Adiciona ao "banco de dados" de chaves geradas
    usedKeys.push({ key: newKey, used: false });

    res.status(200).json({ key: newKey });
};

// Função para verificar se a chave já foi usada
module.exports.validateKey = (key) => {
    const foundKey = usedKeys.find(k => k.key === key);
    if (foundKey && !foundKey.used) {
        foundKey.used = true; // Marca a chave como usada
        return true;
    }
    return false;
};
