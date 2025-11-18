import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step6PortfolioMarketingProps {
  form: UseFormReturn<any>;
}

export default function Step6PortfolioMarketing({ form }: Step6PortfolioMarketingProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Portfolio & Marketing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Portfolio (Before/After Photos)</Label>
          <Input {...register('portfolio')} placeholder="Upload or link to portfolio" />
        </div>
        <div>
          <Label>Share Photos/Videos for Online Profile?</Label>
          <Input {...register('shareMedia')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Featured Listings/Social Media Promotions?</Label>
          <Input {...register('featuredListings')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Digital Marketing Agency Assistance?</Label>
          <Input {...register('digitalMarketingHelp')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Wheelchair Accessible?</Label>
          <Input {...register('wheelchairAccessible')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Wheelchair Available?</Label>
          <Input {...register('wheelchairAvailable')} placeholder="Yes/No" />
        </div>
      </div>
    </div>
  );
}
