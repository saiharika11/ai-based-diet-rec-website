import React from 'react';
import { useFormContext, Gender } from '../../contexts/FormContext';

const PersonalInfoForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const handleGenderChange = (gender: Gender) => {
    updateFormData({ gender });
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Let's start with some basic information to help us calculate your BMI and personalize your recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Height */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height || ''}
            onChange={(e) => updateFormData({ height: Number(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your height in cm"
            min="50"
            max="250"
          />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight || ''}
            onChange={(e) => updateFormData({ weight: Number(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your weight in kg"
            min="20"
            max="300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: Number(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your age"
            min="12"
            max="120"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                formData.gender === 'male'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                formData.gender === 'female'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('other')}
              className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                formData.gender === 'other'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Other
            </button>
          </div>
        </div>
      </div>

      {/* BMI Calculation */}
      {formData.height > 0 && formData.weight > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Your BMI</h3>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-bold text-blue-700">
                {(formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1)}
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                {getBMICategory(formData.weight / Math.pow(formData.height / 100, 2))}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                BMI is just one factor we'll use to personalize your plan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to determine BMI category
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export default PersonalInfoForm;