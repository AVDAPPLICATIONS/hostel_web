"use client"

// FloatingElements has been intentionally replaced by per-section ambient
// gradients (pure CSS, no JS, no filter:blur compositor layers).
//
// The previous implementation used position:fixed + filter:blur() on two large
// divs, forcing the browser to create expensive GPU composite layers that
// repainted on every scroll tick — harming FPS and LCP.
//
// This stub is kept so existing import paths don't break.  The component
// renders nothing.

export default function FloatingElements() {
  return null
}
