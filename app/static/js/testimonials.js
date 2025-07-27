/**
 * PETential Testimonials Section - Interactive Functionality
 * Handles tab switching, auto-rotation, and touch/swipe support
 */

class TestimonialsSection {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.indicators = this.container.querySelectorAll('.testimonial-tab-indicator');
        this.panels = this.container.querySelectorAll('.testimonial-panel');
        this.currentTab = 0;
        this.isAnimating = false;
        this.autoRotateInterval = null;
        this.autoRotateDelay = 6000; // 6 seconds
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupTouchSupport();
        this.setupAccessibility();
        this.setInitialState();
        this.startAutoRotate();
    }
    
    setupEventListeners() {
        // Click handlers for tab indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(index);
            });
        });
        
        // Pause auto-rotate on hover
        this.container.addEventListener('mouseenter', () => {
            this.pauseAutoRotate();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.resumeAutoRotate();
        });
        
        // Pause on focus for accessibility
        this.indicators.forEach(indicator => {
            indicator.addEventListener('focus', () => {
                this.pauseAutoRotate();
            });
            
            indicator.addEventListener('blur', () => {
                this.resumeAutoRotate();
            });
        });
    }
    
    setupTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            this.pauseAutoRotate();
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
        }, { passive: true });
        
        this.container.addEventListener('touchend', () => {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe right - previous tab
                    this.prevTab();
                } else {
                    // Swipe left - next tab
                    this.nextTab();
                }
            }
            
            this.resumeAutoRotate();
        }, { passive: true });
    }
    
    setupAccessibility() {
        // Set up ARIA attributes
        this.indicators.forEach((indicator, index) => {
            indicator.setAttribute('role', 'tab');
            indicator.setAttribute('aria-controls', `testimonial-panel-${index}`);
            indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            indicator.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            // Add screen reader text
            const srText = document.createElement('span');
            srText.className = 'sr-only';
            srText.textContent = `Testimonial ${index + 1}`;
            indicator.appendChild(srText);
        });
        
        this.panels.forEach((panel, index) => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('id', `testimonial-panel-${index}`);
            panel.setAttribute('aria-labelledby', `testimonial-tab-${index}`);
            panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        });
        
        // Keyboard navigation
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('keydown', (e) => {
                let targetIndex = index;
                
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = index > 0 ? index - 1 : this.indicators.length - 1;
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = index < this.indicators.length - 1 ? index + 1 : 0;
                        break;
                    case 'Home':
                        e.preventDefault();
                        targetIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        targetIndex = this.indicators.length - 1;
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.switchTab(index);
                        return;
                }
                
                if (targetIndex !== index) {
                    this.indicators[targetIndex].focus();
                    this.switchTab(targetIndex);
                }
            });
        });
    }
    
    setInitialState() {
        // Set initial active states
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentTab) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-selected', 'true');
                indicator.setAttribute('tabindex', '0');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-selected', 'false');
                indicator.setAttribute('tabindex', '-1');
            }
        });
        
        this.panels.forEach((panel, index) => {
            if (index === this.currentTab) {
                panel.classList.add('active');
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.classList.remove('active');
                panel.setAttribute('aria-hidden', 'true');
            }
        });
    }
    
    async switchTab(targetIndex) {
        if (targetIndex === this.currentTab || this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Announce to screen readers
        this.announceTabChange(targetIndex);
        
        // Update indicators
        this.indicators[this.currentTab].classList.remove('active');
        this.indicators[this.currentTab].setAttribute('aria-selected', 'false');
        this.indicators[this.currentTab].setAttribute('tabindex', '-1');
        
        this.indicators[targetIndex].classList.add('active');
        this.indicators[targetIndex].setAttribute('aria-selected', 'true');
        this.indicators[targetIndex].setAttribute('tabindex', '0');
        
        // Fade out current panel
        const currentPanel = this.panels[this.currentTab];
        const targetPanel = this.panels[targetIndex];
        
        currentPanel.style.opacity = '0';
        currentPanel.style.transform = 'translateY(-20px)';
        
        // Wait for fade out
        await this.wait(200);
        
        // Switch panels
        currentPanel.classList.remove('active');
        currentPanel.setAttribute('aria-hidden', 'true');
        
        targetPanel.classList.add('active');
        targetPanel.setAttribute('aria-hidden', 'false');
        
        // Fade in new panel
        targetPanel.style.opacity = '1';
        targetPanel.style.transform = 'translateY(0)';
        
        // Wait for fade in
        await this.wait(300);
        
        // Update current tab
        this.currentTab = targetIndex;
        this.isAnimating = false;
    }
    
    nextTab() {
        const nextIndex = this.currentTab < this.indicators.length - 1 ? this.currentTab + 1 : 0;
        this.switchTab(nextIndex);
    }
    
    prevTab() {
        const prevIndex = this.currentTab > 0 ? this.currentTab - 1 : this.indicators.length - 1;
        this.switchTab(prevIndex);
    }
    
    startAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
        
        this.autoRotateInterval = setInterval(() => {
            if (!this.isPaused && !this.isAnimating) {
                this.nextTab();
            }
        }, this.autoRotateDelay);
    }
    
    pauseAutoRotate() {
        this.isPaused = true;
        this.container.classList.add('paused');
    }
    
    resumeAutoRotate() {
        this.isPaused = false;
        this.container.classList.remove('paused');
    }
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
        this.isPaused = true;
    }
    
    announceTabChange(targetIndex) {
        const testimonialData = [
            'Taylor Brooks testimonial',
            'Casey Morgan testimonial', 
            'Jordan Avery testimonial',
            'Alex Rivera testimonial'
        ];
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Now showing ${testimonialData[targetIndex]}`;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Public methods for external control
    goToTab(index) {
        if (index >= 0 && index < this.indicators.length) {
            this.switchTab(index);
        }
    }
    
    getCurrentTab() {
        return this.currentTab;
    }
    
    // Cleanup method
    destroy() {
        this.stopAutoRotate();
        
        // Remove event listeners
        this.indicators.forEach(indicator => {
            indicator.replaceWith(indicator.cloneNode(true));
        });
        
        this.container.removeEventListener('mouseenter', this.pauseAutoRotate);
        this.container.removeEventListener('mouseleave', this.resumeAutoRotate);
    }
}

// Progressive Enhancement - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials section
    const testimonialsSection = new TestimonialsSection('.testimonials-section');
    
    // Make it globally accessible for debugging/external control
    window.PETentialTestimonials = testimonialsSection;
    
    // Handle visibility change to pause/resume auto-rotate
    document.addEventListener('visibilitychange', function() {
        if (testimonialsSection) {
            if (document.hidden) {
                testimonialsSection.pauseAutoRotate();
            } else {
                testimonialsSection.resumeAutoRotate();
            }
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
                if (testimonialsSection && testimonialsSection.isPaused) {
                    testimonialsSection.resumeAutoRotate();
                }
            } else {
                if (testimonialsSection) {
                    testimonialsSection.pauseAutoRotate();
                }
            }
        });
    }, observerOptions);
    
    const testimonialsElement = document.querySelector('.testimonials-section');
    if (testimonialsElement) {
        observer.observe(testimonialsElement);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsSection;
}
