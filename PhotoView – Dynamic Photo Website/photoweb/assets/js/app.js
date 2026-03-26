import { camera, updateCamera } from "../../engine/camera.js";
import { render } from "../../engine/renderer.js";

let images = [];
const searchInput = document.getElementById("search");
const floatingView = document.getElementById("floating-view");
const floatingImg = document.getElementById("floating-img");
const downloadBtn = document.getElementById("download-btn");
const likeBtn = document.getElementById("like-btn");
const closeBtn = document.getElementById("close-view");
const toast = document.getElementById("toast");

function showToast(msg) {
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// Blocked keywords for NSFW content
const blockedWords = ["adult", "porn", "sex", "nsfw", "xxx", "nude", "erotic", "hentai", "bikini", "lingerie"];

function isQuerySafe(q) {
    const query = q.toLowerCase();
    return !blockedWords.some(word => query.includes(word));
}

async function loadImages(query = "nature") {
  if (!isQuerySafe(query)) {
    showToast("Safety Alert: Restricted Content 🚫");
    return;
  }

  showToast(`Exploring ${query}... 🔍`);
  
  try {
    const res = await fetch(`api/photos.php?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    
    if (res.ok && data.photos && data.photos.length > 0) {
        images = data.photos.map(p => ({
            url: p.src.large2x || p.src.large,
            thumb: p.src.medium
        }));
        // Re-render the 2D infinite cloud with new data
        render(images.map(img => img.thumb), true); 
    } else if (data.error) {
        showToast(`Error: ${data.error} ❌`);
    } else {
        showToast("No safe photos found for this search.");
    }
  } catch (error) {
    console.error("Search failed", error);
    showToast("Server Connection Issue 🌐 Check Console.");
  }
}

// Floating View Actions
window.openPhoto = (url) => {
    floatingImg.src = url;
    floatingView.classList.add("active");
    likeBtn.classList.remove("liked");
};

likeBtn.onclick = () => {
    likeBtn.classList.toggle("liked");
    showToast(likeBtn.classList.contains("liked") ? "Liked! 👍" : "Removed from Favorites");
};

async function downloadPhoto(url) {
    showToast("Downloading...");
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `photoview-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Saved! 📥");
    } catch (e) {
        showToast("Download Failed ❌");
    }
}

downloadBtn.onclick = () => downloadPhoto(floatingImg.src);

closeBtn.onclick = () => {
    floatingView.classList.remove("active");
    floatingImg.src = "";
};

function loop() {
  updateCamera();
  render(images.map(img => img.thumb));
  requestAnimationFrame(loop);
}

window.addEventListener("wheel", e => {
  camera.targetY += e.deltaY;
  camera.targetX += e.deltaX;
});

if (searchInput) {
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const val = e.target.value.trim();
            if (val.length > 0) {
                loadImages(val);
                e.target.blur(); // Dismiss keyboard on mobile
            }
        }
    });
}

// Initial Load
loadImages();
loop();
