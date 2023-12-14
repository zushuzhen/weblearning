

|目录|用途|
| ---- | ---- |
|/bin|包含系统中最基本的可执行命令，如ls、cp和mv等。|
|/boot|存放启动相关的文件，包括内核和启动引导程序。|
|/dev|包含设备文件，用于与系统硬件和外部设备进行交互。|
|/etc|存放系统配置文件，包括网络配置、用户管理和服务配置等|
|/home|用户的个人主目录，每个用户在此目录下有一个以其用户名命名的子目录|
|/lib|包含系统所需的共享库文件，这些文件被可执行程序在运行时使用。|
|/media|默认挂载点，用于临时挂载可移动设备，如USB驱动器。|
|/mnt|用于手动挂载临时文件系统。|
|/opt|用于安装第三方软件的目录，通常是那些不属于系统默认软件包的程序。|
|/proc|包含虚拟文件系统，提供了关于当前运行进程和内核状态的信息。|
|/root|超级用户 (root)的个人主目录。|
|/run|包含在系统启动时运行时需要的临时文件和数据。|
|/sbin|存放系统管理员使用的系统管理命令。|
|/srv|用于存放一些服务的数据目录，如web服务器的网页文件。|
|/tmp|用于存放临时文件，重启后会清空该目录。|
|/usr|包含用户程序和数据，类似于c:\Program Files目录。|
|/var|包含可变数据，如日志文件、缓存文件和数据库等|

## 安装

```shell
# ubuntu下要安装ack-grep，因为在debian系中，ack这个名字被其他的软件占用了。
sudo apt-get install ack-grep
# alpine Linux-apk软件包管理器 安装 ack
apk install ack
```

## 参数

这些参数在linux上的适用频率是相当高的，尤其是你用vim做为IDE的话

```shell
-c(统计)/ -i(忽略大小)/ -h(不显示名称)/
-l(只显文件名)/ -n(加行号)/ -v(显示不匹配)
```

使用实例
apk install xxx
apk search xxx # 支持正则
apk info xxx # 查看包的详细信息
apk show # list local package
## 卸载并删除 包
```
apt-get install 安装新包
apt-get remove 卸载已安装的包（保留配置文件）
apt-get purge 卸载已安装的包（删除配置文件）
apt-get update 更新软件包列表
apt-get upgrade 更新所有已安装的包
apt-get autoremove 卸载已不需要的包依赖
apt-get dist-upgrade 自动处理依赖包升级
apt-get autoclean 将已经删除了的软件包的.deb安装文件从硬盘中删除掉
apt-get clean 删除软件包的安装包
```



