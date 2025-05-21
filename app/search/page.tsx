import SearchClient from './SearchClient';

export const dynamic = 'force-dynamic'; // щоб не кешувалось

export default function SearchPage() {
  return <SearchClient />;
}
