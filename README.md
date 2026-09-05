## User Management System (MERN)
A full stack MERN User Management application with a dashboard, user CRUD operations, MongoDB persistence and a custom theming engine built using CSS variables.

## Setup Instructions
## Backend:-
cd backend
npm install
npm run dev

The backend runs on `http://localhost:5000`

.env file:-
MONGO_URI=your_mongodb_atlas_connection_string.
PORT=5000
CLIENT_ORIGIN=http://localhost:5173


## MongoDB Atlas
1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your IP address in Network Access.
4. Get the connection string from **Connect → Drivers**.
5. Add the connection string to MONGO_URI in the .env file.

## Frontend
cd frontend
npm install
npm run dev


The frontend runs on `http://localhost:5173`.

## What Was Implemented

 Dashboard with total users, active/inactive users, and users added this week.
 Full user CRUD operations.
 Search users by name or email.
 Client side and server side validation.
 Delete confirmation.
 MongoDB persistence through an Express REST API.
Four preset themes: Ocean Blue, Violet Dusk, Forest, and Darcula.
 Custom button color override.
Custom font upload.
Live theme changes without page refresh.
Theme preferences persisted using localStorage.

## Theming Architecture

The theming system is built from scratch using React Context and CSS custom properties.

The selected preset, custom button color, and uploaded font are managed through Themecontext. When the theme changes, css variables are updated so the changes are applied across the application immediately.

Theme preferences are stored in localStorage and restored after a page reload.

## Shortcuts Taken and Why
JavaScript was used instead of typeScript to focus more time on the core functionality and theming requirements.
User details are shown in a modal instead of a separate page to keep the implementation simple.
 Authentication was not required for the assignment.
 The application is designed for a small demo dataset.

## Known Issues / Future Improvements

Add pagination for larger user lists.
 Add automated API tests.
Improve handling of large font uploads.
Add real time updates across multiple browser tabs.