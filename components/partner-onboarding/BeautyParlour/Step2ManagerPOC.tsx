import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step2ManagerPOCProps {
  form: UseFormReturn<any>;
}

export default function Step2ManagerPOC({ form }: Step2ManagerPOCProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Manager / POC Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Name *</Label>
          <Input {...register('managerName', { required: true })} placeholder="Manager Name" />
          {errors.managerName && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Contact Number Mobile 1 *</Label>
          <Input {...register('managerMobile1', { required: true })} placeholder="0300-XXXXXXX" />
          {errors.managerMobile1 && <p className="text-rose-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Contact Number Mobile 2</Label>
          <Input {...register('managerMobile2')} placeholder="0300-XXXXXXX (Optional)" />
        </div>
        <div>
          <Label>PTCL Landline</Label>
          <Input {...register('managerLandline')} placeholder="Landline Number" />
        </div>
        <div>
          <Label>Email Address *</Label>
          <Input {...register('managerEmail', { required: true })} placeholder="Email" type="email" />
          {errors.managerEmail && <p className="text-rose-500 text-sm">Required</p>}
        </div>
      </div>
    </div>
  );
}
