import React from 'react';
import { Check } from 'lucide-react';
import { useFormContext, FitnessGoal, ActivityLevel } from '../../contexts/FormContext';

const fitnessGoalOptions: { value: FitnessGoal; label: string; description: string }[] = [
  {
    value: 'weight_loss',
    label: 'Weight Loss',
    description: 'Reduce body fat and achieve a healthier weight'
  },
  {
    value: 'muscle_gain',
    label: 'Muscle Gain',
    description: 'Increase muscle mass and strength'
  },
  {
    value: 'maintain',
    label: 'Maintain Current Weight',
    description: 'Keep your current body composition'
  },
  {
    value: 'general_fitness',
    label: 'General Fitness',
    description: 'Improve overall health and fitness'
  },
  {
    value: 'endurance',
    label: 'Endurance',
    description: 'Enhance cardiovascular health and stamina'
  }
];

const activityLevelOptions: { value: ActivityLevel; label: string; description: string }[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Little to no regular exercise'
  },
  {
    value: 'light',
    label: 'Light Activity',
    description: 'Light exercise 1-3 days per week'
  },
  {
    value: 'moderate',
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days per week'
  },
  {
    value: 'active',
    label: 'Active',
    description: 'Hard exercise 6-7 days per week'
  },
  {
    value: 'very_active',
    label: 'Very Active',
    description: 'Hard daily exercise or physical job'
  }
];

const FitnessGoalsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const handleFitnessGoalToggle = (goal: FitnessGoal) => {
    const updatedGoals = formData.fitnessGoals.includes(goal)
      ? formData.fitnessGoals.filter(g => g !== goal)
      : [...formData.fitnessGoals, goal];
    
    updateFormData({ fitnessGoals: updatedGoals });
  };

  const handleActivityLevelChange = (level: ActivityLevel) => {
    updateFormData({ activityLevel: level });
  };

  return (
    <div className="space-y-8">
      <p className="text-gray-600">
        Tell us about your fitness goals and current activity level so we can create an appropriate exercise plan.
      </p>

      {/* Fitness Goals */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Fitness Goals</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select one or more goals that you want to achieve.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {fitnessGoalOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleFitnessGoalToggle(option.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                formData.fitnessGoals.includes(option.value)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-200 hover:bg-green-50/30'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    formData.fitnessGoals.includes(option.value)
                      ? 'bg-green-500'
                      : 'border border-gray-300'
                  }`}
                >
                  {formData.fitnessGoals.includes(option.value) && (
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

      {/* Current Activity Level */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Current Activity Level</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select the option that best describes your typical activity level.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {activityLevelOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleActivityLevelChange(option.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                formData.activityLevel === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    formData.activityLevel === option.value
                      ? 'bg-blue-500'
                      : 'border border-gray-300'
                  }`}
                >
                  {formData.activityLevel === option.value && (
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

      {/* Workout Frequency */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Workout Frequency</h3>
        <p className="text-sm text-gray-600 mb-4">
          How many days per week can you commit to working out?
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">1 day</span>
          <span className="text-sm text-gray-600">7 days</span>
        </div>
        <input
          type="range"
          min="1"
          max="7"
          step="1"
          value={formData.workoutFrequency}
          onChange={(e) => updateFormData({ workoutFrequency: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
        />
        <div className="text-center mt-2">
          <span className="text-lg font-medium text-blue-600">{formData.workoutFrequency} days per week</span>
        </div>
      </div>

      {/* Workout Duration */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Workout Duration</h3>
        <p className="text-sm text-gray-600 mb-4">
          How long can you exercise in each session?
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">15 min</span>
          <span className="text-sm text-gray-600">120 min</span>
        </div>
        <input
          type="range"
          min="15"
          max="120"
          step="5"
          value={formData.workoutDuration}
          onChange={(e) => updateFormData({ workoutDuration: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
        />
        <div className="text-center mt-2">
          <span className="text-lg font-medium text-blue-600">{formData.workoutDuration} minutes per session</span>
        </div>
      </div>
    </div>
  );
};

export default FitnessGoalsForm;