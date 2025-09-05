import { seedProducts, createAdminUser } from '../data/seedData';

export const initializeApp = async () => {
  try {
    console.log('Initializing app...');
    
    // Seed products
    await seedProducts();
    
    // Create admin user
    await createAdminUser();
    
    console.log('App initialization completed');
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

// Run initialization when the module is imported
initializeApp();