## 一、html基本结构
```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
```
## 二、常用标签及符号
### 1.块元素

```html
 <div></div>
 <h1> </h1>~<h6></h6>
 <ol></ol>
 <ul></ul>
 <hr>
```

### 2.行内元素

```html
 <b> </b>
 <label> </label>
 <strong> </strong>
 <sup></sup>
 <sub></sub>
 <samll> </samll>
```

### 3.行内块元素

```html
<img src=""alt="">
<iframe src=""></iframe>
<input type="">
<textarea> <textarea>
<select> <select>
<button></button>
补充属性：display:inline-block//把所有的代码都写到一行
```
### 4.其他常用元素
###### 超链接
```html
<a></a>
1.外部链接：<a href = "某.html或网址"></a>
2.锚链接：<a href="a.html#name1">回到顶部</a>
3.邮箱链接：<a href="mailto:xxx@163.com">点击进入我的邮箱</a>
4.href:目标URL
5.title:悬停文本
6.name:主要用于设置一个锚点的名称。
```

> target:告诉浏览器用什么方式来打开目标页面。 	
> _self:在同一个网页中显示（默认值)o _blank︰在新的窗口中打开。 	
>  _parent:在父窗口中显示 	
> _top:在顶级窗口中显示
### 5.特殊符号
|     名称     | 符号表示方法                           | 示例     |
| :----------: | :------------------------------------- | -------- |
|    小于号    | `&lt;`                                 | <        |
|    大于号    | `&gt;`                                 | >        |
|     空格     | `&emsp；> &ensp；> &nbsp；> &thinsp；` | 小<中<大 |
|     和号     | `&amp;`                                | &amp;    |
|    人民币    | `&yen;`                                | &yen;    |
|     版权     | `&copy;`                               | &copy;   |
|   注册商标   | `&reg;`                                | &reg;    |
|    摄氏度    | `&deg;`                                | &deg;    |
|    正负号    | `&plusmn;`                             | &plusmn; |
|     乘号     | `&times;`                              | &times;  |
|     除号     | `&divide;`                             | &divide; |
| 平方2(上标2) | `&sup2;`                               | &sup2;   |
| 立方3(上标3) | `&sup3;`                               | &sup3;   |
## 三、表格

### 1.基本结构

```html
<table>
	<tr>
		<th>表格标题</th>
		<td>单元格</td>
	</tr>
</table>
```

### 2.table的属性
| border边框                          | align水平方向对齐方式 |
| :---------------------------------- | :-------------------- |
| cellspacing单元格与单元格之间的距离 | left 左对齐           |
| cellpadding内容与单元格四周的距离   | center居中对齐        |
| bordercolor 边框颜色                | right右对齐           |
| bgcolor背景颜色                     |                       |

### 3.rules规定内侧边框是否可见

```
none内侧边框均不可见
rows位于行内侧边框可见
cols位于列内侧边框可见
all位于行与列内侧边框可见
```

## 四、表单
#### 1.action 数据提交的地址
####  2.method 数据的提交地址
get   丨 post
区别：
		1.get方式提交的数据会出现在地址栏上方，安全性较低
		2.get方法可能获取的数据是浏览器里的缓存信息
		3.get方式提交的数据有长度限制（20个字符)
