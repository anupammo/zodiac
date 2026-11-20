import './globals.css'

// Fallback for paths outside any locale (the middleware handles almost everything).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)' }}>404</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>This page drifted out of orbit.</p>
          <a href="/" className="btn btn-cosmic px-4">Return Home</a>
        </div>
      </body>
    </html>
  )
}
