import { useEffect, useState } from "react";

function useGridResize(ref) {
  const [gridColumns, setGridColumns] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const width = ref.current.offsetWidth;
        if (width < 680) {
          setGridColumns("1fr");
        } else if (width < 1010) {
          setGridColumns("repeat(2, 1fr)");
        } else if (width < 1340) {
          setGridColumns("repeat(3, 1fr)");
        } else if (width < 1670) {
          setGridColumns("repeat(4, 1fr)");
        } else {
          setGridColumns("repeat(5, 1fr)");
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return gridColumns;
}

export default useGridResize;
