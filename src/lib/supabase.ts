import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface FleetVehicle {
  id: string;
  name: string;
  category: string;
  image_url: string;
  description: string;
  features: string[];
  passengers: number;
  occasions: string[];
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  icon_name: string;
  image_url: string;
  description: string;
  features: string[];
  vehicles: string[];
  price: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Fleet Vehicle Functions
export const getFleetVehicles = async () => {
  const { data, error } = await supabase
    .from('fleet_vehicles')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data as FleetVehicle[];
};

export const getAllFleetVehicles = async () => {
  const { data, error } = await supabase
    .from('fleet_vehicles')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data as FleetVehicle[];
};

export const createFleetVehicle = async (vehicle: Omit<FleetVehicle, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('fleet_vehicles')
    .insert([vehicle])
    .select()
    .single();
  
  if (error) throw error;
  return data as FleetVehicle;
};

export const updateFleetVehicle = async (id: string, vehicle: Partial<FleetVehicle>) => {
  const { data, error } = await supabase
    .from('fleet_vehicles')
    .update(vehicle)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as FleetVehicle;
};

export const deleteFleetVehicle = async (id: string) => {
  const { error } = await supabase
    .from('fleet_vehicles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Service Functions
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  
  if (error) throw error;
  return data as Service[];
};

export const getAllServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) throw error;
  return data as Service[];
};

export const createService = async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();
  
  if (error) throw error;
  return data as Service;
};

export const updateService = async (id: string, service: Partial<Service>) => {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Service;
};

export const deleteService = async (id: string) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};