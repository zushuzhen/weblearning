##### postcss-pxtorem是PostCSS的插件，用于将像素单元生成rem单位。

> 前端开发还原设计稿的重要性毋庸置疑，目前应用的单位最多还是rem,然而每次在制作过程中需要自己计算rem值，为了能够直接按照设计图的尺寸开发，并且能自动编译转换成rem，下面就来分享下postcss-pxtorem的使用。

1.安装依赖

```undefined
npm install postcss-pxtorem -D
```

2.设置规则（更改postcss.config.js,该文件为使用vue-cli3自动创建的文件）

```java
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*']
    }
  }
}
```

src目录下，新建 libs/rem.js 输入如下代码

```jsx
// 设置 rem 函数
function setRem () {
    // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
//设置根元素字体大小
    htmlDom.style.fontSize= htmlWidth/20 + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}
```

在main.js中引入rem.js

```dart
import './libs/rem.js';
```