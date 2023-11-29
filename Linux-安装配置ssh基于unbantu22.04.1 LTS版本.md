> **一、管理员身份终端运行**
> 输入：
> **`su root`**
> **二、 安装ssh工具**
> 1.打开终端键入如下命令：
> **`apt-get install openssh-server`**
> 2.输入 **`y`**  回车继续
> **三、启动SSH服务**
> 1.键入如下命令：
> **`/etc/init.d/ssh start`**
> 2.查看进程，检查是否启动成功，键入如下命令：
> **`ps -e | grep sshd`** 
> **四、配置SSH服务**
> 1.安装vim编译器
> **`sudo apt-get install vim`** 
> 2.输入以下命令
> **`sed -i '/PermitRootLogin /c PermitRootLogin yes' /etc/ssh/sshd_config`**
> **五、验证能否连接成功**
> 1.查看环境变量
> **`echo $PATH`**
> 2.创建/sbin目录
> **`export PATH=$/sbin:$PATH`**
> 3..查询本机ip地址，键入
> **`ifconfig`** 
> （如果失败参照下方补充步骤）

三行命令安装tools（vm-vmware虚拟机）
```bash
sudo apt-get upgrade
sudo apt-get install open-vm-tools-desktop -y
sudo reboot
```

(下方为详细步骤，以及报错处理方法）

# 一、管理员身份终端运行
（补充：粘贴快捷键为Shift+Ctil+v）
输入：
```bash
su root
```

假如出现如下报错：
 ![请添加图片描述](https://img-blog.csdnimg.cn/77133f5f8af04242be6ec5efc0b32615.png)

⭐解决方法：
输入：

```bash
sudo passwd
```

然后输入8位数密码，但是12345678不符合规定，设置一个其他8位数密码
例如：xiaoyanyan.12

# 二、 安装ssh工具
1.打开终端键入如下命令：

```bash
apt-get install openssh-server
```

2.输入y继续执行

 ![请添加图片描述](https://img-blog.csdnimg.cn/8ab855fda87d48c39a7ae08985ab7b5a.png)

等待大约15秒。。。
# 三、启动SSH服务
1.键入如下命令：

```bash
/etc/init.d/ssh start
```

如下图：

 ![请添加图片描述](https://img-blog.csdnimg.cn/8b85d31038454d3ba0adda5718d17074.png)
注：重启命令与关闭命令如下：
```bash
/etc/init.d/ssh restart   #重启SSH服务
/etc/init.d/ssh stop      #关闭SSH服务
```

2.查看进程，检查是否启动成功，键入如下命令：

```bash
ps -e | grep sshd
```
效果如下：
![请添加图片描述](https://img-blog.csdnimg.cn/0b0d3efe3c5f4cfab978583282879e7e.png)

有了进程才能进行SSH服务的使用。
<br>
# 四、配置SSH服务
Ubuntu中SSH服务安装完成后查看是否允许root用户登陆，若不允许则无法远程登陆root用户，需要修改配置
 1.安装vim编译器

```bash
 sudo apt-get install vim
```

2.⭐之后输入以下命令
修改“PermitRootLogin yes”属性

```bash
sed -i '/PermitRootLogin /c PermitRootLogin yes' /etc/ssh/sshd_config
```

# 五、验证能否连接成功
因为ifconfig命令是在/sbin目录下，所以首先查看是否配置好环境变量
##### 1.查看环境变量
```bash
echo $PATH
```

 ##### 2.添加/sbin目录（刚安装配置完毕的系统是没有的，直接执行就好）
```bash
export PATH=$/sbin:$PATH
```
##### 3.查询本机ip地址，键入ifconfig

```bash
ifconfig
```
就可以查看到网卡信息了

![请添加图片描述](https://img-blog.csdnimg.cn/9ba571bfca3347bb95b9d481424a7447.png)
# 补充
## 如果报错
使用ifconfig命令查看ip地址时如果还报错。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20c813c333ed4f64b92825c86b3309ab.png)
## 解决方法
1、根据提示，使用命令，安装网络工具。
 ```bash
sudo apt install net-tools
 ```
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/26d9e496599545f899e9b10519b7341d.png)
2、以上说明apt被某个进程锁住了，找到进程，kill掉，如下：
```bash
ps afxlgrep apt
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/566dd1bcaa1e45cba15ef307cdde9d6b.png)
3、强制重新配置软件包命令，升级apt，如果又报错。

```bash
sudo dpkg --configure -a
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/cf035a16e38c4fb49a37a1913c2c5c33.png)

4、使用下面两个指令删除占用进程
```bash
sudo rm /var/lib/dpkg/lock-frontend
```
```bash
sudo rm /var/lib/dpkg/lock
```
5、使用指令再次尝试更新apt

```bash
sudo apt update
```
6、使用指令安装网络工具。
```bash
sudo apt install net-tools
```

7、使用ifconfig查看ip
```bash
ifconfig
```
# 六下载FileZilla Client并打开
软件FileZilla Client已安排好，点击下载
链接：[百度网盘](https://pan.baidu.com/s/1mdHRDj-yWS_LSVCOqrYi4A?pwd=ABCD)
提取码：ABCD 
做如下图操作
![请添加图片描述](https://img-blog.csdnimg.cn/536fcee80b2a4a61bf9f392ef5b23048.png)
如此即可！

此步骤用于进一步了解unbantu操作，VM中的tools和VirtualBox文件开启互传，均可实现文件传输！