import { useState } from "react";

interface SearchFormProps {
  onSearch: (term: string) => void;
}

export function SearchForm({onSearch}: SearchFormProps) {
    const [term, setTerm] = useState<string>('');  
  
    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      onSearch(term);
    }

  return(
    <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search Your Destination"
      />
      <button type="submit">Search</button>
  </form>
  );
}
  