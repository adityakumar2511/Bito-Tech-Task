//mobile toggle button

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

  mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


//image slider and change slider 
const slider = document.getElementById                                                        ("sliderImage");
let images = [];
let current = 0;
let autoSlider;
  
async function fetchImages() {
  try {
    const res = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
    const data = await res.json();
    images = data.map(img => `https://picsum.photos/id/${img.id}/800/500`);
    if (images.length > 0) {
      showImage(0);
      autoSlider = setInterval(nextImage, 3000);
    } else {
      slider.alt = "No images found.";
    }
  } catch (error) {
    console.error("Failed to fetch images", error);
    slider.alt = "Error loading images.";
  }
}

function showImage(index) {
  if (images[index]) {
    slider.src = images[index];
    current = index;
  }
}

function nextImage() {
  current = (current + 1) % images.length;
  showImage(current);
}
  
function jumpToImage(index) {
  clearInterval(autoSlider);
  showImage(index);
  autoSlider = setInterval(nextImage, 3000);
}
window.onload = fetchImages;