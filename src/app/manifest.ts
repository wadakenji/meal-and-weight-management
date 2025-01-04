import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '食事体重管理アプリ',
    short_name: 'ダイエット',
    description: 'みんなでダイエットを頑張るアプリ',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#234E8E',
    categories: ['fitness', 'health'],
    icons: [
      {
        src: 'icons/48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'icons/72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icons/96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icons/144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
