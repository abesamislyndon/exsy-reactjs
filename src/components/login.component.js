import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {
  CircularProgress,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    redirectToReferrer: false,
    isLoading: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const { username, password, error } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ shouldFocusError: false });

  const navigate = useNavigate();
  const handleLogin = async () => {
    setValues({ ...values, error: false, isLoading: true });
    try {
      await AuthService.login(username, password).then(
        () => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          setValues({ ...values, error: "Invalid Username/password" });
        }
      );
    } catch (error) {
      setValues({ ...values, isLoading: false });
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="12"
        justifyContent="center"
        alignItems="center"
      >
      
        <Heading color="black.400">Terminal 9</Heading>
        {showError()}
        <Box minW={{ base: "90%", md: "520px" }}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack
              spacing={2}
              p="5rem 3rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={errors.username?.message}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    placeholder="username"
                    {...register("username", { required: "username required" })}
                    onChange={handleChange("username")}
                  />
                </InputGroup>
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.username?.message}
              </Text>

              <FormControl isInvalid={errors.password?.message}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    {...register("password", { required: "password required" })}
                    onChange={handleChange("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.15rem" size="xs" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text as="sup" color="tomato" className="login-error-msg">
                  {errors.password?.message}
                </Text>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="green"
                width="full"
              >
                {values.isLoading ? (
                  <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="green.300"
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};
export default Login;
