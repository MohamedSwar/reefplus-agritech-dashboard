import React from 'react';
import { AlertTriangle, Droplets, Bug, Cloud } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const AlertsPanel: React.FC = () => {
  const { alerts } = useApp();
  const unreadAlerts = alerts.filter(alert => !alert.resolved);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return Droplets;
      case 'pest':
        return Bug;
      case 'weather':
        return Cloud;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">التنبيهات النشطة</h3>
        <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {unreadAlerts.length}
        </span>
      </div>

      <div className="space-y-3">
        {unreadAlerts.slice(0, 5).map((alert) => {
          const Icon = getAlertIcon(alert.type);
          
          return (
            <div
              key={alert.id}
              className={clsx(
                'p-4 rounded-lg border transition-all duration-200 hover:shadow-sm',
                getSeverityColor(alert.severity)
              )}
            >
              <div className="flex items-start space-x-3 space-x-reverse">
                <Icon className="w-5 h-5 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {new Date(alert.timestamp).toLocaleString('ar-EG')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {unreadAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد تنبيهات جديدة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;