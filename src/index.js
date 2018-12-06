console.log(33)
// css不是js模块，所以需要loader转化
const c = 3;
let test = () => {
    console.log(c)
}
test();
require('./index.css')