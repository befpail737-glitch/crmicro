// CRMicro Official Distributor Website - Main JavaScript
// Implements responsive navigation and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    
    if (header && navMenu) {
        // Add mobile toggle button to header
        const logoContainer = document.querySelector('.logo').parentElement;
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // For mobile responsiveness, we'll add the toggle button
        // and handle responsive navigation
        setupMobileNavigation();
    }
    
    // Initialize other components
    initializeProductFilters();
    initializeFormSubmissions();
    initializeResponsiveFeatures();
});

function setupMobileNavigation() {
    // Create mobile menu button
    const headerContainer = document.querySelector('.header .container');
    if (!headerContainer) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-toggle');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuBtn.id = 'mobileMenuToggle';
    
    // Add button to header
    headerContainer.appendChild(mobileMenuBtn);
    
    // Add CSS for mobile menu button
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--neutral-black);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
            
            .nav-menu {
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                align-items: center;
                padding: var(--space-m);
                box-shadow: var(--shadow-lg);
                display: none;
            }
            
            .nav-menu.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add event listener for mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    });
}

function initializeProductFilters() {
    // Implement product filtering functionality if on product pages
    const filterInputs = document.querySelectorAll('[data-filter]');
    
    filterInputs.forEach(input => {
        input.addEventListener('input', function() {
            const filterType = this.dataset.filter;
            const filterValue = this.value.toLowerCase();
            
            // Filter products based on input
            const products = document.querySelectorAll('.product-item');
            
            products.forEach(product => {
                const productValue = product.querySelector(`[data-${filterType}]`);
                if (productValue) {
                    const value = productValue.getAttribute(`data-${filterType}`).toLowerCase();
                    if (value.includes(filterValue)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                }
            });
        });
    });
}

function initializeFormSubmissions() {
    // Handle form submissions with validation
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // In a real implementation, you would submit the form
                // For now, we'll just show a success message
                alert('Thank you for your inquiry. Our team will contact you shortly.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Add error styling for invalid fields
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: var(--error-red) !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
}

function initializeResponsiveFeatures() {
    // Ensure responsive tables are properly handled on smaller screens
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Wrap tables in a container for horizontal scrolling on mobile
        if (window.innerWidth < 768 && table.offsetWidth > document.body.offsetWidth) {
            const container = document.createElement('div');
            container.style.overflowX = 'auto';
            container.style.margin = '1rem 0';
            
            const parent = table.parentNode;
            parent.insertBefore(container, table);
            container.appendChild(table);
        }
    });
    
    // Handle window resize for responsive features
    window.addEventListener('resize', function() {
        initializeResponsiveFeatures();
    });
}

// Additional utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to handle smooth scrolling for anchor links
function handleSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to handle header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize smooth scrolling when DOM is loaded
document.addEventListener('DOMContentLoaded', handleSmoothScrolling);

// Initialize header scroll effect
document.addEventListener('DOMContentLoaded', handleHeaderScroll);