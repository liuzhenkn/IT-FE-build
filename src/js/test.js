/**
 * @author liuzhenkun
 * @date 2017/12/25-下午7:12
 * @file test.js
 */
 
window.onload = function () {
    const testJs = document.getElementById('testJsHotLoad');
    let a = 'test babel';
    testJs.innerText = `测试 js 热更新 + ${a}`;
};