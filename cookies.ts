export const cookies = () => {

    // Cookie Consent Banner
    const cookieElement: HTMLElement | null = document.getElementById('cookie-consent') as HTMLElement;
    if (!cookieElement) {
        console.error('Cookie consent element not found');
    }

    // Check if user has already accepted cookies
    window.onload = function() {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            const cookieElement: HTMLButtonElement | null = document.getElementById('cookie-consent') as HTMLButtonElement;
            if (!cookieElement) return;
            cookieElement.style.display = 'none';
        }
    }

    // Accept Cookies
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

    // Reject Cookies
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

};