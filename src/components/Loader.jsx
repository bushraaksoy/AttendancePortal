import React from "react";

const Loader = () => {
  const source =
    "https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif";

  return (
    <>
      <img width={80} src={source} alt="loading..." />
      {/* <img width={50} src="https://i.gifer.com/ZKZg.gif" /> */}
    </>
  );
};

export default Loader;
