import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/Ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your credential"
      );
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignupScreen;
