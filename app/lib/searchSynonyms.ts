// app/lib/searchSynonyms.ts

// 🔥 Групи синонімів (можеш спокійно розширювати)
export const SYNONYM_GROUPS: string[][] = [
  ['томати', 'помідори', 'томат', 'помідор'],
  ['картопля', 'картошка'],
  ['курка', 'курятина'],
  ['болгарський перець', 'солодкий перець'],
  ['цибуля', 'лук'],
  ['часник', 'чеснок'],
  ['суп', 'юшка'],
]

// 🔤 нормалізація
export function normalizeText(text: string): string {
  return text.toLowerCase().trim()
}

// 🔪 розбити на слова
export function splitWords(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter(Boolean)
}

// 🔍 знайти фрази (ВАЖЛИВО)
export function extractPhrases(query: string): string[] {
  const normalized = normalizeText(query)
  const found: string[] = []

  for (const group of SYNONYM_GROUPS) {
    for (const phrase of group) {
      if (phrase.includes(' ') && normalized.includes(phrase)) {
        found.push(phrase)
      }
    }
  }

  return found
}

// 🔄 отримати всі варіанти слова/фрази
export function getVariants(token: string): string[] {
  for (const group of SYNONYM_GROUPS) {
    if (group.includes(token)) {
      return group
    }
  }
  return [token]
}