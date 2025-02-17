// Hiệu ứng loading
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.classList.add('loading-finished');
        setTimeout(() => loader.remove(), 1000);
    }
});

// Hiệu ứng menu sticky
let nav = document.querySelector('nav');
let navTop = nav.offsetTop;

function stickyNav() {
    if (window.scrollY >= navTop) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickyNav);

// Hiệu ứng fade-in khi scroll
const fadeElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Hiệu ứng parallax cho header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.pageYOffset;
    header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Animation cho gallery
const galleryImages = document.querySelectorAll('#gallery img');
galleryImages.forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        this.style.zIndex = '1';
    });
    img.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.zIndex = '0';
    });
});

// Hiệu ứng cho menu items
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.classList.add('menu-item-hover');
    });
    item.addEventListener('mouseleave', function() {
        this.classList.remove('menu-item-hover');
    });
});

// Form validation và animation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('button[type="submit"]');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Hoàn tất!';
            button.classList.add('success');
        }, 2000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  };

  const displayScrollElement = element => {
    element.classList.add('active');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      }
    })
  }

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
});

// Observer cho các hiệu ứng scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Ngừng theo dõi sau khi hiệu ứng đã chạy
        }
    });
}, observerOptions);

// Áp dụng cho tất cả các phần tử có class scroll-reveal
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.scroll-reveal, .fade-in, .slide-in');
    elements.forEach(el => observer.observe(el));
});

// Thêm tính năng kéo thả cho carousel
function enableDragging(carouselClass) {
  const carousel = document.querySelector(carouselClass);
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.clientX;
    previousTranslate = currentTranslate;
    carousel.style.cursor = 'grabbing';
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    const diff = currentPosition - startPosition;
    currentTranslate = previousTranslate + diff;
    carousel.scrollLeft = -currentTranslate;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
  });
}

// Áp dụng cho cả hai carousel
document.addEventListener('DOMContentLoaded', () => {
  enableDragging('.dishes-carousel');
  enableDragging('.testimonials-slider');
}); 
