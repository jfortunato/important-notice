import {style} from './important-notice-css';

const template = document.createElement('template');
template.innerHTML = `
${style}
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
