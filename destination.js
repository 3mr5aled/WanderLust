// Destination page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initDestinationBooking();
    initParallaxEffect();
});

// Gallery functionality
function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');

    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumb
            this.classList.add('active');
            
            // Update main image
            mainImage.src = this.src.replace('w=300', 'w=1000');
            mainImage.alt = this.alt;
            
            // Add fade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 150);
        });
    });
}

// Destination booking functionality
function initDestinationBooking() {
    const bookingBtns = document.querySelectorAll('.btn-primary');
    
    bookingBtns.forEach(btn => {
        if (btn.textContent.includes('Book')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const packageCard = this.closest('.package-card');
                let packageTitle, packagePrice;
                
                if (packageCard) {
                    packageTitle = packageCard.querySelector('h3').textContent;
                    packagePrice = packageCard.querySelector('.package-price').textContent;
                } else {
                    // For main hero button
                    packageTitle = document.querySelector('.destination-info h1').textContent + ' Adventure';
                    packagePrice = 'Custom Quote';
                }
                
                showDestinationBookingModal(packageTitle, packagePrice);
            });
        }
    });
}

// Parallax effect for destination hero
function initParallaxEffect() {
    const destinationBg = document.querySelector('.destination-bg');
    
    if (!destinationBg) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        destinationBg.style.transform = `translateY(${rate}px)`;
    });
}

