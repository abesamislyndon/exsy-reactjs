import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import SidebarWithHeader from "../shared/SidebarProps";
import { Flex, Container} from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

function Jobwork() {

  const dataList = [
    {
      "id": 1,
      "avartar": "https://via.placeholder.com/40x40/3498ff/FFFFFF?text=E",
      "city": "New Amieshire",
      "email": "Leora13@yahoo.com",
      "firstName": "Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe",
      "lastName": "Schuppe",
      "street": "Ratke Port",
      "zipCode": "17026-3154",
      "date": "2016-09-23T07:57:40.195Z",
      "bs": "global drive functionalities",
      "catchPhrase": "Intuitive impactful software",
      "companyName": "Lebsack - Nicolas",
      "words": "saepe et omnis",
      "sentence": "Quos aut sunt id nihil qui.",
      "stars": 820,
      "followers": 70
    },
    {
      "id": 2,
      "avartar": "https://via.placeholder.com/40x40/3498ff/FFFFFF?text=J",
      "city": "New Gust",
      "email": "Mose_Gerhold51@yahoo.com",
      "firstName": "Janis",
      "lastName": "Vandervort",
      "street": "Dickinson Keys",
      "zipCode": "43767",
      "date": "2017-03-06T09:59:12.551Z",
      "bs": "e-business maximize bandwidth",
      "catchPhrase": "De-engineered discrete secured line",
      "companyName": "Glover - Hermiston",
      "words": "deleniti dolor nihil",
      "sentence": "Illo quidem libero corporis laborum.",
      "stars": 1200,
      "followers": 170
    },
    {
      "id": 3,
      "avartar": "https://via.placeholder.com/40x40/3498ff/FFFFFF?text=M",
      "city": "Lefflerstad",
      "email": "Frieda.Sauer61@gmail.com",
      "firstName": "Makenzie",
      "lastName": "Bode",
      "street": "Legros Divide",
      "zipCode": "54812",
      "date": "2016-12-08T13:44:26.557Z",
      "bs": "plug-and-play e-enable content",
      "catchPhrase": "Ergonomic 6th generation challenge",
      "companyName": "Williamson - Kassulke",
      "words": "quidem earum magnam",
      "sentence": "Nam qui perferendis ut rem vitae saepe.",
      "stars": 610,
      "followers": 170
    },
    {
      "id": 4,
      "avartar": "https://via.placeholder.com/40x40/3498ff/FFFFFF?text=C",
      "city": "East Catalina",
      "email": "Eloisa.OHara@hotmail.com",
      "firstName": "Ciara",
      "lastName": "Towne",
      "street": "Schimmel Ramp",
      "zipCode": "76315-2246",
      "date": "2016-07-19T12:54:30.994Z",
      "bs": "extensible innovate e-business",
      "catchPhrase": "Upgradable local model",
      "companyName": "Hilpert, Eichmann and Brown",
      "words": "exercitationem rerum sit",
      "sentence": "Qui rerum ipsa atque qui.",
      "stars": 5322,
      "followers": 170
    },
    {
      "id": 5,
      "avartar": "https://via.placeholder.com/40x40/3498ff/FFFFFF?text=S",
      "city": "Ritchieborough",
      "email": "Brisa46@hotmail.com",
      "firstName": "Suzanne",
      "lastName": "Wolff",
      "street": "Lemuel Radial",
      "zipCode": "88870-3897",
      "date": "2017-02-23T17:11:53.875Z",
      "bs": "back-end orchestrate networks",
      "catchPhrase": "Exclusive human-resource knowledge base",
      "companyName": "Mayer - Considine",
      "words": "voluptatum tempore at",
      "sentence": "Enim quia deleniti molestiae aut.",
      "stars": 852,
      "followers": 770
    }
  ];

  const ImageCell = ({ rowData, dataKey, ...rest }) => (
    <Cell {...rest}>
      <img src={rowData[dataKey]} width="50" />
    </Cell>
  );
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
   <Container maxW='container.xl'>
   <Table
      height={400}
      data={dataList}
      onRowClick={data => {
        console.log(data);
      }}
    >
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={200} fixed>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={200}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Street</HeaderCell>
        <Cell dataKey="street" />
      </Column>

      <Column width={300}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
      <Column width={120} fixed="right">
        <HeaderCell>Action</HeaderCell>

        <Cell>
          {rowData => {
            function handleAction() {
              alert(`id:${rowData.id}`);
            }
            return (
              <span>
                <a onClick={handleAction}> Edit </a> | <a onClick={handleAction}> Remove </a>
              </span>
            );
          }}
        </Cell>
      </Column>
    </Table>
</Container>
      </SidebarWithHeader>   
    );
}
export default Jobwork;