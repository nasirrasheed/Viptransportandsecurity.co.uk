import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { getAllFleetVehicles, createFleetVehicle, updateFleetVehicle, deleteFleetVehicle, type FleetVehicle } from '../../lib/supabase';

const FleetManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<FleetVehicle>>({
    name: '',
    category: '',
    image_url: '',
    description: '',
    features: [],
    passengers: 4,
    occasions: [],
    price: '',
    is_active: true,
  });

  const categories = ['Ultra Luxury', 'Luxury Sedan', 'Executive', 'Luxury SUV', 'Sports Car'];

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await getAllFleetVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateFleetVehicle(editingId, formData);
      } else {
        await createFleetVehicle(formData as Omit<FleetVehicle, 'id' | 'created_at' | 'updated_at'>);
      }
      await loadVehicles();
      resetForm();
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleEdit = (vehicle: FleetVehicle) => {
    setFormData(vehicle);
    setEditingId(vehicle.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await deleteFleetVehicle(id);
        await loadVehicles();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      image_url: '',
      description: '',
      features: [],
      passengers: 4,
      occasions: [],
      price: '',
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleArrayInput = (field: 'features' | 'occasions', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData({ ...formData, [field]: items });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-3xl font-semibold">Fleet Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-yellow-300 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-playfair text-xl font-semibold">
                {editingId ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Vehicle Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  />
                </div>

                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                />
              </div>

              <div>
                <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features?.join(', ') || ''}
                    onChange={(e) => handleArrayInput('features', e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    placeholder="Leather Interior, Wi-Fi, etc."
                  />
                </div>

                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Occasions (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.occasions?.join(', ') || ''}
                    onChange={(e) => handleArrayInput('occasions', e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    placeholder="Weddings, Corporate, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Passengers *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="20"
                    value={formData.passengers || 4}
                    onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  />
                </div>

                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    placeholder="From £100/hour"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active || false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400"
                />
                <label htmlFor="is_active" className="font-montserrat text-sm text-gray-300">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-montserrat font-medium hover:bg-yellow-300 transition-colors flex items-center space-x-2"
                >
                  <Save size={20} />
                  <span>{editingId ? 'Update' : 'Create'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-montserrat font-medium hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <img 
              src={vehicle.image_url} 
              alt={vehicle.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-playfair text-lg font-semibold">{vehicle.name}</h3>
                <div className="flex items-center space-x-1">
                  {vehicle.is_active ? (
                    <Eye className="h-4 w-4 text-green-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
              <p className="text-yellow-400 text-sm font-montserrat mb-2">{vehicle.category}</p>
              <p className="text-gray-400 text-sm font-montserrat mb-3 line-clamp-2">{vehicle.description}</p>
              <p className="text-yellow-400 font-montserrat font-semibold mb-4">{vehicle.price}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg font-montserrat text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg font-montserrat text-sm hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {vehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="font-montserrat text-gray-400 text-lg">No vehicles found. Add your first vehicle to get started.</p>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;