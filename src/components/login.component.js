import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Input,
    FormControl
  } from '@chakra-ui/react';
import { Md12Mp } from "react-icons/md"
import { useForm } from "react-hook-form";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });
  const { username, password, loading, error, redirectToReferrer } = values;
  const handleChange = name => event => {
           setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { register, formState: { errors }, handleSubmit } = useForm({shouldFocusError: false,});
  const navigate = useNavigate();

  const handleLogin = async () => {
      setValues({ ...values, error: false, loading: true });
      try {
          await AuthService.login(username, password).then(
             ()=> {
              navigate("/dashboard");
              window.location.reload();
            },
            (error) => {
                 setValues({...values, error: "Invalid Username/password"});
            }
          );
        } catch (error) {
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
    <Container>
        <Stack  
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 220, md: 220 }} >
            
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'} align='center'>
                 Terminal
                <Text as={'span'} color={'green.400'}>
                Nine
                </Text>
            </Heading>
            {showError()}   
            <form onSubmit={handleSubmit(handleLogin)} >
                    <Stack direction='column' spacing={4} align='center'>
                    <FormControl isInvalid={errors.username?.message}>
                    <Input
                        placeholder="username"
                        {...register("username" , {required: "username required"})}
                        onChange={handleChange("username")}
                        />
                 </FormControl>
                        <Stack direction='row'>
                            <Text as = 'sup'  color="tomato" textAlign={3} className="login-error-msg">{errors.username?.message}</Text>
                        </Stack>
                  <FormControl isInvalid={errors.password?.message}>
                    <Input
                        type="password"
                        placeholder="password"
                        {...register("password", { required: "password required" })} 
                        onChange={handleChange("password")}
                    />
                     </FormControl>
                    <Text as = 'sup' color="tomato" className="login-error-msg">{errors.password?.message}</Text> 
                    <Button  type="submit" size={"md"} colorScheme={"green"} align="{right}">Log in</Button>
                    </Stack>
             </form>
        </Stack>
    </Container>
  );
};
export default Login;