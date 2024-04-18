export const useGetUserInfo = () => {
  const item = localStorage.getItem("auth");
  if (item === null) {
    return { name: "", profilePhoto: "", userID: "", isAuth: false };
  }
  const { name, profilePhoto, userID, isAuth } = JSON.parse(item);
  return { name, profilePhoto, userID, isAuth };
};
