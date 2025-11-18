import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step5ProductRentalLogisticsProps {
  form: UseFormReturn<any>;
}

export default function Step5ProductRentalLogistics({ form }: Step5ProductRentalLogisticsProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Product Rental & Logistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Average Price Range (Sale/Rent)</Label>
          <Input {...register('priceRange')} placeholder="e.g. 10,000-50,000" />
        </div>
        <div>
          <Label>High-Quality Photos for Online Listing</Label>
          <Input {...register('photosOnline')} placeholder="Yes/No or Upload" />
        </div>
        <div>
          <Label>Model/Mannequin Photos</Label>
          <Input {...register('modelPhotos')} placeholder="Yes/No or Upload" />
        </div>
        <div>
          <Label>Product Descriptions, Size, Price Lists</Label>
          <Input {...register('productDescriptions')} placeholder="Yes/No or Upload" />
        </div>
        <div>
          <Label>Rental Policy</Label>
          <Input {...register('rentalPolicy')} placeholder="Duration, Deposit, Fines" />
        </div>
        <div>
          <Label>Cleaning, Maintenance, Damages</Label>
          <Input {...register('cleaningMaintenance')} placeholder="Describe your process" />
        </div>
        <div>
          <Label>Fittings/Alterations Before Rental</Label>
          <Input {...register('fittingsAlterations')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Hygiene for Rentals</Label>
          <Input {...register('hygieneRentals')} placeholder="Describe your process" />
        </div>
        <div>
          <Label>Delivery/Pickup Services</Label>
          <Input {...register('deliveryPickup')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Order/Rental Fulfillment Time</Label>
          <Input {...register('fulfillmentTime')} placeholder="e.g. 2 days" />
        </div>
      </div>
    </div>
  );
}
