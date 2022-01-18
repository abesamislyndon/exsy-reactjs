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
    Input
  } from '@chakra-ui/react';
  import { Md12Mp } from "react-icons/md"


const Login = () => {

  const [username, Setusername] = useState(()=>{
      return "";
  });
  const [password, setPassword] = useState(()=>{
      return "";
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
      await AuthService.login(username, password).then(
        () => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }} >
            
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'} align='center'>
              Terminal
                <Text as={'span'} color={'green.400'}>
                Nine
                </Text>
            </Heading>
 
            
   
            <form onSubmit={handleLogin}>
                    <Stack direction='column' spacing={4} align='center'>
                    <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => Setusername(e.target.value)}
                        variant={"outline"}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button rightIcon={<Md12Mp />} type="submit" size={"md"} colorScheme={"green"} align="{right}">Log in</Button>
                    </Stack>
             </form>
        </Stack>
    </Container>
  );
};

export default Login;


