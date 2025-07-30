/**
 * PETential FAQ Section - Interactive Accordion Functionality
 * Handles single expand behavior, keyboard navigation, and accessibility
 */

class FAQAccordion {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.items = this.container.querySelectorAll('.faq-item');
        this.questions = this.container.querySelectorAll('.faq-question');
        this.answers = this.container.querySelectorAll('.faq-answer');
        this.currentlyExpanded = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
        this.setInitialState();
    }
    
    setupEventListeners() {
        this.questions.forEach((question, index) => {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleItem(index);
            });
        });
    }
    
    setupKeyboardNavigation() {
        this.questions.forEach((question, index) => {
            question.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this.focusNextItem(index);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.focusPrevItem(index);
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.focusFirstItem();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.focusLastItem();
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.toggleItem(index);
                        break;
                }
            });
        });
    }
    
    setupAccessibility() {
        this.questions.forEach((question, index) => {
            // Set up ARIA attributes
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${index}`);
            question.setAttribute('id', `faq-question-${index}`);
            
            // Set up answer attributes
            const answer = this.answers[index];
            answer.setAttribute('id', `faq-answer-${index}`);
            answer.setAttribute('aria-labelledby', `faq-question-${index}`);
            answer.setAttribute('role', 'region');
        });
    }
    
    setInitialState() {
        // Ensure all items start collapsed
        this.items.forEach((item, index) => {
            item.classList.remove('active');
            this.questions[index].setAttribute('aria-expanded', 'false');
        });
    }
    
    toggleItem(index) {
        const item = this.items[index];
        const question = this.questions[index];
        const isCurrentlyExpanded = item.classList.contains('active');
        
        // Single expand behavior - collapse all other items
        this.collapseAllItems();
        
        if (!isCurrentlyExpanded) {
            // Expand the clicked item
            this.expandItem(index);
        }
        
        // Announce change to screen readers
        this.announceStateChange(index, !isCurrentlyExpanded);
    }
    
    expandItem(index) {
        const item = this.items[index];
        const question = this.questions[index];
        const answer = this.answers[index];
        
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        
        // Calculate actual height for smooth animation
        const scrollHeight = answer.scrollHeight;
        answer.style.maxHeight = scrollHeight + 'px';
        
        this.currentlyExpanded = index;
        
        // Smooth scroll to item if it's not fully visible
        setTimeout(() => {
            this.scrollToItemIfNeeded(index);
        }, 150);
    }
    
    collapseItem(index) {
        const item = this.items[index];
        const question = this.questions[index];
        const answer = this.answers[index];
        
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
        
        if (this.currentlyExpanded === index) {
            this.currentlyExpanded = null;
        }
    }
    
    collapseAllItems() {
        this.items.forEach((item, index) => {
            if (item.classList.contains('active')) {
                this.collapseItem(index);
            }
        });
    }
    
    focusNextItem(currentIndex) {
        const nextIndex = currentIndex < this.questions.length - 1 ? currentIndex + 1 : 0;
        this.questions[nextIndex].focus();
    }
    
    focusPrevItem(currentIndex) {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.questions.length - 1;
        this.questions[prevIndex].focus();
    }
    
    focusFirstItem() {
        this.questions[0].focus();
    }
    
    focusLastItem() {
        this.questions[this.questions.length - 1].focus();
    }
    
    scrollToItemIfNeeded(index) {
        const item = this.items[index];
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if item is not fully visible
        if (rect.bottom > windowHeight || rect.top < 0) {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    announceStateChange(index, isExpanded) {
        const questionText = this.questions[index].querySelector('.faq-question-text').textContent;
        const state = isExpanded ? 'expanded' : 'collapsed';
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `FAQ item "${questionText}" ${state}`;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    // Public methods for external control
    expandItemByIndex(index) {
        if (index >= 0 && index < this.items.length) {
            this.collapseAllItems();
            this.expandItem(index);
        }
    }
    
    collapseAll() {
        this.collapseAllItems();
    }
    
    getCurrentlyExpanded() {
        return this.currentlyExpanded;
    }
    
    // Search functionality
    searchFAQ(searchTerm) {
        const results = [];
        const term = searchTerm.toLowerCase();
        
        this.questions.forEach((question, index) => {
            const questionText = question.querySelector('.faq-question-text').textContent.toLowerCase();
            const answerText = this.answers[index].querySelector('.faq-answer-text').textContent.toLowerCase();
            
            if (questionText.includes(term) || answerText.includes(term)) {
                results.push({
                    index: index,
                    question: question.querySelector('.faq-question-text').textContent,
                    answer: this.answers[index].querySelector('.faq-answer-text').textContent
                });
            }
        });
        
        return results;
    }
    
    // Highlight search results
    highlightSearchResults(searchTerm) {
        if (!searchTerm) {
            this.clearHighlights();
            return;
        }
        
        const results = this.searchFAQ(searchTerm);
        
        // Clear previous highlights
        this.clearHighlights();
        
        // Highlight matching items
        results.forEach(result => {
            this.items[result.index].classList.add('search-highlight');
        });
        
        return results;
    }
    
    clearHighlights() {
        this.items.forEach(item => {
            item.classList.remove('search-highlight');
        });
    }
    
    // Cleanup method
    destroy() {
        // Remove event listeners by cloning nodes
        this.questions.forEach(question => {
            question.replaceWith(question.cloneNode(true));
        });
    }
}

// Progressive Enhancement - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    const faqAccordion = new FAQAccordion('.faq-section');
    
    // Make it globally accessible for debugging/external control
    window.PETentialFAQ = faqAccordion;
    
    // Add search functionality if search input exists
    const searchInput = document.querySelector('.faq-search-input');
    if (searchInput && faqAccordion) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const results = faqAccordion.highlightSearchResults(this.value);
                
                // Optional: Show search results count
                const resultsCount = document.querySelector('.faq-search-results');
                if (resultsCount) {
                    if (this.value && results.length > 0) {
                        resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
                        resultsCount.style.display = 'block';
                    } else if (this.value && results.length === 0) {
                        resultsCount.textContent = 'No results found';
                        resultsCount.style.display = 'block';
                    } else {
                        resultsCount.style.display = 'none';
                    }
                }
            }, 300);
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                faqAccordion.clearHighlights();
                const resultsCount = document.querySelector('.faq-search-results');
                if (resultsCount) {
                    resultsCount.style.display = 'none';
                }
            }
        });
    }
    
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
    
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
        observer.observe(faqSection);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQAccordion;
}
