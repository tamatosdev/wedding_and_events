import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step3BankPaymentProps {
  form: UseFormReturn<any>;
}

export default function Step3BankPayment({ form }: Step3BankPaymentProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Bank & Payment Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Bank Name</Label>
          <Input {...register('bankName')} placeholder="Meezan/Other Islamic Bank" />
        </div>
        <div>
          <Label>Branch & City</Label>
          <Input {...register('bankBranchCity')} placeholder="Branch & City" />
        </div>
        <div>
          <Label>Account Number</Label>
          <Input {...register('accountNumber')} placeholder="Account Number" />
        </div>
        <div>
          <Label>IBAN Number</Label>
          <Input {...register('ibanNumber')} placeholder="IBAN Number" />
        </div>
      </div>
    </div>
  );
}
