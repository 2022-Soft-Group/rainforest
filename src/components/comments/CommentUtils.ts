export function compareByTime(a: CommentListItem, b: CommentListItem) {
  var date1 = new Date(a.createTime);
  var date2 = new Date(b.createTime);
  return date1 < date2 ? 1 : -1;
}

export function compareByLike(a: CommentListItem, b: CommentListItem) {
  return b.like - a.like;
}
export function getNowDate() {
  var myDate = new Date();
  var yearNum = myDate.getFullYear();
  var year = yearNum.toString();
  var monNum = myDate.getMonth() + 1;
  var mon = monNum.toString();
  var dateNum = myDate.getDate();
  var date = dateNum.toString();
  var hoursNum = myDate.getHours();
  var hours = hoursNum.toString();
  var minutesNum = myDate.getMinutes();
  var minutes = minutesNum.toString();
  var secondsNum = myDate.getSeconds();
  var seconds = secondsNum.toString();
  if (monNum < 10) {
    mon = '0' + mon;
  }
  if (dateNum < 10) {
    date = '0' + date;
  }
  if (hoursNum < 10) {
    hours = '0' + hours;
  }

  if (minutesNum < 10) {
    minutes = '0' + minutes;
  }
  if (secondsNum < 10) {
    seconds = '0' + seconds;
  }
  var now = year + '-' + mon + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
  return now;
}

export function getTimestamp() {
  return new Date(getNowDate()).getTime();
}
