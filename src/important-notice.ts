/**
 *
 * ============= POLYFILLS =============
 *
 */
(function () {
    // Polyfill for Element.remove()
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    if (this.parentNode === null) {
                        return;
                    }
                    this.parentNode.removeChild(this);
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);



    // Shim to allow custom elements to be defined without calling new
    (function () {
        'use strict';

        // @ts-ignore
        (function(){if(void 0===window.Reflect||void 0===window.customElements||window.customElements.polyfillWrapFlushCallback)return;const a=HTMLElement;window.HTMLElement={HTMLElement:function HTMLElement(){return Reflect.construct(a,[],this.constructor)}}.HTMLElement,HTMLElement.prototype=a.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,a);})();

    }());

})();


/**
 * Important Notice wrapper function.
 */
function importantNotice() {
    const template = document.createElement('template');
    template.innerHTML = `
<style>
.important-notice__wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
}
.important-notice--showstopper .important-notice__wrapper {
    top: 0;
    right: 0;
    z-index: 9999;
}
.important-notice__overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    display: none;
}
.important-notice--showstopper .important-notice__overlay {
    display: block;
}
.important-notice__container {
    background-color: #fff;;
    padding: 40px;
    max-width: 600px;
    position: relative;
    margin: -30% 10px 10px 10px;
}
.important-notice__heading {
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
}
.important-notice__body {
    line-height: 1.5rem;
}
.important-notice__close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: #757575;
    padding: 20px 40px;
}
.important-notice__link-container {
    text-align: right;
}
.important-notice__link {
    padding: 10px;
    color: #fff;
    text-decoration: none;
    margin-top: 15px;
    display: inline-block;
}
.important-notice__link:hover {
    text-decoration: underline;
}
</style>

<div class="important-notice">
    <div class="important-notice__wrapper">
        <div class="important-notice__overlay"></div>
        <div class="important-notice__container">
            <div class="important-notice__heading"></div>
            <div class="important-notice__body">
                <slot></slot>
            </div>
            <div class="important-notice__link-container"></div>
            <div class="important-notice__close">X</div>
        </div>
    </div>
</div>

`;

    class ImportantNotice extends HTMLElement {
        private heading: string = '';
        private alwaysShow: boolean = false;
        private isShowstopper: boolean = false;
        private linkHref: string = '';
        private linkLabel: string = '';
        private linkColor: string = '#787979';
        private STORAGE_KEY: string;

        constructor() {
            super();

            this.heading = this.getAttribute('heading') || '';
            this.alwaysShow = this.hasAttribute('always-show');
            this.isShowstopper = this.hasAttribute('showstopper');
            this.linkHref = this.getAttribute('link-href') || '';
            this.linkLabel = this.getAttribute('link-label') || '';
            // if one is specified, require the other to be specified
            if ((this.linkHref !== '' && this.linkLabel === '') || (this.linkLabel !== '' && this.linkHref === '')) {
                throw new Error("Please supply BOTH link-href AND link-label.");
            }
            this.linkColor = this.getAttribute('link-color') || '#787979';

            this.STORAGE_KEY = this.isShowstopper ? 'important-notice-closed--showstopper' : 'important-notice-closed';

            this.handleClose = this.handleClose.bind(this);

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.template());
        }

        connectedCallback() {
            if (!this.alwaysShow && JSON.parse(window.sessionStorage.getItem(this.STORAGE_KEY)) === true) {
                return this.remove();
            }

            this.shadowRoot.querySelector('.important-notice__close').addEventListener('click', this.handleClose);
            this.shadowRoot.querySelector('.important-notice__overlay').addEventListener('click', this.handleClose);
        }

        disconnectedCallback() {
            this.shadowRoot.querySelector('.important-notice__close').removeEventListener('click', this.handleClose);
            this.shadowRoot.querySelector('.important-notice__overlay').removeEventListener('click', this.handleClose);
        }

        template() {
            const cloned = template.content.cloneNode(true) as HTMLElement;

            if (this.isShowstopper) {
                cloned.querySelector('.important-notice').classList.add('important-notice--showstopper');
            }

            if (this.linkLabel) {
                cloned.querySelector('.important-notice__link-container').innerHTML = `<a style="background-color: ${this.linkColor};" class="important-notice__link" href="${this.linkHref}">${this.linkLabel}</a>`;
            }

            cloned.querySelector('.important-notice__heading').textContent = this.heading;

            return cloned;
        }

        handleClose() {
            if (!this.alwaysShow) {
                window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(true));
            }

            this.remove();
        }
    }


    if (customElements.get('important-notice') === undefined) {
        customElements.define('important-notice', ImportantNotice);
    }
};


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
            script.src = "https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-loader.js";

            return;
        }

        callback();
    };


    loadPolyfillIfNecessary(() => importantNotice());
})();
