# 🌍 Voyage AI - AI-Powered Travel Planner

Voyage AI is an intelligent travel planning web application that helps users generate personalized travel itineraries using Google Gemini AI, Google Places API, and user preferences. With seamless Google authentication and a user-friendly interface, it makes trip planning efficient, smart, and fun.

---

## ✨ Features

- 🔐 **Google Authentication**: Secure login/signup with Google OAuth 2.0.
- 🧠 **AI Trip Planning**: Personalized trip generation using Google Gemini AI.
- 📍 **Location Search**: Integrated with Google Places Autocomplete for selecting destinations.
- 💰 **Budget & Preferences Input**: Choose your budget, number of travelers, and trip type.
- 🗺️ **My Trips Dashboard**: View saved trips with details and images.
- 📸 **Dynamic Image Fetching**: Location images auto-fetched and displayed in trip cards.
- 🧾 **Trip Summary Dialog**: Shows AI-generated trip details in a popup before saving.
- ✅ **Form Validation & Feedback**: User-friendly alerts and validations.
- 🪄 **Smooth UI/UX**: Built with modern design and reusable React components.

---

## 💼 Use Cases

- **Students & Backpackers**: Plan budget-friendly weekend getaways.
- **Families**: Organize multi-day vacations based on group size and interests.
- **Professionals**: Quickly find short travel breaks based on availability.
- **Solo Travelers**: Discover new destinations with personalized recommendations.
- **Developers**: Explore how to integrate AI + Google APIs in real-world applications.

---

## 🧰 Tech Stack

### Frontend
- React (v19+)
- React Router
- Vite
- Google Places Autocomplete
- Google OAuth
- Tailwind CSS / Custom CSS Modules

### Backend
- Firebase Firestore (for saving user trips)
- Firebase Auth (Google Sign-In)
- Google Gemini AI API (Gemini 2.5 Flash)

---

## ⚙️ Setup Instructions
- **Install Dependencies**
  -npm install
- **Create .env file**
  -VITE_GOOGLE_PLACE_API_KEY = your api key 
  -VITE_GOOGLE_GEMINI_API_KEY = your api key 
  -VITE_GOOGLE_OUTH_CLIENT_ID = your api key 
- **Start the Dev Server**
  -npm run dev
- **Required Packages**
  -npm install react-router-dom firebase react-google-places-autocomplete react-icons sonner
  -npm install @google/generative-ai

---
   
