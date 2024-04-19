import { useLocation } from "react-router-dom";

function getQueryValue(value) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(value);
}

export default getQueryValue;
