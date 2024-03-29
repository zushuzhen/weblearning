**跳转**

```
navTo() {
  wx.navigateTo({url: '/pages/contract-add/contract-add'})
},
```

**缓存获取数据**

```
this.setData({"UserData": wx.getStorageSync('UserData')}) 
```

**数据添加缓存**

```
wx.setStorageSync('myData', myData);
```

**赋值**

```
this.setData({show: true});
```

**传值**

```
data-item="{{item}}"
```

**更改for的item和index**

```
 wx:for-item="subitme"   wx:for-index="index"
```

**顶部标题栏（隐藏）**

```
"navigationStyle":"custom"
```

**获取底部安全距离**

```
wx.getSystemInfo({
  success: function (res) { this.setData({ botHeight: Number(res.screenHeight - res.safeArea.bottom) }); }
});
```

**获取底部navbar高度**

```
wx.getSystemInfo({
  success: function (res) {
    const tabBarHeight = res.screenHeight - res.windowHeight;
  //底部导航栏高度
    that.setData({ tabBarHeight })
  }
});
```

**打电话(catchtap)**

```js
catchtap='callPhone' data-item="{{item}}"

callPhone(e:any) {
  console.log("电话",e);
  let callPhone = e.currentTarget.dataset.item.phone;
  wx.makePhoneCall({
    phoneNumber: callPhone,
  })
},
```

**接口**

```
import getTeacherregister from './../../utils/getData'

let data= {}
let param = {  API_URL: api.XXXX,  method: "POST",  };
  getData.result(param).then((resl) => {
  console.log("列表",resl);
  if(resl.statusCode == 200){
    this.setData({
      studentList: resl.data,
      last_page: resl.data.last_page
    })
  }
})
```

**静默获取用户位置**

```json
"permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
```

```js
  doLocal: function (latitude, longitude) {
    var that = this;
    var mapUrl = 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=' + '2ESBZ-AODC5-H5HI5-QJGC6-C44YJ-2OBAK';
    wx.request({
      url: mapUrl,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            'UserData.address': res.data.result.address,
            'UserData.location': JSON.stringify(res.data.result.location)
          })
          console.log(that.data.UserData.address);
          console.log(that.data.UserData.location);
        }
      },
    })
  },
```

**授权电话**

```js
getPhone(e) {
    console.log(e.detail)
    let that = this
    wx.login({
      success: (res) => {
        e.detail.code = res.code
        let data = e.detail
        let param = {
          API_URL: api.phoneBycodeUrl,
          data: data,
          method: 'POST'
        };
        getData.result(param).then((response) => {
          console.log(response.data)
          if (response.statusCode == 200) {
            that.setData({
              phone: response.data.data
            })
          } else {
            Toast.fail("失败，请重新授权！")
          }

        })
      },
    })
  },
```

## 隐私协议
app.json
```json
,"__usePrivacyCheck__": true
```

```js
//隐私协议
navToSetting() {
    let that = this
    wx.getPrivacySetting({
      success: res => {
        console.log(res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
        if (res.needAuthorization) {
          that.setData({
            showPrivacy: true
          });
        } else {
          // 执行本页面的逻辑
        }
      },
      fail: () => {},
      complete: () => {}
    })
  },
  // 隐私协议取消
  getPrivacy() {
    this.setData({
      showPrivacy: false
    })
  },
  // 隐私协议同意
  handleAgreePrivacyAuthorization() {
    let that = this
    that.setData({
      showPrivacy: false
    })
    // 执行本页面的逻辑
  },
```

```js
<!-- 隐私内容 -->
<view wx:if="{{ showPrivacy }}" class="box-user ">
  <view class="box-title">
    <view class="text-center" style="font-weight: bold; font-size: 37rpx;">隐私内容</view>
    <view class="margin-top-sm" style="letter-spacing: 4rpx; word-spacing:2em; text-indent: 2em;">在您使用[老年大学停车预约服务]服务之前，请仔细阅读(后面简称停车预约服务)<text bindtap="handleOpenPrivacyContract" class="text-blue">《停车预约服务》。</text>如你同意《停车预约服务》，请点击“同意”开始使用[停车预约服务]。</view>
    <view class="flex margin-top">
      <button bind:tap="getPrivacy" class="btna">取消</button>
      <button class="btna btn-sure" id="agree-btn" open-type="agreePrivacyAuthorization" bindagreeprivacyauthorization="handleAgreePrivacyAuthorization">同意</button>
    </view>
  </view>
</view>


```



```css
.box-user {
 position: fixed;
 top: 0;
 width: 100%;
 height: 100vh;
 background-color: rgba(0, 0, 0, 0.5);
 z-index: 999;
}
.box-title {
 width: 75%;
 height: 420rpx;
 margin: 0 auto;
 margin-top: 400rpx;
 padding: 20rpx;
 border-radius: 3%;
 background-color: #fff;
}
.btna {
 width: 200rpx !important;
}
.btn-sure {
 background-color: #1368e7;
 color: #fff;
}
.status-bar,
.menu-bar {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 z-index: 9;
}
.status-bar {
 background-color: #ffffff;
}
.menu-bar {
 background-color: #ffffff;
}
```

## 七牛云直传

```js
file: '',
fileList: [],  
qiniuData: {},
===========================================
afterRead(e) {
    console.log(e);
    let that = this
    let filename = e.detail.file.thumb.substring(11);//返回字符串后11位字符
    const file = e.detail.file;
    this.setData({
      filename,
      file
    })
    let filePath = file.url
    let index = file.url.lastIndexOf('.')
    let end = file.url.slice(index)
    let data = {
      ext: end
    }
    this.setData({
      ext: end
    })
    console.log(data);
    wx.showLoading({
      title: '上传中...',
    })
    let param = {
      API_URL: api.bigFileUploadTokenUrl,
      data: data,
      method: "POST"
    }
    getData.result(param).then(res => {
      if (res.statusCode == 200) {
        console.log(res);
        this.setData({
          qiniuData: res.data
        })
        wx.uploadFile({
          url: 'https://upload-z2.qiniup.com',
          filePath: filePath,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            token: that.data.qiniuData.token,
            key: that.data.qiniuData.key
          },
          success: function (resl) {
            wx.hideLoading()
            Toast.success('上传成功！');
            let file = res.data.url
            console.log(file);
            that.setData({
              'fileList[0].url': file
            })
          }
        })
      }
    })
  },
```

# 微信下载

```js
wx.downloadFile({
 url: res.data,//下载链接
 success(res) {
  if (res.statusCode == 200) {
   wx.openDocument({
    filePath: res.tempFilePath,
    showMenu: true,
    success(res) {
     console.log('打开成功');
    }
   })
  }
 }
})
```
## 页面栈跳转上一页

```
let pages = getCurrentPages();
 //检查页面栈
 //console.log(pages);
 //判断页面栈中页面的数量是否有跳转(可以省去判断)
 if(pages.length > 1){
  //获取上一个页面实例对象
  let prePage = pages[pages.length - 2];
   //调用上一个页面实例对象的方法
   prePage.onLoad();
   //返回上一个页面
   wx.navigateBack();
}
```

