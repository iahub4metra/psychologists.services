# Psychologists.services

**Psychologists.services** is a modern web platform for browsing, filtering, and booking consultations with professional psychologists. The app features an intuitive UI, responsive design, and allows users to interact with psychologist profiles — add to favourites, read reviews, and make appointments.

---

### Live Demo

[Visit app](https://psychologists-services-iota.vercel.app/)

---

### 🧠 Project Description

This project helps users easily find a qualified psychologist.  
The platform allows:

-   🔍 Filtering by rating, price, experience
-   ❤️ Adding psychologists to favourites
-   📅 Booking appointments
-   ✨ Reading reviews from other users

It is fully responsive and optimized for performance and user experience.

---

### Features

-   User authentication
-   Responsive design for all screen sizes
-   Browse detailed psychologist profiles
-   Add psychologists to favourites
-   Filter by popularity, price, experience, etc.
-   Book appointments directly through the platform
-   Ratings and reviews for each specialist
-   Integration with Firebase and REST API

---

### Technologies used

-   **React**
-   **TypeScript**
-   **Vite**
-   **Redux Toolkit**
-   **CSS Modules**
-   **Tailwind CSS**
-   **REST API**
-   **Firebase Authentication & Realtime Database**

---

### 🎨 Layout / Mockup

Figma layout was used as a reference.  
[Mockup](https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design&t=4zfT2zFANRbp1fCK-0)

---

### 📋 Technical Specification

-   Firebase Realtime Database used for storage
-   Each authenticated user can have their own favourites list
-   App fetches data with pagination
-   Favourites stored per user
-   Dynamic UI based on login state
-   Data validation and optimistic UI updates
-   Skeleton loading implemented for smoother UX
-   Includes basic error handling and notifications

---

# Installation and Setup Instructions

Follow these steps to install and run the project locally.

## 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/iahub4metra/psychologists.services
cd psychologists.services
```

## 2. Install Dependencies

Install all necessary dependencies using npm or yarn:

```bash
npm install
```

```bash
yarn install
```

## 3. Start the Development Server

Run the following command to start the local development server:

```bash
npm run dev
```

```bash
yarn dev
```

Once the server is running, you will see a URL in the terminal, typically http://localhost:5173. Open this URL in your browser to view the project.

## 4. Build for Production

To create an optimized build of the project, use the following command:

```bash
npm run build
```

```bash
yarn build
```

The build will be generated in the dist folder.

---

## Author

Artem Buhai

Frontend Developer

[GitHub](https://github.com/iahub4metra) | [LinkedIn](https://www.linkedin.com/in/artem-buhai/)
