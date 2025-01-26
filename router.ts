import Router from 'vanilla-router';

const router = new Router({
  mode: 'hash',
  // mode:'history',
  root: '/',
});

// Function to fetch and load content from a file
async function loadPage(page: string): Promise<void> {
  const appElement = document.getElementById('app');
  console.log(appElement);
  if (appElement) {
    console.log('appElement found');
    try {
      // Add a check for initial load
      if (document.location.hash === '' || document.location.hash === '#/') {
        page = 'home';
      }
      
      const response = await fetch(`${window.location.origin}/pages/${page}.html`);
      if (response.ok) {
        const content = await response.text();
        console.log('response ok: ', response);
        appElement.innerHTML = content;
      } else {
        appElement.innerHTML = '<h1>404 - Page Not Found</h1>';
      }
    } catch (error) {
      console.error('Error loading page:', error);
      appElement.innerHTML = '<h1>Error loading page. Please try again later.</h1>';
    }
  }
}

// Add routes to the router
router.add('/', () => loadPage('home'));   // Load home.html for the root route
router.add('/about', () => loadPage('about'));  // Load about.html for the /about route
router.add('/contact', () => loadPage('contact'));  // Load contact.html for the /contact route
router.add('/getstarted', () => loadPage('getstarted'));  // Load getstarted.html for the /getstarted route
router.add('/terms-patients', () => loadPage('toc-patients'));  // Load terms-patients.html for the /terms-patients route
router.add('/terms-providers', () => loadPage('toc-providers'));  // Load toc-providers.html for the /terms-providers route
router.add('/privacy', () => loadPage('privacy-policy'));  // Load privacy-policy.html for the /privacy route
router.add('/info-release', () => loadPage('info-release'));  // Load info-release.html for the /info-release route
router.add('/consumer-notice', () => loadPage('consumer-notice'));  // Load consumer-notice.html for the /consumer-notice route
router.add('/delete-my-data', () => loadPage('delete-my-data'));  // Load delete-my-data.html for the /delete-my-data route

// Check initial route
router.check();
router.addUriListener();

export default router;
