/**
 * PETential Fresh Insights Section - Slider Functionality
 * Handles horizontal scrolling and responsive behavior
 */

class InsightsSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.grid = this.container.querySelector('.insights-grid');
        this.prevBtn = this.container.querySelector('.insights-prev');
        this.nextBtn = this.container.querySelector('.insights-next');
        this.cards = this.container.querySelectorAll('.insights-card');
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupResponsive();
        this.setupAccessibility();
        this.setupLazyLoading();
        this.updateControls();
    }
    
    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.slidePrev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.slideNext());
        }
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.slidePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.slideNext();
            }
        });
        
        // Touch/swipe support
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.grid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        this.grid.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
        }, { passive: true });
        
        this.grid.addEventListener('touchend', () => {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.slidePrev();
                } else {
                    this.slideNext();
                }
            }
        }, { passive: true });
    }
    
    setupResponsive() {
        const handleResize = () => {
            this.cardsPerView = this.getCardsPerView();
            this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateSlider();
        };
        
        window.addEventListener('resize', handleResize);
        
        // Initial setup
        handleResize();
    }
    
    setupAccessibility() {
        // Add ARIA labels
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', 'Previous insights');
            this.prevBtn.innerHTML = '<span aria-hidden="true">←</span>';
        }
        
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', 'Next insights');
            this.nextBtn.innerHTML = '<span aria-hidden="true">→</span>';
        }
        
        // Add role and aria-live for announcements
        this.grid.setAttribute('role', 'region');
        this.grid.setAttribute('aria-label', 'Fresh insights carousel');
        
        // Make cards focusable
        this.cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Insight ${index + 1} of ${this.cards.length}`);
        });
    }
    
    setupLazyLoading() {
        const images = this.container.querySelectorAll('.insights-card-image[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => img.classList.add('loaded'));
        }
    }
    
    getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 991) {
            return 1; // Mobile and tablet show 1 card
        }
        return 2; // Desktop shows 2 cards
    }
    
    slidePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
            this.announceChange('Previous insights shown');
        }
    }
    
    slideNext() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateSlider();
            this.announceChange('Next insights shown');
        }
    }
    
    updateSlider() {
        const cardWidth = this.cards[0]?.offsetWidth || 0;
        const gap = 40; // Gap between cards
        const translateX = -(this.currentIndex * (cardWidth + gap));
        
        // Only apply transform on mobile/tablet where we actually scroll
        if (this.cardsPerView === 1) {
            this.grid.style.transform = `translateX(${translateX}px)`;
            this.grid.style.transition = 'transform 300ms ease';
        } else {
            this.grid.style.transform = 'none';
            this.grid.style.transition = 'none';
        }
        
        this.updateControls();
    }
    
    updateControls() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.prevBtn.setAttribute('aria-disabled', this.currentIndex === 0);
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
            this.nextBtn.setAttribute('aria-disabled', this.currentIndex >= this.maxIndex);
        }
        
        // Hide controls on desktop where all cards are visible
        const shouldShowControls = this.cardsPerView < this.cards.length;
        const controls = this.container.querySelector('.insights-controls');
        if (controls) {
            controls.style.display = shouldShowControls ? 'flex' : 'none';
        }
    }
    
    announceChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    // Public methods
    goToSlide(index) {
        if (index >= 0 && index <= this.maxIndex) {
            this.currentIndex = index;
            this.updateSlider();
        }
    }
    
    getCurrentIndex() {
        return this.currentIndex;
    }
    
    getTotalSlides() {
        return this.maxIndex + 1;
    }
    
    // Auto-play functionality (optional)
    startAutoPlay(interval = 5000) {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateSlider();
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Cleanup method
    destroy() {
        this.stopAutoPlay();
        
        // Remove event listeners by cloning nodes
        if (this.prevBtn) {
            this.prevBtn.replaceWith(this.prevBtn.cloneNode(true));
        }
        if (this.nextBtn) {
            this.nextBtn.replaceWith(this.nextBtn.cloneNode(true));
        }
    }
}

// Progressive Enhancement - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize insights slider
    const insightsSlider = new InsightsSlider('.insights-section');
    
    // Make it globally accessible for debugging/external control
    window.PETentialInsights = insightsSlider;
    
    // Handle visibility change to pause/resume auto-play if enabled
    document.addEventListener('visibilitychange', function() {
        if (insightsSlider) {
            if (document.hidden) {
                insightsSlider.stopAutoPlay();
            }
            // Note: Auto-play is not started by default
            // Call insightsSlider.startAutoPlay() if needed
        }
    });
    
    // Intersection Observer for performance optimization
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    const insightsSection = document.querySelector('.insights-section');
    if (insightsSection) {
        observer.observe(insightsSection);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InsightsSlider;
}
