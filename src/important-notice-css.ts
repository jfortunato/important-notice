export const style = `
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
`;
