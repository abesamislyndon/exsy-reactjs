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
    FormControl,
    CircularProgress
  } from '@chakra-ui/react';

import { useForm } from "react-hook-form";

const Login = () =>{
    const [values, setValues] = useState({
        username: "",
        password: "",
        error: "",
        redirectToReferrer: false,
        isLoading: false
    });
  const { username, password,error } = values;
  const handleChange = name => event => {
           setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { register, formState: { errors }, handleSubmit } = useForm({shouldFocusError: false,});
 
  const navigate = useNavigate();

  const handleLogin = async () => {
      setValues({ ...values, error: false, isLoading: true });
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
            setValues({...values, isLoading: false });
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

                    <Button colorScheme='green' variant='solid' type="submit" width="full" mt={4}>
                        { values.isLoading ? (
                            <CircularProgress isIndeterminate size="24px" color='green.300' />
                        ) : (
                            'Sign In'
                        )}
                     </Button>

                    </Stack>
             </form>
        </Stack>
    </Container>
  );
};
export default Login;