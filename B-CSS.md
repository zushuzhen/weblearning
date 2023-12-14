#### 鼠标变小手

```css
 cursor: pointer;
```

#### 文字不换行

```css
white-space: nowrap;
```
#### 文字两端对齐
```
.custom-labe {
  width: 140rpx;
  display: flex;
  text-align-last: justify;
  justify-content: space-evenly;
}

.text-titl {
  display: inline-block;
  width: 140rpx;
  font-size: 30rpx;
  color: #f3f3f3;
}
```

text-indent:2

#### 图片等比例

```css
.img{
 background-image: url("@/assets/images/adoutbackground.png");
 background-size: cover;
}
```
## 超出...显示

#### 1.不换行超出用...显示

```
white-space: nowrap; /* 防止文字换行 */
overflow: hidden; /* 超出部分隐藏 */
text-overflow: ellipsis; /* 超出部分显示省略号 */
width: 200px; /* 容器宽度，根据需要调整 */
border: 1px solid #ccc; /* 可选：添加边框以显示容器的边界 */
```

#### 2.超过3行用...显示

```
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
```

## 居中
#### 1.盒子上下左右居中

```css
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
    .absolutely {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .relative {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
}
```
#### 2.完美居中
```css
.center{
 position: absolute; /* 绝对定位 */
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%); /* 横轴-50%，竖轴-50% */
 display: flex;
 justify-content: center;
}
```





 ## div 元素 HTML 属性、CSS 样式和其他属性
### **一、HTML 属性**：
1. `class` 和 `id`: 用于标识和选择元素的样式。
2. `title`: 设置元素的标题，鼠标悬停时显示。
3. `style`: 直接在元素上应用内联 CSS 样式。

### **二、CSS 样式属性**：

1. **Display 和布局**：
   - `display`: 控制元素的显示方式。
   - `position` 和相关属性：控制元素的定位方式。
   - `float`: 定义元素在文本流中的浮动方式。
   - `clear`: 控制元素如何处理浮动元素。
2. **尺寸和边距**：
   - `width` 和 `height`: 定义元素的宽度和高度。
   - `min-width` 和 `max-width`、`min-height` 和 `max-height`: 定义元素的最小和最大尺寸。
   - `margin` 和相关属性：定义元素的外边距。
   - `padding` 和相关属性：定义元素的内边距。
   - `border` 和相关属性：定义元素的边框。
3. **背景和颜色**：
   - `background-color`: 定义元素的背景颜色。
   - `background-image` 和相关属性：定义元素的背景图像。
   - `background-size` 和 `background-position`: 控制背景图像的尺寸和位置。
   - `color`: 定义文本颜色。
4. **文本和字体**：
   - `font-family`、`font-size`、`font-weight`、`font-style`: 控制文本的字体属性。
   - `text-align` 和相关属性：控制文本的对齐方式。
   - `line-height`: 定义行高。
   - `text-decoration`: 定义文本修饰。
   - `text-transform`: 控制文本的大小写转换。
5. **盒子模型和布局**：
   - `box-sizing`: 控制盒子模型的计算方式。
   - `overflow` 和相关属性：控制元素内容溢出的处理方式。
   - `box-shadow`: 添加阴影效果。
   - `border-radius`: 定义元素的边框圆角。
6. **动画和过渡**：
   - `transition` 和相关属性：定义属性变化的过渡效果。
   - `animation` 和相关属性：定义动画效果。
7. **列表和表格**：
   - `list-style` 相关属性：控制列表项的样式。
   - `border-collapse` 和 `border-spacing`: 控制表格边框的合并和间距。
8. **定位和层叠**：
   - `z-index`: 控制元素的层叠顺序。
   - `top`、`right`、`bottom`、`left`: 控制定位元素的位置。
9. **伪元素和伪类**：
   - `::before` 和 `::after`: 创建伪元素。
   - 伪类如 `:hover`、`:active`、`:focus`：控制元素在不同状态下的样式。
###  **三、其他属性**：
  - `visibility`: 控制元素的可见性。
  - `opacity`: 控制元素的不透明度。
  - `cursor`: 定义鼠标指针的样式。
  - `content`: 在伪元素中定义内容。
1. **媒体查询**：使用 `@media` 查询为不同设备和屏幕大小应用不同的样式。
2. **自定义属性**：使用 `data-*` 属性定义自定义数据属性，用于 JavaScript 或 CSS 样式。
3. **字体图标和图像**：使用字体图标库或图像作为 `div` 元素的背景或内容。
4. **表格布局**：`table`、`table-row`、`table-cell` 等属性，用于创建表格布局。
5. **多列布局**：`column-count`、`column-gap` 等属性，用于创建多列布局。
6. **形状属性**：`shape-outside` 和 `shape-margin`，用于定制文本环绕形状。
7. **导航属性**：`nav-index`、`nav-up`、`nav-right`、`nav-down` 等属性，用于导航焦点元素。
8. **阴影和轮廓**：`outline` 属性，定义元素的轮廓样式。
9. **Unicode 和内容生成**：`content` 属性中的 Unicode 和 CSS 生成内容。
10. **变量和自定义属性**：`var()` 函数和自定义属性的使用。







## background属性及其子属性的完整列表

| 属性                          | 描述                                        |1    |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `background`                  | 用于设置所有背景属性的缩写属性。                           | 1|
| `background-color`            | 设置元素的背景颜色。                                       |1|
| `background-image`            | 设置一个或多个背景图像。                                   |
| `background-repeat`           | 设置背景图像是否及如何重复。                               |
| `background-position`         | 设置背景图像的起始位置。                                   |
| `background-size`             | 设置背景图像的大小。                                       |
| `background-origin`           | 设置背景图像的定位区域。                                   |
| `background-clip`             | 设置背景颜色的绘制区域。                                   |
| `background-attachment`       | 设置背景图像是否随着元素内容滚动。                         |
| `background-blur` (CSS4)      | 设置背景的模糊程度。                                       |
| `background-composite` (CSS4) | 设置背景图片的合成模式。                                   |
| `background-break`            | 设置如何在元素的内联轴盒、块级轴盒或区块容器之间分页背景。 |
| `background-origin`           | 设置背景图像的定位区域。                                   |
| `background-clip`             | 设置背景颜色的绘制区域。                                   |
| `background-color`            | 设置元素的背景颜色。       |2                                  |
| `background-position-x`       | 设置背景图像的水平位置。        |2                             |
| `background-position-y`       | 设置背景图像的垂直位置。   |3                                  |
| `background-size`             | 设置背景图像的大小。     |4                                    |
| `background-attachment`       | 设置背景图像是否随着元素内容滚动。     |3                      |
| `background-image`            | 设置一个或多个背景图像。       |e                              |
| `background-origin`           | 设置背景图像的定位区域。     |3                                |
| `background-clip`             | 设置背景颜色的绘制区域。         |2                            |
| `background-blend-mode`       | 设置元素的背景颜色和背景图像如何混合。                                     |e                   |
| `background-composite` (CSS4) | 设置背景图片的合成模式。                                     |      w                           |
| `background-break`            | 设置如何在元素的内联轴盒、块级轴盒或区块容器之间分页背景。 |
