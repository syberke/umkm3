import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Gagal memuat produk');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      setError(null);
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: new Date().toISOString()
      });
      await fetchProducts();
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Gagal menambah produk');
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setError(null);
      await updateDoc(doc(db, 'products', id), {
        ...productData,
        updatedAt: new Date().toISOString()
      });
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Gagal mengupdate produk');
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      setError(null);
      await deleteDoc(doc(db, 'products', id));
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Gagal menghapus produk');
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};