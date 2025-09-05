import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';

export const seedProducts = async () => {
  try {
    // Check if products already exist
    const productsSnapshot = await getDocs(collection(db, 'products'));
    if (productsSnapshot.size > 0) {
      console.log('Products already exist, skipping seed');
      return;
    }

    const sampleProducts = [
      {
        name: "Active Inizio Azure",
        description: "Sepatu running premium dengan teknologi terdepan untuk performa maksimal",
        price: "Rp 500.000",
        category: "running",
        colors: ["#2a5ea9", "#499bcf"],
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        stock: 25,
        sizes: ["39", "40", "41", "42", "43"],
        createdAt: new Date().toISOString()
      },
      {
        name: "Hageshi Beige",
        description: "Sepatu casual dengan desain minimalis dan kenyamanan maksimal",
        price: "Rp 399.000",
        category: "casual",
        colors: ["#d5cecb", "#e5ded9"],
        image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        stock: 30,
        sizes: ["38", "39", "40", "41", "42"],
        createdAt: new Date().toISOString()
      },
      {
        name: "Gozen Black",
        description: "Sepatu formal elegan untuk acara resmi dan profesional",
        price: "Rp 499.000",
        category: "formal",
        colors: ["#000000", "#333333"],
        image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        stock: 20,
        sizes: ["39", "40", "41", "42", "43", "44"],
        createdAt: new Date().toISOString()
      },
      {
        name: "Corsa Classic",
        description: "Sepatu sport klasik dengan daya tahan tinggi",
        price: "Rp 450.000",
        category: "sport",
        colors: ["#000000", "#ffffff"],
        image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        stock: 35,
        sizes: ["38", "39", "40", "41", "42", "43"],
        createdAt: new Date().toISOString()
      },
      {
        name: "Ace Neptune Charcoal",
        description: "Sepatu lifestyle dengan teknologi cushioning terbaru",
        price: "Rp 550.000",
        category: "casual",
        colors: ["#36454f", "#708090"],
        image: "https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        stock: 28,
        sizes: ["39", "40", "41", "42", "43"],
        createdAt: new Date().toISOString()
      },
      {
        name: "Active Venturi Sapphire",
        description: "Sepatu running dengan desain aerodinamis dan performa tinggi",
        price: "Rp 650.000",
        category: "running",
        colors: ["#0f52ba", "#4169e1"],
        image: "https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        stock: 22,
        sizes: ["38", "39", "40", "41", "42", "43", "44"],
        createdAt: new Date().toISOString()
      }
    ];

    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
    }

    console.log('Sample products added successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

export const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const usersSnapshot = await getDocs(
      query(collection(db, 'users'), where('email', '==', 'admin@stride.com'))
    );
    
    if (usersSnapshot.size > 0) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'admin@stride.com', 
      'admin123'
    );
    
    await updateProfile(userCredential.user, { 
      displayName: 'Admin Stride' 
    });

    // Add admin data to Firestore
    await addDoc(collection(db, 'users'), {
      email: 'admin@stride.com',
      displayName: 'Admin Stride',
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};