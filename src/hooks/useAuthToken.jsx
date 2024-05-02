const useAuthToken = () => {
  const setAuthToken = (token) => localStorage.setItem("token", token);
  const getAuthToken = () => localStorage.getItem("token");
  const clearAuthToken = () => localStorage.removeItem("token");

  return { setAuthToken, getAuthToken, clearAuthToken };
};

export default useAuthToken;
