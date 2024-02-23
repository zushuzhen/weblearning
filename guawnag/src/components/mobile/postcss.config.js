// postcss.config.js
// 下面为px转vw
// const path = require('path');
// module.exports = ({webpack}) => {
//   const viewWidth = 375;
//   return {
//     plugins: {
//       autoprefixer: {},
//       "postcss-px-to-viewport": {
//         unitToConvert: "px",
//         viewportWidth: viewWidth,
//         unitPrecision: 6,
//         propList: ["*"],
//         viewportUnit: "vw",
//         fontViewportUnit: "vw",
//         selectorBlackList: [],
//         minPixelValue: 1,
//         mediaQuery: true,
//         exclude: [],
//         landscape: false,
//         include: [path.resolve(__dirname, 'src', 'pages', 'mobile')]
//       }
//     }
//   };
// };

// 下面为px转rem
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*']
    }
  }
}
