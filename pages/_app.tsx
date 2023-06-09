import '../styles/globals.css';
import { fontRegularStyles, fontBoldStyles } from '../libs/fontStyles';
import type { AppProps } from 'next/app';
import Script from 'next/script';

declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    rdt: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          ${fontRegularStyles}
          ${fontBoldStyles}
        `}
      </style>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-JZE2T8F8ME'
      />
      <Script
        id='datalayer'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JZE2T8F8ME');
          `,
        }}
      />
      <Script
        id='reddit'
        dangerouslySetInnerHTML={{
          __html: `
        !(function (w, d) {
          if (!w.rdt) {
            var p = (w.rdt = function () {
              p.sendEvent
                ? p.sendEvent.apply(p, arguments)
                : p.callQueue.push(arguments);
            });
            p.callQueue = [];
            var t = d.createElement('script');
            (t.src = 'https://www.redditstatic.com/ads/pixel.js'), (t.async = !0);
            var s = d.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(t, s);
          }
        })(window, document);
        rdt('init', 't2_svkzlzgg', {
          optOut: false,
          useDecimalCurrencyValues: true,
          email: 'caleb@privateauto.com',
        });
        rdt('track', 'PageVisit');
      `,
        }}
      />
      <Script
        id='gtag0'
        dangerouslySetInnerHTML={{
          __html: `
            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod
                  ? n.callMethod.apply(n, arguments)
                  : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(
              window,
              document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js'
            );
            fbq('init', '218912453111725');
            fbq('track', 'PageView');
            `,
        }}
      />
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-JZE2T8F8ME'
      />
      <Script
        id='gtag'
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JZE2T8F8ME');`,
        }}
      />
      <Script
        id='gtag1'
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, "script", "dataLayer", "GTM-NF432VS");`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
