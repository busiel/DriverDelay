import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import NonDrivingForm from './NonDrivingForm';
import DriveTimeForm from './DriveTimeForm';
import EventTypeSelector from './EventTypeSelector';
import { getDefaultFormData } from '../utils/form';
import { useDelayForm } from '../hooks/useDelayForm';
import type { DelayFormData } from '../types/delay';

interface DelayFormProps {
  initialData?: DelayFormData;
  onSave?: () => void;
}

const DelayForm: React.FC<DelayFormProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<DelayFormData>(
    initialData || getDefaultFormData()
  );
  const { submitDelay, loading, error } = useDelayForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.highway || !formData.state) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.eventType === 'drive' && !formData.delayType) {
      alert('Please select a delay type');
      return;
    }

    console.log('Submitting form data:', formData);
    const success = await submitDelay(formData);
    
    if (success) {
      console.log('Form submitted successfully');
      onSave?.();
    } else {
      console.error('Form submission failed');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? 'Edit Delay' : 'New Delay'}
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <EventTypeSelector 
          eventType={formData.eventType}
          onChange={(type) => setFormData({ ...formData, eventType: type })}
        />

        {formData.eventType === 'drive' ? (
          <DriveTimeForm 
            formData={formData}
            onChange={setFormData}
          />
        ) : (
          <NonDrivingForm 
            formData={formData}
            onChange={setFormData}
          />
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows={4}
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Screenshot or Picture
          </label>
          <div 
            onClick={handleImageClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            {selectedImage ? (
              <div className="space-y-2">
                <img 
                  src={URL.createObjectURL(selectedImage)} 
                  alt="Selected" 
                  className="max-h-40 mx-auto"
                />
                <p className="text-sm text-gray-500">Click to change image</p>
              </div>
            ) : (
              <>
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload a photo or screenshot
                </p>
              </>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" 
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : (initialData ? 'Update Delay' : 'Submit Delay')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DelayForm;