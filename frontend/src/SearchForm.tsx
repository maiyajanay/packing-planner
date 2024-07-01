import { useState } from "react";

interface SearchFormProps {
  onSearch: (term: string) => void;
}

export function SearchForm({onSearch}: SearchFormProps) {
    const [term, setTerm] = useState<string>(''); 
    const [days, setDays] = useState(''); 
  
    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      onSearch(term);
      setTerm('');
      setDays('')
    }

  return(
    <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search Your Destination"
      />
      <select value={days} onChange={e => setDays(e.target.value)}>
        <option value="">Select number of days</option>
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
        <option value="4">4 days</option>
        <option value="5">5 days</option>
        <option value="6">6 days</option>
        <option value="7">7 days</option>
        <option value="8">8 days</option>
        <option value="9">9 days</option>
        <option value="10">10 days</option>
        <option value="11">11 days</option>
        <option value="12">12 days</option>
        <option value="13">13 days</option>
        <option value="14">14 days</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
  