import React, { useEffect, useState } from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import { useFormContext } from '../contexts/FormContext';
import DietRecommendations from '../components/results/DietRecommendations';
import WorkoutPlan from '../components/results/WorkoutPlan';
import NutritionChart from '../components/results/NutritionChart';
import WeeklyMealPlan from '../components/results/WeeklyMealPlan';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResultsPage: React.FC = () => {
  const { formData } = useFormContext();
  const [activeTab, setActiveTab] = useState('diet');
  const [isGenerating, setIsGenerating] = useState(false);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  // Calculate BMI
  const bmi = formData.weight / Math.pow(formData.height / 100, 2);
  
  // Calculate daily calorie target based on BMI, activity level, and goals
  const calculateCalorieTarget = () => {
    let bmr;
    
    // Harris-Benedict Equation for BMR
    if (formData.gender === 'male') {
      bmr = 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age);
    } else {
      bmr = 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age);
    }
    
    // Activity multiplier
    let activityMultiplier;
    switch (formData.activityLevel) {
      case 'sedentary': activityMultiplier = 1.2; break;
      case 'light': activityMultiplier = 1.375; break;
      case 'moderate': activityMultiplier = 1.55; break;
      case 'active': activityMultiplier = 1.725; break;
      case 'very_active': activityMultiplier = 1.9; break;
      default: activityMultiplier = 1.55;
    }
    
    let tdee = bmr * activityMultiplier;
    
    // Adjust based on goals
    if (formData.fitnessGoals.includes('weight_loss')) {
      return Math.round(tdee * 0.85); // 15% deficit
    } else if (formData.fitnessGoals.includes('muscle_gain')) {
      return Math.round(tdee * 1.1); // 10% surplus
    }
    
    return Math.round(tdee);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExportPDF = async () => {
    if (!resultsRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const contentWidth = resultsRef.current.offsetWidth;
      const contentHeight = resultsRef.current.offsetHeight;
      
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions: 210 x 297 mm
      const pdf = new jsPDF({
        orientation: contentWidth > contentHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = contentWidth;
      const imgHeight = contentHeight;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      
      // Add title
      pdf.setFontSize(18);
      pdf.text('Your Personalized NutriPlan', pdfWidth / 2, 15, { align: 'center' });
      
      // Add image
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Add footer
      pdf.setFontSize(10);
      const today = new Date();
      pdf.text(`Generated on ${today.toLocaleDateString()}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      
      pdf.save('NutriPlan-Recommendations.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const printResults = () => {
    window.print();
  };

  const shareResults = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My NutriPlan AI Recommendations',
          text: 'Check out my personalized nutrition and fitness plan!',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-t-xl p-6 md:p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Personalized Plan</h1>
                <p className="text-blue-100">
                  Based on your profile and preferences, we've created these recommendations just for you.
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleExportPDF}
                  disabled={isGenerating}
                  className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Download PDF"
                >
                  <Download size={20} />
                </button>
                <button
                  onClick={printResults}
                  className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Print"
                >
                  <Printer size={20} />
                </button>
                <button
                  onClick={shareResults}
                  className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('diet')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'diet'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Diet Recommendations
              </button>
              <button
                onClick={() => setActiveTab('workout')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'workout'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Workout Plan
              </button>
              <button
                onClick={() => setActiveTab('meals')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'meals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Meal Plan
              </button>
            </div>
          </div>

          {/* Results Content */}
          <div ref={resultsRef} className="bg-white rounded-b-xl shadow-md p-6 md:p-8">
            {/* Summary Banner */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Daily Calorie Target</p>
                  <p className="text-2xl font-bold text-blue-700">{calculateCalorieTarget()} kcal</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">BMI</p>
                  <p className="text-2xl font-bold text-blue-700">{bmi.toFixed(1)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Primary Goal</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {formData.fitnessGoals[0]?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
              </div>
            </div>

            {/* Nutrition Chart */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Macro Distribution</h2>
              <NutritionChart calorieTarget={calculateCalorieTarget()} goals={formData.fitnessGoals} />
            </div>

            {/* Tab Content */}
            {activeTab === 'diet' && (
              <DietRecommendations 
                formData={formData} 
                calorieTarget={calculateCalorieTarget()} 
              />
            )}

            {activeTab === 'workout' && (
              <WorkoutPlan 
                formData={formData} 
                workoutFrequency={formData.workoutFrequency} 
                workoutDuration={formData.workoutDuration}
              />
            )}

            {activeTab === 'meals' && (
              <WeeklyMealPlan
                formData={formData}
                calorieTarget={calculateCalorieTarget()}
              />
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-2">
              These recommendations are personalized based on your profile, but should not replace professional medical advice.
            </p>
            <p className="text-gray-600 text-sm">
              Always consult with a healthcare provider before making significant changes to your diet or exercise routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;