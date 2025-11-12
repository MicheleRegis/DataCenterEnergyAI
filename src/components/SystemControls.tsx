import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, SlidersHorizontal, CalendarClock, Power, ShieldCheck, FileText, HeartPulse, GitBranch, TerminalSquare, MapPin, Zap } from 'lucide-react';

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 ${className}`}
    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{children}</h2>
);

const StatusItem = ({ icon: Icon, name, status }: { icon: React.ElementType, name: string, status: 'Operational' | 'Degraded' | 'Offline' }) => {
    const statusConfig = {
        Operational: { color: 'text-green-500', icon: CheckCircle },
        Degraded: { color: 'text-yellow-500', icon: Clock },
        Offline: { color: 'text-red-500', icon: XCircle },
    };
    const { color, icon: StatusIcon } = statusConfig[status];
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
                <Icon className="text-gray-500 dark:text-gray-400" size={20} />
                <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
            </div>
            <div className={`flex items-center gap-2 ${color}`}>
                <StatusIcon size={16} />
                <span className="font-semibold text-sm">{status}</span>
            </div>
        </div>
    );
};

const ControlToggle = ({ icon: Icon, name, description, enabled, onToggle }: { icon: React.ElementType, name: string, description: string, enabled: boolean, onToggle: () => void }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
        <div className="flex items-center gap-4">
            <Icon className="text-blue-500" size={24} />
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
        <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const DataCenterMarker = ({ name, location, status, pue, isActive, position, capacity, energySource, keyFeature }: { name: string, location: string, status: string, pue: number, isActive: boolean, position: { top: string, left: string }, capacity: string, energySource: string, keyFeature: string }) => (
    <div className="absolute group" style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}>
        <MapPin className={`cursor-pointer transition-transform duration-300 group-hover:scale-125 drop-shadow-lg ${isActive ? 'text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} size={28} />
        {isActive && <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-25 animate-ping"></div>}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <p className="font-bold text-gray-800 dark:text-gray-200">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
            <hr className="my-2 border-gray-200 dark:border-slate-700" />
            <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <div className="flex justify-between"><span>Status:</span> <span className="font-semibold text-green-500">{status}</span></div>
                <div className="flex justify-between"><span>PUE:</span> <span className="font-semibold text-blue-500">{pue.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Capacity:</span> <span className="font-semibold">{capacity}</span></div>
                <div className="flex justify-between"><span>Energy:</span> <span className="font-semibold">{energySource}</span></div>
                <div className="flex justify-between"><span>Feature:</span> <span className="font-semibold">{keyFeature}</span></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-4 h-4 bg-white dark:bg-slate-900 border-b border-r border-gray-200 dark:border-slate-700 transform rotate-45"></div>
        </div>
    </div>
);

const PipelineStage = ({ name, status, version, timestamp, subtitle }: { name: string, status: 'Completed' | 'In Progress' | 'Pending' | 'Failed', version: string, timestamp: string, subtitle?: string }) => {
    const statusConfig = {
        Completed: { color: 'bg-green-500', icon: CheckCircle },
        'In Progress': { color: 'bg-blue-500 animate-pulse', icon: Clock },
        Pending: { color: 'bg-gray-400 dark:bg-slate-600', icon: Clock },
        Failed: { color: 'bg-red-500', icon: XCircle },
    };
    const { color, icon: StatusIcon } = statusConfig[status];
    return (
        <div className="flex flex-col items-center text-center w-28">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}>
                <StatusIcon size={24} />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{version}</p>
            {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{timestamp}</p>
        </div>
    );
};

const PipelineConnector = ({ isComplete }: { isComplete: boolean }) => (
    <div className={`flex-1 h-1 rounded-full mx-2 sm:mx-4 ${isComplete ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-600'}`}></div>
);


const SystemControls = ({ dcType }: { dcType: 'terrestrial' | 'underwater' }) => {
    const [controls, setControls] = useState({
        dynamicCooling: true,
        workloadScheduling: false,
        powerCapping: true,
    });

    const toggleControl = (control: keyof typeof controls) => {
        setControls(prev => ({ ...prev, [control]: !prev[control] }));
    };

    const pipelineData = {
        build: { status: 'Completed', version: 'v1.2.6', timestamp: '2h ago' },
        test: { status: 'Completed', version: 'v1.2.6', timestamp: '1h ago' },
        canary: { status: 'In Progress', version: 'v1.2.6', timestamp: '5m ago', subtitle: '25% traffic' },
        production: { status: 'Pending', version: 'v1.2.6', timestamp: '...', subtitle: 'Current: v1.2.5' },
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    };

    return (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <SectionTitle>Operational Status</SectionTitle>
                    <div className="space-y-3">
                        <StatusItem icon={TerminalSquare} name="Telemetry Ingestion" status="Operational" />
                        <StatusItem icon={SlidersHorizontal} name="Control Plane" status="Operational" />
                        <StatusItem icon={GitBranch} name="ML Inference Pipeline" status="Degraded" />
                        <StatusItem icon={HeartPulse} name="Hardware Health" status="Operational" />
                    </div>
                </Card>
                <Card>
                    <SectionTitle>Automated Controls</SectionTitle>
                    <div className="space-y-2">
                        <ControlToggle icon={Zap} name="Dynamic Cooling" description="Adjusts cooling based on real-time load" enabled={controls.dynamicCooling} onToggle={() => toggleControl('dynamicCooling')} />
                        <ControlToggle icon={CalendarClock} name="Workload Scheduling" description="Shifts non-critical jobs to off-peak hours" enabled={controls.workloadScheduling} onToggle={() => toggleControl('workloadScheduling')} />
                        <ControlToggle icon={Power} name="Progressive Power Capping" description="Throttles non-critical workloads under load" enabled={controls.powerCapping} onToggle={() => toggleControl('powerCapping')} />
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <Card>
                    <SectionTitle>Security & Governance</SectionTitle>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Access Role</span>
                            <span className="font-bold text-blue-500 flex items-center gap-2"><ShieldCheck size={16} /> Admin</span>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                            <FileText size={16} /> View Audit Logs
                        </button>
                    </div>
                </Card>
                 <Card>
                    <SectionTitle>Resilience & Maintenance</SectionTitle>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">System Status</span>
                            <span className="font-bold text-green-500 flex items-center gap-2"><CheckCircle size={16} /> Nominal</span>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                           <FileText size={16} /> View DR Plan
                        </button>
                    </div>
                </Card>
                 <Card className="flex flex-col lg:col-span-1">
                    <SectionTitle>Geographic View</SectionTitle>
                    <div className="relative flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 rounded-lg min-h-[200px] p-4 perspective-800">
                        <div className="absolute w-48 h-48 sm:w-56 sm:h-56" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(20deg) rotateX(10deg)' }}>
                            <div className="absolute inset-0 border-2 border-blue-500/20 dark:border-blue-400/20 rounded-full"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-cyan-800/50 dark:from-blue-900/80 dark:to-cyan-800/80 rounded-full shadow-2xl shadow-blue-900/50"></div>
                            <div 
                                className="absolute inset-0 rounded-full bg-repeat" 
                                style={{ 
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'20\' viewBox=\'0 0 40 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%230ea5e9\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h20v1H0zM20 10h20v1H20z\'/%3E%3C/g%3E%3C/svg%3E")',
                                }}
                            ></div>
                            <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                                <DataCenterMarker 
                                    name="GreenCore" 
                                    location="Amsterdam, NL" 
                                    status="Operational" 
                                    pue={1.18} 
                                    isActive={dcType === 'terrestrial'} 
                                    position={{ top: '35%', left: '60%' }}
                                    capacity="10 MW"
                                    energySource="70% Renewable Mix"
                                    keyFeature="Heat Reuse"
                                />
                                <DataCenterMarker 
                                    name="Poseidon Blue" 
                                    location="Portugal Coast" 
                                    status="Operational" 
                                    pue={1.07} 
                                    isActive={dcType === 'underwater'} 
                                    position={{ top: '45%', left: '40%' }}
                                    capacity="~1 MW (Modular)"
                                    energySource="100% Renewable"
                                    keyFeature="Direct Sea Cooling"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <Card>
                <SectionTitle>CI/CD Pipeline - Deploying: {pipelineData.build.version}</SectionTitle>
                <div className="flex justify-between items-start pt-4">
                    <PipelineStage {...pipelineData.build} name="Build" />
                    <PipelineConnector isComplete={pipelineData.build.status === 'Completed'} />
                    <PipelineStage {...pipelineData.test} name="Test" />
                    <PipelineConnector isComplete={pipelineData.test.status === 'Completed'} />
                    <PipelineStage {...pipelineData.canary} name="Canary" />
                    <PipelineConnector isComplete={pipelineData.canary.status === 'Completed'} />
                    <PipelineStage {...pipelineData.production} name="Production" />
                </div>
            </Card>
        </motion.div>
    );
};

export default SystemControls;
