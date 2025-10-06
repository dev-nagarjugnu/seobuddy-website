"use client"

import { useEffect } from 'react'

export default function Canonical() {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const href = window.location.href
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }, [])
  return null
}


