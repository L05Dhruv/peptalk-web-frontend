export const contactButton = () => {
    // Contact page send Button
    const contactButton: HTMLElement | null = document.querySelector('.send-button');
    contactButton?.addEventListener('click', function() {
        console.log('button clicked');
        if (!contactButton) return;

        const contactForm: HTMLElement | null = document.querySelector('.contact-form');
        if (!contactForm) return;

        const name: string = (contactForm.querySelector('input[name="name"]') as HTMLInputElement)?.value || '';
        const email: string = (contactForm.querySelector('input[name="email"]') as HTMLInputElement)?.value || '';
        const reason: string = (contactForm.querySelector('select[name="reason"]') as HTMLSelectElement)?.value || '';
        const message: string = (contactForm.querySelector('textarea[name="message"]') as HTMLTextAreaElement)?.value || '';

        console.log(name, email, reason, message);

        contactForm.style.display = 'block';
        contactForm.scrollIntoView({ behavior: 'smooth' });
        window.location.href = '/contact';
    
        // Send email to help@peptalkhealth.com
        const sendEmail = async () => {
            try {
                const response = await fetch('http://localhost:3000/email/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        name: name, 
                        email: email, 
                        reason: reason,
                        message: message }),
                });
                if (!response.ok) {
                    throw new Error('Failed to send email');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
        sendEmail();
    
    });
}