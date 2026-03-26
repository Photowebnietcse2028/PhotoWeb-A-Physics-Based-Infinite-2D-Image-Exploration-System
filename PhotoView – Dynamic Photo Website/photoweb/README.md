# 📸 PhotoView – Dynamic Photo Website

**PhotoView** is a high-performance, immersive photo exploration engine inspired by premium interactive portfolios (like Nicola Romei). It features a multi-directional infinite 2D scroll, momentum-based physics, and a hardware-accelerated rendering pipeline.

---

## 👨‍💻 Credits
Developed by:
* **Avneesh Kumar**
* **Arnav Srivastava**
* **Aryan Chaturvedi**

---

## 🚀 Key Features
*   **Infinite 2D Cloud:** Explore an endless world of photos that wraps seamlessly on both X and Y axes.
*   **Nicola Romei Aesthetic:** Minimalist, premium photo frames with deep shadows and internal zoom effects on hover.
*   **Momentum Physics (LERP):** Smooth, fluid scrolling using Linear Interpolation and velocity-based skew dynamics.
*   **Floating High-Res Viewer:** Immersive glassy UI for viewing photos with blurred backdrops.
*   **SFW-First Search:** Multi-layer safety filters (frontend + backend) to ensure content is strictly non-NSFW.
*   **Local Download System:** Direct-to-device downloads via Blob streams (no external redirects).
*   **Persistent Dark Mode:** Global theme sync with browser storage.

---

## 📁 Project Structure
```text
photoweb/
├── index.php           # Main entry point & Viewport
├── login.php           # User Authentication (Auth Card)
├── logout.php          # Session Destroyer
├── profile.php         # User Settings & Theme Toggle
│
├── api/
│   └── photos.php      # Pexels API Gateway with Safety Filter
│
├── engine/             # The Core Rendering Engine
│   ├── camera.js       # Kinematics & Momentum Logic
│   ├── circular.js     # (Legacy) Circular Mapping Logic
│   ├── renderer.js     # 2D Infinite Grid & GPU Pipeline
│   └── world.js        # Grid Constants & Wrap Math
│
├── assets/
│   ├── css/style.css   # Premium Nicola Romei Styling
│   └── js/app.js       # Main Application Loop & UI Logic
│
└── includes/
    └── session.php     # Global PHP Session Handler
```

---

## 🛠️ Installation & Setup

### 1. Requirements
*   **XAMPP** (or any server with Apache and PHP support).
*   **Pexels API Key** (Free).

### 2. Get your API Key
1.  Visit [Pexels API](https://www.pexels.com/api/).
2.  Create a free account and request a key.
3.  Open `photoweb/api/photos.php`.
4.  Replace `YOUR_API_KEY` with your actual key on **line 14**.

### 3. Run on Localhost
1.  Move the `photoweb` folder to your server's root (e.g., `C:/xampp/htdocs/` or `/opt/lampp/htdocs/`).
2.  Start **Apache** in the XAMPP Control Panel.
3.  Open your browser and navigate to: `http://localhost/photoweb`

---

## 🧠 Advanced Engine Details

### Multi-Directional Infinite Wrap
The engine uses a mathematical "modulo wrap" system. When a photo frame moves beyond the grid boundary (defined in `world.js`), it is instantly recalculated and repositioned to the opposite side:
`wrappedPos = ((val % max) + max) % max`

### LERP Smoothing
To prevent "jittery" movement, the camera position is updated using Linear Interpolation:
`currentPos += (targetPos - currentPos) * 0.05`

### Center-Focus Scaling
The renderer calculates the distance of each frame from the absolute center of the screen `(0,0)` and applies a dynamic `scale` and `opacity` transformation, ensuring the viewer's focus remains on the central content.

---

## 🎮 Controls
*   **Mouse Wheel / Trackpad:** Scroll in any direction to move the 2D photo cloud.
*   **Search Bar:** Type a keyword and hit **Enter** to explore new categories.
*   **Click Photo:** Open the immersive Floating Viewer.
*   **Icons (Floating View):**
    *   `👍` (Like): Add to favorites with a glassy green glow.
    *   `📥` (Download): Save the high-res image directly to your computer.

---

## 🔒 Safety & Privacy
The system includes a **Safety Filter** that blocks restricted keywords at both the interface and server levels. Categories like "Anime," "Cars," and "Nature" are optimized for high-quality, safe results.
