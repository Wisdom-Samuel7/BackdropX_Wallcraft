# 🖼️ Wallpaper Studio

**Wallpaper Studio** is a modern, smooth, and customizable wallpaper management app built with **React Native** and **Expo**.  
It allows users to browse, favorite, and set high-quality wallpapers — featuring beautiful animations, clean design, and easy navigation.

---

## ✨ Features

- 🎨 **Dynamic UI** — sleek and responsive layout with gradient headings and icon navigation.  
- 🧱 **Grid-based Settings Screen** — includes a right-side random image layout for enhanced visuals.  
- 💾 **Favorites & Browsing** — explore and save wallpapers effortlessly.  
- ⚙️ **Custom Settings** — manage image quality, notifications, and user preferences.  
- 🚀 **Framer Motion Animations** — smooth transitions with a modern look.  
- 🌗 **Light & Dark Friendly** — minimalist design that works across themes.

---

## 📁 Project Structure

src/
├── Comp/
│ ├── Navbar.js
│ ├── Search.js
├── data/
│ └── wallpaper.js
├── screens/
│ ├── SettingScreen.js # Includes grid layout with side image
│ ├── BrowseScreen.js
│ ├── FavouriteScreen.js
│ └── HomeScreen.js
├── App.js

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash

cd wallpaper-studio
2️⃣ Install dependencies
bash
Copy code
npm install
or

bash
Copy code
yarn install
3️⃣ Start the project
bash
Copy code
npx expo start
Then scan the QR code with your Expo Go app or run it on an emulator.

🧩 Build with Expo EAS
To generate builds for Android or iOS:

Development Preview

bash
Copy code
npx eas build -p android --profile preview
Production Release

bash
Copy code
npx eas build -p android --profile production
For iOS

bash
Copy code
npx eas build -p ios --profile production
To publish lightweight JS updates (no rebuild needed):

bash
Copy code
npx expo publish
🔧 Environment Requirements
Tool	Version
Node.js	≥ 18.x
npm / yarn	Latest
Expo CLI	≥ 51
React Native	≥ 0.75

🧠 Tech Stack
React Native

Expo

Expo Router

Framer Motion (for animation)

Linear Gradient

MaskedView

Ionicons

👨‍💻 Development Commands
Command	Description
expo start	Run the app locally
expo publish	Publish OTA update
eas build -p android	Build Android app
eas build -p ios	Build iOS app
git add . && git commit -m "update"	Save changes locally
git push origin main	Push code to GitHub

🧾 Version Control Workflow
Check changes

bash
Copy code
git status
Add all updates

bash
Copy code
git add .
Commit

bash
Copy code
git commit -m "Added grid layout with right-side image in Settings"
Push to GitHub

bash
Copy code
git push origin main
Your deployment host (Render, Netlify, etc.) will auto-build if connected.

📸 Preview
Settings Screen	Home Screen

🧾 License
This project is licensed under the MIT License — feel free to modify, improve, and distribute it.

💡 Author
Wisdom Samuel
📍 Developer | UI/UX Designer | Mobile Engineer
🔗 LinkedIn  |  GitHub

Wallpaper Studio — Crafted with creativity, powered by Expo.

yaml
Copy code
