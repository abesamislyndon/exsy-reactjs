import React, { useEffect, useState, useMemo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";


import { useParams, Link } from "react-router-dom";
import DataService from "../../../services/data.service";
import { Tr } from "@chakra-ui/react";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#333",
    padding: 12
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 	
    borderRightWidth: 0, 
    borderBottomWidth: 0 ,
    marginTop: 12
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "50%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    padding:5,
    textAlign: "left"
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10
  },
   textsmall: {
    fontSize: 9
   },
   textmedium: {
    fontSize: 12
   },
   movedown: {
    marginTop:20
   }

});



// Create Document Component
function JobworkPdf() {
  const { id } = useParams();
  const [jobdetail, setJobdetail] = useState([]);
  useEffect(() => {
    getJobDetail();
  }, []);
  const getJobDetail = () => {
    DataService.jobinfo_detail(id).then((response) => {
      setJobdetail(response);
    });
  };

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
        <br/>
      
        <View>
          <Text style={styles.textsmall}>Job Type: &nbsp;&nbsp; {jobdetail.id}</Text>
        </View>
        <View>
          <Text style={styles.textsmall}>Client: &nbsp;&nbsp;&nbsp;{jobdetail.client_name}</Text>
        </View>
        <View>
          <Text style={styles.textsmall}>Division: {jobdetail.division_name}</Text>
        </View>
        <View>
          <Text style={styles.textsmall}>Block: {jobdetail.block}</Text>
        </View>
        <View>
          <Text style={styles.textsmall}>Location: {jobdetail.address}</Text>
        </View>
        <View>
          <Text style={styles.textsmall}>Date Entry: {jobdetail.dateEntry}</Text>
        </View>
        <View style={styles.movedown} >
          <Text style={styles.textsmall}>NATURAL OF COMPLAINT FINDING:</Text>
        </View>
        <View >
          <Text style={styles.textsmall}>{jobdetail.natureofcomplain}</Text>
        </View>

        <View style={styles.movedown} >
          <Text style={styles.textmedium}>SUMMARY OF JOB WORK:</Text>
        </View>
      
        <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Product</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Type</Text> 
          </View> 
        </View>
        {
          jobdetail.defect_details.map((defect)=>{
            return(
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{defect.defects}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{defect.recommendation}</Text> 
                </View> 
              </View>
            )
          })
        }
        {console.log(jobdetail)}
        </View>  
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default JobworkPdf;