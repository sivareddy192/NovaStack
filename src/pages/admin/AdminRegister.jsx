import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/forms/Input';
import SEO from '../../components/common/SEO';

export const AdminRegister = () => {
  const { register: registerUser, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  React.useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin' || user?.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (data.password !== data.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await registerUser(data.name, data.email, data.password);
    if (result.success) {
      setSuccessMessage('Account created successfully! Redirecting to your dashboard...');
      setTimeout(() => {
        const role = result.user?.role;
        if (role === 'admin' || role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1200);
    } else {
      setErrorMessage(result.message || 'Failed to create account');
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Create Account — NovaStack" />
      <div className="min-h-[85vh] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mx-auto mb-5 group">
                <img
                  src="/logo.png"
                  alt="NovaStack Logo"
                  className="h-10 w-10 object-contain shrink-0"
                />
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-extrabold text-2xl text-slate-900 font-display tracking-tight">
                    Nova<span className="text-indigo-600">Stack</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Building the Future
                  </span>
                </div>
              </Link>
              <h2 className="text-2xl font-bold text-slate-900">Create NovaStack Account</h2>
              <p className="text-xs text-slate-500 mt-1">
                Register a new user account on NovaStack platform.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                icon={User}
                placeholder="e.g. Siva Reddy"
                error={errors.name?.message}
                {...register('name', { required: 'Full name is required' })}
              />

              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />

              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="Minimum 6 characters"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />

              <Input
                label="Confirm Password"
                type="password"
                icon={Lock}
                placeholder="Re-enter your password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === passwordValue || 'Passwords do not match',
                })}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            {/* Link to Login */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
