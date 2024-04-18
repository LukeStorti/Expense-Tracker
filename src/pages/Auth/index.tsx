import { Button } from "@/components/ui/button";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import authimg from "../../assets/authimg.svg";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl">Expense Tracker</h1>
        <img src={authimg} className="h-[300px] w-[300px]" />
      </div>
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    </div>
  );
};

export default Auth;
