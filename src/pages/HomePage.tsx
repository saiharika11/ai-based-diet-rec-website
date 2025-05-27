import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, BarChart3, Dumbbell, Leaf, FileOutput } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Personalized <span className="text-green-500">Nutrition</span> & <span className="text-blue-500">Fitness</span> Plans Powered by AI
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Get customized diet recommendations and workout routines tailored to your body, preferences, and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/form"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Get Your Plan <ArrowRight size={18} className="ml-2" />
                </Link>
                <a
                  href="#features"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Healthy Food and Fitness"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How NutriPlan AI Works
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our advanced AI system creates personalized recommendations based on your unique profile and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyze Your Profile</h3>
              <p className="text-gray-700">
                We calculate your BMI, analyze your current fitness level, and take your preferences into account.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Meal Plans</h3>
              <p className="text-gray-700">
                Get personalized diet recommendations that consider your allergies and dietary preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Dumbbell size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Workouts</h3>
              <p className="text-gray-700">
                Get tailored workout routines that align with your fitness goals and current activity level.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FileOutput size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Export Your Plan</h3>
              <p className="text-gray-700">
                Download your personalized recommendations as PDF or save them for future reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Personalized to Your Body</h3>
                    <p className="text-gray-700">
                      Recommendations based on your BMI, age, gender, and current fitness level for optimal results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Respects Your Preferences</h3>
                    <p className="text-gray-700">
                      Meal plans that consider your dietary preferences and avoid allergens you specify.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Goal-Oriented Approach</h3>
                    <p className="text-gray-700">
                      Whether you want to lose weight, build muscle, or improve endurance, we've got you covered.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Easy to Follow</h3>
                    <p className="text-gray-700">
                      Clear, actionable recommendations that you can implement right away.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <img
                src="https://images.pexels.com/photos/5939401/pexels-photo-5939401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Healthy Lifestyle"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your personalized diet and workout plan in minutes. No credit card required.
          </p>
          <Link
            to="/form"
            className="px-8 py-4 bg-white text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            Start Now <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;