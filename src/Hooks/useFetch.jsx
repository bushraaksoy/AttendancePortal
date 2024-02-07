import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url, options)
      .then((response) => {
        setPending(false);
        setError(null);
        setData(response.data);
      })
      .catch((err) => {
        setPending(false);
        setError(err.message);
      });
  }, [url, options]);

  return { data, pending, error };
};

export default useFetch;
