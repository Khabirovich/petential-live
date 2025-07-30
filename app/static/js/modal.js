/**
 * Modal System for Breed Details - Framer Design System
 * Handles modal opening, closing, animations, and responsive behavior
 */

class BreedModal {
    constructor() {
        this.modal = null;
        this.modalBackdrop = null;
        this.modalContainer = null;
        this.modalContent = null;
        this.modalTitle = null;
        this.modalBody = null;
        this.closeButton = null;
        this.isOpen = false;
        this.focusableElements = [];
        this.previousFocus = null;
        
        this.init();
    }
    
    init() {
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // Create modal HTML structure
        const modalHTML = `
            <div id="breed-modal" class="modal" role="dialog" aria-labelledby="modal-title" aria-hidden="true" aria-modal="true">
                <div class="modal-backdrop" aria-hidden="true"></div>
                <div class="modal-container" role="document">
                    <div class="modal-content">
                        <header class="modal-header">
                            <h2 id="modal-title" class="modal-title">Breed Details</h2>
                            <button class="modal-close" aria-label="Close breed details modal" type="button">
                                <span class="sr-only">Close</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </header>
                        <div class="modal-body" role="main">
                            <div id="modal-content-placeholder">
                                <!-- Content will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page if it doesn't exist
        if (!document.getElementById('breed-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        // Get modal elements
        this.modal = document.getElementById('breed-modal');
        this.modalBackdrop = this.modal.querySelector('.modal-backdrop');
        this.modalContainer = this.modal.querySelector('.modal-container');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.modalTitle = this.modal.querySelector('#modal-title');
        this.modalBody = this.modal.querySelector('.modal-body');
        this.closeButton = this.modal.querySelector('.modal-close');
    }
    
    bindEvents() {
        // Close button click
        this.closeButton.addEventListener('click', () => this.close());
        
        // Backdrop click
        this.modalBackdrop.addEventListener('click', () => this.close());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Prevent modal content clicks from closing modal
        this.modalContent.addEventListener('click', (e) => e.stopPropagation());
    }
    
    async open(breedName, petType, triggerElement = null) {
        if (this.isOpen) return;
        
        // Store previous focus for restoration
        this.previousFocus = triggerElement || document.activeElement;
        
        // Update modal title
        this.modalTitle.textContent = breedName;
        
        // Show loading state
        this.showLoadingState(breedName);
        
        // Show modal with animation
        this.modal.style.display = 'flex';
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Force reflow for animation
        this.modal.offsetHeight;
        
        // Add active class for animation
        this.modal.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
        
        this.isOpen = true;
        
        // Load breed content
        try {
            await this.loadBreedContent(breedName, petType);
        } catch (error) {
            this.showErrorState(breedName, petType);
        }
        
        // Set focus and update focusable elements
        this.updateFocusableElements();
        this.closeButton.focus();
    }
    
    close() {
        if (!this.isOpen) return;
        
        // Remove active class for animation
        this.modal.classList.remove('active');
        
        // Wait for animation to complete
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Restore focus
            if (this.previousFocus) {
                this.previousFocus.focus();
            }
            
            this.isOpen = false;
        }, 300); // Match CSS transition duration
    }
    
    showLoadingState(breedName) {
        this.modalBody.innerHTML = `
            <div class="modal-loading" role="status" aria-live="polite">
                <div class="modal-loading-spinner" aria-hidden="true"></div>
                <p class="modal-loading-text">Loading information about ${breedName}...</p>
            </div>
        `;
    }
    
    showErrorState(breedName, petType) {
        this.modalBody.innerHTML = `
            <div class="modal-error" role="alert">
                <svg class="modal-error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                </svg>
                <p class="modal-error-text">Error loading breed information. Please try again.</p>
                <div class="modal-error-actions">
                    <button class="btn btn-primary" 
                            onclick="breedModal.loadBreedContent('${breedName}', '${petType}')"
                            aria-label="Retry loading ${breedName} breed information">
                        Retry
                    </button>
                </div>
            </div>
        `;
    }
    
    async loadBreedContent(breedName, petType) {
        try {
            const response = await fetch(`/breed_details/${petType}/${breedName}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Parse the response and extract the breed details content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract the breed details content
            const breedWrapper = doc.querySelector('.breed-details-wrapper');
            
            if (breedWrapper) {
                // Create modal-specific content structure
                const modalBreedContent = this.createModalBreedContent(breedWrapper);
                this.modalBody.innerHTML = modalBreedContent;
                
                // Initialize any interactive elements
                this.initializeModalContent();
            } else {
                throw new Error('Breed content not found');
            }
            
        } catch (error) {
            console.error('Error loading breed content:', error);
            throw error;
        }
    }
    
    createModalBreedContent(breedWrapper) {
        // Extract key information from the breed details page
        const breedTitle = breedWrapper.querySelector('.breed-title')?.textContent || '';
        const breedSubtitle = breedWrapper.querySelector('.breed-subtitle')?.textContent || '';
        const mainImage = breedWrapper.querySelector('.main-breed-image')?.src || '';
        const thumbnails = breedWrapper.querySelectorAll('.thumbnail-image');
        const characteristics = breedWrapper.querySelectorAll('.characteristic-item');
        const description = breedWrapper.querySelector('.description-content')?.innerHTML || '';
        
        // Create modal-optimized HTML structure
        let modalContent = `
            <div class="modal-breed-content">
                <div class="modal-breed-header">
                    <img src="${mainImage}" alt="${breedTitle}" class="modal-breed-image">
                    <div class="modal-breed-info">
                        <h3>${breedTitle}</h3>
                        <p>${breedSubtitle}</p>
                    </div>
                </div>
        `;
        
        // Add image gallery if there are thumbnails
        if (thumbnails.length > 1) {
            modalContent += `
                <div class="modal-breed-gallery">
                    <div class="modal-main-image-container">
                        <img src="${mainImage}" alt="${breedTitle}" id="modal-main-image" class="modal-main-image">
                    </div>
                    <div class="modal-thumbnail-gallery">
            `;
            
            thumbnails.forEach((thumb, index) => {
                modalContent += `
                    <div class="modal-thumbnail-item ${index === 0 ? 'active' : ''}" data-image="${thumb.src}">
                        <img src="${thumb.src}" alt="${breedTitle} thumbnail" class="modal-thumbnail-image">
                    </div>
                `;
            });
            
            modalContent += `
                    </div>
                </div>
            `;
        }
        
        // Add characteristics
        if (characteristics.length > 0) {
            modalContent += `
                <div class="modal-breed-characteristics">
                    <h4>Characteristics</h4>
                    <div class="modal-characteristics-grid">
            `;
            
            characteristics.forEach(char => {
                const name = char.querySelector('.characteristic-name')?.textContent || '';
                const value = char.querySelector('.characteristic-value')?.textContent || '';
                const fill = char.querySelector('.characteristic-fill');
                const dataValue = fill?.dataset.value || '0';
                const dataMax = fill?.dataset.max || '5';
                
                modalContent += `
                    <div class="modal-characteristic-item">
                        <div class="modal-characteristic-name">${name}</div>
                        <div class="modal-characteristic-value">${value}</div>
                        <div class="modal-characteristic-bar">
                            <div class="modal-characteristic-fill" data-value="${dataValue}" data-max="${dataMax}"></div>
                        </div>
                    </div>
                `;
            });
            
            modalContent += `
                    </div>
                </div>
            `;
        }
        
        // Add description
        if (description) {
            modalContent += `
                <div class="modal-breed-description">
                    <h4>About this Breed</h4>
                    <div class="modal-description-content">
                        ${description}
                    </div>
                </div>
            `;
        }
        
        modalContent += `</div>`;
        
        return modalContent;
    }
    
    initializeModalContent() {
        // Initialize characteristic bars
        const characteristicFills = this.modalBody.querySelectorAll('.modal-characteristic-fill');
        characteristicFills.forEach(fill => {
            const value = parseInt(fill.dataset.value);
            const max = parseInt(fill.dataset.max);
            const percentage = (value / max) * 100;
            
            // Animate the bar fill
            setTimeout(() => {
                fill.style.width = percentage + '%';
            }, 100);
        });
        
        // Initialize image gallery
        const mainImage = this.modalBody.querySelector('#modal-main-image');
        const thumbnails = this.modalBody.querySelectorAll('.modal-thumbnail-item');
        
        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    const imageUrl = thumbnail.dataset.image;
                    mainImage.src = imageUrl;
                    
                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
            });
        }
        
        // Update focusable elements after content load
        this.updateFocusableElements();
    }
    
    handleKeydown(e) {
        if (!this.isOpen) return;
        
        if (e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }
        
        if (e.key === 'Tab') {
            this.handleTabNavigation(e);
        }
    }
    
    handleTabNavigation(e) {
        if (this.focusableElements.length === 0) return;
        
        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    updateFocusableElements() {
        this.focusableElements = Array.from(
            this.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => {
            return el.offsetWidth > 0 && el.offsetHeight > 0 && !el.disabled;
        });
    }
    
    getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        outer.appendChild(inner);
        
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        
        return scrollbarWidth;
    }
}

// Initialize modal system when DOM is loaded
let breedModal;

function initializeBreedModal() {
    if (!breedModal) {
        breedModal = new BreedModal();
        window.breedModal = breedModal;
    }
    
    // Add click handlers to breed cards
    const breedCards = document.querySelectorAll('.breed-card');
    
    breedCards.forEach(card => {
        // Remove existing listeners to prevent duplicates
        card.removeEventListener('click', handleBreedCardClick);
        card.removeEventListener('keydown', handleBreedCardKeydown);
        
        // Add new listeners
        card.addEventListener('click', handleBreedCardClick);
        card.addEventListener('keydown', handleBreedCardKeydown);
    });
}

function handleBreedCardClick(e) {
    e.preventDefault();
    const breedName = this.dataset.breed;
    const petType = this.dataset.petType;
    if (breedModal) {
        breedModal.open(breedName, petType, this);
    }
}

function handleBreedCardKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const breedName = this.dataset.breed;
        const petType = this.dataset.petType;
        if (breedModal) {
            breedModal.open(breedName, petType, this);
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeBreedModal);

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBreedModal);
} else {
    initializeBreedModal();
}
