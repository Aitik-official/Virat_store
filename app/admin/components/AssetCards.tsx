'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ImageIcon, RefreshCw, Trash2, Upload, AlertCircle, CheckCircle2 } from 'lucide-react'
import { validateAndNormalizeMediaUrl, normalizeMediaUrl } from '@/lib/media-url'

export interface ImageAssetCardProps {
  label: string
  sublabel?: string
  currentSrc: string
  aspectRatio?: string
  contain?: boolean
  onUpdate: (newSrc: string) => void
  onRemove?: () => void
}

export function ImageAssetCard({
  label,
  sublabel,
  currentSrc,
  aspectRatio = 'aspect-video',
  contain = false,
  onUpdate,
  onRemove,
}: ImageAssetCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string
      if (result) {
        onUpdate(result)
        setIsEditing(false)
        setValidationError(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveUrl = () => {
    if (!urlInput.trim()) return
    const validation = validateAndNormalizeMediaUrl(urlInput.trim())
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid or untrusted URL')
      return
    }

    onUpdate(validation.normalizedUrl)
    setUrlInput('')
    setValidationError(null)
    setIsEditing(false)
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className={`relative ${aspectRatio} w-full overflow-hidden bg-slate-100 p-2`}>
        {currentSrc ? (
          <Image
            src={currentSrc}
            alt={label}
            fill
            className={`${contain ? 'object-contain' : 'object-cover'}`}
            sizes="(max-width: 768px) 100vw, 350px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageIcon className="h-10 w-10 stroke-1" />
          </div>
        )}
      </div>

      <div className="p-3 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="font-bold text-xs text-[#080d2d] truncate max-w-[170px] sm:max-w-[220px]" title={label}>{label}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold transition ${
                isEditing
                  ? 'bg-slate-200 text-slate-700'
                  : 'bg-red-50 text-[#e51717] hover:bg-red-100 border border-red-200/60'
              }`}
            >
              <RefreshCw className="h-3 w-3" />
              <span>{isEditing ? 'Cancel' : 'Replace'}</span>
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                title="Remove item"
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 border border-rose-200/60 transition"
              >
                <Trash2 className="h-3 w-3" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            )}
          </div>
        </div>
        {sublabel && <p className="mt-0.5 text-[11px] text-slate-400 truncate">{sublabel}</p>}

        {isEditing && (
          <div className="mt-2.5 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 animate-in fade-in slide-in-from-top-1">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#e51717]/60 bg-red-50/50 py-1.5 text-xs font-bold text-[#e51717] transition hover:bg-red-50"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload from device</span>
            </button>

            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Paste Google Drive or trusted link..."
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value)
                  if (validationError) setValidationError(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSaveUrl()
                  }
                }}
                className={`w-full min-w-0 rounded border bg-white px-2 py-1 text-xs outline-none transition ${
                  validationError ? 'border-rose-500 text-rose-700' : 'border-slate-300 focus:border-[#e51717]'
                }`}
              />
              <button
                type="button"
                onClick={handleSaveUrl}
                disabled={!urlInput.trim()}
                className="rounded bg-[#080d2d] px-2.5 py-1 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 shrink-0"
              >
                Apply
              </button>
            </div>

            {validationError && (
              <div className="flex items-start gap-1.5 rounded-md bg-rose-50 p-1.5 text-[11px] text-rose-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-500" />
                <span>{validationError}</span>
              </div>
            )}

            <p className="text-[10px] text-slate-400">
              💡 Supports Google Drive share links (auto-converted), Unsplash, Cloudinary, Imgur, or direct file uploads.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export interface VideoAssetCardProps {
  label: string
  sublabel?: string
  currentSrc: string
  onUpdate: (newSrc: string) => void
  onRemove?: () => void
}

export function VideoAssetCard({
  label,
  sublabel,
  currentSrc,
  onUpdate,
  onRemove,
}: VideoAssetCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string
      if (result) {
        onUpdate(result)
        setIsEditing(false)
        setValidationError(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveUrl = () => {
    if (!urlInput.trim()) return
    const validation = validateAndNormalizeMediaUrl(urlInput.trim())
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid or untrusted URL')
      return
    }

    onUpdate(validation.normalizedUrl)
    setUrlInput('')
    setValidationError(null)
    setIsEditing(false)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:p-3.5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between pb-2 gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#080d2d] truncate">{label}</h4>
          {sublabel && <p className="text-[11px] text-slate-400 truncate">{sublabel}</p>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold transition ${
              isEditing
                ? 'bg-slate-200 text-slate-700'
                : 'bg-red-50 text-[#e51717] hover:bg-red-100 border border-red-200/60'
            }`}
          >
            <RefreshCw className="h-3 w-3" />
            <span>{isEditing ? 'Cancel' : 'Replace Video'}</span>
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 border border-rose-200/60 transition"
            >
              <Trash2 className="h-3 w-3" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative mt-1.5 aspect-video w-full overflow-hidden rounded-lg bg-black">
        <video
          key={currentSrc}
          src={normalizeMediaUrl(currentSrc)}
          controls
          muted
          className="h-full w-full object-cover"
        />
      </div>

      {isEditing && (
        <div className="mt-2.5 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 animate-in fade-in slide-in-from-top-1">
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#e51717]/60 bg-red-50/50 py-2 text-xs font-bold text-[#e51717] transition hover:bg-red-50"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload video from computer</span>
          </button>

          <div className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="Paste Google Drive or trusted video link..."
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value)
                if (validationError) setValidationError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSaveUrl()
                }
              }}
              className={`w-full min-w-0 rounded border bg-white px-2 py-1 text-xs outline-none transition ${
                validationError ? 'border-rose-500 text-rose-700' : 'border-slate-300 focus:border-[#e51717]'
              }`}
            />
            <button
              type="button"
              onClick={handleSaveUrl}
              disabled={!urlInput.trim()}
              className="rounded bg-[#080d2d] px-2.5 py-1 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 shrink-0"
            >
              Apply
            </button>
          </div>

          {validationError && (
            <div className="flex items-start gap-1.5 rounded-md bg-rose-50 p-1.5 text-[11px] text-rose-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-500" />
              <span>{validationError}</span>
            </div>
          )}

          <p className="text-[10px] text-slate-400">
            💡 Supports Google Drive video share links (auto-converted), Cloudinary, local /videos/ paths, or direct file uploads.
          </p>
        </div>
      )}
    </div>
  )
}
