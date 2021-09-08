import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validations";
import { useSignUp } from "../../queries/mutation";
import { useHistory } from "react-router";
import { authentication } from "../../actions/actions";
import { useDispatch } from "react-redux";
import GoogleSignInButton from "../googleSignInButton";
import PasswordField from "../passwordField";

type TFormData = {
  name: string;
  email: string;
  password: string;
};

const initialFormData: TFormData = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [showErrors, setShowErrors] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSuccess = (data: any) => {
    if (data) {
      dispatch(
        authentication({
          userName: data.result.username,
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

  const { mutate } = useSignUp(onSuccess, onError);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateEmail(email) || !validatePassword(password)) {
      setShowErrors(true);
    } else {
      mutate(formData);
    }
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
          <Heading fontSize={"2xl"}>Create your Account now</Heading>
          <Text fontSize={"sm"} color={"gray.600"}>
            Enter your details to sign Up 🤩
          </Text>
        </Stack>
        <Box px={8} py={5}>
          <Stack spacing={4} mb={8}>
            <FormControl>
              <FormLabel>Your Name</FormLabel>
              <Input
                id="name"
                isRequired
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              />
            </FormControl>
            <FormControl
              isInvalid={showErrors && !validateEmail(formData.email)}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                isRequired
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              />
              <FormErrorMessage>
                Please Enter a proper email Format
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={showErrors && !validatePassword(formData.password)}
            >
              <FormLabel>Password</FormLabel>
              <PasswordField
                id="password"
                isRequired
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              />
              <FormErrorMessage>
                Password must have Minimum six characters, at least one letter
                and one number
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <Stack>
            <Button
              type="submit"
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
              mb={2}
            >
              SIGN UP
            </Button>
            <GoogleSignInButton />
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
