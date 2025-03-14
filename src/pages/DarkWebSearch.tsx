
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useLocation } from 'react-router-dom';
import { ArrowLeftCircle, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import { supabase } from "@/integrations/supabase/client";
import TransitionEffect from '@/components/TransitionEffect';
import DarkWebSearchForm from '@/components/DarkWebSearchForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const DarkWebSearch = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useState(80); // Default width when collapsed
  const [riskScore, setRiskScore] = useState(42);
  const [breaches, setBreaches] = useState<any[]>([]);
  const [defenseStepsCompleted, setDefenseStepsCompleted] = useState({
    password: false,
    mfa: false,
    backupCodes: false,
    recoveryEmail: false
  });

  // Sample threat data for the graph
  const threatData = [
    { name: '30 Dec', activeCount: 920, activeRisk: 68 },
    { name: '31 Dec', activeCount: 932, activeRisk: 72 },
    { name: '1 Jan', activeCount: 941, activeRisk: 76 },
    { name: '2 Jan', activeCount: 960, activeRisk: 84 },
  ];

  // Sample breach statistics
  const breachStats = {
    darkWebRecords: 0,
    passwordBreaches: 6,
    contactBreaches: 803,
    cardBreaches: 61
  };

  // Sample breach data
  const sampleBreaches = [
    {
      id: 1,
      title: "Data breach from Personal-MailPassword-Leak-September-2023",
      severity: "high",
      details: "example@gmail.com/password1234",
      exposedData: ["ADDRESS", "PASSWORD", "EMAIL"],
      date: "2023-09-15"
    },
    {
      id: 2,
      title: "LinkedIn Data Breach",
      severity: "medium",
      details: "Professional profile and contact information exposed",
      exposedData: ["EMAIL", "PHONE", "JOB TITLE"],
      date: "2023-05-22"
    },
    {
      id: 3,
      title: "E-commerce Platform Hack",
      severity: "high",
      details: "Payment information and address leaked",
      exposedData: ["CARD", "ADDRESS", "PURCHASE HISTORY"],
      date: "2023-11-03"
    }
  ];

  // Update sidebar width based on sidebar state
  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarWidth(sidebar.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Fetch user data
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        
        // Extract user profile data
        const profile = {
          email: data.user.email || '',
          fullName: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
          firstName: data.user.user_metadata?.first_name || '',
          lastName: data.user.user_metadata?.last_name || '',
          phone: data.user.phone || data.user.user_metadata?.phone || '',
          address: data.user.user_metadata?.address || ''
        };
        
        setUserProfile(profile);
      }
    };

    checkUser();
    setBreaches(sampleBreaches); // Set sample breaches data
  }, []);

  const handleDefenseStepChange = (step: keyof typeof defenseStepsCompleted) => {
    setDefenseStepsCompleted(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const allDefenseStepsCompleted = Object.values(defenseStepsCompleted).every(step => step);

  return (
    <div className="flex h-screen bg-[#17182a] text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-auto relative transition-all" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeftCircle size={20} />
            </Link>
            <h1 className="text-xl font-heading">Darkweb Monitoring</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user && <UserProfile user={user} />}
          </div>
        </div>
        
        <div className="container mx-auto px-2 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-full pb-20">
          {/* Left Panel - User Details and Search Form (30%) */}
          <div className="lg:col-span-4 space-y-6">
            <TransitionEffect animation="fade-in">
              <Card className="bg-gray-800/70 border-gray-700/50">
                <CardHeader className="bg-purple-800 rounded-t-lg">
                  <CardTitle className="text-white">User Details</CardTitle>
                  <CardDescription className="text-gray-200">
                    We'll check if your information has been exposed
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {userProfile ? (
                    <div className="space-y-4">
                      {userProfile.email && (
                        <div>
                          <span className="text-purple-300 text-sm">Email:</span>
                          <p className="font-medium">{userProfile.email}</p>
                        </div>
                      )}
                      {(userProfile.firstName || userProfile.lastName || userProfile.fullName) && (
                        <div>
                          <span className="text-purple-300 text-sm">Name:</span>
                          <p className="font-medium">
                            {userProfile.fullName || `${userProfile.firstName} ${userProfile.lastName}`.trim()}
                          </p>
                        </div>
                      )}
                      {userProfile.phone && (
                        <div>
                          <span className="text-purple-300 text-sm">Phone:</span>
                          <p className="font-medium">{userProfile.phone}</p>
                        </div>
                      )}
                      {userProfile.address && (
                        <div>
                          <span className="text-purple-300 text-sm">Address:</span>
                          <p className="font-medium">{userProfile.address}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-400">Log in to see your profile information</p>
                      <Button variant="outline" className="mt-2" asChild>
                        <Link to="/login">Log In</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TransitionEffect>
            
            <TransitionEffect animation="fade-up" delay={100}>
              <DarkWebSearchForm userProfile={userProfile} />
            </TransitionEffect>
          </div>
          
          {/* Center Panel - Risk Score and Breach Summary (40%) */}
          <div className="lg:col-span-5 space-y-6">
            <TransitionEffect animation="fade-in" delay={150}>
              <Card className="bg-gray-800/70 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    Cyber Threat Risk Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{riskScore}/100</div>
                        <div className="text-sm text-gray-400">Moderate Risk</div>
                      </div>
                    </div>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="transparent" 
                        stroke="#2c2c44" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="transparent" 
                        stroke="url(#gradient)" 
                        strokeWidth="8" 
                        strokeDasharray={`${2 * Math.PI * 45 * riskScore / 100} ${2 * Math.PI * 45 * (100 - riskScore) / 100}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FF4D4D" />
                          <stop offset="100%" stopColor="#4DCAFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Dark web records</div>
                      <div className="text-xl font-medium">{breachStats.darkWebRecords}</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Password Breach</div>
                      <div className="text-xl font-medium text-red-400">{breachStats.passwordBreaches}</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Contact Breach</div>
                      <div className="text-xl font-medium text-amber-400">{breachStats.contactBreaches}</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Card Breach</div>
                      <div className="text-xl font-medium text-red-400">{breachStats.cardBreaches}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TransitionEffect>
            
            <TransitionEffect animation="fade-up" delay={200}>
              <Card className="bg-gray-800/70 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    Breach Summary
                  </CardTitle>
                  <CardDescription>
                    {breaches.length} breaches detected
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {breaches.map((breach) => (
                      <Card key={breach.id} className="bg-gray-700/50 border-gray-600/50">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{breach.title}</CardTitle>
                            <Badge className={
                              breach.severity === 'high' ? "bg-red-700 text-white" : 
                              breach.severity === 'medium' ? "bg-amber-700 text-white" : 
                              "bg-blue-700 text-white"
                            }>
                              {breach.severity === 'high' ? "High Risk!" : 
                               breach.severity === 'medium' ? "Medium Risk" : 
                               "Low Risk"}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">
                            Breach date: {breach.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm mb-2">{breach.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {breach.exposedData.map((data: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-800">
                                {data}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                            Defend
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TransitionEffect>
          </div>
          
          {/* Right Panel - Live Threats and Actionable Steps (30%) */}
          <div className="lg:col-span-3 space-y-6">
            <TransitionEffect animation="fade-in" delay={250}>
              <Card className="bg-gray-800/70 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    <CardTitle>Live Threats</CardTitle>
                  </div>
                  <CardDescription>
                    {threatData[threatData.length - 1].activeCount} Threats Found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={threatData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="activeCountGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4DCAFF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4DCAFF" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="activeRiskGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#999" fontSize={10} />
                        <YAxis stroke="#999" fontSize={10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#333', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="activeCount" 
                          name="Active Count"
                          stroke="#4DCAFF" 
                          fillOpacity={1} 
                          fill="url(#activeCountGradient)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="activeRisk" 
                          name="Active Risk"
                          stroke="#FF4D4D" 
                          fillOpacity={1} 
                          fill="url(#activeRiskGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TransitionEffect>
            
            <TransitionEffect animation="fade-up" delay={300}>
              <Card className="bg-gray-800/70 border-gray-700/50">
                <CardHeader>
                  <CardTitle>Defend Your Risk</CardTitle>
                  <CardDescription>
                    Complete these steps to secure your information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="password" 
                        checked={defenseStepsCompleted.password}
                        onCheckedChange={() => handleDefenseStepChange('password')}
                        className="mt-1 data-[state=checked]:bg-purple-600"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Change Password
                        </label>
                        <p className="text-xs text-muted-foreground">
                          To change password, go to the platform and under accounts, change your password.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="mfa" 
                        checked={defenseStepsCompleted.mfa}
                        onCheckedChange={() => handleDefenseStepChange('mfa')}
                        className="mt-1 data-[state=checked]:bg-purple-600"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="mfa"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable Multi Factor Authentication (MFA)
                        </label>
                        <p className="text-xs text-muted-foreground">
                          To enable MFA, go to the platform and under accounts, enable MFA.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="backupCodes" 
                        checked={defenseStepsCompleted.backupCodes}
                        onCheckedChange={() => handleDefenseStepChange('backupCodes')}
                        className="mt-1 data-[state=checked]:bg-purple-600"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="backupCodes"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Secure MFA Backup Codes
                        </label>
                        <p className="text-xs text-muted-foreground">
                          On the platform, go to secure MFA backup codes and copy the codes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="recoveryEmail" 
                        checked={defenseStepsCompleted.recoveryEmail}
                        onCheckedChange={() => handleDefenseStepChange('recoveryEmail')}
                        className="mt-1 data-[state=checked]:bg-purple-600"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="recoveryEmail"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Set Recovery Email
                        </label>
                        <p className="text-xs text-muted-foreground">
                          To set recovery email, go to the platform and under accounts, set recovery email.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    disabled={!allDefenseStepsCompleted}
                  >
                    {allDefenseStepsCompleted ? "Defended" : "Complete All Steps"}
                  </Button>
                </CardFooter>
              </Card>
            </TransitionEffect>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DarkWebSearch;
