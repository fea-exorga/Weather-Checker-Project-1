# 🌤️ Weather Checker

A real-time weather tracking application that lets you see current conditions for cities around the globe. Built as part of a development project to master React state management, API integration, and clean UI design.

**[Visit Live Website](https://weather-checker-project-1.vercel.app)**

---

## Tech Stack
* **Frontend:** React, JavaScript (ES6+)
* **Styling:** CSS3 (Flexbox/Grid)
* **Data Source:** [OpenWeatherMap API](https://openweathermap.org/)
* **Deployment:** Vercel (CI/CD)

---

## Features
* **Real-time Updates:** Fetches live weather conditions, including temperature, humidity, and wind speed.
* **Unit Conversion:** Seamlessly toggle between Metric (°C) and Imperial (°F).
* **Search History:** Tracks your last 10 searches for quick access to previous locations.
* **Dynamic Backgrounds:** UI that adapts based on the city searched.
* **Responsive Design:** Optimized for both desktop and mobile viewing.

---

## 🏗️ Architecture & Technical Decisions
This project utilizes a **component-driven architecture**, separating concerns between data fetching, utility logic, and presentation.
* **Optimization:** Temperature conversion is handled by a pure utility function, ensuring the "source of truth" remains constant while transformations occur only at the display layer.
* **Persistence:** `localStorage` is used to maintain search history across browser sessions.

---

## ⚙️ How It Works (Data Lifecycle)
1. **Initialization:** The app mounts and fetches default data.
2. **Sanitization:** User input is trimmed and lowercased before hitting the API.
3. **Persistence:** Successfully fetched weather data is pushed to a state array and synced with browser storage.
4. **Display Logic:** The UI reacts instantly to unit changes without redundant API requests.

---

## 📦 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/fea-exorga/Weather-Checker-Project-1.git
   ```
2. **Navigate to the folder:**
   ```bash
   cd Weather-Checker-Project-1
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Add API Key:** Create a `.env` file in the root and add:
   ```text
   VITE_API_KEY=your_openweathermap_api_key_here
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
---

## 🤝 Contributing
Contributions are welcome! If you find a bug or want to suggest a feature, please feel free to:
1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
