import React from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useFormContext, DietaryPreference } from '../../contexts/FormContext';

const dietaryOptions: { value: DietaryPreference; label: string; description: string }[] = [
  {
    value: 'omnivore',
    label: 'Omnivore',
    description: 'No specific dietary restrictions, includes all food groups'
  },
  {
    value: 'vegetarian',
    label: 'Vegetarian',
    description: 'No meat, but may include dairy and eggs'
  },
  {
    value: 'vegan',
    label: 'Vegan',
    description: 'No animal products of any kind'
  },
  {
    value: 'pescatarian',
    label: 'Pescatarian',
    description: 'Vegetarian diet that includes fish and seafood'
  },
  {
    value: 'keto',
    label: 'Keto',
    description: 'High fat, moderate protein, very low carbohydrate'
  },
  {
    value: 'paleo',
    label: 'Paleo',
    description: 'Based on foods presumed to be available to prehistoric humans'
  },
  {
    value: 'mediterranean',
    label: 'Mediterranean',
    description: 'Emphasizes plant foods, olive oil, fish, and moderate dairy'
  }
];

const commonAllergies = [
  'Dairy',
  'Eggs',
  'Peanuts',
  'Tree nuts',
  'Shellfish',
  'Fish',
  'Wheat',
  'Soy',
  'Gluten'
];

const DietaryPreferencesForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [newAllergy, setNewAllergy] = React.useState('');

  const handleDietaryPreferenceToggle = (preference: DietaryPreference) => {
    const updatedPreferences = formData.dietaryPreferences.includes(preference)
      ? formData.dietaryPreferences.filter(p => p !== preference)
      : [...formData.dietaryPreferences, preference];
    
    updateFormData({ dietaryPreferences: updatedPreferences });
  };

  const handleAllergyAdd = (allergy: string) => {
    if (allergy && !formData.allergies.includes(allergy)) {
      updateFormData({ allergies: [...formData.allergies, allergy] });
    }
    setNewAllergy('');
  };

  const handleAllergyRemove = (allergy: string) => {
    updateFormData({
      allergies: formData.allergies.filter(a => a !== allergy)
    });
  };

  const handleCommonAllergyClick = (allergy: string) => {
    if (!formData.allergies.includes(allergy)) {
      updateFormData({ allergies: [...formData.allergies, allergy] });
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-gray-600">
        Tell us about your dietary preferences and any food allergies or restrictions so we can tailor your meal recommendations.
      </p>

      {/* Dietary Preferences */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Dietary Preferences</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select one or more dietary styles that best describe your eating habits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dietaryOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleDietaryPreferenceToggle(option.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                formData.dietaryPreferences.includes(option.value)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    formData.dietaryPreferences.includes(option.value)
                      ? 'bg-blue-500'
                      : 'border border-gray-300'
                  }`}
                >
                  {formData.dietaryPreferences.includes(option.value) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{option.label}</h4>
                  <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Food Allergies</h3>
        <p className="text-sm text-gray-600 mb-4">
          Let us know about any food allergies or intolerances you have.
        </p>

        {/* Display selected allergies */}
        {formData.allergies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.allergies.map((allergy) => (
              <div
                key={allergy}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full flex items-center"
              >
                <span className="text-sm">{allergy}</span>
                <button
                  type="button"
                  onClick={() => handleAllergyRemove(allergy)}
                  className="ml-1 text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Common allergies */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Common allergies:</p>
          <div className="flex flex-wrap gap-2">
            {commonAllergies.map((allergy) => (
              <button
                key={allergy}
                type="button"
                onClick={() => handleCommonAllergyClick(allergy)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  formData.allergies.includes(allergy)
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>

        {/* Add custom allergy */}
        <div className="flex">
          <input
            type="text"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Enter other allergies"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            onClick={() => handleAllergyAdd(newAllergy)}
            disabled={!newAllergy}
            className={`px-4 py-2 rounded-r-lg flex items-center ${
              !newAllergy
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferencesForm;