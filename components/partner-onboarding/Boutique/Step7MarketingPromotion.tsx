import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step7MarketingPromotionProps {
  form: UseFormReturn<any>;
}

export default function Step7MarketingPromotion({ form }: Step7MarketingPromotionProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Marketing & Promotion</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Platform Promotions/Social Media Campaigns</Label>
          <Input {...register('platformPromotions')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Discounts/Special Collections for Online Customers</Label>
          <Input {...register('discountsOnline')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Additional Info for Listing</Label>
          <Input {...register('additionalInfo')} placeholder="Any extra info" />
        </div>
        <div>
          <Label>Share Photos, Company Profile, etc.</Label>
          <Input {...register('companyProfile')} placeholder="Upload or email to partner@theweddingandevent.com" />
        </div>
      </div>
    </div>
  );
}
