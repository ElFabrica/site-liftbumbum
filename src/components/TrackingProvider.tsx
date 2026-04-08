'use client';

import { useEffect } from 'react';

interface TrackingItem {
  id: number;
  type: 'fb' | 'google' | 'gtm' | 'custom';
  name: string;
  code: string;
}

export default function TrackingProvider() {
  useEffect(() => {
    fetch('/api/admin/tracking')
      .then(r => r.json())
      .then((items: TrackingItem[]) => {
        if (!Array.isArray(items)) return;

        items.forEach(item => {
          const id = item.name?.trim();

          if (item.type === 'fb' && id) {
            // Facebook Pixel
            const s = document.createElement('script');
            s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`;
            document.head.appendChild(s);

          } else if (item.type === 'gtm' && id) {
            // Google Tag Manager
            const gs = document.createElement('script');
            gs.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
            document.head.appendChild(gs);

          } else if (item.type === 'google' && id) {
            // GA4
            const ga = document.createElement('script');
            ga.async = true;
            ga.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
            document.head.appendChild(ga);
            const ga2 = document.createElement('script');
            ga2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
            document.head.appendChild(ga2);

          } else if (item.type === 'custom' && item.code?.trim()) {
            // Script personalizado
            const div = document.createElement('div');
            div.innerHTML = item.code;
            Array.from(div.childNodes).forEach(n => document.head.appendChild(n.cloneNode(true)));
          }
        });
      })
      .catch(() => {
        // Sem tracking configurado — não bloqueia a página
      });
  }, []);

  return null;
}
