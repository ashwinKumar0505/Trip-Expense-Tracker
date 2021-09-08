import { Button, useToast } from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";

import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import { authentication } from "../../actions/actions";
import { useDispatch } from "react-redux";

const GoogleSignInButton = () => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const showToast = (
    status: "error" | "success" | "warning",
    message: string
  ) => {
    toast({
      title: message,
      status,
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const googleSuccess = async (res: any) => {
    const name = res?.profileObj.name;
    const token = res?.tokenId;

    try {
      dispatch(
        authentication({ isUserAuthenticated: true, userName: name, token })
      );
      showToast("success", "Google Login is Successful");
      history.push("/my-groups");
    } catch (error: any) {
      throw new Error(error);
    }
  };
  const googleFailure = () => {
    showToast("error", "Google Login Failed");
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
      render={(renderProps) => (
        <Button
          isDisabled={renderProps.disabled}
          onClick={renderProps.onClick}
          leftIcon={<AiOutlineGoogle color="white" />}
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          GOOGLE SIGN IN
        </Button>
      )}
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleSignInButton;
