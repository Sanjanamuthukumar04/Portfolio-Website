// portfolio.js

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Toggle sections with animation
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const icon = section.previousElementSibling.querySelector('.toggle-icon');
    
    // Toggle the section
    section.classList.toggle('active');
    icon.textContent = section.classList.contains('active') ? '-' : '+';
}

// Smooth scrolling to sections with header offset
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Find the section header within the section
        const sectionHeader = section.querySelector('.section-header') || section.querySelector('h2, h3') || section;

        if (sectionHeader) {
            // Auto-expand if collapsed
            const contentId = `${sectionId}-content`;
            const content = document.getElementById(contentId);
            const wasCollapsed = content && !content.classList.contains('active');
            
            if (wasCollapsed) {
                // First expand the section
                toggleSection(contentId);
                
                // Wait for the expansion animation to complete (500ms matches CSS transition)
                setTimeout(() => {
                    scrollToHeader(sectionHeader);
                }, 500); // Matches the CSS transition duration
            } else {
                // Scroll immediately if already expanded
                scrollToHeader(sectionHeader);
            }
        }
    }
}

// Helper function for the actual scrolling
function scrollToHeader(headerElement) {
    const headerHeight = document.getElementById('mainHeader').offsetHeight;
    const elementPosition = headerElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra padding
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animations on scroll with intersection observer
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-container, .section-container').forEach(element => {
        fadeInObserver.observe(element);
    });

    // Animate the about section immediately
    document.querySelector('.content-container').classList.add('fade-in');
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add hover effect to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });

    // Add animation to images on hover
    const images = document.querySelectorAll('.section-img, .research-img, .leadership-img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1.03)';
        });
    });

    // Initialize typewriter effect
    typeWriterEffect();
});

// Typewriter effect for the name title
function typeWriterEffect() {
    const nameTitle = document.querySelector('.name-title');
    if (nameTitle) {
        const text = nameTitle.textContent;
        nameTitle.textContent = '';
        
        let i = 0;
        const speed = 100; // typing speed in ms
        
        function type() {
            if (i < text.length) {
                nameTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
}