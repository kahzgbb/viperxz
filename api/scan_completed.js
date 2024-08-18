// api/scan_completed.js

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Aqui você pode adicionar lógica para manipular o dado do scan, como salvar em um banco de dados ou contar o número de scans.
        
        console.log("Scan recebido com sucesso!");

        // Retorne uma resposta de sucesso
        res.status(200).json({ message: 'Scan registrado com sucesso!' });
    } else {
        // Se não for uma requisição POST, retorne um erro
        res.status(405).json({ message: 'Método não permitido' });
    }
}
