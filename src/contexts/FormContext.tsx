import React, { createContext, useContext, useState } from 'react';

// Types
export type Gender = 'male' | 'female' | 'other';
export type FitnessGoal = 'weight_loss' | 'muscle_gain' | 'maintain' | 'general_fitness' | 'endurance';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type DietaryPreference = 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo' | 'mediterranean';

export interface FormData {
  // Personal details
  height: number; // in cm
  weight: number; // in kg
  age: number;
  gender: Gender;
  
  // Health information
  allergies: string[];
  dietaryPreferences: DietaryPreference[];
  
  // Fitness
  fitnessGoals: FitnessGoal[];
  activityLevel: ActivityLevel;
  workoutFrequency: number; // days per week
  workoutDuration: number; // minutes per session
  
  // Additional information
  medicalConditions: string[];
  additionalNotes: string;
}

// Initial form data
const initialFormData: FormData = {
  height: 170,
  weight: 70,
  age: 30,
  gender: 'male',
  allergies: [],
  dietaryPreferences: ['omnivore'],
  fitnessGoals: ['general_fitness'],
  activityLevel: 'moderate',
  workoutFrequency: 3,
  workoutDuration: 30,
  medicalConditions: [],
  additionalNotes: '',
};

// Context interface
interface FormContextType {
  formData: FormData;
  currentStep: number;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};