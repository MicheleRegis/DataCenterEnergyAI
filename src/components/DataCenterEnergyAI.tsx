import React, { useState, useEffect } from 'react';
import { Activity, Zap, Server, Cpu, Waves, Thermometer, Wind, TrendingDown, TrendingUp, CheckCircle, Award, BarChart3, Droplet, Sun, Moon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import SystemControls from './SystemControls';

type DCType = 'terrestrial' | 'underwater';
type Theme = 'light' | 'dark';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  unit: string;
  trend?: number;
  color: string;
  subtitle?: string;
}

const DataCenterEnergyAI = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dcType, setDcType] = useState<DCType>('terrestrial');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [realTimeData, setRealTimeData] = useState({
    totalPower: 8450,
    aiWorkloadPower: 5230,
    coolingPower: 2100,
    infrastructurePower: 1120,
    pue: 1.18,
    wue: 1.8,
    temperature: 24,
    humidity: 45,
    efficiency: 87,
    gpuUtilization: 78,
    activeServers: 1247,
    totalServers: 1500,
    isoCompliance: 96
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setRealTimeData(prev => {
        const isUnderwater = dcType === 'underwater';
        const newTemp = isUnderwater ? 4 + (Math.random() - 0.5) * 0.5 : prev.temperature + (Math.random() - 0.5) * 0.5;
        const newPue = isUnderwater ? 1.07 + (Math.random() - 0.5) * 0.02 : 1.18 + (Math.random() - 0.5) * 0.05;
        const newCooling = isUnderwater ? 150 + (Math.random() - 0.5) * 10 : prev.coolingPower + (Math.random() - 0.5) * 20;

        return {
          ...prev,
          totalPower: prev.totalPower + (Math.random() - 0.5) * 50,
          aiWorkloadPower: prev.aiWorkloadPower + (Math.random() - 0.5) * 40,
          coolingPower: newCooling,
          temperature: newTemp,
          pue: newPue,
          wue: isUnderwater ? 0 : 1.8,
          humidity: isUnderwater ? 0 : 45 + (Math.random() - 0.5) * 2,
          gpuUtilization: Math.max(60, Math.min(95, prev.gpuUtilization + (Math.random() - 0.5) * 3))
        };
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [dcType]);

  const powerByHour = [
    { hour: '00h', total: 7800, ia: 4800, baseline: 8500 },
    { hour: '04h', total: 7500, ia: 4500, baseline: 8500 },
    { hour: '08h', total: 8900, ia: 5600, baseline: 8500 },
    { hour: '12h', total: 9200, ia: 5900, baseline: 8500 },
    { hour: '16h', total: 8700, ia: 5400, baseline: 8500 },
    { hour: '20h', total: 8200, ia: 5100, baseline: 8500 },
  ];

  const aiWorkloadBreakdown = [
    { category: 'LLM Training', power: 2340, servers: 412, gpu: 1648, enpi: 0.82 },
    { category: 'AI Inference', power: 1520, servers: 356, gpu: 712, enpi: 0.75 },
    { category: 'Computer Vision', power: 890, servers: 189, gpu: 378, enpi: 0.88 },
    { category: 'NLP Processing', power: 480, servers: 290, gpu: 290, enpi: 0.79 },
  ];

  const isoMetrics = {
    terrestrial: {
      enpiBaseline: 100, enpiCurrent: 78, improvement: 22, pue: 1.18, carbonIntensity: 4200, waterUsage: 1.8,
      compliance: 94, certificationStatus: 'Certified', lastAudit: '10/15/2024', nextReview: '11/20/2025'
    },
    underwater: {
      enpiBaseline: 100, enpiCurrent: 65, improvement: 35, pue: 1.07, carbonIntensity: 980, waterUsage: 0,
      compliance: 98, certificationStatus: 'Premium Certified', lastAudit: '11/01/2025', nextReview: '12/15/2025'
    }
  };

  const performanceRadar = [
    { metric: 'Energy Efficiency', terrestrial: 75, underwater: 95, ideal: 100 },
    { metric: 'Cooling', terrestrial: 65, underwater: 98, ideal: 100 },
    { metric: 'ISO 50001', terrestrial: 94, underwater: 98, ideal: 100 },
    { metric: 'Sustainability', terrestrial: 70, underwater: 92, ideal: 100 },
    { metric: 'Cost/kWh', terrestrial: 60, underwater: 85, ideal: 100 },
    { metric: 'Reliability', terrestrial: 88, underwater: 92, ideal: 100 },
  ];

  const isoRequirements = [
    { id: 1, requirement: '4.1 - Energy Management System', status: 'Compliant', progress: 100 },
    { id: 2, requirement: '6.2 - Objectives and Planning', status: 'Compliant', progress: 100 },
    { id: 3, requirement: '6.3 - Energy Baseline', status: 'Compliant', progress: 100 },
    { id: 4, requirement: '6.4 - Performance Indicators (EnPI)', status: 'Compliant', progress: 95 },
    { id: 5, requirement: '9.1 - Monitoring and Measurement', status: 'Compliant', progress: 98 },
    { id: 6, requirement: '10.2 - Non-Conformity & Corrective Action', status: 'In Progress', progress: 85 },
  ];

  const enpiTrends = [
    { month: 'Jun', enpi: 95, target: 90, savings: 450 },
    { month: 'Jul', enpi: 88, target: 85, savings: 780 },
    { month: 'Aug', enpi: 82, target: 82, savings: 1200 },
    { month: 'Sep', enpi: 78, target: 80, savings: 1450 },
    { month: 'Oct', enpi: dcType === 'underwater' ? 65 : 78, target: 78, savings: dcType === 'underwater' ? 2100 : 1500 },
    { month: 'Nov', enpi: dcType === 'underwater' ? 65 : 78, target: 75, savings: dcType === 'underwater' ? 2100 : 1500 },
  ];

  const energyDistribution = [
    { name: 'AI Workloads', value: realTimeData.aiWorkloadPower, color: '#8B5CF6' },
    { name: 'Cooling', value: realTimeData.coolingPower, color: dcType === 'underwater' ? '#06B6D4' : '#10B981' },
    { name: 'Infrastructure', value: realTimeData.infrastructurePower, color: '#F59E0B' },
  ];

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, unit, trend, color, subtitle }) => (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow" 
      style={{ borderLeftColor: color }}
      whileHover={{ y: -5 }}
      variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{ color }}>
            {value} <span className="text-lg font-normal">{unit}</span>
          </p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className="flex items-center gap-2 mt-2">
              {trend < 0 ? <TrendingDown size={16} className="text-green-500" /> : <TrendingUp size={16} className="text-red-500" />}
              <p className="text-sm font-medium" style={{ color: trend < 0 ? '#10B981' : '#EF4444' }}>
                {Math.abs(trend)}% vs. baseline
              </p>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon size={28} color={color} />
        </div>
      </div>
    </motion.div>
  );

  const currentISO = isoMetrics[dcType];
  const TABS = ['overview', 'ai-workloads', 'iso-50001', 'enpi', 'comparison', 'system-controls'];
  const TAB_NAMES: { [key: string]: string } = {
      'overview': 'Overview',
      'ai-workloads': 'AI Workloads',
      'iso-50001': 'ISO 50001',
      'enpi': 'EnPI & Targets',
      'comparison': 'Comparison',
      'system-controls': 'System Controls'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <header className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-30">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Server size={32} className="text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">DataCenter Energy AI</h1>
              <p className="text-slate-500 dark:text-blue-200 text-sm lg:text-base">Intelligent Energy Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={theme} initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 20, opacity: 0}} transition={{duration: 0.2}}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
            </button>
            <div className="text-center sm:text-right">
              <div className="flex items-center gap-2 justify-center sm:justify-end text-blue-500">
                <Award size={16} />
                <span className="font-bold text-sm">ISO 50001:2018</span>
              </div>
              <p className="text-2xl font-bold">{currentTime.toLocaleTimeString('en-US')}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 pt-40 sm:pt-28">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
            <p className="font-bold text-gray-700 dark:text-gray-300">Data Center Type:</p>
            <div className="flex gap-2">
              <button onClick={() => setDcType('terrestrial')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${dcType === 'terrestrial' ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>
                <Server size={20} /> Terrestrial
              </button>
              <button onClick={() => setDcType('underwater')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${dcType === 'underwater' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>
                <Waves size={20} /> Underwater
              </button>
            </div>
            <div className="flex-1 min-w-[10px]"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${realTimeData.efficiency > 85 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-2 mb-6 flex gap-1 sm:gap-2 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`relative flex-1 min-w-[120px] py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${activeTab === tab ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
              {activeTab === tab && <motion.div layoutId="active-tab-indicator" className="absolute inset-0 bg-blue-600 rounded-lg z-0" />}
              <span className="relative z-10">{TAB_NAMES[tab]}</span>
            </button>
          ))}
        </div>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={Zap} title="Total Power" value={realTimeData.totalPower.toFixed(0)} unit="kW" trend={-currentISO.improvement} color="#3B82F6" subtitle={`${realTimeData.activeServers}/${realTimeData.totalServers} servers`} />
                    <StatCard icon={Cpu} title="AI Load" value={realTimeData.aiWorkloadPower.toFixed(0)} unit="kW" trend={1.8} color="#8B5CF6" subtitle={`GPU: ${realTimeData.gpuUtilization.toFixed(0)}%`} />
                    <StatCard icon={dcType === 'underwater' ? Waves : Wind} title="Cooling" value={realTimeData.coolingPower.toFixed(0)} unit="kW" trend={dcType === 'underwater' ? -93 : -8.5} color={dcType === 'underwater' ? '#06B6D4' : '#10B981'} subtitle={dcType === 'underwater' ? 'Natural' : 'HVAC'} />
                    <StatCard icon={Activity} title="PUE (ISO 50001)" value={realTimeData.pue.toFixed(2)} unit="" trend={-currentISO.improvement / 10} color="#F59E0B" subtitle={`Target: ${dcType === 'underwater' ? '1.10' : '1.20'}`} />
                  </div>

                  <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className={`rounded-xl shadow-lg p-6 ${currentISO.compliance >= 95 ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Award size={48} />
                        <div>
                          <h3 className="text-2xl font-bold">{currentISO.certificationStatus}</h3>
                          <p className="text-sm opacity-90">ISO 50001 Compliance: {currentISO.compliance}%</p>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-sm opacity-90">Last Audit: <span className="font-bold">{currentISO.lastAudit}</span></p>
                        <p className="text-xs opacity-75 mt-1">Next Review: {currentISO.nextReview}</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Environmental Conditions</h3><Thermometer className={dcType === 'underwater' ? 'text-blue-500' : 'text-orange-500'} size={24} /></div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-600 dark:text-gray-400">Temperature</span><span className="font-bold text-2xl" style={{ color: dcType === 'underwater' ? '#06B6D4' : '#F59E0B' }}>{realTimeData.temperature.toFixed(1)}°C</span></div>
                          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2"><div className="h-2 rounded-full transition-all" style={{ width: `${(realTimeData.temperature / (dcType === 'underwater' ? 10 : 40)) * 100}%`, backgroundColor: dcType === 'underwater' ? '#06B6D4' : '#F59E0B' }}></div></div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{dcType === 'underwater' ? 'Ocean: 2-6°C' : 'ISO Range: 18-27°C'}</p>
                        </div>
                        {dcType === 'terrestrial' && (<div><div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-600 dark:text-gray-400">Humidity</span><span className="font-bold text-lg text-blue-600">{realTimeData.humidity.toFixed(0)}%</span></div><div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${realTimeData.humidity}%` }}></div></div><p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ISO Range: 40-60%</p></div>)}
                        {dcType === 'underwater' && (<div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg text-sm"><div className="flex items-center justify-between"><span className="text-blue-700 dark:text-blue-300 font-medium">Depth</span><span className="font-bold text-blue-900 dark:text-blue-200">30m</span></div><div className="flex items-center justify-between"><span className="text-blue-700 dark:text-blue-300 font-medium">Pressure</span><span className="font-bold text-blue-900 dark:text-blue-200">4 bar</span></div></div>)}
                      </div>
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">EnPI (ISO 50001)</h3><BarChart3 className="text-green-500" size={24} /></div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-600 dark:text-gray-400">Baseline</span><span className="font-semibold text-gray-700 dark:text-gray-300">{currentISO.enpiBaseline} kWh/m²</span></div>
                          <div className="flex items-center justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Current</span><span className="font-bold text-2xl text-green-600">{currentISO.enpiCurrent} kWh/m²</span></div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg text-center"><p className="text-sm text-green-700 dark:text-green-300 font-medium">Energy Improvement</p><p className="text-3xl font-bold text-green-700 dark:text-green-200">-{currentISO.improvement}%</p></div>
                      </div>
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Environmental Impact</h3><Droplet className="text-cyan-500" size={24} /></div>
                      <div className="space-y-4">
                        <div><p className="text-sm text-gray-600 dark:text-gray-400">CO₂ (today)</p><p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{currentISO.carbonIntensity.toLocaleString('en-US')} kg</p><p className={`text-xs mt-1 ${dcType === 'underwater' ? 'text-green-500' : 'text-gray-500'}`}>{dcType === 'underwater' ? '↓ 77% vs. terrestrial' : 'Baseline established'}</p></div>
                        <div><p className="text-sm text-gray-600 dark:text-gray-400">WUE (Water Usage)</p><p className="text-2xl font-bold text-blue-600">{currentISO.waterUsage} L/kWh</p>{dcType === 'underwater' && (<p className="text-xs text-green-500 mt-1">✓ Zero freshwater consumption</p>)}</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Consumption vs. ISO 50001 Baseline (24h)</h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={powerByHour}><defs><linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient><linearGradient id="colorIA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" /><XAxis dataKey="hour" tick={{ fill: 'rgb(100 116 139)' }} /><YAxis tick={{ fill: 'rgb(100 116 139)' }} /><Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} /><Legend /><Area type="monotone" dataKey="total" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTotal)" name="Actual Consumption (kW)" /><Area type="monotone" dataKey="ia" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorIA)" name="AI Load (kW)" /><Line type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="ISO Baseline (kW)" dot={false} /></AreaChart>
                      </ResponsiveContainer>
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Energy Distribution</h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart><Pie data={energyDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${(value / (realTimeData.aiWorkloadPower + realTimeData.coolingPower + realTimeData.infrastructurePower) * 100).toFixed(0)}%`} outerRadius={120} fill="#8884d8" dataKey="value">{energyDistribution.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}</Pie><Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} /></PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai-workloads' && (
                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">AI Workloads - EnPI Monitoring</h2>
                    <p className="text-gray-500 dark:text-gray-400">Energy performance indicators by workload type</p>
                  </motion.div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 dark:border-slate-700"><tr className="text-xs text-gray-500 dark:text-gray-400 uppercase"><th className="p-4">Category</th><th className="p-4">Power (kW)</th><th className="p-4">EnPI</th></tr></thead>
                        <tbody>{aiWorkloadBreakdown.map(workload => (<tr key={workload.category} className="border-b border-gray-100 dark:border-slate-700/50"><td className="p-4 font-medium">{workload.category}</td><td className="p-4 text-purple-600 dark:text-purple-400 font-bold">{workload.power}</td><td className={`p-4 font-bold ${workload.enpi > 0.8 ? 'text-green-600' : 'text-yellow-600'}`}>{workload.enpi.toFixed(2)}</td></tr>))}</tbody>
                      </table>
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Power Consumption by AI Load</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={aiWorkloadBreakdown} layout="vertical" margin={{ left: 110 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
                          <XAxis type="number" tick={{ fill: 'rgb(100 116 139)' }} />
                          <YAxis type="category" dataKey="category" width={110} tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }} />
                          <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} />
                          <Bar dataKey="power" name="Power (kW)" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'iso-50001' && (
                <motion.div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ISO 50001 Compliance</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-gray-200 dark:border-slate-700"><tr className="text-xs text-gray-500 dark:text-gray-400 uppercase"><th className="p-4">Requirement</th><th className="p-4">Status</th><th className="p-4">Progress</th></tr></thead>
                      <tbody>{isoRequirements.map(req => (<tr key={req.id} className="border-b border-gray-100 dark:border-slate-700/50"><td className="p-4 font-medium">{req.requirement}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${req.status === 'Compliant' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>{req.status}</span></td><td className="p-4"><div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${req.progress}%` }}></div></div></td></tr>))}</tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'enpi' && (
                <motion.div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6" variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">EnPI Trend & Savings</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={enpiTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
                      <XAxis dataKey="month" tick={{ fill: 'rgb(100 116 139)' }} />
                      <YAxis yAxisId="left" label={{ value: 'EnPI', angle: -90, position: 'insideLeft', fill: '#82ca9d' }} tick={{ fill: '#82ca9d' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Savings (kW)', angle: 90, position: 'insideRight', fill: '#8884d8' }} tick={{ fill: '#8884d8' }} />
                      <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="enpi" name="Current EnPI" stroke="#82ca9d" strokeWidth={2} />
                      <Line yAxisId="left" type="monotone" dataKey="target" name="EnPI Target" stroke="#ffc658" strokeDasharray="5 5" />
                      <Line yAxisId="right" type="monotone" dataKey="savings" name="Cumulative Savings" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {activeTab === 'comparison' && (
                <motion.div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6" variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold mb-4">Performance Comparison: Terrestrial vs. Underwater</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceRadar}>
                      <PolarGrid stroke="rgba(100, 116, 139, 0.3)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgb(156 163 175)', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgb(156 163 175)' }} />
                      <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} />
                      <Legend />
                      <Radar name="Terrestrial" dataKey="terrestrial" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                      <Radar name="Underwater" dataKey="underwater" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {activeTab === 'system-controls' && (
                <SystemControls dcType={dcType} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DataCenterEnergyAI;
