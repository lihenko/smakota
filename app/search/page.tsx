'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import RecipeCard from '@/app/components/RecipeCard'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryFromUrl = searchParams.get('q') || ''

  const [query, setQuery] = useState(queryFromUrl)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setQuery(queryFromUrl)
  }, [queryFromUrl])

  async function fetchResults(searchQuery: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setResults(data.recipes)
    } catch (error) {
      console.error('Search API error:', error)
      setResults([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (queryFromUrl.trim()) {
      fetchResults(queryFromUrl)
    } else {
      setResults([])
    }
  }, [queryFromUrl])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="py-16">
        <div className="container">
        {/* Форма пошуку */}
        <div className="max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Назва, інгредієнт або інструкція"
                className="input input-bordered w-full"
                autoFocus
                />
                <button type="submit" className="btn btn-primary">
                Пошук
                </button>
            </form>
        </div>
        

        {/* Статус пошуку */}
        {loading && <p>Завантаження...</p>}
        {!loading && !queryFromUrl && <p>Введіть текст для пошуку.</p>}
        {!loading && queryFromUrl && results.length === 0 && (
            <p>За запитом &quot;{queryFromUrl}&quot; нічого не знайдено.</p>
        )}

        {/* Вивід результатів у вигляді карточок */}
            <div className="text-center mb-8"><h1 className='text-xl font-bold'>Результати пошуку</h1></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    </section>
    
  )
}
