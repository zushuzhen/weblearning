## 二、background-origin与clip 背景图片定位参考系与背景裁剪

### ①、background-origin

background-origin的默认值是padding-box， 代表的是背景图片开始的原点

background-origin:border-box; 图像从边框开始显示， 表示以表框左上角为原点展开背景图片

background-origin:padding-box; 图像从内边距开始显示（默认）， 表示以内填充区左上角为原点展开背景图片

background-origin:content-box; 图像从内容开始显示， 表示以内容区的左上角为原点展开背景图片

| background-origin值 | 含义                                  |
| ------------------- | ------------------------------------- |
| border-box          | 背景图片相对于元素border区域进行定位  |
| padding-box         | 背景图片相对于元素padding区域进行定位 |
| content-box         | 背景图片相对于元素content区域进行定位 |

1.演示

![img](https://pic2.zhimg.com/80/v2-7c01b7a664e3de01ff85a9659aeeac49_720w.webp)

### ②、background-clip

background-clip的默认值是border-box

background-clip:border-box; 图像从边框（包括border区域）开始裁剪（默认）， 表示裁剪超出边框区的内容

background-clip:padding-box; 图像从内边距（包括padding）开始裁剪， 表示裁剪超出内填充区的内容

background-clip:content-box; 图像从内容（包括content）开始裁剪， 表示裁剪超出内容区的内容

还有一个取值是**background-clip:text**

![img](https://pic4.zhimg.com/80/v2-a6b80bc3da10c98d5402d3624c96d98f_720w.webp)

background-clip（背景裁剪）

值 含义

border-box 背景（图片+颜色）占据盒模型的 border+padding+content 3个区域

padding-box 背景（图片+颜色）占据盒模型的 padding+content 2个区域

content-box 背景（图片+颜色）占据盒模型的 content 1个区域

注:设置background-clip:border-box时需要让元素边框完全透明或部分透明，否则边框样式会完全遮盖住background-clip:border-box的效果。

background-clip: border-box || padding-box || context-box || no-clip || text

　　(1)border-box：此值为默认值，背景从border区域向外裁剪，也就是超出部分将被裁剪掉;

　　(2)padding-box：背景从padding区域向外裁剪，超过padding区域的背景将被裁剪掉;

　　(3)context-box：背景从content区域向外裁剪，超过context区域的背景将被裁剪掉;

　　(4)no-clip： 背景从border区域向外裁剪背景。

　　(5)text：文本剪裁(字体加背景)

![img](https://pic2.zhimg.com/80/v2-9d75a8ec132aeaa7696eeaff30022b85_720w.webp)



演示

![img](https://pic3.zhimg.com/80/v2-24dfe2ef4ca09761df07d9dac957896e_720w.webp)

代码

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../reset.css">
    <style>
        body{
            background-color: burlywood;
        }
        #Box{
            width: 1800px;
            height: 400px;
            background-color: gray;
            margin: 200PX auto;
        }
        div[class^="box"]{
            width: 344px;
            height: 296px;
            background-color: rgb(28, 68, 154);
            /* 使4个盒子的边框为15px */
            border: 15px dashed rgb(236, 20, 20);
            /* 使4个盒子显示在一行 */
            float: left;
            /* 设置每个盒子外边距10px */
            margin: 10px;
            /* 设置每个盒子内边距10px */
            padding: 20px;
            /* 每个盒子都设置背景，不平铺 */
            background-image: url(./flower.jpg) ;
            background-repeat:no-repeat;
        }
        .box2{
            background-clip: border-box;
        }
        .box3{
            background-clip: padding-box;
        }
        .box4{
            background-clip: content-box;
        }
    </style>
</head>
<body>
    <div id="Box">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
        <div class="box4"></div>
    </div>
</body>
</html>
```

### ③、同时设置

|                   |            |             |             |
| ----------------- | ---------- | ----------- | ----------- |
| background-origin | border-box |             |             |
| background-clip   | border-box | padding-box | content-box |
|                   |            |             |             |

![img](https://pic3.zhimg.com/80/v2-1897ae2d9e0afb70c4615b7f874c3bc2_720w.webp)

|                   |            |             |             |
| ----------------- | ---------- | ----------- | ----------- |
| background-origin |            | padding-box |             |
| background-clip   | border-box | padding-box | content-box |
|                   |            |             |             |

![img](https://pic3.zhimg.com/80/v2-04c877846de4fdb554ceb03e2b2d26a6_720w.webp)

|                   |            |             |             |
| ----------------- | ---------- | ----------- | ----------- |
| background-origin |            |             | content-box |
| background-clip   | border-box | padding-box | content-box |
|                   |            |             |             |

![img](https://pic3.zhimg.com/80/v2-d3b85372cec51e8d8a5032d980e27ea2_720w.webp)

### ④、比较

对于这两个属性，其对应的keyword是相同的：border-box, padding-box, content-box。

它们的最根本的区别就是：background-clip 是对背景图片的裁剪，background-origin是对背景图片设置起始点。

对于background-clip, 其关键字是指将背景图片以border的尺寸、以padding的尺寸，以content的尺寸进行切割，其得到的结果是不完整的背景，也就是其中的一部分(原理与截图差不多)。而且有一点要注意，background-clip的切割是对这个容器背景的切割(包括图片与背景颜色)。

对于background-origin，其关键字是指将背景图片放置到border范围内，padding范围内、content范围内，其得到的结果是完整的背景(原理与图片的缩放相似)。与background-clip不同的是，它只是单纯设置背景图片的边界，并不会对背景颜色造成影响。

## 三、clip-path

属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。兼容性页蛮高的。

![img](https://pic1.zhimg.com/80/v2-4ee72d65efd185bb8be7cdcdef257254_720w.webp)

-webkit-clip-path解决兼容性问题

clip-path可以通过专有名词属性值很容易的画出一些简单的图形，例如圆(circle)，椭圆(ellipse)，圆角矩形(inset)：

绘制圆形设置悬停后，按钮变大的效果案例

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    .div1 {
 width: 320px;
 height: 320px;
 border: 1px solid red;
 background: url(./yuanquan.png) no-repeat;
        /* background: url(./flower.jpg) no-repeat; */
 background-size: cover;
        /* 裁剪出圆形区域 */
         /* clip-path: circle(40px at 100px 100px); */
        clip-path: circle(40px at center);
        /* 控制变化时间 */
        transition: clip-path .8s;
    }
    .div1:hover{
         /* clip-path: circle(80px at 100px 100px); */
        clip-path: circle(80px at center);
    }
    </style>
</head>
<body>
    <div class="div1"></div>
</body>
</html>
```

注意1使用clip-path要从同一个方向绘制，如果顺时针绘制就一律顺时针，逆时针就一律逆时针，因为polygon是一个连续的线段，若线段彼此有交集，面积区域就会有相减的状况发生（当然如果这是你要的效果就无妨了）。

注意2如果绘制时采用「比例」的方式绘制，长宽就必须要先行设定，不然有可能绘制出来的长宽和我们想像的就会有落差，使用「像素」绘制就没有这种问题。

圆

```text
li:nth-child(7){
   background: #00CCCE;
   clip-path:circle(50% at 50% 50%);
}
```

![img](https://pic2.zhimg.com/80/v2-4bda47503fc86bc76f3b2a21b3633cc9_720w.webp)

椭圆ellipse，

```text
li:nth-child(8){
   clip-path:ellipse(25% 50% at 50% 50%);
   background: #C4C4C4;
}
```

![img](https://pic4.zhimg.com/80/v2-ab8099f51ace8ba72f81ff4f0a10832b_720w.webp)

圆角矩形

```text
li:nth-child(9){
   clip-path:inset(20% 0 round 0 20%);
   background: #9A99FF;
}
```

![img](https://pic3.zhimg.com/80/v2-d5bc1eb6f946c0690b9ec888221794ce_720w.webp)

**以下使用 polygon 绘制**

五角星1

```text
div{
   width: 200px;
   height: 200px;
   background: url(../jsbase/fengjing/picture/9.jpg) no-repeat center / cover;
   margin: 10px;
   clip-path: polygon(100% 39%,66% 32%,50% 3%,32% 32%,0 39%,24% 64%,19% 97%,50% 84%,81% 97%,76% 64%);
}
```

![img](https://pic2.zhimg.com/80/v2-4029ed887d9052335529bb7507a3d05d_720w.webp)

百分比参数设置含义解释

![img](https://pic3.zhimg.com/80/v2-f4707688165848c5c047bf1bfdd4521e_720w.webp)

五角星2正五角星

```text
li:nth-child(6){
   clip-path:polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0 38%, 37% 38%);
   background: url(../jsbase/fengjing/picture/8.jpg) no-repeat center / cover;
}
```

![img](https://pic3.zhimg.com/80/v2-1ae7b741a8d7ba4f1fc032d9f15e4aa2_720w.webp)

菱形

```text
li:nth-child(4){
   clip-path: polygon(100% 50%, 50% 0,0 50%,50% 100%);
   background: url(../jsbase/fengjing/picture/6.jpg) no-repeat center / cover;
}
```

![img](https://pic4.zhimg.com/80/v2-3fdad6e839923b85ef5240eaf70d027f_720w.webp)

X形状

```text
li:nth-child(5){
   clip-path:polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
   background: url(../jsbase/fengjing/picture/1.jpg) no-repeat center / cover;
   animation-duration: 2s;
}        
```

三角形

```text
li:nth-child(1){
   clip-path: polygon(100% 100%,50% 0,0 100%);
   background: url(../yuan.jpg) no-repeat center / cover;
   animation-duration: 1s;
   clip-path: rec;
}
li:nth-child(2){
   clip-path: polygon(100% 0,0 100%,100% 100%);
   background: url(../yuan.jpg) no-repeat center / cover;
   animation-duration: 4s;
}
```

![img](https://pic4.zhimg.com/80/v2-2fdb5f3fb0aaf523963bb0225aca120f_720w.webp)

提示框

```text
li:nth-child(10){
   clip-path:polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
   background: url(../jsbase/fengjing/picture/1.jpg) no-repeat center / cover;
   animation-duration: 1.2s;
}
```

![img](https://pic1.zhimg.com/80/v2-7d0e7ad6dddab38ea0be2ad3d5c9eec4_720w.webp)

## 四、 background-size

| 类型   | 示例        | 含义                                             |
| ------ | ----------- | ------------------------------------------------ |
| 百分比 | 20% 30%     | 背景图片占据背景区宽度的百分之20，高度的百分之30 |
| 像素   | 250px 300px | 背景图片的宽度为200像素，高度为300像素           |
| 覆盖   | cover       | 保持图片宽高比进行拉伸，使其完全占据背景区       |
| 包含   | contain     | 保持图片宽高比进行缩放，使其恰好适合背景区       |

（1）设置背景图片高度和宽度（10px 30px）。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为 auto(自动);

（2）将计算相对于背景定位区域的百分比(30% 30%)。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"

（3）cover:此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。背景图不会变形，但是超出区域会被裁减掉。

（4）contain:此时会保持图像的纵横比并将图像缩放成适合背景定位区域的最大大小。

![img](https://pic4.zhimg.com/80/v2-67837cf22f99fde9d8dfb1365a64fb5b_720w.webp)

代码

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../reset.css">
    <style>
        body{
            background-color: burlywood;
        }
        #Box{
            width: 1800px;
            height: 1000px;
            background-color: gray;
            margin: 200PX auto;
        }
        div[class^="box"]{
            width: 344px;
            height: 396px;
            background-color: rgb(28, 68, 154);
            /* 使4个盒子的边框为15px */
            border: 15px dashed rgb(236, 20, 20);
            /* 使4个盒子显示在一行 */
            float: left;
            /* 设置每个盒子外边距10px */
            margin: 10px;
            /* 设置每个盒子内边距10px */
            padding: 20px;
            /* 每个盒子都设置背景，不平铺 */
            background-image: url(./flower.jpg) ;
            background-repeat:no-repeat;
        }
        .box1{
            background-size: 20% 30%;
        }
        .box2{
            background-size: 250px 300px;
        }
        .box3{
            background-size: cover;
        }
        .box4{
            background-size: contain;
        }
        /* .box5{
        } */
    </style>
</head>
<body>
    <div id="Box">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
        <div class="box4"></div>
        <div class="box5"></div>
    </div>
</body>
</html>
```

## 五、 background-position

background-position总共有5个属性，分别是top、right、bottom、left、center，这个5个属性可以单独使用，也可以两两使用。单独使用时，默认第二个参数为center

背景图片的位置

属性值： x y

（1） xpos ypos： 都为正值时，往右往下移动

（2） 还可以用单词(如果仅指定一个关键字，其他值将会是"center")

x取left center right

y取top center bottom

（3） 百分比：x% y% 第一个值是水平位置，第二个值是垂直位置。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。 默认值为：0％0％

![img](https://pic4.zhimg.com/80/v2-16b3e667cd8e769a79367a879018c327_720w.webp)

应用：给div设置banner背景，div只设置高度

很多网站的首页都会有banner图（网站最上方的全屏大图叫做「通栏banner」），这种图要求横向的宽度特别大。比如说，设计师给你一张1920*465的超大banner图，如果我们把这个banner图作为img标签直接插入网页中，会有问题的：首先，图片不在网页的中间；其次，肯定会出现横向滚动条。如下图所示：

![img](https://pic4.zhimg.com/80/v2-5bce20e55dc50dd829ef95d40a6bb24b_720w.webp)

正确的做法是，将banner图作为div的背景图，这样的话，背景图超出div的部分，会自动移溢出。需要给div设置的属性如下：

```text
       div{
           height: 465px;
           background-image: url(http://img.smyhvae.com/20170813_1053.jpg);
           background-position: center top;
           background-repeat: no-repeat;
       }
```

给div设置height（高度为banner图的高度），不需要设置宽度（因为宽度会自动霸占整行）

![img](https://pic2.zhimg.com/80/v2-1934e97c64b24f84d03e792a0ce6712d_720w.webp)

上图可以看出，将banner图作为div的背景后，banner图会永远处于网页的正中间（水平方向来看）。

第四部分 background-attachment

## 六、background-attachment（背景图片是否固定）

背景图片是否固定支持的值以及含义:

| 值     | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| scroll | 默认值，背景图片不固定，在视窗内滚动元素时，背景图片跟随元素一起滚动 |
| fixed  | 背景图片固定，在视窗内滚动元素时，背景图片不跟随元素一起滚动 |

```text
<!DOCTYPE html>
<html>
    <head>
        <meta title="charset" content="utf-8">
        <title>背景图片固定/不固定示例</title>
        <style type="text/css">
            body {
                margin: 24px;
                padding: 24px;
                border: 1px solid black;
            }
            div {
                width: 100%;
                height: 2000px;
                margin: 24px;
                background-color: #06b7e1;
                background-image: url(./flower.jpg);
                background-size: 140px 140px;
                background-repeat: repeat;
                background-attachment: fixed;
                /* background-attachment: scroll; */
            }
            p {
                font-size: 64px;
                font-weight: bold;
                color: white;
            }
        </style>
    </head>
    <body>
        <div>
            <p>1  Diveng</p>
            <p>2  Diveng</p>
            <p>3  Diveng</p>
            <p>4  Diveng</p>
            <p>5  Diveng</p>
            <p>6  Diveng</p>
            <p>7  Diveng</p>
            <p>8  Diveng</p>
        </div>
    </body>
</html>
```

## 七、text-shadow凹凸文字效果

![img](https://pic3.zhimg.com/80/v2-13864229eb72587907b91c6ee3ced61a_720w.webp)

```text
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                background-color: #ccc;
            }
            .box1 {
                color: #ccc;
                font-size: 80px;
                text-shadow: 1px 1px 1px #000,-1px -1px 1px #fff;
            }
            .box2 {
                color: #ccc;
                font-size: 80px;
                text-shadow: 1px 1px 1px #fff,-1px -1px 1px #000;
            }
            .box3 {
                color: #ccc;
                font-size: 80px;
                text-shadow: 1px 1px 1px red,-1px -1px 1px blueviolet;
            }
            .box4 {
                color: #ccc;
                font-size: 80px;
                text-shadow: 1px 1px 1px green,-1px -1px 1px #000;
            }
        </style>
    </head>
    <body>
        <div class="box1">这是凹凸字效果1</div>
        <div class="box2">这是凹凸字效果2</div>
        <div class="box3">这是凹凸字效果3</div>
        <div class="box4">这是凹凸字效果4</div>
    </body>
</html>
```

<!-- 凹凸字效果

text-shadow: 水平位置 垂直位置 模糊距离 阴影颜色

我们给文字添加了两处阴影，一处向右走是暗色，一处向左走是亮色。 这样就达到了凹凸文字这样的立体效果。

在text-shadow语句中的" , “之前代表向右的阴影，” , "之后代表向左的阴影

-->

## 八、background-clip:text;含有背景图片的文字、渐变色无缝滚动的文字

![img](https://pic3.zhimg.com/80/v2-ce67f434d39267f39c386b9756c7f586_720w.webp)

background-clip:text 背景显示在文字内部，text属性兼容问题

![img](https://pic3.zhimg.com/80/v2-134c9d00f07bd56b32cec9f2a3d55946_720w.webp)

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .bg1{
        background:url(http://www.mrszhao.com/zb_users/upload/codepen/fengjing.jpg) center;
    }
    .bg2{
        background:linear-gradient(to right,#0250c5 0%,#d43f8d 25%,#0250c5 50%,#d43f8d 75%,#0250c5 100%);
        background-size:200% auto;
        animation:move 3s linear infinite;
    }
    .box{
        width:700px;
        height:100px;
        margin:20px auto;
        font:bold 3em "microsoft Yahei";
        line-height:100px;
        text-align:center;
        background-clip:text;
/*-webkit-background-clip:text; 1- 使用兼容写法*/
        -webkit-background-clip:text;
       /*color: transparent; 2- 文字颜色一定要透明，否则看不到下面的背景*/
        -webkit-text-fill-color:transparent;
    }
    /* @keyframes move{
        0%{
            background-position:0 0;
        }
        100%{
            background-position:-100% 0;
        }
    } */
</style>
<body>
    <div class="box bg1">
        这是一段有背景图片的文字
    </div>
    <div class="box bg2">
        这是一段渐变色无缝滚动的文字
    </div>
</body>
</html>
```

## 九、background-blend-mode

![img](https://pic2.zhimg.com/80/v2-0ede6957a697969c8891d3876f302761_720w.webp)

background-blend-mode属性定义了背景层的混合模式（图片与颜色）。

可以是背景图片与背景图片的混合，也可以是背景图片和背景色的之间的混合。

可能的值

unset不设置，同normal

normal 默认值。设置正常的混合模式。

multiply 正片叠底模式。

screen 滤色模式。

overlay 叠加模式。

darken 变暗模式。

lighten 变亮模式。

color-dodge 颜色减淡模式。

saturation 饱和度模式。

color 颜色模式。

luminosity 亮度模式。

background-blend-mode: normal|multiply|screen|overlay|darken|lighten|color-dodge|saturation|color|luminosity;

示例1

将两个或者多个图片利用混合模式叠加在一起

![img](https://pic3.zhimg.com/80/v2-e6d81299453fb061196993892c5ef3ca_720w.webp)

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../reset.css">
    <style>
        body{
 background-color: burlywood;
        }
        #Box{
 width: 1800px;
 height: 577px;
 background-color: gray;
 margin: 200PX auto;
        }
        div[class^="box"]{
 width: 344px;
 height: 476px;
 background-color: rgb(28, 68, 154);
            /* 使4个盒子的边框为15px */
 border: 15px dashed rgb(236, 20, 20);
            /* 使4个盒子显示在一行 */
 float: left;
            /* 设置每个盒子外边距10px */
 margin: 10px;
            /* 设置每个盒子内边距10px */
 padding: 20px;
            /* 每个盒子都设置背景，不平铺 */
 background-image:url(./star.jpg),url(./woman.jpg);
 background-repeat:no-repeat,no-repeat;
        }
        .box2{
 background-blend-mode:lighten;
 background-size: cover;
        }
        .box3{
 background-blend-mode:multiply;
 background-size: cover;
        }
        .box4{
 background-blend-mode:exclusion;
 background-size: cover;
        }
    </style>
</head>
<body>
    <div id="Box">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
        <div class="box4"></div>
    </div>
</body>
</html>
mix-blend-mode
{
   mix-blend-mode: normal;         // 正常
   mix-blend-mode: multiply;       // 正片叠底
   mix-blend-mode: screen;         // 滤色
   mix-blend-mode: overlay;        // 叠加
   mix-blend-mode: darken;         // 变暗
   mix-blend-mode: lighten;        // 变亮
   mix-blend-mode: color-dodge;    // 颜色减淡
   mix-blend-mode: color-burn;     // 颜色加深
   mix-blend-mode: hard-light;     // 强光
   mix-blend-mode: soft-light;     // 柔光
   mix-blend-mode: difference;     // 差值
   mix-blend-mode: exclusion;      // 排除
   mix-blend-mode: hue;            // 色相
   mix-blend-mode: saturation;     // 饱和度
   mix-blend-mode: color;          // 颜色
   mix-blend-mode: luminosity;     // 亮度
   mix-blend-mode: initial;
   mix-blend-mode: inherit;
   mix-blend-mode: unset;
}
```

## 十、 backface-visibility

backface-visibility 属性定义当元素不面向屏幕时是否可见

如果在旋转元素不希望看到其背面时，该属性很有用。

![img](https://pic3.zhimg.com/80/v2-e0c1ea16ad19f467264fc008a803396e_720w.webp)

## 十一、background-image渐变

渐变：background-image

渐变是CSS3当中比较丰富多彩的一个特性，通过渐变我们可以实现许多炫丽的效果，有效的减少图片的使用数量，并且具有很强的适应性和可扩展性。

渐变分为：

线性渐变*background-image*: linear-gradient：沿着某条直线朝一个方向产生渐变效果。

径向渐变：从一个中心点开始沿着四周产生渐变效果。

重复渐变。

### ①线性渐变

```text
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        div {
            width: 500px;
            height: 100px;
            margin: 10px auto;
            border: 1px solid #000;
        }
        /* 语法：
            linear-gradient(方向，起始颜色，颜色...，终止颜色);
            方向：to left   to right  to top   to bottom或者角度30deg顺时针
            渐变1:起始颜色，终止颜色：yellow, green  
            渐变2：颜色+开始位置：
            yellow 0%,
            red 40%,
            green 70%,
            blue 100%
            突变：颜色1+开始位置，颜色1+结束位置，颜色2+开始位置，颜色2+结束位置，....:
            yellow 0%,
            yellow 25%,
            blue 25%,
            blue 50%,
            red 50%,
            red 75%,
            green 75%,
            green 100%
        */
        div:nth-child(1) {
            background-image: linear-gradient(to right, yellow,white, green);
        }
        /* 不写方向，表示默认的方向是：从上往下 */
        div:nth-child(2) {
            background-image: linear-gradient(yellow,purple, green);
        }
        /* 方向可以指定角度 */
        div:nth-child(3) {
            width: 100px;
            height: 100px;
            background-image: linear-gradient(135deg, yellow, green);
        }
        /* 0%的位置开始出现黄色，40%的位置开始出现红色的过度。70%的位置开始出现绿色的过度，100%的位置开始出现蓝色 */
        div:nth-child(4) {
            background-image: linear-gradient(to right,
            yellow 0%,
            red 40%,
            green 70%,
            blue 100%);
        }
        /* 颜色之间，出现突变 */
        div:nth-child(5) {
            background-image: linear-gradient(45deg,
            yellow 0%,
            yellow 25%,
            blue 25%,
            blue 50%,
            red 50%,
            red 75%,
            green 75%,
            green 100%
            );
        }
        div:nth-child(6) {
            background-image: linear-gradient(to right,
            #000 0%,
            #000 25%,
            #fff 25%,
            #fff 50%,
            #000 50%,
            #000 75%,
            #fff 75%,
            #fff 100%
            );
        }
    </style>
</head>
<body>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
</body>
</html>
```

示例图

![img](https://pic4.zhimg.com/80/v2-09f28d71ac22e8f8251f34006830c293_720w.webp)

案例 利用多背景以及线性渐变、background-position、background-blend-mode:设置图形渐变色动画效果

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .pic {
 width: 1400px;
 height: 800px;
            /* background-image: url(./dongman.jpg),linear-gradient(to right,#f00, #00f); */
 background-image: url(./dongman.jpg),linear-gradient(to right,red 0%, red 20%,blue 20%, rgb(255, 238, 0) 50%,green 50%,green 80%,purple 80%,purple 100%);
            /* background-image: url(./dongman.jpg),url(./flower.jpg); */
 background-size: cover, 100% 100%;
            /* 设置第一幅为0,0起始位置，第二幅渐变色背景隐藏，可以左侧右侧，上侧下侧，也可对角设置隐藏 */
 background-position: 0 0, 800px 800px;
 background-blend-mode: luminosity;
 background-repeat: no-repeat;
            /* transition: .5s background-position linear; */
            /* transition: .5s background-position ; */
            /* transition: 6s linear ; */
        }
        .pic:hover {
 background-position: 0 0, 0 0;
 transition: 5s;
        }
    </style>
</head>
<body>
    <div class="pic"></div>
</body>
</html>
写法2
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .pic {
 width: 1400px;
 height: 800px;
            /* background-image: url(./dongman.jpg),linear-gradient(to right,#f00, #00f); */
 background-image: url(./dongman.jpg),linear-gradient(to right,red 0%, red 20%,blue 20%, rgb(255, 238, 0) 50%,green 50%,green 80%,purple 80%,purple 100%);
            /* background-image: url(./dongman.jpg),url(./flower.jpg); */
 background-size: cover, 100% 100%
            /* 设置第一幅为0,0起始位置，第二幅渐变色背景隐藏，可以左侧右侧，上侧下侧，也可对角设置隐藏 */
            background-position: 0 0, 800px 800px;
            /* background-position: 0 0, 0 0; */
            /* background-blend-mode: luminosity; */
 background-repeat: no-repeat;
            /* transition: .5s background-position linear; */
            /* transition: .5s background-position ; */
            /* transition: 6s linear ; */
        }
        .pic:hover {
            /* position控制动画效果 */
 background-position: 0 0, 0 0;
            /* mode控制两张图合并 */
 background-blend-mode: luminosity;
 transition: 5s;
        }
    </style>
</head>
<body>
    <div class="pic"></div>
</body>
</html>
```

![img](https://pic3.zhimg.com/80/v2-143ca033daa11a4b50ba3d420bae497e_720w.webp)

### ②径向渐变background-image: radial-gradient(at left top, yellow, green);

```text
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        div {
            width: 250px;
            height: 250px;
            border: 1px solid #000;
            margin: 20px;
            float: left;
        }
        /*
            径向渐变：
            radial-gradient（辐射的半径大小(可不写), 中心的位置，起始颜色，终止颜色）;
 /* 径向渐变标准写法加at，可不考虑兼容，并且前面可以加辐射半径 */
            中心点的位置可以是：at left right center bottom top。如果以像素为单位，则中心点参照的是盒子的左上角。
        */
        /*辐射半径为100px，中心点在中间*/
        div:nth-child(1) {
            background-image: radial-gradient(100px at top, yellow, green);
        }
        /*中心点在左上角*/
        div:nth-child(2) {
            background-image: radial-gradient(at left top, yellow, green);
        }
        div:nth-child(3) {
            background-image: radial-gradient(at 150px 50px, yellow, green);
        }
        /*设置不同的颜色渐变*/
        div:nth-child(4) {
            background-image: radial-gradient(150px at center,
            yellow 0%,
            green 30%,
            blue 60%,
            red 100%);
        }
        /*设置不同的颜色突变*/
        div:nth-child(5) {
            background-image: radial-gradient(100px at center,
            yellow 0%,
            yellow 30%,
            green 30%,
            green 60%,
            blue 60%,
            blue 100%);
        }
        /*如果辐射半径的宽高不同,写2个半径像素值，那就是椭圆*/
        div:nth-child(6) {
            background-image: radial-gradient(100px 50px at center, yellow, green);
        }
    </style>
</head>
<body>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
</body>
</html>
```

示例图

![img](https://pic1.zhimg.com/80/v2-102af49331789915c163501c03cc5d60_720w.webp)

示例2

利用径向渐变和边框圆角的属性，生成按钮。代码如下：

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CSS3 渐变</title>
    <style>
        div:nth-child(1) {
            width: 400px;
            height: 200px;
            margin: 40px auto;
            /* 以四个角，相切，画圆，当半径为正方形的边长一半时，是圆 */
            border-radius: 100px;
            background-color: yellowgreen;
        }
        div:nth-child(2) {
            width: 300px;
            height: 200px;
            margin: 40px auto;
            border-radius: 100px;
            background-color: yellowgreen;
            background-image: radial-gradient(
                    200px at 100px 100px,
                    rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, 0.5)
            );
        }
    </style>
</head>
<body>
<div></div>
<div></div>
</body>
</html>
```

![img](https://pic1.zhimg.com/80/v2-0348e53085892db50fab43de7fa226cc_720w.webp)

### ③重复渐变

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div{
            width: 100px;
            height: 200px;
            background: repeating-linear-gradient(#000 5%,#fff 10%)
        }
        p{
            width: 300px;
            height: 300px;
            margin: 0 auto;
            border-radius: 50%;
            background: repeating-radial-gradient(#dcb0ed 5%,#99c99c 10%)
        }
    </style>
</head>
<body>
    <div></div>
    <p>
        你有压力吗
    </p>
</body>
</html>
```

## 十二、background简写(单一属性与复合属性)

background 提供简写用法，即在一个声明中可设置所有的背景属性。

所有属性如下:

background-image: 设置背景图像, 可以是真实的图片路径, 也可以是创建的渐变背景;

background-position: 设置背景图像的位置;

background-size: 设置背景图像的大小;

background-repeat: 指定背景图像的铺排方式;

background-attachment: 指定背景图像是滚动还是固定;

background-origin: 设置背景图像显示的原点[background-position相对定位的原点];

background-clip: 设置背景图像向外剪裁的区域;

background-color: 指定背景颜色。

建议顺序如下:

background:bg-color || bg-image ||bg-repeat || bg-position / bg-size||bg-attachment || bg-origin || bg-clip;

background: [background-color] [background-image] [background-repeat] [background-position] / [ background-size] [background-attachment] [background-origin] [background-clip];

注意:

顺序并非固定

background-position 和 background-size 属性, 之间需使用/分隔, 且position值在前, size值在后。

如果同时使用 background-origin 和 background-clip 属性, origin属性值需在clip属性值之前, 如果origin与clip属性值相同, 则可只设置一个值。

代码示例:

```text
background: url(“image.png”) 10px 20px/100px no-repeat content-box;
```

设置多背景属性

background是一个复合属性, 可设置多组属性, 每组属性间使用逗号分隔, 其中背景颜色不能设置多个且只能放在最后一组。

如设置的多组属性的背景图像之间存在重叠, 则前面的背景图像会覆盖在后面的背景图像上。

多背景属性代码示例:

```text
padding: 10px;
background: url("image.png") 0% 0%/60px 60px no-repeat padding-box,
           url("image.png") 40px 10px/110px 110px no-repeat content-box,
           #58a url("image.png") 140px 40px/200px 100px no-repeat content-box;
```

效果图

![img](https://pic3.zhimg.com/80/v2-5313b22eadb2fd7167e412c0f77518be_720w.webp)

## 十三、背景图片和img标签对比

背景图片和img标签对比

背景图片不占用content内容部分，而img标签会占用。

背景图片大小如果超出盒子是不会显示的，而img标签如果超出父级盒子默认是会超出显示的。

何时使用背景图片，何时使用img标签并没有一个确却的标准规定，可以根据实际情况做选择。

如果为了给盒子加底色为内容部分加背景，或者是加一些小图标项目符号等，则使用背景图片。

如果是确却的想表达一个图片信息，也希望搜索引擎能检索到对应的图片信息，则使用img标签。