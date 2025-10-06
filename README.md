# Interlinked

A collaborative project management platform for government departments designed to prevent resource wastage and improve urban planning through real-time data visualization.

---

## Table of Contents

- [About The Project](#about-the-project)
  - [Problem Statement](#problem-statement)
  - [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Project Status](#project-status)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## About The Project

**Interlinked** is a web-based platform that addresses the critical lack of coordination between government departments. By providing a centralized system with a live, interactive map, it allows different bodies to visualize each other's ongoing and upcoming physical projects.

This transparency prevents costly and inefficient situations, such as a newly paved road being dug up by another department, thereby saving public funds, reducing public inconvenience, and promoting smarter, more sustainable urban development.

### Problem Statement

Urban project management currently suffers from a critical lack of coordination between government departments. This disconnect frequently results in costly inefficiencies, such as the repetitive excavation of newly constructed roads by different agencies. This cycle of redundant work leads to a significant waste of public funds and resources, causes prolonged public inconvenience, and hinders effective urban planning.

### Key Features

* **Live Interactive Map:** Visualizes all ongoing and planned physical projects across the city using the Google Maps Platform.
* **Centralized Project Management:** Allows departments to create, update, and manage their project listings.
* **Collaboration Hub:** Helps departments identify project overlaps and facilitates inter-departmental communication.
* **Anonymous Public Reporting:** A portal for citizens to report concerns, enhancing transparency and accountability.
* **AI-Powered Moderation:** Uses Google's Gemini API to automatically filter hate speech from public submissions, ensuring constructive feedback.

## Built With

This project is built with a modern, scalable technology stack:

* **Frontend:** [React.js](https://reactjs.org/)
* **Backend & Database:** [Google Firebase](https://firebase.google.com/)
    * Firestore
    * Firebase Authentication
    * Cloud Functions
* **Mapping Services:** [Google Maps Platform](https://maps.google.com/)
* **Artificial Intelligence:** [Google's Gemini API](https://ai.google.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.
* npm
    ```sh
    npm install npm@latest -g
    ```

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone https://github.com/atulks26/interlinked.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd interlinked
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up environment variables**
    Create a `.env.local` file in the root of your project and add the following configuration variables. You will need to create projects on the Google Cloud/Firebase and Google AI platforms to get these keys.

    ```env
    # Google Maps API Key
    REACT_APP_MAP_API="YOUR_GOOGLE_MAPS_API_KEY"
    ```
5.  **Run the application**
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Project Status

The project is currently in the initial development phase.
* ✅ **Frontend UI:** The user interface, built with React, is complete.
* 🗺️ **Map Visualization:** The Google Maps integration is functional and currently demonstrates core features using hardcoded sample data.
* ⏳ **Backend:** The next major phase is the development and integration of the Firebase backend.

## Roadmap

The following key tasks are planned to bring the project to completion:

1.  **Backend Development:** Build the application's backend using Google Firebase. This involves configuring the Firestore database schema and implementing secure, role-based user authentication.

2.  **Full-Stack Integration:** Connect the React frontend to the Firebase backend. The main goal is to replace all hardcoded sample data with live information and enable full CRUD (Create, Read, Update, Delete) functionality for managing projects.

3.  **Advanced Feature Implementation:** Integrate the platform's intelligent features, including using the Gemini API for AI-powered content moderation and building an automated notification system with Cloud Functions.

## License

Distributed under the MIT License.
