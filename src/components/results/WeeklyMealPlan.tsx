import React from 'react';
import { FormData } from '../../contexts/FormContext';

interface WeeklyMealPlanProps {
  formData: FormData;
  calorieTarget: number;
}

const WeeklyMealPlan: React.FC<WeeklyMealPlanProps> = ({ formData, calorieTarget }) => {
  // Generate meal plan based on user preferences and calorie target
  const generateWeeklyMealPlan = () => {
    const { dietaryPreferences, allergies, fitnessGoals } = formData;
    
    // Check for dietary restrictions
    const isVegan = dietaryPreferences.includes('vegan');
    const isVegetarian = dietaryPreferences.includes('vegetarian') || isVegan;
    const isPescatarian = dietaryPreferences.includes('pescatarian');
    const isKeto = dietaryPreferences.includes('keto');
    const isPaleo = dietaryPreferences.includes('paleo');
    
    // Protein sources based on dietary restrictions
    let proteinSources = [];
    if (isVegan) {
      proteinSources = ['Tofu', 'Tempeh', 'Seitan', 'Lentils', 'Chickpeas', 'Black beans', 'Edamame', 'Quinoa'];
    } else if (isVegetarian) {
      proteinSources = ['Eggs', 'Greek yogurt', 'Cottage cheese', 'Tofu', 'Tempeh', 'Lentils', 'Chickpeas', 'Black beans'];
    } else if (isPescatarian) {
      proteinSources = ['Salmon', 'Tuna', 'Shrimp', 'Cod', 'Eggs', 'Greek yogurt', 'Tofu', 'Lentils'];
    } else if (isKeto) {
      proteinSources = ['Chicken breast', 'Beef', 'Eggs', 'Salmon', 'Tuna', 'Turkey', 'Pork'];
    } else if (isPaleo) {
      proteinSources = ['Chicken breast', 'Beef', 'Eggs', 'Salmon', 'Turkey', 'Pork'];
    } else {
      proteinSources = ['Chicken breast', 'Turkey', 'Beef', 'Eggs', 'Greek yogurt', 'Cottage cheese', 'Salmon', 'Tuna'];
    }
    
    // Filter out allergies
    proteinSources = proteinSources.filter(source => !allergies.some(allergy => 
      source.toLowerCase().includes(allergy.toLowerCase())
    ));
    
    // Carb sources based on dietary restrictions
    let carbSources = [];
    if (isKeto) {
      carbSources = ['Leafy greens', 'Broccoli', 'Cauliflower', 'Zucchini', 'Bell peppers', 'Asparagus'];
    } else if (isPaleo) {
      carbSources = ['Sweet potatoes', 'Butternut squash', 'Fruits', 'Carrots', 'Beets'];
    } else {
      carbSources = ['Brown rice', 'Quinoa', 'Sweet potatoes', 'Oats', 'Whole grain bread', 'Whole wheat pasta', 'Fruits'];
    }
    
    // Filter out allergies
    carbSources = carbSources.filter(source => !allergies.some(allergy => 
      source.toLowerCase().includes(allergy.toLowerCase())
    ));
    
    // Fat sources
    let fatSources = ['Avocados', 'Olive oil', 'Nuts', 'Seeds', 'Nut butters'];
    if (!isVegan && !isVegetarian && !isPescatarian) {
      fatSources.push('Fatty fish', 'Eggs');
    }
    if (isKeto) {
      fatSources.push('Butter', 'Cheese', 'Coconut oil');
    }
    
    // Filter out allergies
    fatSources = fatSources.filter(source => !allergies.some(allergy => 
      source.toLowerCase().includes(allergy.toLowerCase())
    ));
    
    // Vegetable options (everyone should eat vegetables)
    const vegetables = [
      'Spinach', 'Kale', 'Broccoli', 'Cauliflower', 'Bell peppers', 
      'Zucchini', 'Asparagus', 'Brussels sprouts', 'Carrots', 'Cucumber'
    ];
    
    // Meal types
    const breakfastTypes = [];
    const lunchTypes = [];
    const dinnerTypes = [];
    const snackTypes = [];
    
    // Breakfast types based on diet
    if (isKeto) {
      breakfastTypes.push(
        { name: 'Vegetable Omelette', protein: ['Eggs'], fat: ['Avocado', 'Olive oil'], carbs: ['Bell peppers', 'Spinach'], description: 'Eggs cooked with vegetables and topped with avocado.' },
        { name: 'Chia Seed Pudding', protein: ['Chia seeds'], fat: ['Coconut milk', 'Nuts'], carbs: ['Berries (limited)'], description: 'Chia seeds soaked in coconut milk with a few berries and nuts.' },
        { name: 'Keto Smoothie Bowl', protein: ['Protein powder'], fat: ['Almond butter', 'Coconut milk'], carbs: ['Spinach', 'Berries (limited)'], description: 'Low-carb smoothie with healthy fats and protein.' }
      );
    } else if (isPaleo) {
      breakfastTypes.push(
        { name: 'Sweet Potato Hash', protein: ['Eggs'], fat: ['Olive oil'], carbs: ['Sweet potatoes'], description: 'Sweet potatoes with eggs and vegetables.' },
        { name: 'Fruit and Nut Bowl', protein: ['Nuts'], fat: ['Nuts', 'Coconut flakes'], carbs: ['Fruits'], description: 'Mix of fruits with nuts and coconut flakes.' },
        { name: 'Paleo Breakfast Bowl', protein: ['Eggs'], fat: ['Avocado'], carbs: ['Vegetables'], description: 'Eggs with vegetables and avocado.' }
      );
    } else if (isVegan) {
      breakfastTypes.push(
        { name: 'Tofu Scramble', protein: ['Tofu'], fat: ['Olive oil'], carbs: ['Vegetables', 'Whole grain toast'], description: 'Scrambled tofu with vegetables and spices.' },
        { name: 'Overnight Oats', protein: ['Chia seeds', 'Plant protein powder'], fat: ['Nuts', 'Seeds'], carbs: ['Oats', 'Fruits'], description: 'Oats soaked overnight with plant milk, fruits, and nuts.' },
        { name: 'Smoothie Bowl', protein: ['Plant protein powder'], fat: ['Nut butter'], carbs: ['Fruits', 'Granola'], description: 'Thick smoothie topped with fruits, granola, and nut butter.' }
      );
    } else {
      breakfastTypes.push(
        { name: 'Greek Yogurt Parfait', protein: ['Greek yogurt'], fat: ['Nuts', 'Seeds'], carbs: ['Fruits', 'Granola'], description: 'Layered yogurt with fruits, nuts, and granola.' },
        { name: 'Eggs and Toast', protein: ['Eggs'], fat: ['Avocado'], carbs: ['Whole grain toast'], description: 'Eggs with whole grain toast and avocado.' },
        { name: 'Protein Oatmeal', protein: ['Protein powder', 'Greek yogurt'], fat: ['Nut butter'], carbs: ['Oats', 'Fruits'], description: 'Oatmeal with added protein and healthy fats.' },
        { name: 'Breakfast Wrap', protein: ['Eggs', 'Greek yogurt'], fat: ['Avocado', 'Cheese'], carbs: ['Whole grain wrap', 'Vegetables'], description: 'Whole grain wrap filled with protein and vegetables.' }
      );
    }
    
    // Lunch and dinner types based on diet
    if (isKeto) {
      lunchTypes.push(
        { name: 'Avocado Salad', protein: proteinSources, fat: ['Avocado', 'Olive oil'], carbs: ['Leafy greens', 'Cucumber'], description: 'Protein with avocado over greens with olive oil dressing.' },
        { name: 'Lettuce Wraps', protein: proteinSources, fat: ['Mayonnaise', 'Avocado'], carbs: ['Lettuce', 'Bell peppers'], description: 'Protein wrapped in lettuce with keto-friendly vegetables.' },
        { name: 'Zucchini Noodles', protein: proteinSources, fat: ['Olive oil', 'Cheese'], carbs: ['Zucchini', 'Tomatoes (limited)'], description: 'Spiralized zucchini with protein and low-carb sauce.' }
      );
      
      dinnerTypes.push(
        { name: 'Cauliflower Rice Bowl', protein: proteinSources, fat: ['Olive oil', 'Nuts'], carbs: ['Cauliflower', 'Broccoli'], description: 'Protein over cauliflower rice with vegetables.' },
        { name: 'Stuffed Bell Peppers', protein: proteinSources, fat: ['Cheese', 'Olive oil'], carbs: ['Bell peppers', 'Spinach'], description: 'Bell peppers stuffed with protein and vegetables.' },
        { name: 'Keto Bowl', protein: proteinSources, fat: ['Avocado', 'Olive oil'], carbs: ['Leafy greens', 'Broccoli'], description: 'Mix of protein, healthy fats, and low-carb vegetables.' }
      );
    } else if (isPaleo) {
      lunchTypes.push(
        { name: 'Sweet Potato Bowl', protein: proteinSources, fat: ['Olive oil', 'Avocado'], carbs: ['Sweet potatoes', 'Vegetables'], description: 'Protein with sweet potatoes and vegetables.' },
        { name: 'Paleo Wrap', protein: proteinSources, fat: ['Avocado'], carbs: ['Lettuce wraps', 'Vegetables'], description: 'Protein wrapped in lettuce with paleo-friendly vegetables.' },
        { name: 'Harvest Bowl', protein: proteinSources, fat: ['Olive oil', 'Avocado'], carbs: ['Butternut squash', 'Beets'], description: 'Mix of protein and root vegetables.' }
      );
      
      dinnerTypes.push(
        { name: 'Grilled Protein with Vegetables', protein: proteinSources, fat: ['Olive oil'], carbs: ['Sweet potatoes', 'Vegetables'], description: 'Grilled protein with roasted vegetables.' },
        { name: 'Stuffed Acorn Squash', protein: proteinSources, fat: ['Olive oil'], carbs: ['Acorn squash', 'Apples'], description: 'Acorn squash stuffed with protein and fruits.' },
        { name: 'Paleo Bowl', protein: proteinSources, fat: ['Avocado', 'Olive oil'], carbs: ['Vegetables', 'Fruits'], description: 'Mix of protein, healthy fats, and paleo-friendly carbs.' }
      );
    } else if (isVegan) {
      lunchTypes.push(
        { name: 'Buddha Bowl', protein: proteinSources, fat: ['Avocado', 'Tahini'], carbs: ['Quinoa', 'Vegetables'], description: 'Plant protein with grains and vegetables with tahini dressing.' },
        { name: 'Vegan Wrap', protein: proteinSources, fat: ['Avocado', 'Hummus'], carbs: ['Whole grain wrap', 'Vegetables'], description: 'Whole grain wrap with plant protein, vegetables, and healthy fats.' },
        { name: 'Lentil Salad', protein: ['Lentils'], fat: ['Olive oil', 'Nuts'], carbs: ['Vegetables', 'Quinoa'], description: 'Lentils with vegetables and dressing over greens.' }
      );
      
      dinnerTypes.push(
        { name: 'Stir Fry with Tofu', protein: ['Tofu', 'Tempeh'], fat: ['Olive oil', 'Cashews'], carbs: ['Brown rice', 'Vegetables'], description: 'Tofu or tempeh stir-fried with vegetables over rice.' },
        { name: 'Vegan Chili', protein: ['Beans', 'Lentils'], fat: ['Avocado'], carbs: ['Vegetables', 'Quinoa'], description: 'Bean and vegetable chili with quinoa.' },
        { name: 'Stuffed Bell Peppers', protein: ['Quinoa', 'Beans'], fat: ['Olive oil', 'Nuts'], carbs: ['Bell peppers', 'Tomatoes'], description: 'Bell peppers stuffed with protein-rich grains and beans.' }
      );
    } else {
      lunchTypes.push(
        { name: 'Protein Bowl', protein: proteinSources, fat: ['Avocado', 'Olive oil'], carbs: ['Brown rice', 'Quinoa', 'Vegetables'], description: 'Protein with grains and vegetables.' },
        { name: 'Wrap or Sandwich', protein: proteinSources, fat: ['Avocado', 'Hummus'], carbs: ['Whole grain wrap/bread', 'Vegetables'], description: 'Whole grain wrap with protein, vegetables, and healthy fats.' },
        { name: 'Hearty Salad', protein: proteinSources, fat: ['Olive oil', 'Nuts', 'Seeds'], carbs: ['Quinoa', 'Vegetables', 'Fruits'], description: 'Protein over greens with grains and dressing.' }
      );
      
      dinnerTypes.push(
        { name: 'Grilled/Baked Protein with Sides', protein: proteinSources, fat: ['Olive oil', 'Avocado'], carbs: ['Sweet potatoes', 'Brown rice', 'Vegetables'], description: 'Protein with healthy carbs and vegetables.' },
        { name: 'Stir Fry', protein: proteinSources, fat: ['Olive oil', 'Nuts'], carbs: ['Brown rice', 'Vegetables'], description: 'Protein stir-fried with vegetables over rice.' },
        { name: 'Protein Pasta', protein: proteinSources, fat: ['Olive oil', 'Cheese'], carbs: ['Whole grain pasta', 'Vegetables'], description: 'Whole grain pasta with protein and vegetables.' }
      );
    }
    
    // Snack types based on diet
    if (isKeto) {
      snackTypes.push(
        { name: 'Cheese and Nuts', protein: ['Cheese'], fat: ['Nuts'], carbs: [], description: 'Cheese with a handful of nuts.' },
        { name: 'Avocado with Salt', protein: [], fat: ['Avocado'], carbs: [], description: 'Half an avocado with salt and pepper.' },
        { name: 'Hard-Boiled Eggs', protein: ['Eggs'], fat: [], carbs: [], description: 'Hard-boiled eggs with salt and pepper.' }
      );
    } else if (isPaleo) {
      snackTypes.push(
        { name: 'Fruit and Nuts', protein: [], fat: ['Nuts'], carbs: ['Fruits'], description: 'Fresh fruit with a handful of nuts.' },
        { name: 'Jerky', protein: ['Beef jerky', 'Turkey jerky'], fat: [], carbs: [], description: 'Natural, sugar-free jerky.' },
        { name: 'Hard-Boiled Eggs', protein: ['Eggs'], fat: [], carbs: [], description: 'Hard-boiled eggs with salt and pepper.' }
      );
    } else if (isVegan) {
      snackTypes.push(
        { name: 'Hummus with Vegetables', protein: ['Hummus'], fat: [], carbs: ['Vegetables'], description: 'Hummus with fresh vegetable sticks.' },
        { name: 'Trail Mix', protein: [], fat: ['Nuts', 'Seeds'], carbs: ['Dried fruits'], description: 'Mix of nuts, seeds, and dried fruits.' },
        { name: 'Fruit and Nut Butter', protein: [], fat: ['Nut butter'], carbs: ['Fruits'], description: 'Fresh fruit with nut butter.' }
      );
    } else {
      snackTypes.push(
        { name: 'Greek Yogurt with Toppings', protein: ['Greek yogurt'], fat: ['Nuts'], carbs: ['Fruits', 'Honey'], description: 'Greek yogurt with fruits and nuts.' },
        { name: 'Protein Bar', protein: ['Protein bar'], fat: [], carbs: [], description: 'High-quality protein bar.' },
        { name: 'Hummus with Vegetables', protein: ['Hummus'], fat: [], carbs: ['Vegetables'], description: 'Hummus with fresh vegetable sticks.' },
        { name: 'Apple with Nut Butter', protein: [], fat: ['Nut butter'], carbs: ['Apple'], description: 'Apple slices with nut butter.' }
      );
    }
    
    // Generate weekly plan
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const mealPlan = weekdays.map(day => {
      // Randomly select meals for each day
      const breakfast = breakfastTypes[Math.floor(Math.random() * breakfastTypes.length)];
      const lunch = lunchTypes[Math.floor(Math.random() * lunchTypes.length)];
      const dinner = dinnerTypes[Math.floor(Math.random() * dinnerTypes.length)];
      const snack1 = snackTypes[Math.floor(Math.random() * snackTypes.length)];
      const snack2 = snackTypes[Math.floor(Math.random() * snackTypes.length)];
      
      // For meals with multiple protein options, select one randomly
      const selectRandomItem = (items: string[]) => {
        return items[Math.floor(Math.random() * items.length)];
      };
      
      // Prepare protein selection for each meal
      const breakfastProtein = breakfast.protein.length > 0 ? breakfast.protein : ['N/A'];
      const lunchProtein = lunch.protein.length > 0 
        ? (Array.isArray(lunch.protein) && lunch.protein[0] !== 'N/A' 
          ? [selectRandomItem(lunch.protein)] 
          : lunch.protein)
        : ['N/A'];
      const dinnerProtein = dinner.protein.length > 0 
        ? (Array.isArray(dinner.protein) && dinner.protein[0] !== 'N/A' 
          ? [selectRandomItem(dinner.protein)] 
          : dinner.protein)
        : ['N/A'];
      
      return {
        day,
        meals: [
          {
            type: 'Breakfast',
            name: breakfast.name,
            protein: breakfastProtein,
            fat: breakfast.fat,
            carbs: breakfast.carbs,
            description: breakfast.description,
            calories: Math.round(calorieTarget * 0.25) // 25% of daily calories
          },
          {
            type: 'Lunch',
            name: lunch.name,
            protein: lunchProtein,
            fat: lunch.fat,
            carbs: lunch.carbs,
            description: lunch.description,
            calories: Math.round(calorieTarget * 0.3) // 30% of daily calories
          },
          {
            type: 'Dinner',
            name: dinner.name,
            protein: dinnerProtein,
            fat: dinner.fat,
            carbs: dinner.carbs,
            description: dinner.description,
            calories: Math.round(calorieTarget * 0.3) // 30% of daily calories
          },
          {
            type: 'Snack 1',
            name: snack1.name,
            protein: snack1.protein,
            fat: snack1.fat,
            carbs: snack1.carbs,
            description: snack1.description,
            calories: Math.round(calorieTarget * 0.075) // 7.5% of daily calories
          },
          {
            type: 'Snack 2',
            name: snack2.name,
            protein: snack2.protein,
            fat: snack2.fat,
            carbs: snack2.carbs,
            description: snack2.description,
            calories: Math.round(calorieTarget * 0.075) // 7.5% of daily calories
          }
        ]
      };
    });
    
    return mealPlan;
  };

  const mealPlan = generateWeeklyMealPlan();
  
  // Generate grocery list from meal plan
  const generateGroceryList = (mealPlan) => {
    const groceryItems = new Map();
    
    mealPlan.forEach(day => {
      day.meals.forEach(meal => {
        // Add proteins
        meal.protein.forEach(protein => {
          if (protein !== 'N/A') {
            const count = groceryItems.get(protein) || 0;
            groceryItems.set(protein, count + 1);
          }
        });
        
        // Add fats
        meal.fat.forEach(fat => {
          const count = groceryItems.get(fat) || 0;
          groceryItems.set(fat, count + 1);
        });
        
        // Add carbs
        meal.carbs.forEach(carb => {
          const count = groceryItems.get(carb) || 0;
          groceryItems.set(carb, count + 1);
        });
      });
    });
    
    // Convert map to array and sort by category
    const sortedGrocery = Array.from(groceryItems.entries())
      .map(([item, count]) => ({ item, count }))
      .sort((a, b) => a.item.localeCompare(b.item));
    
    // Group by category
    const proteins = sortedGrocery.filter(({ item }) => 
      ['chicken', 'beef', 'eggs', 'fish', 'salmon', 'tuna', 'tofu', 'tempeh', 'lentils', 'beans', 'yogurt', 'cottage cheese', 'protein'].some(protein => 
        item.toLowerCase().includes(protein)
      )
    );
    
    const vegetables = sortedGrocery.filter(({ item }) => 
      ['spinach', 'kale', 'lettuce', 'broccoli', 'cauliflower', 'pepper', 'zucchini', 'asparagus', 'brussels', 'carrots', 'cucumber', 'tomato', 'vegetables'].some(veg => 
        item.toLowerCase().includes(veg)
      )
    );
    
    const fruits = sortedGrocery.filter(({ item }) => 
      ['apple', 'banana', 'berry', 'berries', 'fruit'].some(fruit => 
        item.toLowerCase().includes(fruit)
      )
    );
    
    const grains = sortedGrocery.filter(({ item }) => 
      ['rice', 'quinoa', 'oats', 'bread', 'pasta', 'wrap', 'granola'].some(grain => 
        item.toLowerCase().includes(grain)
      )
    );
    
    const fats = sortedGrocery.filter(({ item }) => 
      ['avocado', 'oil', 'nuts', 'seeds', 'butter', 'tahini', 'hummus', 'cheese'].some(fat => 
        item.toLowerCase().includes(fat)
      )
    );
    
    // Other items (anything not categorized above)
    const others = sortedGrocery.filter(item => 
      !proteins.includes(item) && 
      !vegetables.includes(item) && 
      !fruits.includes(item) && 
      !grains.includes(item) && 
      !fats.includes(item)
    );
    
    return {
      proteins,
      vegetables,
      fruits,
      grains,
      fats,
      others
    };
  };
  
  const groceryList = generateGroceryList(mealPlan);

  const [activeDay, setActiveDay] = React.useState(0);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Meal Plan</h2>
      
      {/* Explanation */}
      <p className="text-gray-700 mb-6">
        Below is a personalized weekly meal plan based on your dietary preferences, allergies, and fitness goals. 
        Each day includes breakfast, lunch, dinner, and snacks to help you meet your calorie target of {calorieTarget} calories per day.
      </p>
      
      {/* Day Selector */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto pb-1">
          {mealPlan.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeDay === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
      </div>
      
      {/* Meal Plan for Selected Day */}
      <div className="space-y-4 mb-8">
        {mealPlan[activeDay].meals.map((meal, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{meal.type}</h3>
              <span className="text-sm text-blue-600">{meal.calories} kcal</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2">{meal.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{meal.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="text-xs uppercase text-gray-500 font-semibold mb-2">Protein</h5>
                  <div className="flex flex-wrap gap-1">
                    {meal.protein.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="text-xs uppercase text-gray-500 font-semibold mb-2">Carbs</h5>
                  <div className="flex flex-wrap gap-1">
                    {meal.carbs.length > 0 ? (
                      meal.carbs.map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs italic">No carbs</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h5 className="text-xs uppercase text-gray-500 font-semibold mb-2">Fats</h5>
                  <div className="flex flex-wrap gap-1">
                    {meal.fat.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Grocery List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Grocery List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Proteins */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Proteins</h4>
            <ul className="space-y-1">
              {groceryList.proteins.map((item, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="w-4 h-4 inline-block border border-gray-300 rounded-sm mr-2"></span>
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Vegetables */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Vegetables</h4>
            <ul className="space-y-1">
              {groceryList.vegetables.map((item, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="w-4 h-4 inline-block border border-gray-300 rounded-sm mr-2"></span>
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Fruits */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Fruits</h4>
            <ul className="space-y-1">
              {groceryList.fruits.length > 0 ? (
                groceryList.fruits.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-4 h-4 inline-block border border-gray-300 rounded-sm mr-2"></span>
                    {item.item}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm italic">No fruits needed this week</li>
              )}
            </ul>
          </div>
          
          {/* Grains */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Grains & Starches</h4>
            <ul className="space-y-1">
              {groceryList.grains.length > 0 ? (
                groceryList.grains.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-4 h-4 inline-block border border-gray-300 rounded-sm mr-2"></span>
                    {item.item}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm italic">No grains needed this week</li>
              )}
            </ul>
          </div>
          
          {/* Fats */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Healthy Fats</h4>
            <ul className="space-y-1">
              {groceryList.fats.map((item, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="w-4 h-4 inline-block border border-gray-300 rounded-sm mr-2"></span>
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Others */}
          {groceryList.others.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Other Items</h4>
              <ul className="space-y-1">
                {groceryList.others.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-4 h-4 inline-block border border-gray-300 rounded-sm mr-2"></span>
                    {item.item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Meal Prep Tips */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Meal Prep Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
          <li>Prepare proteins in bulk at the beginning of the week</li>
          <li>Chop vegetables ahead of time and store in airtight containers</li>
          <li>Cook grains like rice and quinoa in larger batches</li>
          <li>Use similar ingredients across multiple meals to minimize waste</li>
          <li>Store snacks in portion-controlled containers for grab-and-go convenience</li>
          <li>Consider setting aside 2-3 hours on the weekend for meal preparation</li>
          <li>Label and date your prepared foods for easy tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyMealPlan;