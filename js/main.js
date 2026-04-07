document.querySelectorAll("nav a, .explore-link, .teaser-link, .home-play").forEach(link => {
  link.addEventListener("click", (event) => {
    const targetId = link.dataset.target;
    if (targetId) {
      event.preventDefault();
      const index = [...sections].findIndex(s => s.id === targetId);
      if (!locked && index !== -1) {
        goToSection(index);
      }
    }
  });
});

// CHARACTER PAGE HAHAHA
document.querySelectorAll(".character-icon").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".character-icon").forEach(icon => {
      icon.classList.remove("active");
    });


    button.classList.add("active");

    
    const characterName = button.dataset.name;
    const characterDescription = button.dataset.description;
    const characterImageSrc = button.dataset.image;
    const characterImage = document.getElementById("character-image");

    
    if (characterImage) {
      characterImage.style.opacity = "0";
      setTimeout(() => {
        characterImage.src = characterImageSrc;
        document.getElementById("character-name").textContent = characterName;
        document.getElementById("character-description").textContent = characterDescription;
        characterImage.style.opacity = "1";
      }, 150);
    }
  });
});

// fr transitions
if (document.getElementById("character-image")) {
  document.getElementById("character-image").style.transition = "opacity 0.3s ease";
}

/* ====================================
   GALLERYYYYYYYY
==================================== */



function initGallery() {
  const mainImage = document.getElementById('gallery-main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const dots = document.querySelectorAll('.pagination .dot');

  if (!mainImage || thumbnails.length === 0) return;

  const galleryImages = Array.from(thumbnails).map((thumbnail) => {
    const thumbImg = thumbnail.querySelector('img');
    return thumbImg ? thumbImg.src : '';
  });

  if (galleryImages[0]) {
    mainImage.src = galleryImages[0];
  }

  /**
   * Update gallery display
    @param {number} index 
   */
  function updateGallery(index) {
    const selectedSrc = galleryImages[index] || '';
    if (!selectedSrc) return;

    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = selectedSrc;
      mainImage.style.opacity = '1';
    }, 150);

    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // thumbnail clicks
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      updateGallery(index);
    });
  });

  // dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateGallery(index);
    });
  });

  // transition for main image
  mainImage.style.transition = 'opacity 0.4s ease';
}

// gallery initializtion
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}

/* ====================================
   REUSABLE SCROLL FADE-IN ANIMATIONS
==================================== */


function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-stagger').forEach(element => {
    observer.observe(element);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
