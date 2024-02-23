export function gettages(type) {
  let cms = JSON.parse(localStorage.getItem("cms"));
  let arr = cms.filter((item) => item.dictValue == type);
  return arr[0].dictLabel;
}
