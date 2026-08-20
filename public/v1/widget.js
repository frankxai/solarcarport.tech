/**
 * SolarCarport.tech - Universal White-Label Configurator Embed Widget Loader (v1.0)
 * Allows solar installers and contractors to embed an interactive, lead-generating 
 * carport configurator with 1 line of HTML.
 *
 * Usage:
 * <div id="solarcarport-widget" data-tenant="solartechnik-nord" data-theme="dark"></div>
 * <script src="https://solarcarport.tech/v1/widget.js" async></script>
 */
(function () {
  'use strict';

  function initWidget() {
    const containers = document.querySelectorAll('[id="solarcarport-widget"], [data-solarcarport-embed]');
    
    containers.forEach(function (container) {
      if (container.getAttribute('data-sc-initialized') === 'true') return;

      const tenant = container.getAttribute('data-tenant') || 'default';
      const theme = container.getAttribute('data-theme') || 'dark';
      const primaryColor = container.getAttribute('data-primary-color');
      const companyName = container.getAttribute('data-company-name');
      const lang = container.getAttribute('data-lang') || 'de';
      
      // Determine origin base URL from script tag if possible, or fallback to current origin
      let scriptHost = 'https://solarcarport.tech';
      const currentScript = document.currentScript || document.querySelector('script[src*="widget.js"]');
      if (currentScript && currentScript.src) {
        try {
          const scriptUrl = new URL(currentScript.src);
          scriptHost = scriptUrl.origin;
        } catch (e) {}
      }

      // Build target embed URL with params
      const embedUrl = new URL(`${scriptHost}/embed/${encodeURIComponent(tenant)}`);
      embedUrl.searchParams.set('theme', theme);
      embedUrl.searchParams.set('lang', lang);
      if (primaryColor) embedUrl.searchParams.set('color', primaryColor);
      if (companyName) embedUrl.searchParams.set('companyName', companyName);

      // Create sandboxed iframe with smooth styling
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl.toString();
      iframe.title = 'SolarCarport Konfigurator';
      iframe.style.width = '100%';
      iframe.style.minHeight = '720px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '16px';
      iframe.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.4)';
      iframe.style.display = 'block';
      iframe.style.background = theme === 'light' ? '#ffffff' : '#071019';
      iframe.style.transition = 'height 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('allow', 'clipboard-write');

      // Clear container and append
      container.innerHTML = '';
      container.appendChild(iframe);
      container.setAttribute('data-sc-initialized', 'true');

      // Listen for auto-resize events from iframe
      window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'SOLARCARPORT_RESIZE' && event.data.tenantId === tenant) {
          if (event.data.height && Number(event.data.height) > 400) {
            iframe.style.height = `${event.data.height}px`;
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
