import { useState } from "react";

interface SearchFormProps {
  onSearch: (term: string, days: number) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [term, setTerm] = useState<string>("");
  const [days, setDays] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(term, parseInt(days));
    setTerm("");
    setDays("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search Your Destination"
      />
      <select value={days} onChange={(e) => setDays(e.target.value)}>
        <option value="">Select number of days</option>
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
        <option value="4">4 days</option>
        <option value="5">5 days</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
