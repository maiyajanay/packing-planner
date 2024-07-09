import { useState } from "react";
import { getAutocompleteSuggestions } from "./services/WeatherApi";
import "./SearchForm.css";

// interface SearchFormProps {
//   onSearch: (tripName: string, locationKey: string, locationName: string, days: number) => void;
// }

// export function SearchForm({ onSearch }: SearchFormProps) {
//   const [term, setTerm] = useState<string>('');
//   const [locationKey, setLocationKey ] = useState<number>(0);
//   const [days, setDays] = useState<string>('');
//   const [tripName, setTripName] = useState<string>('');
//   const [suggestions, setSuggestions] = useState<any[]>([]);

//   async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const value = e.target.value;
//     setTerm(value);
//     if (value.length > 2) {
//       const results = await getAutocompleteSuggestions(value);
//       setSuggestions(results);
//     } else {
//       setSuggestions([]);
//     }
//   }

//   function handleSelect(locationKey: string, locationName: string) {
//     setTerm(locationName);
//     setSuggestions([]);
//     // Call onSearch here if you want immediate search when a location is selected
//     // onSearch(tripName, locationKey, locationName, parseInt(days));
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (term && days) {
//       const selectedSuggestion = suggestions.find(suggestion => suggestion.LocalizedName === term);
//       if (selectedSuggestion) {
//         onSearch(tripName, selectedSuggestion.Key, selectedSuggestion.LocalizedName, parseInt(days));
//       }
//     }
//     setTerm('');
//     setTripName('');
//     setDays('');
//   }

//   return (
//     <div className="form_container">
//       <h2 className="form_top">Add A New Trip</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="form_element"
//           type="text"
//           value={tripName}
//           onChange={(e) => setTripName(e.target.value)}
//           placeholder="Name Your Trip"
//         />
//         <input
//           className="form_element"
//           type="text"
//           value={term}
//           onChange={handleChange}
//           placeholder="Search Your Destination"
//           required
//         />
//         {suggestions.length > 0 && (
//           <ul className="suggestions">
//             {suggestions.map(suggestion => (
//               <li key={suggestion.Key} onClick={() => handleSelect(suggestion.Key, suggestion.LocalizedName)}>
//                 {suggestion.LocalizedName}
//               </li>
//             ))}
//           </ul>
//         )}
//         <select className="form_element" value={days} onChange={(e) => setDays(e.target.value)} required>
//           <option value="">Select number of days</option>
//           <option value="1">1 day</option>
//           <option value="2">2 days</option>
//           <option value="3">3 days</option>
//           <option value="4">4 days</option>
//           <option value="5">5 days</option>
//         </select>
//         <button className="form_element" type="submit">Add New Trip</button>
//       </form>
//     </div>

//   );
// }

interface SearchFormProps {
  onSearch: (tripName: string, destination: string, days: number) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [days, setDays] = useState<string>(0);
  const [destination, setDestination] = useState<string>('');
  const [tripName, setTripName] = useState<string>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(tripName, destination, parseInt(days));
    setDestination('');
    setTripName('');
    setDays('');
  }

  return (
    <div className="form_container">
      <h2 className="form_top">Add A New Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form_element"
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder="Name Your Trip"
        />
        <input
          className="form_element"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Search Your Destination"
          required
        />
        <select className="form_element" value={days} onChange={(e) => setDays(e.target.value)} required>
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