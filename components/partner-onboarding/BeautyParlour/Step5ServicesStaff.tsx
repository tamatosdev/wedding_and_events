import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from './Textarea';
import { Label } from '@/components/ui/label';

interface Step5ServicesStaffProps {
  form: UseFormReturn<any>;
}

export default function Step5ServicesStaff({ form }: Step5ServicesStaffProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Services & Staff</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <Label>Main Services & Rates</Label>
          <Textarea {...register('mainServices')} placeholder="List your main services and rates (e.g. bridal makeup, party makeup, hair styling, etc.)" />
        </div>
        <div>
          <Label>Bridal Packages/Custom Bundles</Label>
          <Input {...register('bridalPackages')} placeholder="Describe packages or bundles" />
        </div>
        <div>
          <Label>Home/Salon/Destination Services</Label>
          <Input {...register('serviceTypes')} placeholder="e.g. Home, In-Salon, Destination" />
        </div>
        <div>
          <Label>Brands/Products Used</Label>
          <Input {...register('brandsUsed')} placeholder="e.g. MAC, Huda Beauty, etc." />
        </div>
        <div>
          <Label>Number of Professional Staff</Label>
          <Input {...register('staffCount')} placeholder="e.g. 5" />
        </div>
        <div>
          <Label>Payroll Outsourcing Needed?</Label>
          <Input {...register('payrollOutsource')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Staff Certifications/Training</Label>
          <Input {...register('staffCertifications')} placeholder="e.g. Certified by XYZ" />
        </div>
        <div>
          <Label>Who Handles Bridal Makeup?</Label>
          <Input {...register('bridalMakeupBy')} placeholder="Owner/Team Members" />
        </div>
        <div>
          <Label>Trials Before Bookings?</Label>
          <Input {...register('trialsBeforeBooking')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Hygiene/Product Safety</Label>
          <Input {...register('hygieneSafety')} placeholder="Describe your hygiene practices" />
        </div>
        <div>
          <Label>Can Customers Bring Own Products?</Label>
          <Input {...register('customerOwnProducts')} placeholder="Yes/No" />
        </div>
      </div>
    </div>
  );
}
