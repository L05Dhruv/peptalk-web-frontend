export const menu = () => {
    
    // Menu Button for mobile
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
};