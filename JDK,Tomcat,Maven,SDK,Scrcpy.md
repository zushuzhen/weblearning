# 一、JDK安装及配置
1.java JDK下载

地址1：[https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

地址2：[https://developer.android.com/studio/releases/platform-tools?hl=zh-cn](https://developer.android.com/studio/releases/platform-tools?hl=zh-cn)

![点击放大](https://img-blog.csdnimg.cn/da7723ddb85e45cda34dc8edeebe4724.png#pic_center)
2.下载后直接本地安装，选择路径默认即可，类似如下路径：C:/Program Files/Java/jdk_1.8.0_301

3.配置环境变量路径：程序->计算机->右键->属性->高级系统设置->高级->环境变量（以win10为例）
![点击放大](https://img-blog.csdnimg.cn/07e7ed24a12a4e18b57c76401f17a3f1.png#pic_center )

4.配置环境变量值

<table>
<tr>
<td align="left">（1）新建变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量名：</font>JAVA_HOME<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>C:\Program Files\Java\Jdk1.8.0_291（jdk的安装路径）</td>
</tr>
<tr>
<td align="left">（2）新建变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量名：</font>CLASSPATH<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar（注意最前面有一个点）</td>
</tr>
<tr>
<td align="left">（3）在Path变量中，增加两项值，（不需要新建Path变量）<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<font color=red>变量值：</font>;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin（注意前边有分号））<br>
</td>
</tr>
</table>

5.cmd命令行中尝试命令：

```
java
javac
java -version
adb(移动端自动化测试)
```

若有返回值，即为成功

###  (1) 什么是JRE,JDK?
<table>
<tr>
<td  bgcolor=#eee align="left"  colspan="2">
<h6  color=#900>
<font color=#FF6F00>JRE(Java Runtime Environment Java运行环境)<font>
</h6></td>
</tr>
<tr><td bgcolor=#fff colspan="2" align="left">包括Java虚拟机(JVM Java Virtual Machine)和Java程序所需的核心类库等
<br>如果想要运行一个开发好的Java程序，计算机中只需要安装JRE即可。</td>
</tr>
<tr>
<td align="left"  colspan="2"   bgcolor=#eee >
<h6><font color=#FF6F00>JDK(Java Development Kit Java开发工具包)</h6></td>
</tr>
<tr><td bgcolor=#fff align="left"  colspan="2">JDK是提供给Java开发人员使用的，其中包含了iava的开发工具，也包括了JRE。所以安装了JDK，就不用在单独安装JRE了。
其中的开发工具:编译工具(javac.exe) 打包工具(iar.exe)等</td></tr>
<tr>
<td align="left"  colspan="2">
<font color=#F9423A>简单而言:使用JDK开发完成的java程序，交给JRE去运行<font>
</td></tr>
<tr><td  bgcolor=#fff>
<h3><font color=red>JRE=JVM+类库</font></h3></td>
<td bgcolor=#fff>
<h3><font color=red>JDK=JRE+开发工具</font></h3></td>
</tr>
<tr><td  colspan="2">
<h2> <font color=red>JRE > JDK</font></h2>
</td></tr>
</table>

###  (2) JDK,JRE,JVM之间的关系
<table table=0>
<tr>
<td colspan="4" align="left" bgcolor=#9d9bff>Java各种集成开发工具<br>(JCreator/Ecllpse/JBullder/NetBeans等)</td>
</tr>
<tr>
<td colspan="3" align="left" bgcolor=#ff9cfe >JDK(开发工具包)</td>
<td bgcolor=#9d9bff></td>
</tr>
<tr>
<td colspan="2" align="left" bgcolor=#bbe1e2>JRE(运行环境)运行时类库</td>
<td bgcolor=#ff9cfe></td><td bgcolor=#9d9bff></td></tr>
<tr>
<td colspan="1" align="left" bgcolor=#f0f852>JVM(Java虚拟机)</td>
<td bgcolor=#bbe1e2></td><td bgcolor=#ff9cfe></td><td bgcolor=#9d9bff></td></tr>
</table>
在安装软件的时候只需要安装好JDK即可

# 二、Tomcat安装及配置
#### 1.tomcat下载地址：[https://tomcat.apache.org/download-80.cgi](https://tomcat.apache.org/download-80.cgi)
#### 2.tomcat下载版本
core：64-bit_Windows_zip (pgp, sha512)（无需双击安装，没有exe文件）
![点击放大](https://img-blog.csdnimg.cn/f6b358356d44403fbbe1bac6cd222783.png#pic_center )

解压后，将apache-tomcat-8.5.68，移动到D:\software\下，移动后路径为：D:\software\apachetomcat-
8.5.68（没有software文件夹就创建一个）
<table>
<tr>
<td align="left">（1）新建变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量名：</font>CATALINA_HOME<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>D:\software\apache-tomcat-8.5.68（tomcat安装路径）</td>
</tr>
<tr>
<td align="left">（2）新建变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量名：</font>TOMCAT_HOME<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>D:\software\apache-tomcat-8.5.68（tomcat安装路径）</td>
</tr>
<tr>
<td align="left">（3）在Path变量中增加值，（不需要新建Path变量）<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font> ;%TOMCAT_HOME%\bin</td>
</tr>
</table>

测试验证（下述三种方式，任选一种，依赖操作系统环境选择）：
#### 方式一（windows、默认选这种就可以）：
在D:\software\apache-tomcat-8.5.68\bin目录下，
windows环境：启动命令-双击执行startup.bat，
停止命令-双击执行shutdown.bat
（windows下，双击执行startup.bat即启动了tomcat，这时候有一个黑屏窗口，不要关闭）
#### 方式二（mac或linux）：
linux环境：启动命令-执行startup.sh，停止命令-执行shutdown.sh
#### 方式三（windows）：
若windows使用命令行启动，则使用下面的命令

```java
cmd中 输入如下命令
d: // 切换到D盘
cd software // 打开software目录
cd apache-tomcat-8.5.68 // 打开apache-tomcat-8.5.68目录
cd bin // 切换到bin目录，双击打开
```

验证：
启动成功后，访问 [http://localhost:8080](http://localhost:8080)，看到tomcat欢迎页，则启动成功；

### ⭐⭐注意检查TomCat是否乱码
如果是乱码，修改conf下logging.properties配置文件第47行的编码格式为
GBK格式
```java
java.util.logging.ConsoleHandler.encoding = GBK
```

# 三、Maven安装安装及配置
安装程序路径选择时，统一选如下电脑目录：D:/software
下载地址：[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)
![点击放大](https://img-blog.csdnimg.cn/749e47461b8f473986926736c9294fae.png#pic_center)
下载后解压，将apache-maven-3.9.0文件夹，放置于d:\software\下面
配置环境变量

<table>
<tr>
<td align="left">（1）新建变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量名：</font>MAVEN_HOME<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>D:\software\apache-maven-3.9.0（maven安装路径）</td>
</tr>
<tr>
<td align="left">（3）在Path变量中追加值，（不需要新建Path变量）<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font> ;%MAVEN_HOME%\bin</td>
</tr>
</table>

3.验证

```java
cmd命令行中执行：mvn
cmd命令行中执行：mvn -version
```

若存在正常命令响应，返回版本号，则正常

# 四、SDK配置：
地址2：[https://developer.android.com/studio/releases/platform-tools?hl=zh-cn](https://developer.android.com/studio/releases/platform-tools?hl=zh-cn)

<table>
<tr>
<td align="left">（1）新建变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量名：</font>ANDROID_HOME<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>D:\路径\SDK（SDK安装路径）</td>
</tr>
<tr>
<td align="left">（3）在Path变量中追加值，（不需要新建Path变量）<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>D:\路径\tools<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>变量值：</font>D:\路径\platform-tools（补充：移动端自动化测试配置）
</tr>
</table>

# 五 scrcpy配置

scrcpy镜像网址：https://sourceforge.net/projects/scrcpy.mirror/

```
path:
D:\路径\scrcpy-win64
```



```
    # 查看已连接设备  
    adb devices 
 
    # 进入Android系统
    adb shell 
    
    # ping一下
    adb connect 手机IP:5555 连接设备;
    
    #链接监控Android
    scrcpy -s 手机IP:5555 -b4M -m1200
    
    # 安装xxx.app, 可以直接拖到adb install 后面 
    adb install  xxx.apk 
 
    # 包名可以由研发提供，可以用命令查包名
    adb uninstall xxx包名(由研发提供)

	# 断开某一个设备连接
    adb disconnect 手机IP 
    
    # 断开全部设备
    adb disconnect 
 
    # 杀死adb服务
    adb kill-server 
 
    # 重启终端
    adb  手机IP  reboot 
    
    # 查看终端运行日志
	adb logcat 可以查看运行日志（CTRL+C停止）
```



