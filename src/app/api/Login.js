export const getLastLoginTime = () => {
    return localStorage.getItem("lastLoginTime") || null;
  };
  
  export const setLastLoginTime = (time) => {
    localStorage.setItem("lastLoginTime", time);
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem("userToken"); // Change 'userToken' based on your auth logic
  };
  
  export const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("lastLoginTime");
  };
  