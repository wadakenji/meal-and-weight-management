self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/96.png',
      badge: '/icons/96.png',
      vibrate: [100, 50, 100],
      data,
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');
  const data = event.data.json();
  const path = typeof data.path === 'string' ? data.path : '';
  event.notification.close();
  event.waitUntil(clients.openWindow(process.env.NEXT_PUBLIC_BASE_URL + path));
});
