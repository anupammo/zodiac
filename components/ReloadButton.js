'use client'

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="btn btn-outline-cosmic px-4"
    >
      <i className="fas fa-redo me-2" />
      Try Again
    </button>
  )
}
