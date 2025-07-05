/*
  # Admin Panel Database Schema

  1. New Tables
    - `fleet_vehicles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `image_url` (text)
      - `description` (text)
      - `features` (jsonb array)
      - `passengers` (integer)
      - `occasions` (jsonb array)
      - `price` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `icon_name` (text)
      - `image_url` (text)
      - `description` (text)
      - `features` (jsonb array)
      - `vehicles` (jsonb array)
      - `price` (text)
      - `is_active` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
*/

-- Fleet Vehicles Table
CREATE TABLE IF NOT EXISTS fleet_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  passengers integer DEFAULT 4,
  occasions jsonb DEFAULT '[]'::jsonb,
  price text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  icon_name text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  vehicles jsonb DEFAULT '[]'::jsonb,
  price text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE fleet_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for fleet_vehicles
CREATE POLICY "Anyone can read fleet vehicles"
  ON fleet_vehicles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage fleet vehicles"
  ON fleet_vehicles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for services
CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample fleet data
INSERT INTO fleet_vehicles (name, category, image_url, description, features, passengers, occasions, price) VALUES
('Rolls Royce Ghost', 'Ultra Luxury', 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', 'The epitome of luxury and elegance, perfect for weddings and VIP events.', '["Leather Interior", "Champagne Service", "Privacy Glass", "Climate Control"]', 4, '["Weddings", "VIP Events", "Corporate"]', 'From £200/hour'),
('Bentley Mulsanne', 'Luxury Sedan', 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800', 'Sophisticated British luxury with exceptional comfort and style.', '["Premium Sound System", "Heated Seats", "Mini Bar", "Wi-Fi"]', 4, '["Corporate", "Weddings", "VIP"]', 'From £180/hour'),
('Mercedes S-Class', 'Executive', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium executive transport with cutting-edge technology and comfort.', '["Massage Seats", "Ambient Lighting", "Bluetooth", "USB Charging"]', 4, '["Airport", "Corporate", "Business"]', 'From £120/hour'),
('BMW 7 Series', 'Executive', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 'Dynamic luxury sedan combining performance with executive comfort.', '["Sport Seats", "Navigation", "Sunroof", "Premium Audio"]', 4, '["Corporate", "Airport", "Business"]', 'From £100/hour'),
('Range Rover Vogue', 'Luxury SUV', 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800', 'Spacious luxury SUV perfect for group travel and special occasions.', '["7 Seats", "Panoramic Roof", "Premium Leather", "Entertainment System"]', 7, '["Group Travel", "Events", "Airport"]', 'From £140/hour'),
('Ferrari California', 'Sports Car', 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800', 'Exotic sports car for unforgettable special occasions and events.', '["Convertible", "Sports Exhaust", "Carbon Fiber", "Racing Seats"]', 2, '["Prom", "Special Events", "Photoshoots"]', 'From £300/hour');

-- Insert sample services data
INSERT INTO services (title, icon_name, image_url, description, features, vehicles, price, sort_order) VALUES
('Wedding Chauffeur', 'Heart', 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', 'Make your special day unforgettable with our luxury wedding transport service.', '["Rolls Royce and Bentley options", "Professional uniformed chauffeur", "Complimentary champagne service", "Decorated vehicle on request", "Flexible timing to suit your schedule", "Photography assistance"]', '["Rolls Royce Ghost", "Bentley Mulsanne", "Mercedes S-Class"]', 'From £200/hour', 1),
('VIP Airport Transfers', 'Plane', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 'Seamless airport transfers with meet and greet service for VIP clients.', '["Flight tracking and monitoring", "Meet and greet service", "Luggage assistance", "Luxury vehicle selection", "Flexible booking options", "Corporate account available"]', '["Mercedes S-Class", "BMW 7 Series", "Range Rover Vogue"]', 'From £120/hour', 2),
('Corporate Travel', 'Briefcase', 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800', 'Professional executive transport for business meetings, conferences, and events.', '["Executive vehicle selection", "Professional chauffeurs", "Wi-Fi and charging facilities", "Flexible scheduling", "Corporate billing available", "Confidentiality assured"]', '["Mercedes S-Class", "BMW 7 Series", "Bentley Mulsanne"]', 'From £100/hour', 3),
('Private Event Transport', 'Star', 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800', 'Luxury transport for special occasions, celebrations, and private events.', '["Exotic and luxury car options", "Special occasion styling", "Group transport available", "Event coordination", "Photography opportunities", "Customized service"]', '["Ferrari California", "Rolls Royce Ghost", "Range Rover Vogue"]', 'From £150/hour', 4);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_fleet_vehicles_updated_at BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();