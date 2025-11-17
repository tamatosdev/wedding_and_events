'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export function ImageUpload({ 
  images = [], 
  onImagesChange, 
  maxImages = 10,
  className = '' 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Ensure images is always an array
  const imagesArray = Array.isArray(images) ? images : []

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return
    
    const filesArray = Array.from(files)
    const remainingSlots = maxImages - imagesArray.length
    
    if (filesArray.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images`)
      return
    }

    setUploading(true)
    
    try {
      const uploadPromises = filesArray.map(async (file) => {
        console.log('Starting upload for file:', file.name, file.size, file.type)
        const formData = new FormData()
        // Use "image" field name as required by the API
        formData.append('image', file)
        
        console.log('Sending request to /api/upload')
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        console.log('Upload response status:', response.status, response.statusText)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('Upload failed:', errorData)
          throw new Error(errorData.error || errorData.details || `Upload failed: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('Upload successful, URL:', data.url)
        return data.url
      })
      
      const uploadedUrls = await Promise.all(uploadPromises)
      console.log('All uploads complete, URLs:', uploadedUrls)
      onImagesChange([...imagesArray, ...uploadedUrls])
    } catch (error) {
      console.error('Error uploading images:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images. Please try again.'
      alert(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = (index: number) => {
    const newImages = imagesArray.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...imagesArray]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onImagesChange(newImages)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload Images
                </h3>
                <p className="text-gray-600">
                  Drag and drop images here, or click to select files
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {imagesArray.length} / {maxImages} images uploaded
                </p>
              </div>
              
              <div className="flex justify-center space-x-4" onClick={(e) => e.stopPropagation()}>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                  disabled={uploading || imagesArray.length >= maxImages}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInputChange}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="hidden"
                />
              </div>
              
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF, WebP (Max 10MB each)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      {imagesArray.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Images ({imagesArray.length})
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagesArray.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Upload ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        {/* Move Up */}
                        {index > 0 && (
                          <button
                            onClick={() => moveImage(index, index - 1)}
                            className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center"
                            title="Move up"
                          >
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        )}
                        
                        {/* Move Down */}
                        {index < imagesArray.length - 1 && (
                          <button
                            onClick={() => moveImage(index, index + 1)}
                            className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center"
                            title="Move down"
                          >
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                        
                        {/* Delete */}
                        <button
                          onClick={() => removeImage(index)}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
                          title="Delete image"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Primary Badge */}
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Image {index + 1}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> The first image will be used as the main image for your listing. 
                You can reorder images by using the up/down arrows.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
