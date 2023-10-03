import './css/style.css';

import './js/app';

// TODO: write your code in app.js

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
