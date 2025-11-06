'use client'

import { useState, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, X, File, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CommonFieldsProps {
  form: UseFormReturn<FormData>
}

const yesNoOptions = ['Yes', 'No']

export default function CommonFields({ form }: CommonFieldsProps) {
  const { register, formState: { errors }, setValue } = form
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    setValue('fileUrls', [...uploadedFiles, ...files].map(f => f.name) as any)
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    setValue('fileUrls', newFiles.map(f => f.name) as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <FileText className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">General Information</h2>
        <p className="text-gray-600">Additional business information and policies</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="businessDuration" className="text-gray-700">
                Business Duration
              </Label>
              <Input
                id="businessDuration"
                {...register('businessDuration')}
                placeholder="e.g., 5 years, Since 2018"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="numberOfBranches" className="text-gray-700">
                Number of Branches
              </Label>
              <Input
                id="numberOfBranches"
                {...register('numberOfBranches')}
                placeholder="e.g., 1, 2, 3+"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cancellationPolicy" className="text-gray-700">
              Cancellation Policy <span className="text-rose-500">*</span>
            </Label>
            <Textarea
              id="cancellationPolicy"
              {...register('cancellationPolicy')}
              placeholder="Describe your cancellation policy, refund terms, etc."
              rows={4}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.cancellationPolicy && (
              <p className="text-rose-500 text-sm mt-1">{errors.cancellationPolicy.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fireInsurance" className="text-gray-700">
                Fire/Property Insurance
              </Label>
              <select
                id="fireInsurance"
                {...register('fireInsurance')}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="weArrangeInsurance" className="text-gray-700">
                Want WE to arrange insurance?
              </Label>
              <select
                id="weArrangeInsurance"
                {...register('weArrangeInsurance')}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="wheelchairAccessible" className="text-gray-700">
              Wheelchair Accessible?
            </Label>
            <select
              id="wheelchairAccessible"
              {...register('wheelchairAccessible')}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Option</option>
              {yesNoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Upload Files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="files" className="text-gray-700">
              Upload Photos & Company Profile
            </Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 border-2 border-dashed border-rose-300 rounded-lg p-8 text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-colors"
            >
              <Upload className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                Photos, PDFs, or documents (Max 10MB per file)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="files"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-rose-600" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

