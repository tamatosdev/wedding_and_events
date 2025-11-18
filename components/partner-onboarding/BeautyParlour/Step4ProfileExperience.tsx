import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step4ProfileExperienceProps {
  form: UseFormReturn<any>;
}

export default function Step4ProfileExperience({ form }: Step4ProfileExperienceProps) {
  const { register, formState: { errors } } = form;
     return (
       <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
         <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Profile & Experience</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>How long have you been operating?</Label>
          <Input {...register('operatingSince')} placeholder="e.g. 5 years, Since 2018" />
        </div>
        <div>
          <Label>Number of Branches</Label>
          <Input {...register('branches')} placeholder="e.g. 1, 2, 3+" />
        </div>
        <div>
          <Label>Branch Locations</Label>
          <Input {...register('branchLocations')} placeholder="List of locations" />
        </div>
        <div>
          <Label>Owner/Lead Makeup Artist/Stylist</Label>
          <Input {...register('leadArtist')} placeholder="Name" />
        </div>
        <div>
          <Label>Operating Hours & Weekly Off Days</Label>
          <Input {...register('operatingHours')} placeholder="e.g. 10am-8pm, Sunday Off" />
        </div>
      </div>
    </div>
  );
}
