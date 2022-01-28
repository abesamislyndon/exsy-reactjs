import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import SidebarWithHeader from "../shared/SidebarProps";
import { Flex, Container} from "@chakra-ui/react";

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user); 
    } else {
      navigate("/");
      window.location.reload();
    }
  }, []);
  return (
      <SidebarWithHeader>
      <Flex>
          <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is </p>
      </Flex>
      </SidebarWithHeader> 
    );
}
export default Dashboard;