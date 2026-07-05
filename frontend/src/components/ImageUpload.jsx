import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024

function ImageUpload({ onFileSelected, loading }) {
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const validateAndUse = (file) => {
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WEBP image.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error('Image must be under 5MB.')
      return
    }
    setPreview(URL.createObjectURL(file))
    onFileSelected(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    validateAndUse(e.dataTransfer.files?.[0])
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragActive(true)
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed p-8 text-center transition ${
        dragActive
          ? 'border-saffron bg-saffron/5'
          : 'border-char/20 dark:border-flour/20'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => validateAndUse(e.target.files?.[0])}
      />

      {preview ? (
        <img src={preview} alt="Upload preview" className="max-h-48 rounded-card object-cover" />
      ) : (
        <>
          <p className="font-medium">Drop a food photo here, or click to upload</p>
          <p className="mt-1 text-sm text-char/60 dark:text-flour/60">JPEG, PNG or WEBP, up to 5MB</p>
        </>
      )}

      {loading && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-saffron">
          <Spinner /> Identifying your food...
        </p>
      )}
    </div>
  )
}

export default ImageUpload
