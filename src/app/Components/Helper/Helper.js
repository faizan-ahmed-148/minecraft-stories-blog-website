import CryptoJS from "crypto-js";

export const getDataFromLocalStorage = (key) => {
    if (typeof localStorage === "undefined") return "";
    return localStorage.getItem(key);
  };


  export const setDataToLocalStorage = (key, value) => {
    if (typeof localStorage === "undefined") return false;
    let stringified = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(
      stringified,
      process.env.NEXT_PUBLIC_HMAC_SECRET_KEY
    ).toString();
      localStorage.setItem(key, `ENC:${encrypted}`);
  };
  
  export const removeDataFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  export const getParsedDataFromLocalStorage = (key) => {

    try {
      const storedData =
        typeof localStorage !== "undefined"
          ? localStorage.getItem(key)
          : null;
      if (storedData) {
        if (storedData.startsWith("ENC:")) {
          const encrypted = storedData.slice(4);
          const bytes = CryptoJS.AES.decrypt(
            encrypted,
            process.env.NEXT_PUBLIC_HMAC_SECRET_KEY
          );
            const decrypted = JSON.parse(bytes?.toString(CryptoJS.enc.Utf8));
            console.log(decrypted, "decrypted");
            return decrypted; 
          
        } else {
          localStorage.removeItem(key); // Remove corrupted data
          return null;
        }
      }
      return null;
    } catch (error) {
      localStorage.removeItem(key); // Remove corrupted data
      return null;
    }
  };
  

  export const renderPaginationButtons = (totalPages, pageNo,setPageNo, loading) => {
    const buttons = [];
    const maxButtons = 3; // Maximum buttons to display at once
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPages <= maxButtons) {
        // Display all pages if total pages are less than or equal to maxButtons
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`pagination_button ${pageNo === i ? 'active' : ''}`}
                    onClick={() => setPageNo(i)}
                    disabled={loading}
                >
                    {i}
                </button>
            );
        }
    } else {
        // Add the first page
        buttons.push(
            <button
                key={firstPage}
                className={`pagination_button ${pageNo === firstPage ? 'active' : ''}`}
                onClick={() => setPageNo(firstPage)}
                disabled={loading}
            >
                {firstPage}
            </button>
        );

        // Add "..." if current page is far from the first page
        if (pageNo > 3) {
            buttons.push(<span key="start-ellipsis" className="ellipsis">...</span>);
        }

        // Add pages around the current page
        const start = Math.max(2, pageNo - 1); // Start from the second page or one before the current
        const end = Math.min(totalPages - 1, pageNo + 1); // End at the last page or one after the current

        for (let i = start; i <= end; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`pagination_button ${pageNo === i ? 'active' : ''}`}
                    onClick={() => setPageNo(i)}
                    disabled={loading}
                >
                    {i}
                </button>
            );
        }

        // Add "..." if current page is far from the last page
        if (pageNo < 2) {
            buttons.push(<span key="end-ellipsis" className="ellipsis">...</span>);
        }

        // Add the last page
        buttons.push(
            <button
                key={lastPage}
                className={`pagination_button ${pageNo === lastPage ? 'active' : ''}`}
                onClick={() => setPageNo(lastPage)}
                disabled={loading}
            >
                {lastPage}
            </button>
        );
    }

    return buttons;
};