/**
 * Framer Design System - Form Interactions and Validation
 * Provides enhanced form functionality matching the design system
 */

class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupSearchInputs();
        this.setupFormValidation();
        this.setupAccessibility();
        this.setupInteractiveElements();
    }

    /**
     * Setup search input functionality
     */
    setupSearchInputs() {
        const searchInputs = document.querySelectorAll('.form-search-input');
        
        searchInputs.forEach(input => {
            const searchContainer = input.closest('.form-search');
            const clearButton = searchContainer.querySelector('.form-search-clear');
            
            // Show/hide clear button based on input value
            const toggleClearButton = () => {
                if (input.value.trim()) {
                    searchContainer.classList.add('has-value');
                } else {
                    searchContainer.classList.remove('has-value');
                }
            };
            
            // Clear input when clear button is clicked
            if (clearButton) {
                clearButton.addEventListener('click', () => {
                    input.value = '';
                    input.focus();
                    toggleClearButton();
                    
                    // Trigger input event for any listeners
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                });
            }
            
            // Monitor input changes
            input.addEventListener('input', toggleClearButton);
            input.addEventListener('keyup', toggleClearButton);
            
            // Initial check
            toggleClearButton();
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Real-time validation for inputs
            const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
            
            inputs.forEach(input => {
                // Validate on blur
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                // Clear validation on input (for better UX)
                input.addEventListener('input', () => {
                    if (input.hasAttribute('aria-invalid')) {
                        this.clearFieldValidation(input);
                    }
                });
            });
            
            // Form submission validation
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        const formGroup = field.closest('.form-group');
        const fieldType = field.type || field.tagName.toLowerCase();
        let isValid = true;
        let message = '';

        // Clear existing validation
        this.clearFieldValidation(field);

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }
        // Email validation
        else if (fieldType === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        // Phone validation
        else if (fieldType === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        // URL validation
        else if (fieldType === 'url' && field.value.trim()) {
            try {
                new URL(field.value);
            } catch {
                isValid = false;
                message = 'Please enter a valid URL';
            }
        }
        // Password strength (basic)
        else if (fieldType === 'password' && field.value.trim()) {
            if (field.value.length < 8) {
                isValid = false;
                message = 'Password must be at least 8 characters long';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(field.value)) {
                // This is a warning, not an error
                this.setFieldValidation(field, 'warning', 'Consider using uppercase, lowercase, and numbers for better security');
                return;
            }
        }

        // Set validation state
        if (!isValid) {
            this.setFieldValidation(field, 'error', message);
        } else if (field.value.trim()) {
            this.setFieldValidation(field, 'success', 'Valid');
        }
    }

    /**
     * Set field validation state
     */
    setFieldValidation(field, state, message) {
        const formGroup = field.closest('.form-group');
        
        // Remove existing validation classes
        formGroup.classList.remove('success', 'error', 'warning');
        
        // Remove existing messages
        const existingMessage = formGroup.querySelector('.form-success-message, .form-error-message, .form-warning-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add new validation state
        formGroup.classList.add(state);
        
        // Add validation message
        const messageElement = document.createElement('div');
        messageElement.className = `form-${state}-message`;
        messageElement.textContent = message;
        formGroup.appendChild(messageElement);
        
        // Set ARIA attributes
        field.setAttribute('aria-invalid', state === 'error' ? 'true' : 'false');
        
        // Set aria-describedby for the message
        if (!messageElement.id) {
            messageElement.id = `${field.id || 'field'}-${state}-message`;
            const existingDescribedBy = field.getAttribute('aria-describedby') || '';
            field.setAttribute('aria-describedby', `${existingDescribedBy} ${messageElement.id}`.trim());
        }
    }

    /**
     * Clear field validation
     */
    clearFieldValidation(field) {
        const formGroup = field.closest('.form-group');
        
        // Remove validation classes
        formGroup.classList.remove('success', 'error', 'warning');
        
        // Remove validation messages
        const messages = formGroup.querySelectorAll('.form-success-message, .form-error-message, .form-warning-message');
        messages.forEach(message => message.remove());
        
        // Clear ARIA attributes
        field.removeAttribute('aria-invalid');
        
        // Clean up aria-describedby
        const describedBy = field.getAttribute('aria-describedby');
        if (describedBy) {
            const cleanDescribedBy = describedBy
                .split(' ')
                .filter(id => !id.includes('-message'))
                .join(' ');
            
            if (cleanDescribedBy) {
                field.setAttribute('aria-describedby', cleanDescribedBy);
            } else {
                field.removeAttribute('aria-describedby');
            }
        }
    }

    /**
     * Validate entire form
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            this.validateField(input);
            
            if (input.hasAttribute('aria-invalid') && input.getAttribute('aria-invalid') === 'true') {
                isFormValid = false;
            }
        });
        
        // Focus first invalid field
        if (!isFormValid) {
            const firstInvalidField = form.querySelector('[aria-invalid="true"]');
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isFormValid;
    }

    /**
     * Setup accessibility enhancements
     */
    setupAccessibility() {
        // Add aria-describedby for help text
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        formInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            const helpText = formGroup.querySelector('.form-help');
            
            if (helpText && !helpText.id) {
                helpText.id = `${input.id || 'field'}-help`;
                input.setAttribute('aria-describedby', helpText.id);
            }
            
            // Add aria-required for required fields
            if (input.hasAttribute('required')) {
                input.setAttribute('aria-required', 'true');
            }
        });

        // Enhance checkbox and radio accessibility
        const checkboxes = document.querySelectorAll('.form-checkbox-input');
        const radios = document.querySelectorAll('.form-radio-input');
        
        [...checkboxes, ...radios].forEach(input => {
            // Add keyboard navigation
            input.addEventListener('keydown', (e) => {
                if (e.key === ' ') {
                    e.preventDefault();
                    input.click();
                }
            });
        });

        // Add focus management for custom elements
        const customInputs = document.querySelectorAll('.form-checkbox, .form-radio');
        
        customInputs.forEach(container => {
            const input = container.querySelector('input');
            const label = container.querySelector('label');
            
            // Make container focusable if input is not
            if (input && label) {
                container.addEventListener('click', () => {
                    input.focus();
                });
            }
        });
    }

    /**
     * Setup interactive elements
     */
    setupInteractiveElements() {
        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add loading state functionality
            button.addEventListener('click', function() {
                if (this.type === 'submit' && this.form) {
                    // Add loading state for form submission
                    this.classList.add('btn-loading');
                    this.disabled = true;
                    
                    // Remove loading state after form validation
                    setTimeout(() => {
                        if (!this.form.checkValidity()) {
                            this.classList.remove('btn-loading');
                            this.disabled = false;
                        }
                    }, 100);
                }
            });
        });

        // Auto-resize textareas
        const textareas = document.querySelectorAll('.form-textarea');
        
        textareas.forEach(textarea => {
            const autoResize = () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            };
            
            textarea.addEventListener('input', autoResize);
            textarea.addEventListener('focus', autoResize);
            
            // Initial resize
            autoResize();
        });

        // Character count for textareas with maxlength
        textareas.forEach(textarea => {
            if (textarea.hasAttribute('maxlength')) {
                const maxLength = parseInt(textarea.getAttribute('maxlength'));
                const formGroup = textarea.closest('.form-group');
                
                // Create character count element
                const charCount = document.createElement('div');
                charCount.className = 'form-char-count';
                charCount.style.cssText = `
                    font-size: var(--font-size-small);
                    color: var(--text-secondary);
                    text-align: right;
                    margin-top: var(--spacing-xs);
                `;
                
                const updateCharCount = () => {
                    const remaining = maxLength - textarea.value.length;
                    charCount.textContent = `${textarea.value.length}/${maxLength}`;
                    
                    if (remaining < 20) {
                        charCount.style.color = 'var(--warning-color)';
                    } else if (remaining < 0) {
                        charCount.style.color = 'var(--danger-color)';
                    } else {
                        charCount.style.color = 'var(--text-secondary)';
                    }
                };
                
                textarea.addEventListener('input', updateCharCount);
                formGroup.appendChild(charCount);
                updateCharCount();
            }
        });
    }

    /**
     * Public method to manually validate a field
     */
    static validateField(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            const handler = new FormHandler();
            handler.validateField(field);
        }
    }

    /**
     * Public method to clear field validation
     */
    static clearFieldValidation(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            const handler = new FormHandler();
            handler.clearFieldValidation(field);
        }
    }

    /**
     * Public method to validate entire form
     */
    static validateForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const handler = new FormHandler();
            return handler.validateForm(form);
        }
        return false;
    }

    /**
     * Show loading state for form
     */
    showFormLoading(form) {
        let overlay = form.querySelector('.form-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'form-loading-overlay';
            overlay.innerHTML = '<div class="form-loading-spinner"></div>';
            form.style.position = 'relative';
            form.appendChild(overlay);
        }
        overlay.classList.add('active');
    }

    /**
     * Hide loading state for form
     */
    hideFormLoading(form) {
        const overlay = form.querySelector('.form-loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    /**
     * Show skeleton loading for form
     */
    showSkeletonLoading(container) {
        const inputs = container.querySelectorAll('.form-input, .form-textarea, .form-select');
        const buttons = container.querySelectorAll('.btn');
        
        inputs.forEach(input => {
            const skeleton = document.createElement('div');
            skeleton.className = input.tagName === 'TEXTAREA' ? 'form-skeleton form-skeleton-textarea' : 'form-skeleton form-skeleton-input';
            input.style.display = 'none';
            input.parentNode.insertBefore(skeleton, input);
        });
        
        buttons.forEach(button => {
            const skeleton = document.createElement('div');
            skeleton.className = 'form-skeleton form-skeleton-button';
            button.style.display = 'none';
            button.parentNode.insertBefore(skeleton, button);
        });
    }

    /**
     * Hide skeleton loading for form
     */
    hideSkeletonLoading(container) {
        const skeletons = container.querySelectorAll('.form-skeleton');
        const inputs = container.querySelectorAll('.form-input, .form-textarea, .form-select');
        const buttons = container.querySelectorAll('.btn');
        
        skeletons.forEach(skeleton => skeleton.remove());
        inputs.forEach(input => input.style.display = '');
        buttons.forEach(button => button.style.display = '');
    }

    /**
     * Show form errors
     */
    showFormErrors(form, errors) {
        // Remove existing error container
        const existingContainer = form.querySelector('.form-error-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error-container';
        
        const errorTitle = document.createElement('h3');
        errorTitle.className = 'form-error-title';
        errorTitle.textContent = 'Please fix the following errors:';
        
        const errorList = document.createElement('ul');
        errorList.className = 'form-error-list';
        
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.className = 'form-error-item';
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });
        
        errorContainer.appendChild(errorTitle);
        errorContainer.appendChild(errorList);
        
        // Insert at the top of the form
        form.insertBefore(errorContainer, form.firstChild);
        
        // Scroll to error container
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Show form success message
     */
    showFormSuccess(form, message) {
        // Remove existing containers
        const existingError = form.querySelector('.form-error-container');
        const existingSuccess = form.querySelector('.form-success-container');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();

        // Create success container
        const successContainer = document.createElement('div');
        successContainer.className = 'form-success-container';
        
        const successTitle = document.createElement('h3');
        successTitle.className = 'form-success-title';
        successTitle.textContent = 'Success!';
        
        const successText = document.createElement('p');
        successText.className = 'form-success-text';
        successText.textContent = message;
        
        successContainer.appendChild(successTitle);
        successContainer.appendChild(successText);
        
        // Insert at the top of the form
        form.insertBefore(successContainer, form.firstChild);
        
        // Scroll to success container
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Add input loading state
     */
    showInputLoading(input) {
        input.classList.add('form-input-loading');
        input.disabled = true;
    }

    /**
     * Remove input loading state
     */
    hideInputLoading(input) {
        input.classList.remove('form-input-loading');
        input.disabled = false;
    }

    /**
     * Public methods for external usage
     */
    static showFormLoading(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const handler = new FormHandler();
            handler.showFormLoading(form);
        }
    }

    static hideFormLoading(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const handler = new FormHandler();
            handler.hideFormLoading(form);
        }
    }

    static showFormErrors(formId, errors) {
        const form = document.getElementById(formId);
        if (form) {
            const handler = new FormHandler();
            handler.showFormErrors(form, errors);
        }
    }

    static showFormSuccess(formId, message) {
        const form = document.getElementById(formId);
        if (form) {
            const handler = new FormHandler();
            handler.showFormSuccess(form, message);
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});

// Export for manual usage
window.FormHandler = FormHandler;
