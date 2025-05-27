import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useFormContext } from '../contexts/FormContext';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import DietaryPreferencesForm from '../components/forms/DietaryPreferencesForm';
import FitnessGoalsForm from '../components/forms/FitnessGoalsForm';
import AdditionalInfoForm from '../components/forms/AdditionalInfoForm';

const FormPage: React.FC = () => {
  const { currentStep, nextStep, prevStep, formData } = useFormContext();
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Personal Info
        return formData.height > 0 && formData.weight > 0 && formData.age > 0;
      case 2: // Dietary Preferences
        return formData.dietaryPreferences.length > 0;
      case 3: // Fitness Goals
        return formData.fitnessGoals.length > 0 && formData.activityLevel !== undefined;
      case 4: // Additional Info
        return true; // This step is optional
      default:
        return false;
    }
  };

  useEffect(() => {
    setIsFormValid(validateCurrentStep());
  }, [formData, currentStep]);

  const handleSubmit = () => {
    if (currentStep < 4) {
      nextStep();
    } else {
      // Submit the form and navigate to results
      navigate('/results');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <DietaryPreferencesForm />;
      case 3:
        return <FitnessGoalsForm />;
      case 4:
        return <AdditionalInfoForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                      step <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step < currentStep ? (
                      <Check size={16} />
                    ) : (
                      <span className="text-sm">{step}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Dietary Preferences'}
                {currentStep === 3 && 'Fitness Goals'}
                {currentStep === 4 && 'Additional Information'}
              </h2>
            </div>

            {/* Form Content */}
            <div className="mb-8">{renderStepContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className={`px-4 py-2 flex items-center text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors ${
                  currentStep === 1 ? 'invisible' : ''
                }`}
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-6 py-2 flex items-center font-medium rounded-lg transition-colors ${
                  isFormValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep < 4 ? 'Next' : 'Get Results'}{' '}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;