import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from './Textarea';
import { Label } from '@/components/ui/label';

interface Step8FinalDeclarationProps {
  form: UseFormReturn<any>;
}

export default function Step8FinalDeclaration({ form }: Step8FinalDeclarationProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Final Declarations & Submission</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <Label>Additional Info for Listing</Label>
          <Textarea {...register('additionalInfo')} placeholder="Any extra info for your listing" />
        </div>
        <div className="md:col-span-2">
          <Label>Company Profile, Photos, etc.</Label>
          <Input {...register('companyProfile')} placeholder="Upload or email to partner@theweddingandevent.com" />
        </div>
        <div className="md:col-span-2">
          <Label>Customer Intro/Summary</Label>
          <Textarea {...register('customerIntro')} placeholder="Overview of your Beauty Parlour" />
        </div>
        <div>
          <Label>Dashboard/Onboarding Charges</Label>
          <Input {...register('onboardingCharges')} placeholder="Rs 10,000/-" />
        </div>
        <div>
          <Label>Support Contact</Label>
          <Input {...register('supportContact')} placeholder="WhatsApp/Email" />
        </div>
        <div className="md:col-span-2">
          <Label>Undertaking/Declaration</Label>
          <Textarea {...register('undertaking')} placeholder="Declaration, signature, CNIC, company, mobile, email, date" />
        </div>
      </div>
    </div>
  );
}
