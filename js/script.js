// Smooth scrolling functionality
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Active navigation highlighting
function updateActiveNavigation() {
  const sections = ["home", "about", "tickets", "community", "footer"];
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "home";

  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section;
      }
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(0, 0, 0, 0.9)";
  } else {
    header.style.background = "";
  }
}

// Button hover effects
function addButtonEffects() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Ticket card hover effects
function addTicketCardEffects() {
  const ticketCards = document.querySelectorAll(".ticket-card");

  ticketCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Navigation menu click handlers
function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        scrollToSection(targetId);
        closeMobileMenu(); 
        setTimeout(() => {
          window.location.hash = targetId; 
        }, 500); 
      });
    });
  }

// Mobile menu toggle (basic implementation)
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;
  
    if (mobileMenuBtn && closeMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener("click", function () {
        navMenu.classList.add("active");
        body.classList.add("menu-open");
        mobileMenuBtn.style.display = "none";
        closeMenuBtn.style.display = "block";
      });
  
      closeMenuBtn.addEventListener("click", function () {
        closeMobileMenu();
      });
    }
  }
  
  function closeMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const body = document.body;
  
    navMenu.classList.remove("active");
    body.classList.remove("menu-open");
    mobileMenuBtn.style.display = "block";
    closeMenuBtn.style.display = "none";
  }

// Parallax effect for hero section
function addParallaxEffect() {
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Fade in animation for sections
function addFadeInAnimation() {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();
  setupMobileMenu();
  addButtonEffects();
  addTicketCardEffects();
  addFadeInAnimation();

  // Add scroll event listeners
  window.addEventListener("scroll", function () {
    updateActiveNavigation();
    handleHeaderScroll();
  });

  // Add resize event listener for responsive adjustments
  window.addEventListener("resize", function () {
    // Handle any responsive adjustments here
  });

  // Initialize active navigation
  updateActiveNavigation();
});

// Additional utility functions

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Get current section
function getCurrentSection() {
  const sections = ["home", "about", "tickets", "community", "footer"];

  for (let section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        return section;
      }
    }
  }
  return "home";
}
