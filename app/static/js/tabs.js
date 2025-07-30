// Tab functionality for PETential
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    if (tabButtons.length === 0) return; // No tabs on this page
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = 'var(--petential-haiti-60)';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.style.background = 'var(--petential-white)';
            this.style.color = 'var(--petential-dark)';
            
            // Show/hide tab content (if tab panels exist)
            const tabPanels = document.querySelectorAll('.tab-panel');
            tabPanels.forEach(panel => {
                panel.style.display = 'none';
            });
            
            const activePanel = document.querySelector(`.tab-panel[data-tab="${tabName}"]`);
            if (activePanel) {
                activePanel.style.display = 'block';
            }
        });
    });
});
