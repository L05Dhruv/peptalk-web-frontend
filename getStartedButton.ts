export const getStartedButton = () => {
    // Get Started page submit Button
    const getStartedButton: HTMLElement | null = document.querySelector('.submit-button');
    getStartedButton?.addEventListener('click', function() {
        
        console.log('button clicked');
        if (!getStartedButton) return;

        // window.location.href = '/getstarted';
    });
}