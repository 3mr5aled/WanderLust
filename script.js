// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroSlider();
    initTestimonialSlider();
    initScrollAnimations();
    initContactForm();
    initSearchForm();
    initSmoothScrolling();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active navigation highlighting for homepage sections only
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-play slider
    setInterval(nextSlide, 5000);

    // Manual navigation
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Auto-play testimonials
    setInterval(nextTestimonial, 4000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .destination-card,
        .package-card,
        .stat,
        .section-title,
        .section-subtitle
    `);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 40);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Search form functionality
function initSearchForm() {
    const searchBtn = document.querySelector('.search-btn');
    const destinationSelect = document.getElementById('destination');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsSelect = document.getElementById('guests');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);

    // Update checkout minimum date when checkin changes
    checkinInput.addEventListener('change', () => {
        checkoutInput.setAttribute('min', checkinInput.value);
        if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
            checkoutInput.value = '';
        }
    });

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const destination = destinationSelect.value;
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = guestsSelect.value;

        if (!destination) {
            showNotification('Please select a destination', 'error');
            return;
        }

        if (!checkin || !checkout) {
            showNotification('Please select check-in and check-out dates', 'error');
            return;
        }

        if (new Date(checkout) <= new Date(checkin)) {
            showNotification('Check-out date must be after check-in date', 'error');
            return;
        }

        // Simulate search
        showNotification('Searching for available packages...', 'info');
        
        setTimeout(() => {
            // Check if destination has a dedicated page
            const selectedOption = destinationSelect.options[destinationSelect.selectedIndex];
            const destinationUrl = selectedOption.getAttribute('data-url');
            
            if (destinationUrl) {
                showNotification(`Redirecting to ${destination} page...`, 'success');
                setTimeout(() => {
                    window.location.href = destinationUrl;
                }, 1000);
            } else {
                showNotification(`Found packages for ${destination} (${guests} guest${guests > 1 ? 's' : ''})`, 'success');
                // Scroll to packages section
                document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Package booking functionality
function initPackageBooking() {
    const bookingBtns = document.querySelectorAll('.package-card .btn-primary');
    
    bookingBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const packageCard = this.closest('.package-card');
            const packageTitle = packageCard.querySelector('h3').textContent;
            const packagePrice = packageCard.querySelector('.package-price').textContent;
            
            showBookingModal(packageTitle, packagePrice);
        });
    });
}

// Booking modal functionality
function showBookingModal(title, price) {
    // Create modal HTML
    const modalHTML = `
        <div class="booking-modal" id="bookingModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book ${title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="package-info">Package: ${title} - ${price}</p>
                    <form id="bookingForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingName">Full Name</label>
                                <input type="text" id="bookingName" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingEmail">Email</label>
                                <input type="email" id="bookingEmail" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingPhone">Phone</label>
                                <input type="tel" id="bookingPhone" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingGuests">Number of Guests</label>
                                <select id="bookingGuests" required>
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4+ Guests</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bookingDate">Preferred Date</label>
                                <input type="date" id="bookingDate" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingDuration">Duration (days)</label>
                                <select id="bookingDuration" required>
                                    <option value="3">3 Days</option>
                                    <option value="5">5 Days</option>
                                    <option value="7">7 Days</option>
                                    <option value="10">10 Days</option>
                                    <option value="14">14 Days</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="bookingRequests">Special Requests</label>
                            <textarea id="bookingRequests" rows="3" placeholder="Any special requirements or requests..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('bookingModal');
    const closeBtn = modal.querySelector('.close-btn');
    const bookingForm = document.getElementById('bookingForm');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    function closeModal() {
        modal.remove();
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        showNotification('Processing your booking...', 'info');
        
        setTimeout(() => {
            showNotification('Booking confirmed! We will contact you soon with details.', 'success');
            closeModal();
        }, 2000);
    });
}

// Newsletter subscription
function initNewsletterSubscription() {
    const newsletterBtn = document.querySelector('.newsletter button');
    const newsletterInput = document.querySelector('.newsletter input');

    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        showNotification('Subscribing...', 'info');
        
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterInput.value = '';
        }, 1500);
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid #007bff;
        }
        
        .notification-success { border-left-color: #28a745; }
        .notification-error { border-left-color: #dc3545; }
        .notification-info { border-left-color: #007bff; }
        
        .notification-content {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-message {
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #999;
            cursor: pointer;
            margin-left: 15px;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;

    // Add styles if not already added
    if (!document.querySelector('#notificationStyles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notificationStyles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPackageBooking();
    initNewsletterSubscription();
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    const scrollToTopStyles = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
        }
    `;
    
    // Add styles
    if (!document.querySelector('#scrollToTopStyles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'scrollToTopStyles';
        styleSheet.textContent = scrollToTopStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);