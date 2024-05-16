import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import useFetch from "../../hooks/useFetch";
import "./TokenAccepting.css";
import { Link } from "react-router-dom";
import yes from "/correct.png";
import no from "/delete.png";

const TokenAccepting = () => {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  const url = `/student/attendance/take/qr/${token}`;

  const loading = false;

  // const { data, loading, error } = useFetch(url, {
  //   method: "GET",
  //   headers: {},
  // });

  return (
    <MainLayout>
      <div>TAKING YOUR ATTENDANCE</div>
      <div className="qr-acccepting-popup">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <img src={yes} alt="checkmark" width={250} />
            <Link className="back-home" to={"/"}>
              Back to Home
            </Link>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default TokenAccepting;
