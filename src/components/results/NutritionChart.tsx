import React from 'react';
import { FitnessGoal } from '../../contexts/FormContext';

interface NutritionChartProps {
  calorieTarget: number;
  goals: FitnessGoal[];
}

const NutritionChart: React.FC<NutritionChartProps> = ({ calorieTarget, goals }) => {
  // Calculate macros based on goals
  const calculateMacros = () => {
    let proteinPercentage = 0.3; // 30%
    let fatPercentage = 0.3; // 30%
    let carbPercentage = 0.4; // 40%
    
    if (goals.includes('weight_loss')) {
      proteinPercentage = 0.35; // 35%
      fatPercentage = 0.3; // 30%
      carbPercentage = 0.35; // 35%
    } else if (goals.includes('muscle_gain')) {
      proteinPercentage = 0.35; // 35%
      fatPercentage = 0.25; // 25%
      carbPercentage = 0.4; // 40%
    } else if (goals.includes('endurance')) {
      proteinPercentage = 0.25; // 25%
      fatPercentage = 0.25; // 25%
      carbPercentage = 0.5; // 50%
    }
    
    const proteinCalories = calorieTarget * proteinPercentage;
    const fatCalories = calorieTarget * fatPercentage;
    const carbCalories = calorieTarget * carbPercentage;
    
    const proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram
    const fatGrams = Math.round(fatCalories / 9); // 9 calories per gram
    const carbGrams = Math.round(carbCalories / 4); // 4 calories per gram
    
    return {
      protein: {
        percentage: Math.round(proteinPercentage * 100),
        grams: proteinGrams,
        calories: Math.round(proteinCalories)
      },
      fat: {
        percentage: Math.round(fatPercentage * 100),
        grams: fatGrams,
        calories: Math.round(fatCalories)
      },
      carbs: {
        percentage: Math.round(carbPercentage * 100),
        grams: carbGrams,
        calories: Math.round(carbCalories)
      }
    };
  };
  
  const macros = calculateMacros();
  
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm font-medium">Protein: {macros.protein.percentage}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm font-medium">Carbs: {macros.carbs.percentage}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm font-medium">Fat: {macros.fat.percentage}%</span>
          </div>
        </div>
        
        {/* Visual representation of macros */}
        <div className="h-6 flex rounded-full overflow-hidden mb-6">
          <div 
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${macros.protein.percentage}%` }}
          ></div>
          <div 
            className="bg-green-500 h-full transition-all duration-500"
            style={{ width: `${macros.carbs.percentage}%` }}
          ></div>
          <div 
            className="bg-yellow-500 h-full transition-all duration-500"
            style={{ width: `${macros.fat.percentage}%` }}
          ></div>
        </div>
        
        {/* Detailed breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-xl font-bold text-blue-700">{macros.protein.grams}g</p>
            <p className="text-xs text-gray-500">{macros.protein.calories} kcal</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Carbs</p>
            <p className="text-xl font-bold text-green-700">{macros.carbs.grams}g</p>
            <p className="text-xs text-gray-500">{macros.carbs.calories} kcal</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Fat</p>
            <p className="text-xl font-bold text-yellow-700">{macros.fat.grams}g</p>
            <p className="text-xs text-gray-500">{macros.fat.calories} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;