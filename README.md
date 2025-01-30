# Packing Planner

Packing Planner is a web application designed to help users plan what to pack and organize their trips. It allows users to create trips, manage packing lists, and view weather forecasts for their destinations.

## Features

* Create and manage trips
* Dynamically populate packing lists based on weather
* Edit quantity of items packing lists
* View weather forecasts for trip destinations
* Sort trips by location

## Features on Deck

* More detailed sorting and filtering options
* Ability to add custom items to a packing list
* Adding "user profile" feature
* Functional checkboxes on the packing list
* Automatic completion when a trip passes end date
* Ability to have longer trips, and specify start and end dates
* Add images based on selected trip location

## Built With

* [**Node.js**](https://nodejs.org/en) - Provides the server-side environment for handling asynchronous operations and network requests.
* [**React**](https://react.dev/) - Used for building the dynamic user interface of the app.
* [**MongoDB**](https://www.mongodb.com/) - Serves as the database for storing user data and packing lists with flexible schema.
* [**Firebase**](https://firebase.google.com/) - Used for functions and hosting, providing backend services and deployed site.
* **Vanilla CSS** - Styles the application, using flexbox and media queries for responsive design.
* [**React Router**](https://reactrouter.com/) - Handles in-app routing, allowing navigation without full page reloads.
* **React Context** - Manages global state across the app without prop-drilling, simplifying state sharing.
* **React State** - Manages component state for interactive features such as form inputs and toggles.
* [**Express.js**](https://expressjs.com/) - Web framework for Node.js, used for building the server-side logic and handling routes.
* [**Axios**](https://axios-http.com/docs/intro) - Facilitates making HTTP requests from the front end to the server, handling network communication.
* [**Date-fns**](https://date-fns.org/) - Provides utility functions for manipulating JavaScript dates in a fast, lightweight manner.
* [**React Toastify**](https://www.npmjs.com/package/react-toastify) - Displays toast notifications for real-time user feedback and alerts.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```
git clone https://github.com/maiyajanay/packing-planner.git
```

2. Navigate to the correct directory

```
cd packing-planner
cd frontend
```

3. Install the dependencies:

```
npm install
```

### Running the Application

1. Start the development server:

```
npm run dev
```

## Project Structure
* src/: Contains the source code for the application
* components/: Contains the React components
* context/: Contains the context providers and hooks
* models/: Contains the TypeScript models
* services/: Contains the API service functions
* styles/: Contains the CSS files
* App.tsx: The main application component
* index.tsx: The entry point for the React application

## Authors

* **Maiya Hoard** - [LinkedIn](https://www.linkedin.com/in/maiyahoard/)
* **Greg Robinson** - [LinkedIn](https://www.linkedin.com/in/gregory-robinson79/)

## Acknowledgments

* Grand Circus Coding Bootcamp
* Matthew Fanto
* Henry Overholt

## Contact
If you have any questions or feedback, feel free to reach out to me at [maiyajanay@gmail.com].
