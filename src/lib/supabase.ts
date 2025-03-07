import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anonymous Key is missing. Please check your environment variables.');
}

// Ensure we always provide fallback values to prevent crashes on missing env vars
export const supabase = createClient(
  supabaseUrl || 'https://xnlhyrcjockhwtrjnpgq.supabase.co', 
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubGh5cmNqb2NraHd0cmpucGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTM4MDMsImV4cCI6MjA1NjM4OTgwM30.ZTATa439TOlSHBeq6UH5WZ-I23ueuECnBH_Er2Y9iio'
);

// Authentication helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helper functions
export const createContactMessage = async (messageData: any) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([messageData]);
  return { data, error };
};

export const savePropertyToFavorites = async (userId: string, propertyId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, property_id: propertyId }]);
  return { data, error };
};

export const removePropertyFromFavorites = async (userId: string, propertyId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: userId, property_id: propertyId });
  return { data, error };
};

export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId);
  return { data, error };
};

// Property search helper function
export const searchProperties = async (
  query?: string,
  location?: string,
  minPrice?: number,
  maxPrice?: number,
  type?: 'residential' | 'commercial' | 'all',
  sort?: 'price_asc' | 'price_desc' | 'newest'
) => {
  let supabaseQuery = supabase.from('properties').select('*');
  
  // Apply text search on title and description if query is provided
  if (query && query.trim() !== '') {
    supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }
  
  // Apply filters if they exist
  if (location && location !== 'all') {
    supabaseQuery = supabaseQuery.ilike('location', `%${location}%`);
  }
  
  if (minPrice !== undefined && minPrice > 0) {
    supabaseQuery = supabaseQuery.gte('price', minPrice);
  }
  
  if (maxPrice !== undefined && maxPrice > 0) {
    supabaseQuery = supabaseQuery.lte('price', maxPrice);
  }
  
  if (type && type !== 'all') {
    supabaseQuery = supabaseQuery.eq('type', type);
  }
  
  // Apply sorting
  if (sort) {
    switch (sort) {
      case 'price_asc':
        supabaseQuery = supabaseQuery.order('price', { ascending: true });
        break;
      case 'price_desc':
        supabaseQuery = supabaseQuery.order('price', { ascending: false });
        break;
      case 'newest':
        supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
        break;
    }
  } else {
    // Default sorting by newest
    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
  }
  
  const { data, error } = await supabaseQuery;
  return { data, error };
};

// Get properties helper function with improved filters
export const getProperties = async (filters: any = {}) => {
  let query = supabase.from('properties').select('*');
  
  // Apply filters if they exist
  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  
  if (filters.location) {
    query = query.eq('location', filters.location);
  }
  
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  const { data, error } = await query;
  return { data, error };
};

// Mortgage calculator helper function
export const saveMortgageCalculation = async (userId: string, mortgageData: any) => {
  const { data, error } = await supabase
    .from('mortgage_calculator')
    .insert([{ user_id: userId, ...mortgageData }]);
  return { data, error };
};
