'use client'

import { useState, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/venue-onboarding/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, X, File } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Step9UploadSummaryProps {
  form: UseFormReturn<FormData>
}

export default function Step9UploadSummary({ form }: Step9UploadSummaryProps) {
  const { register, formState: { errors }, watch, setValue } = form
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    setValue('files', [...uploadedFiles, ...files] as any)
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    setValue('files', newFiles as any)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Upload className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload & Summary</h2>
        <p className="text-gray-600">Upload documents and provide company overview</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">File Upload</CardTitle>
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

          <div>
            <Label htmlFor="companyOverview" className="text-gray-700">
              Company Overview / Summary
            </Label>
            <Textarea
              id="companyOverview"
              {...register('companyOverview')}
              placeholder="Provide a brief overview of your company, history, experience, and what makes you unique..."
              rows={6}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Undertaking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="undertakingName" className="text-gray-700">
                Name
              </Label>
              <Input
                id="undertakingName"
                {...register('undertakingName')}
                placeholder="Enter name"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="undertakingDesignation" className="text-gray-700">
                Designation
              </Label>
              <Input
                id="undertakingDesignation"
                {...register('undertakingDesignation')}
                placeholder="Enter designation"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="undertakingCNIC" className="text-gray-700">
                CNIC
              </Label>
              <Input
                id="undertakingCNIC"
                {...register('undertakingCNIC')}
                placeholder="XXXXX-XXXXXXX-X"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="undertakingCompany" className="text-gray-700">
                Company
              </Label>
              <Input
                id="undertakingCompany"
                {...register('undertakingCompany')}
                placeholder="Enter company name"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="undertakingMobile" className="text-gray-700">
                Mobile
              </Label>
              <Input
                id="undertakingMobile"
                type="tel"
                {...register('undertakingMobile')}
                placeholder="0300-1234567"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="undertakingEmail" className="text-gray-700">
                Email
              </Label>
              <Input
                id="undertakingEmail"
                type="email"
                {...register('undertakingEmail')}
                placeholder="email@example.com"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="undertakingSignature" className="text-gray-700">
              Signature
            </Label>
            <Input
              id="undertakingSignature"
              {...register('undertakingSignature')}
              placeholder="Type your full name as signature"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="undertakingDate" className="text-gray-700">
              Date
            </Label>
            <Input
              id="undertakingDate"
              type="date"
              {...register('undertakingDate')}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

