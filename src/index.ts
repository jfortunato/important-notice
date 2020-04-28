import "./polyfills";

(function () {
    function loadPolyfillIfNecessary(callback) {
        if (!('customElements' in window)) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.defer = true;
            document.body.appendChild(script);
            script.onload = () => {
                // @ts-ignore
                WebComponents.waitFor(() => callback());
            };
            script.src = "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.3/webcomponents-loader.js";

            return;
        }

        callback();
    };


    loadPolyfillIfNecessary(() => import('./important-notice'));
})();
