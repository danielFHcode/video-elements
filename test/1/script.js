import { apply } from '../../src/script.js';
import { createElement, trimInner } from '../../src/utils.js';

const element = apply(document.querySelector('video'));

const play = createElement('button', {
    text: '',
    style: trimInner(`
        font-size: 5rem;
        position: absolute;
        width: 10%;
        height: calc(10%*16/9);
        top: 50%;
    `),
});

element.container.appendChild(play);

play.addEventListener('click', function () {
    console.log('z');
    element.changeFullscreen();
});
