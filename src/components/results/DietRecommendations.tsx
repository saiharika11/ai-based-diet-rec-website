import React from 'react';
import { FormData } from '../../contexts/FormContext';
import { CheckCircle2, AlertTriangle, Check } from 'lucide-react';

interface DietRecommendationsProps {
  formData: FormData;
  calorieTarget: number;
}

const DietRecommendations: React.FC<DietRecommendationsProps> = ({ formData, calorieTarget }) => {
  const generateDietRecommendations = () => {
    const recommendations = [];
    const { fitnessGoals, dietaryPreferences, allergies } = formData;

    // Base diet recommendation based on goals
    if (fitnessGoals.includes('weight_loss')) {
      recommendations.push({
        title: 'Focus on a Moderate Calorie Deficit',
        description: 'Aim for a 15-20% calorie deficit with an emphasis on protein intake to preserve muscle mass while losing fat.',
        important: true,
      });
    } else if (fitnessGoals.includes('muscle_gain')) {
      recommendations.push({
        title: 'Consume a Calorie Surplus',
        description: 'Eat 10-15% above your maintenance calories to support muscle growth and recovery.',
        important: true,
      });
    } else if (fitnessGoals.includes('endurance')) {
      recommendations.push({
        title: 'Prioritize Complex Carbohydrates',
        description: 'Focus on quality carbohydrates to fuel your endurance activities and support recovery.',
        important: true,
      });
    }

    // Add protein recommendation
    recommendations.push({
      title: 'Maintain Adequate Protein Intake',
      description: `Aim for ${formData.gender === 'female' ? '1.6-1.8' : '1.8-2.2'} grams of protein per kg of body weight daily to support your goals.`,
      important: false,
    });

    // Dietary preference-specific recommendations
    if (dietaryPreferences.includes('vegan')) {
      recommendations.push({
        title: 'Ensure Complete Protein Sources',
        description: 'Combine plant proteins like legumes, grains, nuts, and seeds to get all essential amino acids.',
        important: false,
      });
      recommendations.push({
        title: 'Consider Supplements',
        description: 'Vitamin B12, vitamin D, and omega-3 supplements may be beneficial for a vegan diet.',
        important: false,
      });
    } else if (dietaryPreferences.includes('vegetarian')) {
      recommendations.push({
        title: 'Diversify Protein Sources',
        description: 'Include eggs, dairy, legumes, and plant proteins to meet your protein requirements.',
        important: false,
      });
    } else if (dietaryPreferences.includes('keto')) {
      recommendations.push({
        title: 'Maintain Ketosis',
        description: 'Keep carbohydrates below 50g per day, with 70-80% of calories from fat and 20-25% from protein.',
        important: true,
      });
    } else if (dietaryPreferences.includes('paleo')) {
      recommendations.push({
        title: 'Focus on Whole Foods',
        description: 'Prioritize meats, fish, eggs, vegetables, fruits, nuts, and seeds while avoiding processed foods, grains, and dairy.',
        important: false,
      });
    }

    // Meal timing
    recommendations.push({
      title: 'Optimize Meal Timing',
      description: 'Aim for 3-5 evenly spaced meals throughout the day to maintain energy levels and support metabolism.',
      important: false,
    });

    // Hydration
    recommendations.push({
      title: 'Stay Hydrated',
      description: `Drink at least ${Math.round(formData.weight * 0.033)} liters of water daily, more during exercise or hot weather.`,
      important: true,
    });

    return recommendations;
  };

  const getFoodRecommendations = () => {
    const { dietaryPreferences, allergies, fitnessGoals } = formData;
    const recommendedFoods = [];
    const foodsToAvoid = [...allergies];

    // Base recommendations depending on dietary preferences
    if (dietaryPreferences.includes('vegan')) {
      recommendedFoods.push(
        { category: 'Proteins', foods: ['Tofu', 'Tempeh', 'Seitan', 'Lentils', 'Chickpeas', 'Black beans', 'Quinoa', 'Plant-based protein powders'] },
        { category: 'Fats', foods: ['Avocados', 'Olive oil', 'Coconut oil', 'Nuts and seeds', 'Nut butters'] },
        { category: 'Carbs', foods: ['Sweet potatoes', 'Brown rice', 'Oats', 'Whole grain bread', 'Fruits', 'Vegetables'] }
      );
      foodsToAvoid.push('Meat', 'Fish', 'Dairy', 'Eggs', 'Honey');
    } else if (dietaryPreferences.includes('vegetarian')) {
      recommendedFoods.push(
        { category: 'Proteins', foods: ['Eggs', 'Greek yogurt', 'Cottage cheese', 'Whey protein', 'Tofu', 'Lentils', 'Beans', 'Chickpeas'] },
        { category: 'Fats', foods: ['Avocados', 'Olive oil', 'Coconut oil', 'Nuts and seeds', 'Nut butters', 'Cheese (in moderation)'] },
        { category: 'Carbs', foods: ['Sweet potatoes', 'Brown rice', 'Quinoa', 'Oats', 'Whole grain bread', 'Fruits', 'Vegetables'] }
      );
      foodsToAvoid.push('Meat', 'Fish');
    } else if (dietaryPreferences.includes('keto')) {
      recommendedFoods.push(
        { category: 'Proteins', foods: ['Beef', 'Pork', 'Chicken', 'Fish', 'Eggs', 'Cheese', 'Greek yogurt (full-fat)'] },
        { category: 'Fats', foods: ['Avocados', 'Olive oil', 'Coconut oil', 'Butter', 'Ghee', 'Nuts and seeds', 'Nut butters'] },
        { category: 'Low-Carb Vegetables', foods: ['Leafy greens', 'Broccoli', 'Cauliflower', 'Zucchini', 'Bell peppers', 'Asparagus', 'Mushrooms'] }
      );
      foodsToAvoid.push('Grains', 'Sugar', 'Most fruits', 'Starchy vegetables', 'Legumes');
    } else if (dietaryPreferences.includes('paleo')) {
      recommendedFoods.push(
        { category: 'Proteins', foods: ['Grass-fed beef', 'Free-range chicken', 'Wild-caught fish', 'Eggs', 'Game meats'] },
        { category: 'Fats', foods: ['Avocados', 'Olive oil', 'Coconut oil', 'Nuts and seeds', 'Nut butters'] },
        { category: 'Carbs', foods: ['Sweet potatoes', 'Fruits', 'All vegetables'] }
      );
      foodsToAvoid.push('Grains', 'Dairy', 'Legumes', 'Refined sugar', 'Processed foods');
    } else {
      // Omnivore diet
      recommendedFoods.push(
        { category: 'Proteins', foods: ['Chicken breast', 'Turkey', 'Lean beef', 'Fish', 'Eggs', 'Greek yogurt', 'Cottage cheese', 'Whey protein'] },
        { category: 'Fats', foods: ['Avocados', 'Olive oil', 'Coconut oil', 'Nuts and seeds', 'Nut butters', 'Fatty fish'] },
        { category: 'Carbs', foods: ['Sweet potatoes', 'Brown rice', 'Quinoa', 'Oats', 'Whole grain bread', 'Fruits', 'Vegetables'] }
      );
    }

    // Goal-specific recommendations
    if (fitnessGoals.includes('weight_loss')) {
      recommendedFoods.push({ 
        category: 'Weight Loss Friendly', 
        foods: ['Leafy greens', 'Berries', 'Lean proteins', 'Greek yogurt', 'Soups', 'High-fiber foods'] 
      });
      foodsToAvoid.push('Sugary drinks', 'Processed foods', 'White bread', 'Alcohol', 'Candy', 'Fried foods');
    } else if (fitnessGoals.includes('muscle_gain')) {
      recommendedFoods.push({ 
        category: 'Muscle Building', 
        foods: ['Salmon', 'Chicken breast', 'Lean beef', 'Eggs', 'Greek yogurt', 'Cottage cheese', 'Quinoa', 'Sweet potatoes'] 
      });
    } else if (fitnessGoals.includes('endurance')) {
      recommendedFoods.push({ 
        category: 'Endurance Support', 
        foods: ['Bananas', 'Oats', 'Whole grains', 'Sweet potatoes', 'Dried fruits', 'Lean proteins', 'Nuts and seeds'] 
      });
    }

    return { recommendedFoods, foodsToAvoid };
  };

  const recommendations = generateDietRecommendations();
  const { recommendedFoods, foodsToAvoid } = getFoodRecommendations();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Diet Recommendations</h2>
      
      {/* Key recommendations */}
      <div className="mb-6 space-y-4">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${
              rec.important ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex">
              <div className="mr-3 mt-1">
                {rec.important ? (
                  <CheckCircle2 size={20} className="text-blue-500" />
                ) : (
                  <Check size={20} className="text-gray-500" />
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${rec.important ? 'text-blue-700' : 'text-gray-800'}`}>
                  {rec.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Food recommendations */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Foods</h3>
        <div className="space-y-4">
          {recommendedFoods.map((category, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">{category.category}</h4>
              <div className="flex flex-wrap gap-2">
                {category.foods.map((food, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Foods to avoid */}
      {foodsToAvoid.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <AlertTriangle size={18} className="text-orange-500 mr-2" />
            Foods to Avoid or Limit
          </h3>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {foodsToAvoid.map((food, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Additional tips */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Eat mindfully and slowly to better recognize when you're full</li>
          <li>Aim for a variety of colors on your plate to ensure diverse nutrient intake</li>
          <li>Prepare meals in advance when possible to maintain consistency</li>
          <li>Listen to your body's hunger and fullness cues</li>
          <li>Allow yourself occasional treats in moderation to maintain sustainability</li>
        </ul>
      </div>
    </div>
  );
};

export default DietRecommendations;