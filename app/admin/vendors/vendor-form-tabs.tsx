'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUpload } from '@/components/ui/image-upload'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CATEGORIES = ['Venue', 'Boutiques', 'Beauty Parlor', 'Decorations', 'Catering', 'Photography', 'Videography', 'DJ', 'Other']
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Hyderabad', 'Peshawar', 'Quetta', 'Other']
const CAPACITY_RANGES = ['50-100', '100-200', '200-300', '300-500', '500-1000', '1000-1500', '1500+']
const VENUE_TYPES = ['Hall', 'Outdoor', 'Marquee', 'Garden', 'Beach', 'Hotel', 'Resort', 'Other']

interface VendorFormTabsProps {
  formData: any
  setFormData: (data: any) => void
}

export function VendorFormTabs({ formData, setFormData }: VendorFormTabsProps) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="owner-manager">Owner/Manager</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="bank">Bank Details</TabsTrigger>
        <TabsTrigger value="common">Common</TabsTrigger>
        <TabsTrigger value="category">Category Specific</TabsTrigger>
      </TabsList>

      {/* Basic Info Tab */}
      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Vendor Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Grand Wedding Hall"
            />
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData({ ...formData, city: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="pricing">Pricing</Label>
            <Input
              id="pricing"
              value={formData.pricing}
              onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
              placeholder="e.g., Starting from Rs. 50,000"
            />
          </div>
        </div>
        {formData.category === 'Venue' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Select
                value={formData.capacity}
                onValueChange={(value) => setFormData({ ...formData, capacity: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select capacity range" />
                </SelectTrigger>
                <SelectContent>
                  {CAPACITY_RANGES.map((cap) => (
                    <SelectItem key={cap} value={cap}>
                      {cap} guests
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Venue Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue type" />
                </SelectTrigger>
                <SelectContent>
                  {VENUE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            placeholder="Describe the vendor, services, features, etc."
          />
        </div>
        <div>
          <Label>Images</Label>
          <ImageUpload
            images={formData.images || []}
            onImagesChange={(images) => setFormData({ ...formData, images })}
            maxImages={10}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="reviews">Number of Reviews</Label>
            <Input
              id="reviews"
              type="number"
              min="0"
              value={formData.reviews}
              onChange={(e) =>
                setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <Switch
              id="approved"
              checked={formData.approved}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, approved: checked })}
            />
            <Label htmlFor="approved" className="cursor-pointer">
              Approved
            </Label>
          </div>
        </div>
      </TabsContent>

      {/* Owner & Manager Details Tab */}
      <TabsContent value="owner-manager" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Owner Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="Owner full name"
                />
              </div>
              <div>
                <Label htmlFor="ownerEmail">Owner Email</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                  placeholder="owner@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="ownerMobile1">Mobile 1</Label>
                <Input
                  id="ownerMobile1"
                  value={formData.ownerMobile1}
                  onChange={(e) => setFormData({ ...formData, ownerMobile1: e.target.value })}
                  placeholder="0300-1234567"
                />
              </div>
              <div>
                <Label htmlFor="ownerMobile2">Mobile 2</Label>
                <Input
                  id="ownerMobile2"
                  value={formData.ownerMobile2}
                  onChange={(e) => setFormData({ ...formData, ownerMobile2: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="ownerLandline">Landline</Label>
                <Input
                  id="ownerLandline"
                  value={formData.ownerLandline}
                  onChange={(e) => setFormData({ ...formData, ownerLandline: e.target.value })}
                  placeholder="021-1234567"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manager Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="managerName">Manager Name</Label>
                <Input
                  id="managerName"
                  value={formData.managerName}
                  onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                  placeholder="Manager full name"
                />
              </div>
              <div>
                <Label htmlFor="managerEmail">Manager Email</Label>
                <Input
                  id="managerEmail"
                  type="email"
                  value={formData.managerEmail}
                  onChange={(e) => setFormData({ ...formData, managerEmail: e.target.value })}
                  placeholder="manager@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="managerMobile1">Mobile 1</Label>
                <Input
                  id="managerMobile1"
                  value={formData.managerMobile1}
                  onChange={(e) => setFormData({ ...formData, managerMobile1: e.target.value })}
                  placeholder="0300-1234567"
                />
              </div>
              <div>
                <Label htmlFor="managerMobile2">Mobile 2</Label>
                <Input
                  id="managerMobile2"
                  value={formData.managerMobile2}
                  onChange={(e) => setFormData({ ...formData, managerMobile2: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="managerLandline">Landline</Label>
                <Input
                  id="managerLandline"
                  value={formData.managerLandline}
                  onChange={(e) => setFormData({ ...formData, managerLandline: e.target.value })}
                  placeholder="021-1234567"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Business Details Tab */}
      <TabsContent value="business" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="area">Area</Label>
            <Input
              id="area"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="e.g., Clifton, DHA"
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="completeAddress">Complete Address</Label>
          <Textarea
            id="completeAddress"
            value={formData.completeAddress}
            onChange={(e) => setFormData({ ...formData, completeAddress: e.target.value })}
            rows={3}
            placeholder="Full business address"
          />
        </div>
        <div>
          <Label htmlFor="businessEmail">Business Email</Label>
          <Input
            id="businessEmail"
            type="email"
            value={formData.businessEmail}
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            placeholder="business@example.com"
          />
        </div>
      </TabsContent>

      {/* Bank Details Tab */}
      <TabsContent value="bank" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              placeholder="e.g., HBL, UBL"
            />
          </div>
          <div>
            <Label htmlFor="branchCity">Branch City</Label>
            <Input
              id="branchCity"
              value={formData.branchCity}
              onChange={(e) => setFormData({ ...formData, branchCity: e.target.value })}
              placeholder="City where branch is located"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="Bank account number"
            />
          </div>
          <div>
            <Label htmlFor="ibanNumber">IBAN Number</Label>
            <Input
              id="ibanNumber"
              value={formData.ibanNumber}
              onChange={(e) => setFormData({ ...formData, ibanNumber: e.target.value })}
              placeholder="PK00XXXX0000000000000000"
            />
          </div>
        </div>
      </TabsContent>

      {/* Common Fields Tab */}
      <TabsContent value="common" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessDuration">Business Duration</Label>
            <Input
              id="businessDuration"
              value={formData.businessDuration}
              onChange={(e) => setFormData({ ...formData, businessDuration: e.target.value })}
              placeholder="e.g., 5 years"
            />
          </div>
          <div>
            <Label htmlFor="numberOfBranches">Number of Branches</Label>
            <Input
              id="numberOfBranches"
              value={formData.numberOfBranches}
              onChange={(e) => setFormData({ ...formData, numberOfBranches: e.target.value })}
              placeholder="e.g., 2"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
          <Textarea
            id="cancellationPolicy"
            value={formData.cancellationPolicy}
            onChange={(e) => setFormData({ ...formData, cancellationPolicy: e.target.value })}
            rows={3}
            placeholder="Cancellation and refund policy"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="fireInsurance">Fire Insurance</Label>
            <Input
              id="fireInsurance"
              value={formData.fireInsurance}
              onChange={(e) => setFormData({ ...formData, fireInsurance: e.target.value })}
              placeholder="Yes/No"
            />
          </div>
          <div>
            <Label htmlFor="weArrangeInsurance">We Arrange Insurance</Label>
            <Input
              id="weArrangeInsurance"
              value={formData.weArrangeInsurance}
              onChange={(e) => setFormData({ ...formData, weArrangeInsurance: e.target.value })}
              placeholder="Yes/No"
            />
          </div>
          <div>
            <Label htmlFor="wheelchairAccessible">Wheelchair Accessible</Label>
            <Input
              id="wheelchairAccessible"
              value={formData.wheelchairAccessible}
              onChange={(e) => setFormData({ ...formData, wheelchairAccessible: e.target.value })}
              placeholder="Yes/No"
            />
          </div>
        </div>
      </TabsContent>

      {/* Category-Specific Fields Tab */}
      <TabsContent value="category" className="space-y-4">
        {formData.category === 'Venue' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venueType">Venue Type</Label>
                <Input
                  id="venueType"
                  value={formData.venueType}
                  onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                  placeholder="e.g., Hall, Outdoor, Marquee"
                />
              </div>
              <div>
                <Label htmlFor="guestCapacity">Guest Capacity</Label>
                <Input
                  id="guestCapacity"
                  value={formData.guestCapacity}
                  onChange={(e) => setFormData({ ...formData, guestCapacity: e.target.value })}
                  placeholder="e.g., 500-1000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venuePricingRange">Pricing Range</Label>
                <Input
                  id="venuePricingRange"
                  value={formData.venuePricingRange}
                  onChange={(e) => setFormData({ ...formData, venuePricingRange: e.target.value })}
                  placeholder="e.g., Rs. 50,000 - Rs. 200,000"
                />
              </div>
              <div>
                <Label htmlFor="cateringAvailable">Catering Available</Label>
                <Input
                  id="cateringAvailable"
                  value={formData.cateringAvailable}
                  onChange={(e) => setFormData({ ...formData, cateringAvailable: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="outsideCateringAllowed">Outside Catering Allowed</Label>
                <Input
                  id="outsideCateringAllowed"
                  value={formData.outsideCateringAllowed}
                  onChange={(e) => setFormData({ ...formData, outsideCateringAllowed: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="parkingCapacity">Parking Capacity</Label>
                <Input
                  id="parkingCapacity"
                  value={formData.parkingCapacity}
                  onChange={(e) => setFormData({ ...formData, parkingCapacity: e.target.value })}
                  placeholder="e.g., 50 cars"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="parkingType">Parking Type</Label>
              <Input
                id="parkingType"
                value={formData.parkingType}
                onChange={(e) => setFormData({ ...formData, parkingType: e.target.value })}
                placeholder="e.g., Valet, Self-parking"
              />
            </div>
            <div>
              <Label htmlFor="amenities">Amenities</Label>
              <Textarea
                id="amenities"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                rows={3}
                placeholder="List all amenities"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bridalSuite">Bridal Suite</Label>
                <Input
                  id="bridalSuite"
                  value={formData.bridalSuite}
                  onChange={(e) => setFormData({ ...formData, bridalSuite: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="namazAreaMen">Namaz Area (Men)</Label>
                <Input
                  id="namazAreaMen"
                  value={formData.namazAreaMen}
                  onChange={(e) => setFormData({ ...formData, namazAreaMen: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="namazAreaLadies">Namaz Area (Ladies)</Label>
                <Input
                  id="namazAreaLadies"
                  value={formData.namazAreaLadies}
                  onChange={(e) => setFormData({ ...formData, namazAreaLadies: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
            </div>
          </div>
        )}

        {formData.category === 'Boutiques' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dressType">Dress Type</Label>
                <Input
                  id="dressType"
                  value={formData.dressType}
                  onChange={(e) => setFormData({ ...formData, dressType: e.target.value })}
                  placeholder="e.g., Bridal, Formal, Casual"
                />
              </div>
              <div>
                <Label htmlFor="designOrResell">Design or Resell</Label>
                <Input
                  id="designOrResell"
                  value={formData.designOrResell}
                  onChange={(e) => setFormData({ ...formData, designOrResell: e.target.value })}
                  placeholder="Design/Resell/Both"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="fabrics">Fabrics</Label>
              <Textarea
                id="fabrics"
                value={formData.fabrics}
                onChange={(e) => setFormData({ ...formData, fabrics: e.target.value })}
                rows={2}
                placeholder="List available fabrics"
              />
            </div>
            <div>
              <Label htmlFor="priceRange">Price Range</Label>
              <Input
                id="priceRange"
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                placeholder="e.g., Rs. 10,000 - Rs. 100,000"
              />
            </div>
            <div>
              <Label htmlFor="customization">Customization</Label>
              <Textarea
                id="customization"
                value={formData.customization}
                onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
                rows={2}
                placeholder="Customization options"
              />
            </div>
            <div>
              <Label htmlFor="rentalPolicy">Rental Policy</Label>
              <Textarea
                id="rentalPolicy"
                value={formData.rentalPolicy}
                onChange={(e) => setFormData({ ...formData, rentalPolicy: e.target.value })}
                rows={2}
                placeholder="Rental terms and conditions"
              />
            </div>
            <div>
              <Label htmlFor="delivery">Delivery</Label>
              <Textarea
                id="delivery"
                value={formData.delivery}
                onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                rows={2}
                placeholder="Delivery options and charges"
              />
            </div>
          </div>
        )}

        {formData.category === 'Beauty Parlor' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="servicesList">Services Offered</Label>
              <Textarea
                id="servicesList"
                value={formData.servicesList}
                onChange={(e) => setFormData({ ...formData, servicesList: e.target.value })}
                rows={3}
                placeholder="List all services (e.g., Bridal Makeup, Hair Styling, Mehndi)"
              />
            </div>
            <div>
              <Label htmlFor="packages">Packages & Pricing</Label>
              <Textarea
                id="packages"
                value={formData.packages}
                onChange={(e) => setFormData({ ...formData, packages: e.target.value })}
                rows={3}
                placeholder="Describe packages and pricing"
              />
            </div>
            <div>
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <Input
                id="operatingHours"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                placeholder="e.g., Monday-Saturday: 10 AM - 8 PM"
              />
            </div>
            <div>
              <Label htmlFor="brandsUsed">Brands & Products Used</Label>
              <Textarea
                id="brandsUsed"
                value={formData.brandsUsed}
                onChange={(e) => setFormData({ ...formData, brandsUsed: e.target.value })}
                rows={2}
                placeholder="List brands and products"
              />
            </div>
            <div>
              <Label htmlFor="staffExpertise">Staff Expertise</Label>
              <Textarea
                id="staffExpertise"
                value={formData.staffExpertise}
                onChange={(e) => setFormData({ ...formData, staffExpertise: e.target.value })}
                rows={2}
                placeholder="Staff qualifications and expertise"
              />
            </div>
            <div>
              <Label htmlFor="bridalTrials">Bridal Trials</Label>
              <Textarea
                id="bridalTrials"
                value={formData.bridalTrials}
                onChange={(e) => setFormData({ ...formData, bridalTrials: e.target.value })}
                rows={2}
                placeholder="Trial policy and charges"
              />
            </div>
            <div>
              <Label htmlFor="salonPricing">Salon Pricing</Label>
              <Input
                id="salonPricing"
                value={formData.salonPricing}
                onChange={(e) => setFormData({ ...formData, salonPricing: e.target.value })}
                placeholder="General pricing information"
              />
            </div>
            <div>
              <Label htmlFor="promotions">Promotions</Label>
              <Textarea
                id="promotions"
                value={formData.promotions}
                onChange={(e) => setFormData({ ...formData, promotions: e.target.value })}
                rows={2}
                placeholder="Current promotions and offers"
              />
            </div>
            <div>
              <Label htmlFor="hygiene">Hygiene Standards</Label>
              <Textarea
                id="hygiene"
                value={formData.hygiene}
                onChange={(e) => setFormData({ ...formData, hygiene: e.target.value })}
                rows={2}
                placeholder="Hygiene and safety measures"
              />
            </div>
          </div>
        )}

        {formData.category === 'Décor' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="decorType">Décor Type</Label>
                <Input
                  id="decorType"
                  value={formData.decorType}
                  onChange={(e) => setFormData({ ...formData, decorType: e.target.value })}
                  placeholder="e.g., Stage, Entrance, Table"
                />
              </div>
              <div>
                <Label htmlFor="decorStyle">Décor Style</Label>
                <Input
                  id="decorStyle"
                  value={formData.decorStyle}
                  onChange={(e) => setFormData({ ...formData, decorStyle: e.target.value })}
                  placeholder="e.g., Traditional, Modern, Fusion"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="eventTypes">Event Types</Label>
              <Textarea
                id="eventTypes"
                value={formData.eventTypes}
                onChange={(e) => setFormData({ ...formData, eventTypes: e.target.value })}
                rows={2}
                placeholder="e.g., Wedding, Mehndi, Barat, Reception"
              />
            </div>
            <div>
              <Label htmlFor="decorPricingRange">Pricing Range</Label>
              <Input
                id="decorPricingRange"
                value={formData.decorPricingRange}
                onChange={(e) => setFormData({ ...formData, decorPricingRange: e.target.value })}
                placeholder="e.g., Rs. 50,000 - Rs. 500,000"
              />
            </div>
            <div>
              <Label htmlFor="setupTime">Setup Time</Label>
              <Input
                id="setupTime"
                value={formData.setupTime}
                onChange={(e) => setFormData({ ...formData, setupTime: e.target.value })}
                placeholder="e.g., 4-6 hours"
              />
            </div>
            <div>
              <Label htmlFor="equipmentProvided">Equipment Provided</Label>
              <Textarea
                id="equipmentProvided"
                value={formData.equipmentProvided}
                onChange={(e) => setFormData({ ...formData, equipmentProvided: e.target.value })}
                rows={2}
                placeholder="List equipment provided"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customDesign">Custom Design</Label>
                <Input
                  id="customDesign"
                  value={formData.customDesign}
                  onChange={(e) => setFormData({ ...formData, customDesign: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="floralsIncluded">Florals Included</Label>
                <Input
                  id="floralsIncluded"
                  value={formData.floralsIncluded}
                  onChange={(e) => setFormData({ ...formData, floralsIncluded: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="themesAvailable">Themes Available</Label>
              <Textarea
                id="themesAvailable"
                value={formData.themesAvailable}
                onChange={(e) => setFormData({ ...formData, themesAvailable: e.target.value })}
                rows={2}
                placeholder="List available themes"
              />
            </div>
            <div>
              <Label htmlFor="lightingServices">Lighting Services</Label>
              <Input
                id="lightingServices"
                value={formData.lightingServices}
                onChange={(e) => setFormData({ ...formData, lightingServices: e.target.value })}
                placeholder="Yes/No/Additional charges"
              />
            </div>
          </div>
        )}

        {formData.category === 'Catering' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cuisineType">Cuisine Type</Label>
                <Input
                  id="cuisineType"
                  value={formData.cuisineType}
                  onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value })}
                  placeholder="e.g., Pakistani, Chinese, Continental"
                />
              </div>
              <div>
                <Label htmlFor="menuStyle">Menu Style</Label>
                <Input
                  id="menuStyle"
                  value={formData.menuStyle}
                  onChange={(e) => setFormData({ ...formData, menuStyle: e.target.value })}
                  placeholder="e.g., Buffet, A la carte, Set menu"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="servingStyle">Serving Style</Label>
              <Input
                id="servingStyle"
                value={formData.servingStyle}
                onChange={(e) => setFormData({ ...formData, servingStyle: e.target.value })}
                placeholder="e.g., Buffet, Plated, Family style"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minimumGuests">Minimum Guests</Label>
                <Input
                  id="minimumGuests"
                  value={formData.minimumGuests}
                  onChange={(e) => setFormData({ ...formData, minimumGuests: e.target.value })}
                  placeholder="e.g., 50"
                />
              </div>
              <div>
                <Label htmlFor="maximumGuests">Maximum Guests</Label>
                <Input
                  id="maximumGuests"
                  value={formData.maximumGuests}
                  onChange={(e) => setFormData({ ...formData, maximumGuests: e.target.value })}
                  placeholder="e.g., 1000"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cateringPricingRange">Pricing Range</Label>
              <Input
                id="cateringPricingRange"
                value={formData.cateringPricingRange}
                onChange={(e) => setFormData({ ...formData, cateringPricingRange: e.target.value })}
                placeholder="e.g., Rs. 500 - Rs. 2,000 per person"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="halalCertified">Halal Certified</Label>
                <Input
                  id="halalCertified"
                  value={formData.halalCertified}
                  onChange={(e) => setFormData({ ...formData, halalCertified: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="vegetarianOptions">Vegetarian Options</Label>
                <Input
                  id="vegetarianOptions"
                  value={formData.vegetarianOptions}
                  onChange={(e) => setFormData({ ...formData, vegetarianOptions: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="dietaryAccommodations">Dietary Accommodations</Label>
              <Textarea
                id="dietaryAccommodations"
                value={formData.dietaryAccommodations}
                onChange={(e) => setFormData({ ...formData, dietaryAccommodations: e.target.value })}
                rows={2}
                placeholder="Special dietary accommodations available"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="setupService">Setup Service</Label>
                <Input
                  id="setupService"
                  value={formData.setupService}
                  onChange={(e) => setFormData({ ...formData, setupService: e.target.value })}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="servingStaff">Serving Staff</Label>
                <Input
                  id="servingStaff"
                  value={formData.servingStaff}
                  onChange={(e) => setFormData({ ...formData, servingStaff: e.target.value })}
                  placeholder="Yes/No/Included"
                />
              </div>
              <div>
                <Label htmlFor="equipmentRental">Equipment Rental</Label>
                <Input
                  id="equipmentRental"
                  value={formData.equipmentRental}
                  onChange={(e) => setFormData({ ...formData, equipmentRental: e.target.value })}
                  placeholder="Yes/No/Additional"
                />
              </div>
            </div>
          </div>
        )}

        {!['Venue', 'Boutiques', 'Beauty Parlor', 'Décor', 'Catering'].includes(formData.category) && (
          <div className="text-center py-8 text-gray-500">
            Category-specific fields are available for Venue, Boutiques, Beauty Parlor, Décor, and Catering categories.
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