// Enhanced booking modal for destinations
function showDestinationBookingModal(title, price) {
    const destination = document.querySelector('.destination-info h1').textContent;
    
    const modalHTML = `
        <div class="booking-modal destination-modal" id="destinationBookingModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book Your ${destination} Adventure</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="booking-summary">
                        <div class="summary-item">
                            <strong>Destination:</strong> ${destination}
                        </div>
                        <div class="summary-item">
                            <strong>Package:</strong> ${title}
                        </div>
                        <div class="summary-item">
                            <strong>Price:</strong> ${price}
                        </div>
                    </div>
                    
                    <form id="destinationBookingForm">
                        <div class="form-section">
                            <h4>Personal Information</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">First Name</label>
                                    <input type="text" id="firstName" name="firstName" required>
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h4>Travel Details</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="travelDate">Departure Date</label>
                                    <input type="date" id="travelDate" name="travelDate" required>
                                </div>
                                <div class="form-group">
                                    <label for="travelers">Number of Travelers</label>
                                    <select id="travelers" name="travelers" required>
                                        <option value="">Select...</option>
                                        <option value="1">1 Person</option>
                                        <option value="2">2 People</option>
                                        <option value="3">3 People</option>
                                        <option value="4">4 People</option>
                                        <option value="5+">5+ People</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="accommodation">Accommodation Preference</label>
                                    <select id="accommodation" name="accommodation" required>
                                        <option value="">Select...</option>
                                        <option value="budget">Budget (3-star)</option>
                                        <option value="standard">Standard (4-star)</option>
                                        <option value="luxury">Luxury (5-star)</option>
                                        <option value="premium">Premium Suite</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="roomType">Room Type</label>
                                    <select id="roomType" name="roomType" required>
                                        <option value="">Select...</option>
                                        <option value="single">Single Room</option>
                                        <option value="double">Double Room</option>
                                        <option value="twin">Twin Beds</option>
                                        <option value="suite">Suite</option>
                                        <option value="family">Family Room</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h4>Additional Services</h4>
                            <div class="checkbox-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" name="services" value="airport-transfer">
                                    <span class="checkmark"></span>
                                    Airport Transfer (+$50)
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" name="services" value="travel-insurance">
                                    <span class="checkmark"></span>
                                    Travel Insurance (+$75)
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" name="services" value="guided-tours">
                                    <span class="checkmark"></span>
                                    Private Guided Tours (+$200)
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" name="services" value="meals">
                                    <span class="checkmark"></span>
                                    All Meals Included (+$150)
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="specialRequests">Special Requests or Requirements</label>
                            <textarea id="specialRequests" name="specialRequests" rows="4" placeholder="Any dietary restrictions, accessibility needs, special occasions, etc."></textarea>
                        </div>
                        
                        <div class="total-section">
                            <div class="total-calculation">
                                <span>Estimated Total: </span>
                                <span class="total-amount" id="totalAmount">$0</span>
                            </div>
                            <small>*Final price will be confirmed based on availability and selected options</small>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-large">Proceed to Payment</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Add enhanced modal styles
    const modalStyles = `
        .destination-modal .modal-content {
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .booking-summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        
        .summary-item {
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .form-section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .form-section:last-of-type {
            border-bottom: none;
        }
        
        .form-section h4 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .checkbox-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .checkbox-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 10px;
            border-radius: 8px;
            transition: background 0.3s ease;
        }
        
        .checkbox-item:hover {
            background: #f8f9fa;
        }
        
        .checkbox-item input[type="checkbox"] {
            margin-right: 10px;
            transform: scale(1.2);
        }
        
        .total-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }
        
        .total-calculation {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .total-amount {
            color: #007bff;
            font-size: 1.5rem;
        }
        
        .btn-large {
            width: 100%;
            padding: 15px 30px;
            font-size: 1.1rem;
            margin-top: 10px;
        }
        
        @media (max-width: 768px) {
            .form-row,
            .checkbox-group {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .destination-modal .modal-content {
                margin: 10px;
                max-height: 95vh;
            }
        }
    `;

    // Add styles if not already added
    if (!document.querySelector('#destinationModalStyles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'destinationModalStyles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('destinationBookingModal');
    const closeBtn = modal.querySelector('.close-btn');
    const bookingForm = document.getElementById('destinationBookingForm');
    const totalAmount = document.getElementById('totalAmount');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travelDate').setAttribute('min', today);

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Calculate total price
    function calculateTotal() {
        let basePrice = 1299; // Default base price
        if (price !== 'Custom Quote') {
            basePrice = parseInt(price.replace(/[^0-9]/g, '')) || 1299;
        }
        
        const travelers = parseInt(document.getElementById('travelers').value) || 1;
        const accommodation = document.getElementById('accommodation').value;
        const services = document.querySelectorAll('input[name="services"]:checked');
        
        let total = basePrice * travelers;
        
        // Accommodation multiplier
        const accommodationMultipliers = {
            'budget': 0.8,
            'standard': 1.0,
            'luxury': 1.5,
            'premium': 2.0
        };
        
        if (accommodation && accommodationMultipliers[accommodation]) {
            total *= accommodationMultipliers[accommodation];
        }
        
        // Add services
        services.forEach(service => {
            const serviceValue = service.value;
            const servicePrices = {
                'airport-transfer': 50,
                'travel-insurance': 75,
                'guided-tours': 200,
                'meals': 150
            };
            
            if (servicePrices[serviceValue]) {
                total += servicePrices[serviceValue] * travelers;
            }
        });
        
        totalAmount.textContent = `$${Math.round(total).toLocaleString()}`;
    }

    // Add event listeners for price calculation
    const priceInputs = modal.querySelectorAll('select, input[type="checkbox"]');
    priceInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });

    // Initial calculation
    calculateTotal();

    // Close modal functionality
    function closeModal() {
        modal.remove();
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        showNotification('Processing your booking request...', 'info');
        
        setTimeout(() => {
            showNotification('Booking request submitted successfully! We will contact you within 24 hours to confirm details and arrange payment.', 'success');
            closeModal();
        }, 2500);
    });
}

// Enhanced attraction card interactions
document.addEventListener('DOMContentLoaded', function() {
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    attractionCards.forEach(card => {
        card.addEventListener('click', function() {
            const attractionName = this.querySelector('h3').textContent;
            const attractionPrice = this.querySelector('.price').textContent;
            const attractionDescription = this.querySelector('p').textContent;
            
            showAttractionModal(attractionName, attractionPrice, attractionDescription);
        });
    });
});

function showAttractionModal(name, price, description) {
    const modalHTML = `
        <div class="attraction-modal" id="attractionModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${name}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="attraction-details">
                        <div class="detail-item">
                            <strong>Price:</strong> ${price}
                        </div>
                        <div class="detail-item">
                            <strong>Available:</strong> Daily 9:00 AM - 6:00 PM
                        </div>
                        <div class="detail-item">
                            <strong>Duration:</strong> 2-3 hours
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" onclick="closeAttractionModal()">Close</button>
                        <button class="btn btn-primary" onclick="bookAttraction('${name}', '${price}')">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('attractionModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAttractionModal() {
    const modal = document.getElementById('attractionModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function bookAttraction(name, price) {
    closeAttractionModal();
    showDestinationBookingModal(name, price);
}