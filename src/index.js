import _ from 'lodash'

let element = document.createElement('div');
element.innerHTML = _.join(['Hello', 'World'], ' ')
document.body.appendChild(element);


// css不是js模块，所以需要loader转化
const c = 3;
let test = () => {
    console.log(c)
}
test();
require('./index.css')

import bigSizeImage from './assets/wallpaper.jpg'

let bigSizeImageElement=document.createElement(('img'));
bigSizeImageElement.src=bigSizeImage;
document.body.appendChild(bigSizeImageElement)

