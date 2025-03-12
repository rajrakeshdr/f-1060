
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in"
        });
        
        navigate('/');
      } else {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account"
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#2D2F3A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-gray-400 text-center mb-6">
          {isLogin ? 'Sign in to continue to your account' : 'Sign up to get started with Phind'}
        </p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/30 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-900/30 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                placeholder="••••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </button>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B46C1] hover:bg-[#5B3AAE] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="ml-2 text-purple-400 hover:text-purple-300"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
