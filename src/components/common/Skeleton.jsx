import React from 'react';

export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse flex flex-col h-[420px]">
    <div className="bg-slate-200 aspect-[16/10] w-full" />
    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div className="space-y-2">
        <div className="h-5 bg-slate-200 rounded-md w-3/4" />
        <div className="h-3 bg-slate-200 rounded-md w-1/2" />
        <div className="h-3 bg-slate-200 rounded-md w-full" />
      </div>
      <div className="h-10 bg-slate-100 rounded-xl" />
      <div className="flex gap-2">
        <div className="h-9 bg-slate-200 rounded-xl flex-1" />
        <div className="h-9 bg-slate-200 rounded-xl w-10" />
      </div>
    </div>
  </div>
);

export const AdminTableSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="h-16 bg-slate-100 rounded-xl w-full border border-slate-200" />
    ))}
  </div>
);

export const PropertyDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse space-y-8">
    <div className="h-8 bg-slate-200 rounded-md w-1/3" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="aspect-[16/9] bg-slate-200 rounded-2xl w-full" />
        <div className="h-24 bg-slate-100 rounded-xl" />
      </div>
      <div className="h-96 bg-slate-100 rounded-2xl" />
    </div>
  </div>
);
