document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                // Here you would typically send the data to your backend
                // For now, we'll just log it
                console.log('Form data:', formData);
                
                // Clear the form
                contactForm.reset();
                
                // Show success message
                alert('Message envoyé avec succès!');
            } catch (error) {
                console.error('Error:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
});
