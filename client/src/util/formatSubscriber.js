function formatSubscriber(num) {
  if (num < 1000) {
    num = num.toString();
  } else if (num < 1_000_000) {
    num = `${(num / 1000).toFixed(1)}K`;
  } else if (num < 1_000_000_000) {
    num = `${(num / 1_000_000).toFixed(1)}M`;
  } else {
    num = `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  num += " subsriber";
  if (num > 1) {
    num += "s";
  }

  return num;
}

export default formatSubscriber;
