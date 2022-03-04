import React, { useState } from "react";
import "../assets/css/login.scss";
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
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
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
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"1xl"}>Sign in to your account</Heading>
          {showError()}
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={2.5} p="1rem 0rem" backgroundColor="" boxShadow="">
              <FormControl isInvalid={errors.username?.message}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    borderColor="gray.300"
                    background="white"
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
                    borderColor="gray.300"
                    background="white"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    {...register("password", { required: "password required" })}
                    onChange={handleChange("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.15rem" size="xs" onClick={handleShowClick}>
                      {showPassword ? (
                        <FaEye color="gray.300" />
                      ) : (
                        <FaEyeSlash color="gray.300" />
                      )}
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
                colorScheme="brand"
                width="full"
              >
                {values.isLoading ? (
                  <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="#f39c12"
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>

      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.pexels.com/photos/2325876/pexels-photo-2325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500&auto=format&fit=crop&w=900&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};
export default Login;
