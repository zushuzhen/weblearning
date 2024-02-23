import { get, gettree } from "@/utils/request.js";

let Data = [];

export async function getTtrees() {
  try {
    const res = await get("/system/config/list");
    Data = res.rows;
    localStorage.setItem("Data", JSON.stringify(res.rows));
    return res; // 可选：返回数据供其他地方使用
  } catch (error) {
    // 处理请求失败的情况
    console.error("Failed to fetch data:", error);
    throw error; // 可以选择抛出错误
  }
}

export function getClassification(func, data = Data) {
  let result = null;

  function findInData(arr) {
    for (const item of arr) {
      if (item.configKey === func) {
        result = item.configValue;
        return;
      }
      if (item.children && item.children.length > 0) {
        findInData(item.children); // 递归查找子层
      }
    }
  }
  findInData(data); // 调用递归查找函数

  return result;
}

export async function fetchData(func) {
  let storedData = localStorage.getItem("Data");
  let Datas
  if(storedData) {
    Datas = JSON.parse(localStorage.getItem("Data"));
  }
  let res
  try {
    let result = "";
    if (!Datas) {
      await getTtrees();
      result = getClassification(func); // 替换 'yourFunc' 为需要的值
    } else {
      result = getClassification(func, Datas); // 替换 'yourFunc' 为需要的值
    }
    res = await gettree(result, false)
  } catch (error) {
    console.error("An error occurred:", error);
  }
  return res
}
