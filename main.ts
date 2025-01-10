import router from './router';
import {cookies} from './src/scripts/cookies';
import {menu} from './src/scripts/menu';
import {contactButton} from './src/scripts/contactButton';
import {getStartedButton} from './src/scripts/getStartedButton';

router.check();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    
    // Handle interaction with cookie consent banner, cookies, permissions and localStorage
    cookies();

    // 3 line-menu button for mobile
    menu();
    
    // Contact Page interactivity
    contactButton();
    
    // Get Started Page interactivity
    getStartedButton();

    // Testing frontend to backend connection
    // const fetchItems = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/items');
    //         const data = await response.json();
    //         console.log(data); // Process data
    //     } catch (error) {
    //         console.error('Error fetching items:', error);
    //     }
    // };
    // fetchItems();
   
});