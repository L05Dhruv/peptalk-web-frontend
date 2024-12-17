import router from './router';

router.check();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    
    const menuButton: HTMLElement | null = document.querySelector('.menu-button');
    const dropdownMenu: HTMLElement | null = document.querySelector('.dropdown-menu');

    menuButton?.addEventListener('click', function() {
        if (!dropdownMenu) return;
        
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    dropdownMenu?.addEventListener('click', function() {
        if (!dropdownMenu) return;

        dropdownMenu.style.display = 'none';
    });

    const contactButton: HTMLElement | null = document.querySelector('.contact-button');
    contactButton?.addEventListener('click', function() {
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
                const response = await fetch('http://localhost:3000/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, reason, message }),
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



    
    // Cookie Consent Banner
    const cookieElement: HTMLElement | null = document.querySelector('.cookie-consent') as HTMLElement;
    if (!cookieElement) {
        console.error('Cookie consent element not found');
        return;
    }
    
    const acceptButton: HTMLButtonElement | null = document.getElementById('accept-cookies') as HTMLButtonElement;
    acceptButton?.addEventListener('click', function () {
        if (!acceptButton) {
            console.error('Accept button not found');
            return;
        }
        
        localStorage.setItem('cookieConsent', 'accepted');
        console.log('Cookies accepted');
        cookieElement.style.display = 'none';
    });
    
    const rejectButton: HTMLButtonElement | null = document.getElementById('reject-cookies') as HTMLButtonElement;
    rejectButton?.addEventListener('click', function () {
        if (!rejectButton) {
            console.error('Reject button not found');
            return;
        }
        
        localStorage.setItem('cookieConsent', 'rejected');
        console.log('Cookies rejected');
        cookieElement.style.display = 'none';
    });
    
    // Check if user has already accepted cookies
    window.onload = function() {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            const cookieElement: HTMLButtonElement | null = document.getElementById('cookie-consent') as HTMLButtonElement;
            if (!cookieElement) return;
            cookieElement.style.display = 'none';
        }
    }
    
    /* Testing frontend connection
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/items');
                const data = await response.json();
                console.log(data); // Process data
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        
        fetchItems();  
     */
});