import React, { useEffect, useState } from "react";

const useLocalstorage = (nameInLocalstorage) => {
  const [value, setValue] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem(nameInLocalstorage));
    return savedValue || false;
  });

  useEffect(() => {
    localStorage.setItem(nameInLocalstorage, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalstorage;
