function formatViews(views) {
  if (views < 1000) {
    views = views.toString();
  } else if (views < 1_000_000) {
    views = `${(views / 1000).toFixed(1)}K`;
  } else if (views < 1_000_000_000) {
    views = `${(views / 1_000_000).toFixed(1)}M`;
  } else {
    views = `${(views / 1_000_000_000).toFixed(1)}B`;
  }
  views += " view";
  if (views > 1) {
    views += "s";
  }

  return views;
}

export default formatViews;
