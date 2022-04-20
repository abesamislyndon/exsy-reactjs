import React, { useState, useEffect } from "react";
import ContractorDashboard from "./dashboard/contractor.dashboard";
import PersonnelDashboards from "./dashboard/personnel.dashboard";
import TowncouncilDashboard from "./dashboard/towncouncil.dashboard";


function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
      <>
      { user.user.role === "personnel" ? (
        <PersonnelDashboards />
      ) :  user.user.role == "superadmin" ?   (
        <ContractorDashboard />
      ) :  user.user.role == "towncouncilAdmin" ? (
        <TowncouncilDashboard />
      ) : (
        <PersonnelDashboards />
      )}
     {console.log(user)}
      </>
  );
}
export default Dashboard;
