import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step7PricingBookingProps {
  form: UseFormReturn<any>;
}

export default function Step7PricingBooking({ form }: Step7PricingBookingProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Pricing, Booking & Policies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label>Price Ranges</Label>
          <Input {...register('priceRanges')} placeholder="e.g. Bridal, Party, etc." />
        </div>
        <div>
          <Label>Display Prices on Platform?</Label>
          <Input {...register('displayPrices')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Price Differences (Salon/Location)</Label>
          <Input {...register('priceDifference')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Discounts/Special Deals?</Label>
          <Input {...register('discountsDeals')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Advance Payment Required?</Label>
          <Input {...register('advancePayment')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Cancellation/Refund Policy</Label>
          <Input {...register('cancellationPolicy')} placeholder="Describe your policy" />
        </div>
        <div>
          <Label>Insurance/Liability Coverage</Label>
          <Input {...register('insuranceCoverage')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Insurance Arrangement Needed?</Label>
          <Input {...register('insuranceArrangement')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Booking Advance Time</Label>
          <Input {...register('bookingAdvanceTime')} placeholder="e.g. 1 week, 1 month" />
        </div>
        <div>
          <Label>Same-day/Emergency Bookings?</Label>
          <Input {...register('emergencyBookings')} placeholder="Yes/No" />
        </div>
        <div>
          <Label>Daily Booking Capacity</Label>
          <Input {...register('bookingCapacity')} placeholder="e.g. 5 per day" />
        </div>
        <div>
          <Label>Travel for Events/Home Service?</Label>
          <Input {...register('travelForEvents')} placeholder="Yes/No" />
        </div>
      </div>
    </div>
  );
}
