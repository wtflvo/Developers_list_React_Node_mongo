Overview
This project is a full-stack application that leverages MongoDB for the database, Node.js for the server-side logic, and ReactJS for the client-side interface.

Prerequisites
Before running the project, ensure you have the following installed on your machine:

MongoDB: The database server. Install MongoDB
Node.js: The runtime for executing server-side JavaScript. Install Node.js
ReactJS: Front-end library for building the user interface. (Included as part of the project dependencies)
Getting Started
1. Clone the Repository

2. Install Dependencies

Navigate to the server directory and install the required dependencies:


cd server
npm install


Client
Navigate to the client directory and install the required dependencies:


cd ../front/crud_react_
npm install

3. Configure MongoDB
Ensure MongoDB is running on your local machine or update the connection string in the server configuration to point to your MongoDB instance.

4. Start the Application
Start the Server
Navigate to the server directory and start the server:

node index 


Start the Client
Navigate to the client directory and start the React application:


npm run start

The server will be running on http://localhost:5000 by default, and the client will be running on http://localhost:3000.

