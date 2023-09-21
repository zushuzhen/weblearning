SDK配置：

```
新建环境变量
ANDROID_HOME
D:\路径\SDK

path：
D:\路径\tools
D:\路径\platform-tools
```

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

