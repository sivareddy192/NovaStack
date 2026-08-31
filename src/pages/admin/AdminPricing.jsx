import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { getEstimatorConfig, updatePricingConfig } from '../../services/api';
import SEO from '../../components/common/SEO';

export const AdminPricing = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        const data = await getEstimatorConfig();
        setConfig(data);
      } catch (err) {
        console.error('Failed to load pricing config', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleBasePriceChange = (index, value) => {
    const updated = { ...config };
    updated.projectTypes[index].basePrice = Number(value) || 0;
    setConfig(updated);
  };

  const handleComplexityChange = (key, value) => {
    const updated = { ...config };
    updated.complexityMultipliers[key] = Number(value) || 1.0;
    setConfig(updated);
  };

  const handleFeaturePriceChange = (index, value) => {
    const updated = { ...config };
    updated.featuresPricing[index].price = Number(value) || 0;
    setConfig(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      await updatePricingConfig(config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error updating pricing configuration');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="py-20 text-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
        <p className="mt-3 text-xs">Loading pricing engine matrix...</p>
      </div>
    );
  }

  return (
    <>
      <SEO title="Pricing Engine Configuration — Admin" />

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pricing Engine Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure base fees, feature prices, and multipliers for the public Cost Estimator.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold disabled:opacity-50 transition-all cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pricing matrix successfully updated! Active on live Cost Estimator.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Project Type Base Prices */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              1. Project Type Base Pricing ({config.currencySymbol || '₹'})
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              The foundational starting price before multipliers and individual add-on features.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.projectTypes?.map((pt, idx) => (
                <div
                  key={pt.id || idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <label className="text-xs font-semibold text-slate-800 block">
                    {pt.name}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                      {config.currencySymbol || '₹'}
                    </span>
                    <input
                      type="number"
                      value={pt.basePrice}
                      onChange={(e) => handleBasePriceChange(idx, e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Complexity Multipliers */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              2. Complexity Multipliers
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Multiplier applied to the total project subtotal based on technical depth.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(config.complexityMultipliers || {}).map(([key, val]) => (
                <div
                  key={key}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <label className="text-xs font-semibold text-slate-800 block">
                    {key} Tier
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={val}
                    onChange={(e) => handleComplexityChange(key, e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Feature Pricing */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              3. Feature & Module Add-on Pricing ({config.currencySymbol || '₹'})
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Cost added per individual module selected during Step 3 of the estimator.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.featuresPricing?.map((feat, idx) => (
                <div
                  key={feat.id || idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <label className="text-xs font-semibold text-slate-800 block truncate">
                    {feat.name}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                      {config.currencySymbol || '₹'}
                    </span>
                    <input
                      type="number"
                      value={feat.price}
                      onChange={(e) => handleFeaturePriceChange(idx, e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminPricing;
