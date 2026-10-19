/**
 * Compresses an image file in the browser using HTML Canvas.
 * Scales down large images and outputs WebP/JPEG to keep file size small (< 300KB)
 * while preserving high visual quality. This avoids UI thread freezing,
 * prevents lag in forms, and prevents hitting MongoDB document payload limits.
 */
export async function compressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's SVG or animated GIF, keep as standard data URL
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
      return
    }

    const img = document.createElement('img')
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      let { width, height } = img

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        } else {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        // Fallback to FileReader if canvas context fails
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
        return
      }

      // Smooth resizing
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, width, height)

      // Try webp first, fallback to jpeg
      let outputType = 'image/webp'
      let dataUrl = canvas.toDataURL(outputType, quality)

      // If browser doesn't support webp export, it falls back to image/png which can be huge
      if (dataUrl.startsWith('data:image/png') && file.type !== 'image/png') {
        outputType = 'image/jpeg'
        dataUrl = canvas.toDataURL(outputType, quality)
      }

      resolve(dataUrl)
    }

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl)
      reject(err)
    }

    img.src = objectUrl
  })
}
