import React from 'react';
import { X, Plus } from 'lucide-react';
import { useFormContext } from '../../contexts/FormContext';

const commonMedicalConditions = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Arthritis',
  'Asthma',
  'Thyroid Disorder',
  'Digestive Issues',
  'Pregnancy'
];

const AdditionalInfoForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [newCondition, setNewCondition] = React.useState('');

  const handleConditionAdd = (condition: string) => {
    if (condition && !formData.medicalConditions.includes(condition)) {
      updateFormData({ medicalConditions: [...formData.medicalConditions, condition] });
    }
    setNewCondition('');
  };

  const handleConditionRemove = (condition: string) => {
    updateFormData({
      medicalConditions: formData.medicalConditions.filter(c => c !== condition)
    });
  };

  const handleCommonConditionClick = (condition: string) => {
    if (!formData.medicalConditions.includes(condition)) {
      updateFormData({ medicalConditions: [...formData.medicalConditions, condition] });
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-gray-600">
        This additional information will help us further personalize your recommendations. All information is optional.
      </p>

      {/* Medical Conditions */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Medical Conditions</h3>
        <p className="text-sm text-gray-600 mb-4">
          Let us know about any medical conditions that may affect your diet or exercise routine.
        </p>

        {/* Display selected medical conditions */}
        {formData.medicalConditions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.medicalConditions.map((condition) => (
              <div
                key={condition}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center"
              >
                <span className="text-sm">{condition}</span>
                <button
                  type="button"
                  onClick={() => handleConditionRemove(condition)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Common medical conditions */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Common conditions:</p>
          <div className="flex flex-wrap gap-2">
            {commonMedicalConditions.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => handleCommonConditionClick(condition)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  formData.medicalConditions.includes(condition)
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        {/* Add custom medical condition */}
        <div className="flex">
          <input
            type="text"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            placeholder="Enter other medical conditions"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            onClick={() => handleConditionAdd(newCondition)}
            disabled={!newCondition}
            className={`px-4 py-2 rounded-r-lg flex items-center ${
              !newCondition
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Additional Notes</h3>
        <p className="text-sm text-gray-600 mb-4">
          Is there anything else you'd like us to know when creating your recommendations?
        </p>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          rows={4}
          placeholder="For example, specific foods you enjoy, lifestyle factors, or more details about your goals..."
        ></textarea>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-2">You're Almost Done!</h3>
        <p className="text-sm text-gray-600">
          Click "Get Results" to see your personalized nutrition and fitness recommendations based on all the information you've provided.
        </p>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;