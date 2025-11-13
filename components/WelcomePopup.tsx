"use client";
import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepare data for API - use city as subject or include in message
      const messageWithCity = form.city 
        ? `${form.message}\n\nCity: ${form.city}`
        : form.message;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.city ? `Newsletter Signup - ${form.city}` : 'Newsletter Signup',
          message: messageWithCity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit. Please try again.');
        setLoading(false);
        return;
      }

      // Success
      setSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: '',
      });

      // Close popup after 2 seconds
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="text-2xl font-bold mb-4 text-center">
          For updates and exclusive discounts, sign&nbsp;up&nbsp;now
        </DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              disabled={loading || success}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              disabled={loading || success}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              disabled={loading || success}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              disabled={loading || success}
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={form.message} 
              onChange={handleChange} 
              required 
              disabled={loading || success}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#D13F43] text-white hover:bg-[#b82f33] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || success}
          >
            {loading ? 'Submitting...' : success ? 'Submitted!' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
