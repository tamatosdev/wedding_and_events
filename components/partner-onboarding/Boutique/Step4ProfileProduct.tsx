import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step4ProfileProductProps {
  form: UseFormReturn<any>;
}

export default function Step4ProfileProduct({ form }: Step4ProfileProductProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Profile & Product</h2>
      <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
        <div>
          <Label>How long in business?</Label>
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
          <Label>Types of Dresses/Outfits</Label>
          <Input {...register('dressTypes')} placeholder="Desi, Bridal, Party, etc." />
        </div>
        <div>
          <Label>Design/Manufacture Own or Resell?</Label>
          <Input {...register('designOrResell')} placeholder="Own/Resell/Both" />
        </div>
        <div>
          <Label>Sell/Rent on Other Platforms?</Label>
          <Input {...register('otherPlatforms')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Materials/Fabrics Used</Label>
          <Input {...register('materialsUsed')} placeholder="Cotton, Silk, etc." />
        </div>
        <div>
          <Label>Customization/Made-to-Measure?</Label>
          <Input {...register('customization')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>New Collection Frequency</Label>
          <Input {...register('collectionFrequency')} placeholder="e.g. Monthly, Seasonally" />
        </div>
        <div>
          <Label>Quality/Authenticity Assurance</Label>
          <Input {...register('qualityAssurance')} placeholder="Describe your process" />
        </div>
      </div>
    </div>
  );
}
