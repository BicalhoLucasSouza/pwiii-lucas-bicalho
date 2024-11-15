
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, quantidade } = req.body;
    try {
      const docRef = await addDoc(collection(db, "items"), { nome, quantidade });
      res.status(201).json({ id: docRef.id, message: 'Item criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar item." });
    }
  } else if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens." });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
