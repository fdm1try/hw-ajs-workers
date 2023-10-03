import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute, setDefaultHandler } from 'workbox-routing';
import { NetworkOnly, NetworkFirst } from 'workbox-strategies';

// eslint-disable-next-line no-underscore-dangle, no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

setDefaultHandler(new NetworkOnly());

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new NetworkFirst(),
);
