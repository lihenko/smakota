'use client';

import { useState, useEffect, useRef } from 'react';

interface City {
  Ref: string;
  Description: string;
}

interface Props {
  cities: City[];
  value: string;  // Ref вибраного міста
  onChange: (ref: string) => void;
}

export default function CitySelect({ cities, value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<City[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  const lowerQuery = query.toLowerCase();

  setFiltered(
    cities
      .filter(city => {
        // Відрізаємо все в дужках разом із пробілом перед ними, наприклад: "Полтава (Полтавська обл)" -> "Полтава"
        const nameWithoutBrackets = city.Description.replace(/\s*\(.*?\)/g, '').toLowerCase();

        return nameWithoutBrackets.includes(lowerQuery);
      })
      .slice(0, 10)
  );
}, [query, cities]);

  useEffect(() => {
    if (value) {
      const selectedCity = cities.find(c => c.Ref === value);
      setQuery(selectedCity ? selectedCity.Description : '');
    } else {
      setQuery('');
    }
  }, [value, cities]);

  const handleSelect = (city: City) => {
    onChange(city.Ref);
    setQuery(city.Description);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsDropdownOpen(true);
        }}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        placeholder="Почніть вводити місто..."
        className="input input-bordered w-full"
      />
      {isDropdownOpen && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-md mt-1 max-h-60 overflow-y-auto rounded-box">
          {filtered.map(city => (
            <li
              key={city.Ref}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelect(city)}
            >
              {city.Description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
