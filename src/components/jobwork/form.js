import React, { useEffect, useState } from "react";
import Personnelform from "./roleforms/personnelforms";
import Contractoradminform from "./roleforms/contractoradminform";
import Towncounciladminform from "./roleforms/towncounciladminform";



function Form() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
      <>
      { user.user.role === "personnel" ? (
        <Personnelform />
      ) :  user.user.role == "superadmin" ?   (
        <Contractoradminform />
      ) :  user.user.role == "towncouncilAdmin" ? (
        <Towncounciladminform />
      ) : (
        <Personnelform />
      )}
     {console.log(user)}
      </>
  );
}
export default Form;