import { useState } from "react";
import { getAutocompleteSuggestions } from "./services/WeatherApi";
import "./SearchForm.css";

interface SearchFormProps {
  onSearch: (tripName: string, locationKey: string, locationName: string, days: number) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [term, setTerm] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [tripName, setTripName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTerm(value);
    if (value.length > 2) {
      try {const results = await getAutocompleteSuggestions(value);
      setSuggestions(results);
      } catch (error) {
        console.error("Failed to fetch autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  }

  function handleSelect(locationKey: string, locationName: string, e: React.MouseEvent) {
    e.preventDefault();
    setTerm(locationName);
    setSuggestions([]);
    onSearch(tripName, locationKey, locationName, parseInt(days));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (term && days) {
      const selectedSuggestion = suggestions.find(suggestion => suggestion.LocalizedName === term);
      if (selectedSuggestion) {
        onSearch(tripName, selectedSuggestion.Key, selectedSuggestion.LocalizedName, parseInt(days));
      }
    }
    setTerm('');
    setTripName('');
    setDays('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        placeholder="Name Your Trip"
      />
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Search Your Destination"
        required
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map(suggestion => (
            <li key={suggestion.Key} onClick={() => handleSelect(suggestion.Key, suggestion.LocalizedName, e)}>
              {suggestion.LocalizedName}
            </li>
          ))}
        </ul>
      )}
      <select value={days} onChange={(e) => setDays(e.target.value)} required>
        <option value="">Select number of days</option>
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
        <option value="4">4 days</option>
        <option value="5">5 days</option>
      </select>
      <button type="submit">Add New Trip</button>
    </form>
  );
}
