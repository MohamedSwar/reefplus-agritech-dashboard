import React from 'react';
import { Thermometer, Droplets, Sprout, TrendingUp } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import SensorChart from '../components/Dashboard/SensorChart';
import AlertsPanel from '../components/Dashboard/AlertsPanel';
import RecommendationsPanel from '../components/Dashboard/RecommendationsPanel';

const Dashboard: React.FC = () => {
  // Mock sensor data
  const sensorData = [
    { time: '06:00', moisture: 65, temperature: 25, ph: 6.8 },
    { time: '09:00', moisture: 62, temperature: 28, ph: 6.9 },
    { time: '12:00', moisture: 58, temperature: 32, ph: 7.0 },
    { time: '15:00', moisture: 55, temperature: 35, ph: 7.1 },
    { time: '18:00', moisture: 52, temperature: 30, ph: 7.0 },
    { time: '21:00', moisture: 60, temperature: 26, ph: 6.9 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-600 mt-1">مرحباً بك في منصة ريف بلس للزراعة الذكية</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="رطوبة التربة"
          value="52%"
          change="-5% من الأمس"
          changeType="negative"
          icon={Droplets}
          color="blue"
        />
        <StatsCard
          title="درجة الحرارة"
          value="26°C"
          change="+2°C من الأمس"
          changeType="positive"
          icon={Thermometer}
          color="red"
        />
        <StatsCard
          title="مستوى النيتروجين"
          value="85%"
          change="+3% من الأمس"
          changeType="positive"
          icon={Sprout}
          color="green"
        />
        <StatsCard
          title="الإنتاجية المتوقعة"
          value="12.5 طن"
          change="+8% من الموسم الماضي"
          changeType="positive"
          icon={TrendingUp}
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="رطوبة التربة"
          data={sensorData}
          dataKey="moisture"
          color="#3B82F6"
          unit="%"
        />
        <SensorChart
          title="درجة الحرارة"
          data={sensorData}
          dataKey="temperature"
          color="#EF4444"
          unit="°C"
        />
      </div>

      <SensorChart
        title="مستوى الحموضة (pH)"
        data={sensorData}
        dataKey="ph"
        color="#10B981"
        unit=""
      />

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsPanel />
        <RecommendationsPanel />
      </div>
    </div>
  );
};

export default Dashboard;