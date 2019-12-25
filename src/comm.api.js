exports.getDateTime = function (strType = 'y-m-d h:i:s', time = 0) {
  let date;
  date = time === 0 ? new Date() : new Date(time);
  let y = date.getFullYear();
  strType = strType.replace(/y/g, y);
  let m = date.getMonth() + 1;
  strType = strType.replace(/m/g, m < 10 ? '0' + m : m);
  let d = date.getDate();
  strType = strType.replace(/d/g, d < 10 ? '0' + d : d);
  let h = date.getHours();
  strType = strType.replace(/h/g, h < 10 ? '0' + h : h);
  let i = date.getMinutes();
  strType = strType.replace(/i/g, i < 10 ? '0' + i : i);
  let s = date.getSeconds();
  strType = strType.replace(/s/g, s < 10 ? '0' + s : s);

  return strType;

};
exports.makeRandom = function () {
  return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
};

