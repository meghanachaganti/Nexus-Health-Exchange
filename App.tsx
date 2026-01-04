
import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HealthVault from './components/HealthVault';
import HealthAssistant from './components/HealthAssistant';
import Profile from './components/Profile';
import { 
  Activity, 
  Database, 
  MessageSquare, 
  User, 
  LogOut,
  Bell,
  ShieldCheck,
  ArrowRight,
  Hospital,
  FileText,
  Pill,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { MOCK_RECORDS } from './constants';

const SidebarLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/' && location.pathname === '');
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      <Icon size={20} />
      <span className="font-bold text-sm">{label}</span>
    </Link>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-100 p-12 text-center border border-white">
      <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200">
        <Activity className="text-white" size={40} />
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-2">Nexus Health</h1>
      <p className="text-slate-500 font-medium mb-10 leading-relaxed">The unified intelligence layer for your fragmented health records.</p>
      
      <div className="space-y-4">
        <button 
          onClick={onLogin}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-blue-100"
        >
          <span>Access Secure Vault</span>
          <ArrowRight size={20} />
        </button>
        <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm font-bold pt-4">
          <ShieldCheck size={16} />
          <span>HIPAA COMPLIANT ENCRYPTION</span>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <HashRouter>
      <AppContent onLogout={() => setIsLoggedIn(false)} />
    </HashRouter>
  );
}

function AppContent({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = searchQuery.length > 0 ? [
    ...Array.from(new Set(MOCK_RECORDS.map(r => r.source))).map(s => ({ type: 'Facility', name: s, icon: Hospital })),
    ...MOCK_RECORDS.map(r => ({ type: 'Record', name: r.title, icon: FileText })),
    { type: 'Medication', name: 'Metformin', icon: Pill },
    { type: 'Medication', name: 'Lisinopril', icon: Pill },
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6) : [];

  const notifications = [
    { id: 1, title: 'New Lab Result', desc: 'CMP from General Hospital North is available.', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { id: 2, title: 'Doctor Suggestion', desc: 'Dr. Miller left a note on your BP readings.', time: '5h ago', icon: MessageSquare, color: 'text-blue-500' },
    { id: 3, title: 'Medication Reminder', desc: 'Time for your Metformin dosage.', time: '1h ago', icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col hidden md:flex">
        <div className="p-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Activity className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nexus</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 overflow-y-auto mt-4">
          <SidebarLink to="/" icon={Activity} label="Dashboard" />
          <SidebarLink to="/vault" icon={Database} label="Health Vault" />
          <SidebarLink to="/assistant" icon={MessageSquare} label="AI Assistant" />
          <SidebarLink to="/profile" icon={User} label="My Profile" />
        </nav>
        
        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-4 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-2xl font-bold transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg group-hover:bg-rose-100 transition-colors">
              <LogOut size={20} />
            </div>
            <span className="text-sm">Disconnect Session</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between z-20">
          <div className="md:hidden flex items-center space-x-2">
             <Activity className="text-blue-600" size={28} />
             <span className="text-xl font-black tracking-tight">Nexus</span>
          </div>
          <div className="flex-1 px-4 max-w-xl hidden sm:block relative" ref={searchRef}>
            <div className="relative group">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search facilities, records or meds..." 
                className="w-full bg-slate-50 border-transparent rounded-2xl py-3 px-6 pl-12 focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-sm font-medium"
              />
              <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            </div>

            {showSuggestions && searchQuery.length > 0 && (
              <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(item.name);
                          setShowSuggestions(false);
                          if (item.type === 'Record') navigate('/vault');
                        }}
                        className="w-full flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                      >
                        <div className="p-2 bg-slate-100 text-slate-400 rounded-xl group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm font-bold text-slate-400">No matching records found.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 rounded-2xl relative transition-all ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <Bell size={22} />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="font-black text-slate-800">Notifications</h3>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">3 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 flex items-start space-x-3 cursor-pointer">
                        <div className={`p-2 rounded-xl bg-opacity-10 ${n.color.replace('text-', 'bg-')}`}>
                          <n.icon size={16} className={n.color} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-slate-50 text-center">
                    <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Clear All</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 border-l pl-6 border-slate-100">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-slate-900">Alexander Pierce</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Patient</p>
              </div>
              <Link to="/profile">
                <img 
                  src="https://picsum.photos/seed/alex/100/100" 
                  alt="Profile" 
                  className="w-11 h-11 rounded-2xl ring-4 ring-slate-50 hover:ring-blue-50 transition-all cursor-pointer object-cover shadow-sm"
                />
              </Link>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vault" element={<HealthVault />} />
            <Route path="/assistant" element={<HealthAssistant />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </section>

        <nav className="md:hidden h-20 bg-white border-t border-slate-100 flex justify-around items-center px-6">
          <Link to="/" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"><Activity size={24} /></Link>
          <Link to="/vault" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"><Database size={24} /></Link>
          <Link to="/assistant" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"><MessageSquare size={24} /></Link>
          <Link to="/profile" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"><User size={24} /></Link>
        </nav>
      </main>
    </div>
  );
}

export default App;
