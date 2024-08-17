let scanCount = 0;

export default function handler(req, res) {
  if (req.method === 'POST') {
    scanCount += 1;
    res.status(200).json({ count: scanCount });
  } else if (req.method === 'GET') {
    res.status(200).json({ count: scanCount });
  } else {
    res.status(405).end(); // Método não permitido
  }
}
