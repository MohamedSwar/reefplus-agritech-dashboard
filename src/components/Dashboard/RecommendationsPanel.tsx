import React from 'react';
import { Lightbulb, Droplets, Sprout, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const RecommendationsPanel: React.FC = () => {
  const { recommendations } = useApp();

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return Droplets;
      case 'fertilization':
        return Sprout;
      case 'pesticide':
        return Shield;
      default:
        return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-r-4 border-red-500 bg-red-50';
      case 'medium':
        return 'border-r-4 border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-r-4 border-green-500 bg-green-50';
      default:
        return 'border-r-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">توصيات الذكاء الاصطناعي</h3>
        <Lightbulb className="w-5 h-5 text-primary-500" />
      </div>

      <div className="space-y-4">
        {recommendations.slice(0, 4).map((recommendation) => {
          const Icon = getRecommendationIcon(recommendation.type);
          
          return (
            <div
              key={recommendation.id}
              className={clsx(
                'p-4 rounded-lg transition-all duration-200 hover:shadow-sm',
                getPriorityColor(recommendation.priority)
              )}
            >
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {recommendation.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {recommendation.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(recommendation.timestamp).toLocaleString('ar-EG')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد توصيات متاحة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPanel;