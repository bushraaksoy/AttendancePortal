import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import useFetch from "../../hooks/useFetch";
import "./TokenAccepting.css";
import { Link } from "react-router-dom";

const TokenAccepting = () => {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  const url = `/student/attendance/take/qr/${token}`;

  const { data, loading, error } = useFetch(url, {
    method: "GET",
    headers: {},
  });

  if (loading) {
    <MainLayout>
      <div className="loader"></div>
    </MainLayout>;
  }

  return (
    <MainLayout>
      <div>TAKING YOUR ATTENDANCE</div>
      <div className="qr-acccepting-popup">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
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
