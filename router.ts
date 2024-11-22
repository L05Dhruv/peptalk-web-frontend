import Router from 'vanilla-router';

const router = new Router({
  mode: 'hash',
  root: '/',
});

// Function to fetch and load content from a file
async function loadPage(page: string): Promise<void> {
  const appElement = document.getElementById('app');
  // console.log(appElement);
  if (appElement) {
    // console.log('appElement found');
    try {
      const response = await fetch(`/peptalk-web-frontend/public/pages/${page}.html`);
      console.log(response);
      if (response.ok) {
        console.log('response ok');
        const content = await response.text();
        console.log(content);
        appElement.innerHTML = content;
      } else {
        console.log('response not ok');
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

// Listen to URL changes
router.addUriListener();

export default router;
