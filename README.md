# Important Notice Web Component
This is a simple web component that you can use to quickly add an alert to your site.

## Basic Usage
> Simply add this code anywhere within the ```body``` of your html.
```html
<script src="/path/to/this/file/important-notice.js" async></script>
<important-notice heading="Attention!" always-show showstopper>
    Please change this message to alert your site visitors of an important notice!
</important-notice>
```

## Advanced Usage

#### Corner notification
Just remove the ```showstopper``` property for a more subtle alert.
```html
<script src="/path/to/this/file/important-notice.js" async></script>
<important-notice heading="Attention!" always-show>
    Please change this message to alert your site visitors of an important notice!
</important-notice>
```

#### Showstopper w/ link
You can optionally include a button that will link to a different page.
```html
<script src="/path/to/this/file/important-notice.js" async></script>
<important-notice heading="Attention!" always-show showstopper link-href="https://example.com" link-label="Click Me" link-color="#09093d">
    Please change this message to alert your site visitors of an important notice!
</important-notice>
```

#### Creation with javascript
Instead of creating the alert with HTML you could opt to create it using javascript. One potential use-case would be for managing the notice using Google Tag Manager.
```html
<script>
(function () {
       // Configure these options
       var HEADING = 'Attention!';
       var MESSAGE = 'Please change this message to alert your site visitors of an important notice!';
       var ALWAYS_SHOW = true;
       var IS_SHOWSTOPPER = true;

       // No need to touch anything below here.
       function appendScript(src) {
           var script = document.createElement('script');
           script.src = src;
           document.body.appendChild(script);
       };
       function appendNotice() {
           var notice = document.createElement('important-notice');
           notice.setAttribute('heading', HEADING);
           if (ALWAYS_SHOW === true) notice.setAttribute('always-show', true);
           if (IS_SHOWSTOPPER === true) notice.setAttribute('showstopper', true);
           notice.innerHTML = MESSAGE;
           document.body.appendChild(notice);
       };
       appendScript('./important-notice.js');
       appendNotice();
   })();
</script>
```

## Properties
Name          | Description
----          | -----------
`heading`     | The heading of the notice.
`always-show` | If omitted, then the notice will not be shown again during the current browsing session.
`showstopper` | There are 2 types of notices:<br><br>The "showstopper" will display what is commonly referred to as a "modal" or "dialog".<br>The other type will simply display a notice in the corner of the page.
`link-label`  | Optional label to use for an external link button.
`link-href`   | Optional href to use for an external link button.
`link-color`  | Optional color to use for an external link button. Defaults to a gray background.
