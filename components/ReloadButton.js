'use client'

export default function ReloadButton({ label }) {
  return (
    <button type="button" onClick={() => window.location.reload()} className="btn btn-outline-cosmic px-4">
      <i className="fas fa-redo me-2" aria-hidden="true" />
      {label}
    </button>
  )
}
