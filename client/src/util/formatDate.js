function formatDate(date) {
  let createDate = new Date(date);
  let today = new Date();

  // convert to year unit
  let diffYear = (today.getTime() - createDate.getTime()) / 31_556_952_000;
  const unitArray = ["year", "month", "week", "day", "hour", "minute", "second"];
  const unitValues = [12, 4, 7, 24, 60, 60, 1];
  let n = unitArray.length
  let index = 0;
  let value = diffYear;

  while (value < 1 && index < n) {
    value *= unitValues[index];
    index++;
  }
  
  if (index >= n) return "just now"

  const unit = unitArray[index] + (Math.round(value) > 1 ? "s" : "");
  return `${Math.round(value)} ${unit} ago`;
}

export default formatDate;
