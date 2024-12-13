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

    /*
    const slides = document.querySelectorAll(".slide");
    console.log(slides);
    

    // Carousel: Check if there are any slides before proceeding
    if (slides.length === 0) {
        console.error('No slides found with class "slide"');
        return;
    }
    // Get the first slide if none is active
    const currentSlide = slides[0];
    // Set the active slide
    currentSlide.setAttribute('data-active', 'true');
    */

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
});