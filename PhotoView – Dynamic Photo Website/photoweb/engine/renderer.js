import { camera } from "./camera.js";
import { SPACING, GRID_COLS, TOTAL_WIDTH, TOTAL_HEIGHT, wrap } from "./world.js";

const gallery = document.getElementById("gallery");

function getFocusScale(x, y) {
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 1500; // Increased for massive grid
    return Math.max(0.4, 1 - (distance / maxDistance));
}

export function render(images, forceUpdate = false) {
  if (!gallery || images.length === 0) return;
  
  let frames = gallery.querySelectorAll('.photo-frame');
  
  if (forceUpdate || frames.length !== images.length) {
      gallery.innerHTML = "";
      for (let i = 0; i < images.length; i++) {
          let frame = document.createElement("div");
          frame.className = "photo-frame";
          let img = document.createElement("img");
          img.src = images[i];
          frame.appendChild(img);
          frame.onclick = () => {
              if (window.openPhoto) window.openPhoto(images[i].replace('medium', 'large2x'));
          };
          gallery.appendChild(frame);
      }
      frames = gallery.querySelectorAll('.photo-frame');
  }

  // Exact frame dimensions: 420px width + 12px padding on both sides = 444px total width
  const halfFrameW = 222; 
  const halfFrameH = 150; // Estimated half-height for massive photos

  const worldCenter = ((GRID_COLS - 1) * SPACING) / 2;

  for (let i = 0; i < images.length; i++) {
    const row = Math.floor(i / GRID_COLS);
    const col = i % GRID_COLS;
    
    const worldX = col * SPACING;
    const worldY = row * SPACING;

    const wrappedX = wrap(worldX - camera.x - worldCenter + (TOTAL_WIDTH / 2), TOTAL_WIDTH) - (TOTAL_WIDTH / 2);
    const wrappedY = wrap(worldY - camera.y - worldCenter + (TOTAL_HEIGHT / 2), TOTAL_HEIGHT) - (TOTAL_HEIGHT / 2);

    const finalX = wrappedX - halfFrameW;
    const finalY = wrappedY - halfFrameH;

    const skewX = camera.velocityY * 0.05;
    const skewY = camera.velocityX * 0.05;
    const focus = getFocusScale(wrappedX, wrappedY);
    
    const frame = frames[i];
    frame.style.transform = `
      translate3d(${finalX}px, ${finalY}px, 0)
      scale(${focus})
      skew(${skewX}deg, ${skewY}deg)
    `;
    
    const dist = Math.sqrt(wrappedX*wrappedX + wrappedY*wrappedY);
    frame.style.opacity = Math.max(0, 1 - (dist / (TOTAL_WIDTH * 0.5)));
    frame.style.pointerEvents = frame.style.opacity > 0.5 ? "auto" : "none";
  }
}
