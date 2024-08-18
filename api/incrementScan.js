let scanCount = 0;  // Usar banco de dados seria mais adequado

export default function handler(req, res) {
  if (req.method === 'POST') {
    scanCount += 1;
    res.status(200).json({ message: 'Scan count incremented', count: scanCount });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