#### 3.input标签：[共22种,点击前往](https://blog.csdn.net/ZSZ1805355272/article/details/126646091?spm=1001.2014.3001.5501)
#### 4.文本域
```html
<textarea name=""cols="列数" rows="行数”placeholder="输入域提醒文本"></textarea>
```
#### 5.下拉选择框
```html
<select>
	<option value="值">选项</option><option value="值">选项</option>
</select>
```
补充：给option添加selected或selected="selected"可使选项默认被选中
#### 6.按钮
```html
<button>按钮<button>
<button type="submit">提交按钮</button>
<button type="reset">重置按钮</button>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/504887c6264a42a8be2a7141c00d7776.png#pic_center =800x)


## 补充： 按功能类别排列 HTML 标签
**基础**
标签|	描述
|:--------:| :-------------|
`<!DOCTYPE>` |	定义文档类型。
`<html>`	|定义 HTML 文档。
`<head>`|	定义关于文档的信息。
`<title>`	|定义文档的标题。
`<body>`	|定义文档的主体。
`<h1>~ <h6>`	|定义 HTML 标题。
`<p>`	|定义段落。
`<br>`	|定义简单的折行。
`<hr> `	|定义水平线。
`<!--   -->`	|定义注释。

**格式化**
标签|	描述
|--------|:-------------|
`<acronym>`	|定义只取首字母的缩写。HTML5 中不支持。请使用 <abbr> 代替。
`<abbr>`	|定义缩写。
`<address>`	|定义文档作者或拥有者的联系信息。
`<b>`	|定义粗体文本。
`<bdi>`	|定义文本的文本方向，使其脱离其周围文本的方向设置。
`<bdo>`	|定义文字方向。
`<big>`|	定义大号文本。HTML5 中不支持。请使用 CSS 代替。
`<blockquote>`	|定义长的引用。
`<center>`	|定义大号文本。HTML5 中不支持。请使用 CSS 代替。
`<cite>`	|定义引用(citation)。
`<code>`	|定义计算机代码文本。
`<del>`	|定义被删除文本。
`<dfn>`	|定义定义项目。
`<em>`	|定义强调文本。
`<font>`	|定义大号文本。HTML5 中不支持。请使用 CSS 代替。
`<i>`|	定义斜体文本。
`<ins>`	|定义被插入文本。
`<kbd>`	|定义键盘文本。
`<mark>`	|定义有记号的文本。
`<meter>`	|定义预定义范围内的度量。
`<pre>`	|定义预格式文本。
`<progress>	`|定义任何类型的任务的进度。
`<q>`	|定义短的引用。
`<rp>`	|定义若浏览器不支持 ruby 元素显示的内容。
`<rt>`	|定义 ruby 注释的解释。
`<ruby>`	|定义 ruby 注释。
`<s>`	|定义加删除线的文本。
`<samp>`	|定义计算机代码样本。
`<small>`	|定义小号文本。
`<strike>`	|定义加删除线文本。<P>HTML5 中不支持。请使用 `<del>` 或`<s>` 代替。
`<strong>`|	定义语气更为强烈的强调文本。
`<sup>`	|定义上标文本。
`<sub>`	|定义下标文本。
`<template>`	|定义用作容纳页面加载时隐藏内容的容器。
`<time>`	|定义日期/时间。
`<tt>	`|定义打字机文本。HTML5 中不支持。请使用 CSS 代替。
`<u>`	|定义下划线文本。
`<var>`|	定义文本的变量部分。
`<wbr>`	|定义可能的换行符。

**表单和输入**
标签	| 描述
|:--------:| :-------------|
`<form>`	| 定义供用户输入的 HTML 表单。
`<input>`	| 定义输入控件。
`<textarea>`	| 定义多行的文本输入控件。
`<button>`	| 定义按钮。
`<select>`	| 定义选择列表（下拉列表）。
`<optgroup>`	| 定义选择列表中相关选项的组合。
`<option>	`| 定义选择列表中的选项。
`<label>`	| 定义 input 元素的标注。
`<fieldset>`	| 定义围绕表单中元素的边框。
`<legend>`	| 定义 fieldset 元素的标题。
`<isindex>`	| 定义与文档相关的可搜索索引。HTML5 中不支持。
`<datalist>`	| 定义下拉列表。
`<keygen>`	| 定义生成密钥。
`<output>`	| 定义输出的一些类型。

**框架**
标签|	描述
|:--------:| :-------------|
`<frame>`	|定义框架集的窗口或框架。HTML5 中不支持。
`<frameset>`	|定义框架集。HTML5 中不支持。
`<noframes>`|	定义针对不支持框架的用户的替代内容。HTML5 中不支持。
`<iframe>`	|定义内联框架。

**图像**
标签|	描述
|:--------:| :-------------|
`<img>`	|定义图像。
`<map>`	|定义图像映射。
`<area>`	|定义图像地图内部的区域。
`<canvas>`	|定义图形。
`<figcaption>`	|定义 figure 元素的标题。
`<figure>`	|定义媒介内容的分组，以及它们的标题。
`<svg>`	|定义 SVG 图形的容器。

**音频/视频**
标签|	描述
|:--------:|:-------------|
`<audio>`	|定义声音内容。
`<source>`	|定义媒介源。
`<track>`	|定义用在媒体播放器中的文本轨道。
`<video>`	|定义视频。

**链接**
标签|	描述
|:--------:| :-------------|
`<a>`	|定义锚。
`<link>`	|定义文档与外部资源的关系。
`<nav>`	|定义导航链接。

**列表**
标签|	描述
|:--------:| :-------------|
`<ul>	`|定义无序列表。
`<ol>	`|定义有序列表。
`<li>	`|定义列表的项目。
`<dir>`	|定义大号文本。HTML5 中不支持。请使用 CSS 代替。
`<dl>`	|定义定义列表。
`<dt>`	|定义定义列表中的项目。
`<dd>`	|定义定义列表中项目的描述。
`<menu>`	|定义命令的菜单/列表。
`<menuitem>`	|定义用户可以从弹出菜单调用的命令/菜单项目。
`<command>`	|定义命令按钮。

**表格**
标签|	描述
|:--------:| :------------|
`<table>`	|定义表格
`<caption>`|	定义表格标题。
`<th>`	|定义表格中的表头单元格。
`<tr>`	|定义表格中的行。
`<td>`|	定义表格中的单元。
`<thead>`|	定义表格中的表头内容。
`<tbody>`	|定义表格中的主体内容。
`<tfoot>`|	定义表格中的表注内容（脚注）。
`<col>	`|定义表格中一个或多个列的属性值。
`<colgroup>`	|定义表格中供格式化的列组。

**样式和语义**
标签|	描述
|:--------:| :-------------|
`<style>`|	定义文档的样式信息。
`<div>`	|定义文档中的节。
`<span>`	|定义文档中的节。
`<header>`	|定义 section 或 page 的页眉。
`<footer>`	|定义 section 或 page 的页脚。
`<main>`	|定义文档的主要内容。
`<section>`	|定义 section。
`<article>`	|定义文章。
`<aside>`|	定义页面内容之外的内容。
`<details>`	|定义元素的细节。
`<dialog>`|	定义对话框或窗口。
`<summary>`	|为 <details> 元素定义可见的标题。
`<data>`	|添加给定内容的机器可读翻译。

**元信息**
标签|	描述
|:--------:| :-------------|
`<head>`	|定义关于文档的信息。
`<meta>`	|定义关于 HTML 文档的元信息。
`<base>`	|定义页面中所有链接的默认地址或默认目标。
`<basefont>`	|定义页面中文本的默认字体、颜色或尺寸。HTML5 中不支持。请使用 CSS 代替。

**编程**
标签|	描述
|:--------:| :-------------|
`<script>`	|定义客户端脚本。
`<noscript>`	|定义针对不支持客户端脚本的用户的替代内容。
`<applet>`	|定义嵌入的 applet。HTML5 中不支持。请使用 <embed> 和 <object> 代替。
`<embed>`	|为外部应用程序（非 HTML）定义容器。
`<object>`	|定义嵌入的对象。
`<param>`	|定义对象的参数。