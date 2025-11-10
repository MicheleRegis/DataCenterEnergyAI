import React, { useState, useEffect } from 'react';
import { Activity, Zap, Server, Cpu, Waves, Thermometer, Wind, TrendingDown, TrendingUp, CheckCircle, Award, BarChart3, Droplet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

type DCType = 'terrestrial' | 'underwater';

const DataCenterEnergyAI = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dcType, setDcType] = useState<DCType>('terrestrial');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [realTimeData, setRealTimeData] = useState({
    totalPower: 8450,
    aiWorkloadPower: 5230,
    coolingPower: 2100,
    infrastructurePower: 1120,
    pue: 1.35,
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
        const newTemp = isUnderwater ? 4 + (Math.random() - 0.5) * 0.5 : prev.temperature + (Math.random() - 0.5) * 2;
        const newPue = isUnderwater ? 1.12 + (Math.random() - 0.5) * 0.05 : 1.35 + (Math.random() - 0.5) * 0.1;
        const newCooling = isUnderwater ? 150 + (Math.random() - 0.5) * 10 : prev.coolingPower + (Math.random() - 0.5) * 50;

        return {
          ...prev,
          totalPower: prev.totalPower + (Math.random() - 0.5) * 100,
          aiWorkloadPower: prev.aiWorkloadPower + (Math.random() - 0.5) * 80,
          coolingPower: newCooling,
          temperature: newTemp,
          pue: newPue,
          wue: isUnderwater ? 0 : 1.8,
          humidity: isUnderwater ? 0 : 45,
          gpuUtilization: Math.max(60, Math.min(95, prev.gpuUtilization + (Math.random() - 0.5) * 5))
        };
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [dcType]);

  const powerByHour = [
    { hora: '00h', total: 7800, ia: 4800, baseline: 8500 },
    { hora: '04h', total: 7500, ia: 4500, baseline: 8500 },
    { hora: '08h', total: 8900, ia: 5600, baseline: 8500 },
    { hora: '12h', total: 9200, ia: 5900, baseline: 8500 },
    { hora: '16h', total: 8700, ia: 5400, baseline: 8500 },
    { hora: '20h', total: 8200, ia: 5100, baseline: 8500 },
  ];

  const aiWorkloadBreakdown = [
    { categoria: 'Treinamento LLM', potencia: 2340, servidores: 412, gpu: 1648, enpi: 0.82 },
    { categoria: 'Inferência IA', potencia: 1520, servidores: 356, gpu: 712, enpi: 0.75 },
    { categoria: 'Visão Computacional', potencia: 890, servidores: 189, gpu: 378, enpi: 0.88 },
    { categoria: 'NLP/Processamento', potencia: 480, servidores: 290, gpu: 290, enpi: 0.79 },
  ];

  const isoMetrics = {
    terrestrial: {
      enpiBaseline: 100, enpiCurrent: 78, improvement: 22, pue: 1.35, carbonIntensity: 4200, waterUsage: 1.8,
      compliance: 94, certificationStatus: 'Certificado', lastAudit: '15/10/2024', nextReview: '20/11/2024'
    },
    underwater: {
      enpiBaseline: 100, enpiCurrent: 65, improvement: 35, pue: 1.12, carbonIntensity: 980, waterUsage: 0,
      compliance: 98, certificationStatus: 'Certificado Premium', lastAudit: '01/11/2024', nextReview: '15/12/2024'
    }
  };

  const performanceRadar = [
    { metrica: 'Eficiência Energética', terrestre: 75, subaquatico: 95, ideal: 100 },
    { metrica: 'Refrigeração', terrestre: 65, subaquatico: 98, ideal: 100 },
    { metrica: 'ISO 50001', terrestre: 94, subaquatico: 98, ideal: 100 },
    { metrica: 'Sustentabilidade', terrestre: 70, subaquatico: 92, ideal: 100 },
    { metrica: 'Custo/kWh', terrestre: 60, subaquatico: 85, ideal: 100 },
    { metrica: 'Confiabilidade', terrestre: 88, subaquatico: 92, ideal: 100 },
  ];

  const isoRequirements = [
    { id: 1, requisito: '4.1 - Sistema de Gestão de Energia', status: 'Conforme', progress: 100 },
    { id: 2, requisito: '6.2 - Objetivos e Planejamento', status: 'Conforme', progress: 100 },
    { id: 3, requisito: '6.3 - Linha de Base Energética', status: 'Conforme', progress: 100 },
    { id: 4, requisito: '6.4 - Indicadores de Desempenho (EnPI)', status: 'Conforme', progress: 95 },
    { id: 5, requisito: '9.1 - Monitoramento e Medição', status: 'Conforme', progress: 98 },
    { id: 6, requisito: '10.2 - Não Conformidade e Ação Corretiva', status: 'Em Progresso', progress: 85 },
  ];

  const enpiTrends = [
    { mes: 'Jun', enpi: 95, meta: 90, economia: 450 },
    { mes: 'Jul', enpi: 88, meta: 85, economia: 780 },
    { mes: 'Ago', enpi: 82, meta: 82, economia: 1200 },
    { mes: 'Set', enpi: 78, meta: 80, economia: 1450 },
    { mes: 'Out', enpi: dcType === 'underwater' ? 65 : 78, meta: 78, economia: dcType === 'underwater' ? 2100 : 1500 },
    { mes: 'Nov', enpi: dcType === 'underwater' ? 65 : 78, meta: 75, economia: dcType === 'underwater' ? 2100 : 1500 },
  ];

  const energyDistribution = [
    { nome: 'Cargas IA', valor: realTimeData.aiWorkloadPower, cor: '#8B5CF6' },
    { nome: 'Refrigeração', valor: realTimeData.coolingPower, cor: dcType === 'underwater' ? '#06B6D4' : '#10B981' },
    { nome: 'Infraestrutura', valor: realTimeData.infrastructurePower, cor: '#F59E0B' },
  ];

  const StatCard = ({ icon: Icon, title, value, unit, trend, color, subtitle }: any) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow" style={{ borderLeftColor: color }}>
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
    </div>
  );

  const currentISO = isoMetrics[dcType];

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-slate-100 dark:bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-800 dark:text-slate-200">
      <div className="max-w-8xl mx-auto">
        <header className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold flex items-center gap-3">
                <Server size={40} className="text-blue-500" />
                DataCenter Energy AI
              </h1>
              <p className="text-slate-500 dark:text-blue-100 text-base lg:text-lg">Sistema ISO 50001 - Monitoramento Inteligente de Energia</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="flex items-center gap-2 justify-center sm:justify-end mb-1 text-blue-500">
                <Award size={20} />
                <span className="font-bold">ISO 50001:2018</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-blue-200">Atualização em Tempo Real</p>
              <p className="text-2xl font-bold">{currentTime.toLocaleTimeString('pt-BR')}</p>
            </div>
          </div>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
            <p className="font-bold text-gray-700 dark:text-gray-300">Tipo de Data Center:</p>
            <div className="flex gap-2">
              <button onClick={() => setDcType('terrestrial')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${dcType === 'terrestrial' ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>
                <Server size={20} /> Terrestre
              </button>
              <button onClick={() => setDcType('underwater')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${dcType === 'underwater' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>
                <Waves size={20} /> Subaquático
              </button>
            </div>
            <div className="flex-1 min-w-[10px]"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Certificado</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${realTimeData.efficiency > 85 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Operacional</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-2 mb-6 flex gap-1 sm:gap-2 overflow-x-auto">
          {['overview', 'ai-workloads', 'iso-50001', 'enpi', 'comparison'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 min-w-[120px] py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
              {tab === 'overview' && 'Visão Geral'}
              {tab === 'ai-workloads' && 'Cargas de IA'}
              {tab === 'iso-50001' && 'ISO 50001'}
              {tab === 'enpi' && 'EnPI & Metas'}
              {tab === 'comparison' && 'Comparativo'}
            </button>
          ))}
        </div>

        <main>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Zap} title="Potência Total" value={realTimeData.totalPower.toFixed(0)} unit="kW" trend={-currentISO.improvement} color="#3B82F6" subtitle={`${realTimeData.activeServers}/${realTimeData.totalServers} servidores`} />
                <StatCard icon={Cpu} title="Carga IA" value={realTimeData.aiWorkloadPower.toFixed(0)} unit="kW" trend={1.8} color="#8B5CF6" subtitle={`GPU: ${realTimeData.gpuUtilization.toFixed(0)}%`} />
                <StatCard icon={dcType === 'underwater' ? Waves : Wind} title="Refrigeração" value={realTimeData.coolingPower.toFixed(0)} unit="kW" trend={dcType === 'underwater' ? -93 : -8.5} color={dcType === 'underwater' ? '#06B6D4' : '#10B981'} subtitle={dcType === 'underwater' ? 'Natural' : 'HVAC'} />
                <StatCard icon={Activity} title="PUE (ISO 50001)" value={realTimeData.pue.toFixed(2)} unit="" trend={-currentISO.improvement / 10} color="#F59E0B" subtitle={`Meta: ${dcType === 'underwater' ? '1.15' : '1.40'}`} />
              </div>

              <div className={`rounded-xl shadow-lg p-6 ${currentISO.compliance >= 95 ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Award size={48} />
                    <div>
                      <h3 className="text-2xl font-bold">{currentISO.certificationStatus}</h3>
                      <p className="text-sm opacity-90">Conformidade ISO 50001: {currentISO.compliance}%</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-sm opacity-90">Última Auditoria: <span className="font-bold">{currentISO.lastAudit}</span></p>
                    <p className="text-xs opacity-75 mt-1">Próxima Revisão: {currentISO.nextReview}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Condições Ambientais</h3><Thermometer className={dcType === 'underwater' ? 'text-blue-500' : 'text-orange-500'} size={24} /></div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-600 dark:text-gray-400">Temperatura</span><span className="font-bold text-2xl" style={{ color: dcType === 'underwater' ? '#06B6D4' : '#F59E0B' }}>{realTimeData.temperature.toFixed(1)}°C</span></div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2"><div className="h-2 rounded-full transition-all" style={{ width: `${(realTimeData.temperature / (dcType === 'underwater' ? 10 : 40)) * 100}%`, backgroundColor: dcType === 'underwater' ? '#06B6D4' : '#F59E0B' }}></div></div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{dcType === 'underwater' ? 'Oceano: 2-6°C' : 'Range ISO: 18-27°C'}</p>
                    </div>
                    {dcType === 'terrestrial' && (<div><div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-600 dark:text-gray-400">Umidade</span><span className="font-bold text-lg text-blue-600">{realTimeData.humidity}%</span></div><div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${realTimeData.humidity}%` }}></div></div><p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Range ISO: 40-60%</p></div>)}
                    {dcType === 'underwater' && (<div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg text-sm"><div className="flex items-center justify-between"><span className="text-blue-700 dark:text-blue-300 font-medium">Profundidade</span><span className="font-bold text-blue-900 dark:text-blue-200">117m</span></div><div className="flex items-center justify-between"><span className="text-blue-700 dark:text-blue-300 font-medium">Pressão</span><span className="font-bold text-blue-900 dark:text-blue-200">12.5 bar</span></div></div>)}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">EnPI (ISO 50001)</h3><BarChart3 className="text-green-500" size={24} /></div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-600 dark:text-gray-400">Linha de Base</span><span className="font-semibold text-gray-700 dark:text-gray-300">{currentISO.enpiBaseline} kWh/m²</span></div>
                      <div className="flex items-center justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Atual</span><span className="font-bold text-2xl text-green-600">{currentISO.enpiCurrent} kWh/m²</span></div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg text-center"><p className="text-sm text-green-700 dark:text-green-300 font-medium">Melhoria Energética</p><p className="text-3xl font-bold text-green-700 dark:text-green-200">-{currentISO.improvement}%</p></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Impacto Ambiental</h3><Droplet className="text-cyan-500" size={24} /></div>
                  <div className="space-y-4">
                    <div><p className="text-sm text-gray-600 dark:text-gray-400">CO₂ (hoje)</p><p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{currentISO.carbonIntensity.toLocaleString('pt-BR')} kg</p><p className={`text-xs mt-1 ${dcType === 'underwater' ? 'text-green-500' : 'text-gray-500'}`}>{dcType === 'underwater' ? '↓ 77% vs. terrestre' : 'Baseline estabelecida'}</p></div>
                    <div><p className="text-sm text-gray-600 dark:text-gray-400">WUE (Water Usage)</p><p className="text-2xl font-bold text-blue-600">{currentISO.waterUsage} L/kWh</p>{dcType === 'underwater' && (<p className="text-xs text-green-500 mt-1">✓ Zero consumo de água doce</p>)}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Consumo vs. Linha de Base ISO 50001 (24h)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={powerByHour}><defs><linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient><linearGradient id="colorIA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" /><XAxis dataKey="hora" tick={{ fill: 'rgb(156 163 175)' }} /><YAxis tick={{ fill: 'rgb(156 163 175)' }} /><Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} /><Legend /><Area type="monotone" dataKey="total" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTotal)" name="Consumo Real (kW)" /><Area type="monotone" dataKey="ia" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorIA)" name="Carga IA (kW)" /><Line type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Baseline ISO (kW)" dot={false} /></AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Distribuição de Energia</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart><Pie data={energyDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${(value / (realTimeData.aiWorkloadPower + realTimeData.coolingPower + realTimeData.infrastructurePower) * 100).toFixed(0)}%`} outerRadius={120} fill="#8884d8" dataKey="valor">{energyDistribution.map((entry) => (<Cell key={entry.nome} fill={entry.cor} />))}</Pie><Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} /></PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-workloads' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Cargas de Trabalho IA - Monitoramento EnPI</h2>
                <p className="text-gray-500 dark:text-gray-400">Indicadores de desempenho energético por tipo de workload</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-200 dark:border-slate-700"><tr className="text-xs text-gray-500 dark:text-gray-400 uppercase"><th className="p-4">Categoria</th><th className="p-4">Potência (kW)</th><th className="p-4">EnPI</th></tr></thead>
                    <tbody>{aiWorkloadBreakdown.map(workload => (<tr key={workload.categoria} className="border-b border-gray-100 dark:border-slate-700/50"><td className="p-4 font-medium">{workload.categoria}</td><td className="p-4 text-purple-600 dark:text-purple-400 font-bold">{workload.potencia}</td><td className={`p-4 font-bold ${workload.enpi > 0.8 ? 'text-green-600' : 'text-yellow-600'}`}>{workload.enpi.toFixed(2)}</td></tr>))}</tbody>
                  </table>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Consumo de Potência por Carga de IA</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={aiWorkloadBreakdown} layout="vertical" margin={{ left: 100 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis type="number" tick={{ fill: 'rgb(156 163 175)' }} />
                      <YAxis type="category" dataKey="categoria" width={100} tick={{ fill: 'rgb(156 163 175)', fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} />
                      <Bar dataKey="potencia" name="Potência (kW)" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'iso-50001' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Conformidade ISO 50001</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-200 dark:border-slate-700"><tr className="text-xs text-gray-500 dark:text-gray-400 uppercase"><th className="p-4">Requisito</th><th className="p-4">Status</th><th className="p-4">Progresso</th></tr></thead>
                  <tbody>{isoRequirements.map(req => (<tr key={req.id} className="border-b border-gray-100 dark:border-slate-700/50"><td className="p-4 font-medium">{req.requisito}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${req.status === 'Conforme' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>{req.status}</span></td><td className="p-4"><div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${req.progress}%` }}></div></div></td></tr>))}</tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'enpi' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Tendência EnPI & Economia</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={enpiTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="mes" tick={{ fill: 'rgb(156 163 175)' }} />
                  <YAxis yAxisId="left" label={{ value: 'EnPI', angle: -90, position: 'insideLeft', fill: '#82ca9d' }} tick={{ fill: '#82ca9d' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Economia (kW)', angle: 90, position: 'insideRight', fill: '#8884d8' }} tick={{ fill: '#8884d8' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="enpi" name="EnPI Atual" stroke="#82ca9d" strokeWidth={2} />
                  <Line yAxisId="left" type="monotone" dataKey="meta" name="Meta EnPI" stroke="#ffc658" strokeDasharray="5 5" />
                  <Line yAxisId="right" type="monotone" dataKey="economia" name="Economia Acumulada" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Comparativo de Performance: Terrestre vs. Subaquático</h2>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceRadar}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                  <PolarAngleAxis dataKey="metrica" tick={{ fill: 'rgb(156 163 175)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgb(156 163 175)' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none' }} />
                  <Legend />
                  <Radar name="Terrestre" dataKey="terrestre" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Radar name="Subaquático" dataKey="subaquatico" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DataCenterEnergyAI;
