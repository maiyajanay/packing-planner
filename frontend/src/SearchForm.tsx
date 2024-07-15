import { useState } from "react";
import { getAutocompleteSuggestions } from "./services/WeatherApi";
import "./SearchForm.css";

interface SearchFormProps {
  onSearch: (tripName: string, locationKey: string, locationName: string, days: number) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [term, setTerm] = useState<string>('');
  const [days, setDays] = useState<string>('1'); // Initialize with '1' as a string
  const [tripName, setTripName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<{ locationName: string; locationKey: string } | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTerm(value);
    console.log(`Value: ${value}`)
    if (value.length > 4) {
      const results = await getAutocompleteSuggestions(value);
      setSuggestions(results);
      console.log(`Suggestions:`, suggestions);
    } else {
      setSuggestions([]);
    }
  }

  function handleSelect(locationName: string, locationKey: string) {
    setTerm(locationName);
    setSelectedDestination({ locationName, locationKey });
    setSuggestions([]);
    console.log("Days in handleSelect:", days); // Log days value
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Term:", term);
    console.log("Trip Name:", tripName);
    console.log("Days in handleSubmit:", days); // Log days value before parsing

    if (selectedDestination && days && tripName) {
      const parsedDays = parseInt(days, 10);
      console.log("Parsed days:", parsedDays); // Log parsed days value
      console.log("Selected Destination:", selectedDestination);
      onSearch(tripName, selectedDestination.locationKey, selectedDestination.locationName, parsedDays);
    } else {
      console.log("Missing selected destination, days, or tripName.");
    }

    setTerm('');
    setTripName('');
    setDays('1');
    setSelectedDestination(null);
  }

  return (
<div className="form_container">
  <h2 className="form_top">Add A New Trip</h2>
  <form onSubmit={handleSubmit}>
    <label htmlFor="tripName"></label>
    <input
      id="tripName"
      className="form_element"
      type="text"
      value={tripName}
      onChange={(e) => setTripName(e.target.value)}
      placeholder="Name Your Trip"
    />
    
    <label htmlFor="destination"></label>
    <input
      id="destination"
      className="form_element"
      type="text"
      value={term}
      onChange={handleChange}
      placeholder="Search Your Destination"
      required
    />
    
    {suggestions.length > 0 && (
      <ul className="suggestions">
        {suggestions.map(suggestion => (
          <li key={suggestion.Key} onClick={() => handleSelect(suggestion.LocalizedName, suggestion.Key)}>
            {suggestion.LocalizedName}, {suggestion.AdministrativeArea.ID}
          </li>
        ))}
      </ul>
    )}
    
    <label htmlFor="days"></label>
    <select
      id="days"
      className="form_element"
      value={days}
      onChange={(e) => {
        console.log("Selected days:", e.target.value); // Log selected value
        setDays(e.target.value);
      }}
      required
    >
      <option value="">Select number of days</option>
      <option value="1">1 day</option>
      <option value="2">2 days</option>
      <option value="3">3 days</option>
      <option value="4">4 days</option>
      <option value="5">5 days</option>
    </select>
    
    <button className="form_element" type="submit">Add New Trip</button>
  </form>
</div>

  );
}
