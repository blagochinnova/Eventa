// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const playBtn = document.getElementById('playBtn');
const playControlBtn = document.getElementById('playControlBtn');
const muteBtn = document.getElementById('muteBtn');
const progressBar = document.getElementById('progressBar');

// State
let isPlaying = false;
let isMuted = true;
let currentProgress = 0;

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add event listeners to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

// Video Player Functionality
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButtons();
    
    if (isPlaying) {
        startProgress();
    } else {
        stopProgress();
    }
}

function updatePlayButtons() {
    const playIcon = playBtn.querySelector('i');
    const controlIcon = playControlBtn.querySelector('i');
    
    if (isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        controlIcon.classList.remove('fa-play');
        controlIcon.classList.add('fa-pause');
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        controlIcon.classList.remove('fa-pause');
        controlIcon.classList.add('fa-play');
    }
}

function toggleMute() {
    isMuted = !isMuted;
    const muteIcon = muteBtn.querySelector('i');
    
    if (isMuted) {
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    } else {
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
    }
}

function startProgress() {
    const progressInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(progressInterval);
            return;
        }
        
        currentProgress += 1;
        const percentage = (currentProgress / 165) * 100; // 2:45 = 165 seconds
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
        
        if (percentage >= 100) {
            currentProgress = 0;
            isPlaying = false;
            updatePlayButtons();
            clearInterval(progressInterval);
        }
    }, 1000);
}

function stopProgress() {
    // Progress will stop automatically when isPlaying becomes false
}

// Video event listeners
playBtn.addEventListener('click', togglePlay);
playControlBtn.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', toggleMute);

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animate cards on scroll
function animateCards() {
    const cards = document.querySelectorAll(' .ticket-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize card animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.ticket-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    animateSkillBars();
    animateCards();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to buttons
document.querySelectorAll('.ticket-btn, .quick-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Add glow effect to cards on hover
document.querySelectorAll('.ticket-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
    });

});

// Typing effect for hero title
function typeEffect() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;
    
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.opacity = '1';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
}

// Particle effect for background
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    createParticles();
    
    // Trigger initial animations
    animateCards();
    animateSkillBars();
});


// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        mobileMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        
        // Hide success message
        successMessage.classList.remove('show');
    }
});

// Smooth reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.ticket-btn, .quick-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); --status