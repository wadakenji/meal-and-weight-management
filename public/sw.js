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
  let path = '';
  if (event.notification?.data?.path) {
    path = event.notification.data.path;
  }
  event.notification.close();
  event.waitUntil(clients.openWindow(self.location.host + path));
});
