export const contactMailto = () => {
    console.log('contactMailto');
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        setTimeout(() => {

            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission
                console.log('contact-form submitted');
                
                // Get form values
                const name = (document.getElementById('name') as HTMLInputElement)?.value;
                const email = (document.getElementById('email') as HTMLInputElement)?.value;
                const reason = (document.getElementById('subject') as HTMLSelectElement)?.value;
                const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;
                
                // Construct the mailto link
                const mailtoLink = `mailto:help@peptalkhealth.com?subject=${encodeURIComponent(reason)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AReason: ${encodeURIComponent(reason)}%0AMessage: ${encodeURIComponent(message)}`;
                
                // Update the href attribute of the anchor tag
                contactForm?.setAttribute('action', mailtoLink);
                
                // Optionally, you can trigger the click event on the anchor tag to open the email client
                // document.getElementById('mailto-link').click();
            });
        }, 1000);
    }
};
