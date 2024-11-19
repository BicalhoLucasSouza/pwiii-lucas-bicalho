import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, quantidade } = req.body;
    await addDoc(collection(db, "items"), { nome, quantidade });
    res.status(204).end(); 
  } else if (req.method === 'GET') {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    if (id) {
      await deleteDoc(doc(db, "items", id));
    }
    res.status(204).end(); 
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end();
  }
}

  
