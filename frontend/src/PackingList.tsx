import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TripContext from "./tripContext/TripContext";
import Trip from "./models/trip";
import "./PackingList.css";
import { Weather } from "./models/weather";
import { WeatherCard } from "./WeatherCard";
import { WeatherTile } from "./WeatherTile";
import { ViewPackingTitle } from "./ViewPackingTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PackingListProps {
    onEdit: (trip: Trip, id: string) => void;
    }

export function PackingList({ onEdit }: PackingListProps) {
    const navigate = useNavigate();
    const { trips, fetchAndSetTrips, handleEdit } = useContext(TripContext);
    const _id: string | undefined = useParams().id;
    const trip: Trip = trips.find((foundtrip: Trip) => foundtrip._id === _id)!;
    const [shorts, setShorts] = useState<number>(trip.shorts || 0);
    const [pants, setPants] = useState<number>(trip.pants || 0);
    const [shirts, setShirts] = useState<number>(trip.shirts || 0);
    const [socks, setSocks] = useState<number>(trip.socks || 0);
    const [underwear, setUnderwear] = useState<number>(trip.underwear || 0);
    const [sweatshirt, setSweatshirt] = useState<number>(trip.sweatshirt || 0);
    const [jacket, setJacket] = useState<number>(trip.jacket || 0);
    const notify = () => //Toast notification for when a trip is saved
        toast.success("Trip Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    
    const complete = () => //Toast notification for when a trip is completed
        toast.success("Trip Completed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    
    function handleComplete() {
        handleEdit(
            {
                ...trip,
                complete: true,
            },
            trip?._id?.toString() || ""
            );
            fetchAndSetTrips();
            complete();
            navigate("/"); //CHANGE THIS: Navigates back to the home page after a trip is completed
        }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onEdit(
        {
            name: trip.name,
            to: trip.to,
            duration: trip.duration,
            shorts: shorts,
            pants: pants,
            shirts: shirts,
            socks: socks,
            underwear: underwear,
            sweatshirt: sweatshirt,
            jacket: jacket,
            weather: trip.weather,
            complete: false,
            open: true,
        },
        trip._id?.toString() || ""
        );
        navigate(`/viewpacklist/${trip?._id}`);
    }


if (trip?._id === undefined) {
    return <p> no trip found</p>;
} else {
    return (
    <div>
        <div className="viewPackingTitleContainer">
        <ViewPackingTitle trip={trip} />
        </div>        
        <div className="packingListContainer">

            <div className="viewWeather">
                <h2 id="weatherTitle">Weather</h2>
                <div className="weatherReport">
                {Array.isArray(trip.weather) ? (
                    trip.weather
                    ?.slice(0, trip.duration)
                    .map((forecast: Weather) => (
                        <WeatherTile key={forecast.Date} forecast={forecast} />
                    ))
                ) : (
                    <WeatherTile key={0} forecast={trip.weather!} />
                )}
                </div>
            </div>
        
            {trip.open ? (
                <div className="viewForm">
                    <form className="packingForm" onSubmit={handleSubmit}>
                    {trip.open ? (
                        <h2 id="updateTitle">Update Packing List</h2>
                        ) : (
                        <h2 id="createTitle">Create Packing List</h2>
                        )}
                    <label>
                        Shorts:
                        <input
                        type="number"
                        value={shorts}
                        onChange={(e) => setShorts(parseInt(e.target.value))}
                        />
                    </label>    
                    <label>
                        Pants:
                        <input
                        type="number"
                        value={pants || 0}
                        onChange={(e) => setPants(parseInt(e.target.value))}
                        />
                    </label>
                    <label>
                        Shirts:
                        <input
                        type="number"
                        value={shirts}
                        onChange={(e) => setShirts(parseInt(e.target.value))}
                        />
                    </label>
                    <label>
                        Socks:
                        <input
                        type="number"
                        value={socks}
                        onChange={(e) => setSocks(parseInt(e.target.value))}
                        />
                    </label>
                    <label>
                        Underwear:
                        <input
                        type="number"
                        value={underwear}
                        onChange={(e) => setUnderwear(parseInt(e.target.value))}
                        />
                    </label>
                    <label>
                        Sweatshirt:
                        <input
                        type="number"
                        value={sweatshirt}
                        onChange={(e) => setSweatshirt(parseInt(e.target.value))}
                        />
                    </label>
                    <label>
                        Jacket:
                        <input
                        type="number"
                        value={jacket}
                        onChange={(e) => setJacket(parseInt(e.target.value))}
                        />
                    </label>
                    <div className="actionButtons">
                        <button className="packingButton" id="save" type="submit" onClick={notify}>
                        Save Trip
                        </button>
                        <button className="packingButton" onClick={() => navigate("/")}>
                        Cancel
                        </button>            
                    </div>
                    </form>
                </div>
            ) : (
            <div className="viewList">
            <div className="checklist">
                <h2>Packing List</h2>
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />
                    <label>Shorts: {trip?.shorts}</label>
                </div>
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />
                    <label>Pants: {trip?.pants}</label>
                </div>
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />
                    <label>Shirts: {trip?.shirts}</label>
                </div>
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />  
                    <label>Socks: {trip?.socks}</label>              
                </div>
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />
                    <label>Underwear: {trip?.underwear}</label>              
                </div> 
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />
                    <label>Sweatshirt: {trip?.sweatshirt}</label>              
                </div>
                <div className="packingCheckbox">
                    <input type="checkbox" readOnly checked={false} />
                <   label>Jacket: {trip?.jacket}</label>              
                </div>
            </div>
        
        
            {trip?.complete ? (
                <button onClick={() => navigate("/previoustrips")}> Back </button>
                ) : (
                    <div className="actionButtons">
                    <Link className="editButton" to={`/packing/${trip?._id}`}>Edit Packing</Link>
                    <button id="back" onClick={() => navigate("/")}>
                        Back
                    </button>
                    <button id="complete" onClick={handleComplete}>
                        Trip Completed
                    </button>
                    </div>
                )}
                </div>
            )}
        </div>
    </div>
    );
}
}
