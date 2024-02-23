export function formatDate(dateString, type) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要加 1
  const months = String(date.getMonth() + 1); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, "0");
  const days = String(date.getDate());
  const second = date.getSeconds()
  if (type == "all") {
    return `${year}-${month}-${day}`;
  }
  if (type == "date") {
    return day;
  }
  if (type == "yarn") {
    return `${year}-${month}`;
  }
  if (type == "cont") {
    return `${year}年${months}月${days}日`;
  }
  if( type == "second"){
    return second
  }
}
