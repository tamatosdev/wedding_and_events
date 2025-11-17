"use client";
import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useWelcomePopup } from '@/contexts/WelcomePopupContext';

export default function WelcomePopup() {
  const { isOpen, closePopup } = useWelcomePopup();
  const [shouldAutoOpen, setShouldAutoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    preferenceType: '',
  });

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShouldAutoOpen(true);
      }, 500); // Show popup after 0.5s
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-open effect
  useEffect(() => {
    if (shouldAutoOpen) {
      // This will be handled by the dialog's open state
    }
  }, [shouldAutoOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: `Newsletter Signup - ${form.preferenceType} - ${form.city || 'No City'}`,
          message: `Preference Type: ${form.preferenceType}\nCity: ${form.city || 'Not specified'}`,
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
        preferenceType: '',
      });

      // Close popup after 2 seconds
      setTimeout(() => {
        closePopup();
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
    <Dialog open={isOpen || shouldAutoOpen} onOpenChange={() => {
      setShouldAutoOpen(false);
      closePopup();
    }}>
      <DialogContent>
        <DialogTitle className="text-2xl font-bold mb-4 text-center">
          For updates and exclusive discounts, sign&nbsp;up&nbsp;now
        </DialogTitle>
        <DialogDescription className="text-center mb-4">
          Join our newsletter to receive exclusive offers and updates
        </DialogDescription>
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
            <Label htmlFor="welcome-email">Email</Label>
            <Input 
              id="welcome-email" 
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
            <Label htmlFor="preferenceType">Preference Type</Label>
            <select 
              id="preferenceType" 
              name="preferenceType" 
              value={form.preferenceType} 
              onChange={handleChange} 
              required 
              disabled={loading || success}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select preference type</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Business Entity">Business Entity</option>
            </select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#D13F43] text-white hover:bg-[#b82f33] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || success}
          >
            {loading ? 'Signing up...' : success ? 'Signed up!' : 'Signup'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
