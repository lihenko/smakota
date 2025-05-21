'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RecipeSearchFormProps {
  className?: string
  placeholder?: string
}

export default function RecipeSearchForm({
  className = '',
  placeholder = 'Назва, інгредієнт або інструкція',
}: RecipeSearchFormProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = query.trim()
    if (!trimmed) return

    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className='max-w-3xl mx-auto'>
        <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
                Пошук
            </button>
        </form>
    </div>
    
  )
}
