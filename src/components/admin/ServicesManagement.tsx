import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { getAllServices, createService, updateService, deleteService, type Service } from '../../lib/supabase';

const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    icon_name: '',
    image_url: '',
    description: '',
    features: [],
    vehicles: [],
    price: '',
    is_active: true,
    sort_order: 0,
  });

  const iconOptions = ['Heart', 'Plane', 'Briefcase', 'Star', 'Car', 'Shield', 'Clock', 'Users'];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await createService(formData as Omit<Service, 'id' | 'created_at' | 'updated_at'>);
      }
      await loadServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        await loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const currentService = services[currentIndex];
    const targetService = services[targetIndex];

    try {
      await updateService(currentService.id, { sort_order: targetService.sort_order });
      await updateService(targetService.id, { sort_order: currentService.sort_order });
      await loadServices();
    } catch (error) {
      console.error('Error reordering services:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      icon_name: '',
      image_url: '',
      description: '',
      features: [],
      vehicles: [],
      price: '',
      is_active: true,
      sort_order: services.length,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleArrayInput = (field: 'features' | 'vehicles', value: string) => {
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
        <h2 className="font-playfair text-3xl font-semibold">Services Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-yellow-300 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-playfair text-xl font-semibold">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  />
                </div>

                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Icon *
                  </label>
                  <select
                    required
                    value={formData.icon_name || ''}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  >
                    <option value="">Select Icon</option>
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
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

              <div>
                <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                  Features (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={formData.features?.join(', ') || ''}
                  onChange={(e) => handleArrayInput('features', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat resize-none"
                  placeholder="Professional chauffeur, Luxury vehicle, etc."
                />
              </div>

              <div>
                <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                  Available Vehicles (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.vehicles?.join(', ') || ''}
                  onChange={(e) => handleArrayInput('vehicles', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  placeholder="Rolls Royce Ghost, Bentley Mulsanne, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div>
                  <label className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.sort_order || 0}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
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

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={service.id} className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-playfair text-xl font-semibold">{service.title}</h3>
                  <span className="text-yellow-400 text-sm font-montserrat">({service.icon_name})</span>
                  {service.is_active ? (
                    <Eye className="h-4 w-4 text-green-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <p className="text-gray-400 font-montserrat mb-3">{service.description}</p>
                <p className="text-yellow-400 font-montserrat font-semibold mb-3">{service.price}</p>
                
                {service.features && service.features.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-montserrat font-semibold text-sm mb-1">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="bg-black text-yellow-400 px-2 py-1 rounded text-xs font-montserrat">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-gray-400 text-xs font-montserrat">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReorder(service.id, 'up')}
                    disabled={index === 0}
                    className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => handleReorder(service.id, 'down')}
                    disabled={index === services.length - 1}
                    className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="font-montserrat text-gray-400 text-lg">No services found. Add your first service to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;