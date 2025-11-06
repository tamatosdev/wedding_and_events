'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, X, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function UploadSummary() {
  const { formData, updateFormData } = usePartnerForm()
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    updateFormData({ fileUrls: [...uploadedFiles, ...files].map(f => f.name) } as any)
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    updateFormData({ fileUrls: newFiles.map(f => f.name) } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Upload className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Upload & Summary
        </h2>
        <p className="text-[#666666]">Upload documents and provide company overview</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">File Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-rose-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#D13F43] hover:bg-[#F7E9DB] transition-colors"
            >
              <Upload className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <p className="text-[#666666] mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                Photos, PDFs, or documents (Max 10MB per file)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
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
                      <File className="w-5 h-5 text-[#D13F43]" />
                      <span className="text-sm text-[#2E2E2E]">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-[#D13F43] hover:text-[#D13F43]"
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

