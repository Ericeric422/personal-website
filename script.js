

// Array of image URLs to choose from (modify these URLs as needed)
const imageUrls = [
  "images/eca1cbe0af5fc7b824bee187a1c8f3dc.jpg",
  "images/divorce-selfie-v0-px5vs92u42ce1.webp",
  "images/jobApplication.jpg",
  "images/87c889f42b94baca5433ca0406cac622.jpg",
  "images/85aa6afe1da8e2145109802222e5cfa0.jpg",
  "images/13khg5.jpg",
  "images/rvmfutfajs4f1.jpeg",
  "images/hq720.jpg",
];

// Preload the images for immediate display
imageUrls.forEach(url => {
  const img = new Image();
  img.src = url;
});

// Array of sound URLs to cycle through (modify these URLs as needed)
const soundUrls = [
  "sounds/let-me-know.mp3",
  "sounds/lobotomy-sound-effect.mp3",
  "sounds/spongebob-fail.mp3",
  "sounds/vine-boom-sound-effect(chosic.com).mp3",
  "sounds/among-us-role-reveal-sound.mp3",
];

// Preload the audio files as Audio objects
const soundObjects = soundUrls.map(url => {
  const audio = new Audio(url);
  audio.preload = "auto";
  return audio;
});

// Track which sound to play next
let currentSoundIndex = 0;

const flashButton = document.getElementById("flashButton");
const flashOverlay = document.getElementById("flashOverlay");

flashButton.addEventListener("click", function() {
  // Select a random image from the array
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const selectedImageUrl = imageUrls[randomIndex];
  
  // Set the chosen image as the background of the overlay
  flashOverlay.style.backgroundImage = `url('${selectedImageUrl}')`;
  
  // Immediately display the overlay without any fade-in
  flashOverlay.style.display = "block";
  flashOverlay.style.transition = "none";  // Disable transition
  flashOverlay.style.opacity = 1;
  
  // Force a reflow so the immediate styles are applied
  flashOverlay.offsetHeight;
  
  // Re-enable the opacity transition for the fade-out effect later
  flashOverlay.style.transition = "opacity 0.5s ease-in-out";
  
  // Play the next sound in the cycle
  const currentAudio = soundObjects[currentSoundIndex];
  currentAudio.currentTime = 0;
  currentAudio.play();
  
  // Update the index to cycle through sounds
  currentSoundIndex = (currentSoundIndex + 1) % soundObjects.length;
  
  // After 1 second, fade out the overlay
  setTimeout(() => {
    flashOverlay.style.opacity = 0;
    // Once the fade-out is completed after 0.5 seconds, hide the overlay
    setTimeout(() => {
      flashOverlay.style.display = "none";
    }, 500);
  }, 400);
});