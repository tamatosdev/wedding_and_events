"use client";
import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });

  useEffect(() => {
    setTimeout(() => setOpen(true), 500); // Show popup after 0.5s
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle form submission (API call or email)
    setOpen(false);
    alert('Thank you for your message!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
  <h2 className="text-2xl font-bold mb-4 text-center">For updates and exclusive discounts, sign&nbsp;up&nbsp;now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={form.city} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" value={form.message} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full bg-[#D13F43] text-white hover:bg-[#b82f33]">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
