import { franc } from 'franc-min';
import {
  BANGLA_STOPWORDS,
  HINDI_STOPWORDS,
  URDU_STOPWORDS,
} from './stopwordKeyword';


import { eng ,ben, hin,urd} from 'stopword'; 

// Map franc code → stopwords array
function getStopwords(langCode: string): string[] {
  switch (langCode) {
    case 'ben':
      return ben;
    case 'hin':
      return hin;
    case 'urd':
      return urd;
    case 'eng':
      return eng; // ✅ English stopwords
    default:
      return [];
  }
}

// Advanced keyword extraction
export function extractKeywordsAdvanced(text: string): string[] {
  if (!text) return [];

  const langCode = franc(text);

  // Lowercase + remove punctuation
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 1);

  // Get stopwords for detected language
  const stopwords = getStopwords(langCode);

  // Remove stopwords using filter
  const filtered = words.filter(w => !stopwords.includes(w));

  // Frequency map
  const freq: Record<string, number> = {};
  for (const w of filtered) freq[w] = (freq[w] || 0) + 1;

  // Sort by frequency, pick top 15
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 15);

  return sorted;
}
