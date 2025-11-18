import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step1OwnerBusinessProps {
  form: UseFormReturn<any>;
}

export default function Step1OwnerBusiness({ form }: Step1OwnerBusinessProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Owner & Business Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Name *</Label>
          <Input {...register('ownerName', { required: true })} placeholder="Owner Name" />
          {errors.ownerName && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Contact Number Mobile 1 *</Label>
          <Input {...register('ownerMobile1', { required: true })} placeholder="0300-XXXXXXX" />
          {errors.ownerMobile1 && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Contact Number Mobile 2</Label>
          <Input {...register('ownerMobile2')} placeholder="0300-XXXXXXX (Optional)" />
        </div>
        <div>
          <Label>PTCL Landline</Label>
          <Input {...register('ownerLandline')} placeholder="Landline Number" />
        </div>
        <div>
          <Label>Email Address *</Label>
          <Input {...register('ownerEmail', { required: true })} placeholder="Email" type="email" />
          {errors.ownerEmail && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Business Name *</Label>
          <Input {...register('businessName', { required: true })} placeholder="Business Name" />
          {errors.businessName && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>City *</Label>
          <Input {...register('city', { required: true })} placeholder="City" />
          {errors.city && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Area *</Label>
          <Input {...register('area', { required: true })} placeholder="Area" />
          {errors.area && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Mobile/Landline *</Label>
          <Input {...register('businessContact', { required: true })} placeholder="Mobile or Landline" />
          {errors.businessContact && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div className="md:col-span-2">
          <Label>Complete Address *</Label>
          <Input {...register('businessAddress', { required: true })} placeholder="Complete Address" />
          {errors.businessAddress && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Website</Label>
          <Input {...register('website')} placeholder="Website (Optional)" />
        </div>
        <div>
          <Label>Business Email</Label>
          <Input {...register('businessEmail')} placeholder="Business Email (Optional)" />
        </div>
      </div>
    </div>
  );
}
