import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState, FormEvent } from "react";
import { authentication } from "../../actions/actions";
import { useSignIn } from "../../queries/mutation";
import GoogleSignInButton from "../googleSignInButton";
import PasswordField from "../passwordField";

type TFormData = {
  email: string;
  password: string;
};

const initialFormData: TFormData = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const [formData, setFormData] = useState<TFormData>(initialFormData);

  const onSuccess = (data: any) => {
    if (data) {
      dispatch(
        authentication({
          userName: data.result.userName,
          isUserAuthenticated: true,
          token: data.token,
        })
      );
      showToast("success", "Sign Up Successful");
      history.push("/my-groups");
    }
  };
  const onError = (err: any) => {
    showToast("warning", err.response.data.message);
  };

  const { mutate } = useSignIn(onSuccess, onError);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

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

  return (
    <Box pt={8}>
      <form onSubmit={submitHandler}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <Text fontSize={"sm"} color={"gray.600"}>
            to start tracking your trip expenses ✌️
          </Text>
        </Stack>
        <Box p={8}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter Email Address"
                id="email"
                isRequired
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <PasswordField
                id="password"
                isRequired
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack mt={7}>
            <Button
              type="submit"
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
              mb={2}
            >
              SIGN IN
            </Button>
            <GoogleSignInButton />
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default SignIn;
