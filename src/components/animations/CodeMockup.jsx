import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, Cpu, Database, Server } from 'lucide-react';

export const CodeMockup = () => {
  const [activeTab, setActiveTab] = useState('react');
  const [copied, setCopied] = useState(false);

  const snippets = {
    react: `// NovaStack Client-Side Architecture
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const ProductStream = ({ categoryId }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => api.get(\`/api/products?cat=\${categoryId}\`),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="grid grid-cols-3 gap-6">
      {products?.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </div>
  );
};`,
    node: `// Express & Node.js Scalable Microservice
import express from 'express';
import { calculatePricing } from '../services/estimator.js';

const router = express.Router();

router.post('/calculate', async (req, res) => {
  const { projectType, features, complexity } = req.body;
  const estimate = await calculatePricing({ projectType, features, complexity });
  return res.status(200).json({ success: true, estimate });
});

export default router;`,
    mongo: `// MongoDB High-Performance Aggregation
import mongoose from 'mongoose';

export const getOrderAnalytics = async (merchantId) => {
  return await Order.aggregate([
    { $match: { merchantId: new mongoose.Types.ObjectId(merchantId) } },
    { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalRevenue: { $sum: "$totalAmount" },
        orderCount: { $sum: 1 },
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 30 }
  ]);
};`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden font-mono text-xs text-slate-800">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[11px] text-slate-500 font-sans font-medium">
            novastack-architecture.ts
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg">
          <button
            onClick={() => setActiveTab('react')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold transition-all ${
              activeTab === 'react'
                ? 'bg-white text-indigo-600 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3 h-3 text-cyan-600" />
            <span>React.js</span>
          </button>

          <button
            onClick={() => setActiveTab('node')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold transition-all ${
              activeTab === 'node'
                ? 'bg-white text-indigo-600 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-3 h-3 text-emerald-600" />
            <span>Node / Express</span>
          </button>

          <button
            onClick={() => setActiveTab('mongo')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold transition-all ${
              activeTab === 'mongo'
                ? 'bg-white text-indigo-600 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3 h-3 text-green-600" />
            <span>MongoDB</span>
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-indigo-600 font-sans transition-colors"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-5 overflow-x-auto text-slate-700 bg-[#FDFDFE] leading-relaxed">
        <pre className="font-mono text-xs">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>

      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] font-sans text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Clean Architecture
          </span>
          <span>TypeScript strict: true</span>
        </div>
        <div>MERN Production Ready</div>
      </div>
    </div>
  );
};

export default CodeMockup;
