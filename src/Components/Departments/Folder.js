import React from "react";
import { Page, Text, Document, Image, StyleSheet } from "@react-pdf/renderer";
// import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
// import kena from "../../assets/ictlog2.jpg";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    width: 500,
    height: 500,
  },
  nop: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    color: "rgb(0,0,128)",
    border: "rgb(0,150,16)",
  },
  Greencolor: {
    color: "rgb(100,180,0)",
  },
  Ycolor: {
    color: "rgb(100,180,0)",
  },
  Redcolor: {
    color: "rgb(200,0,0)",
  },
  yellowcolor: {
    color: "rgb(255,180,0)",
  },
});

function ViewReport({ data }) {
  console.log(data);
  return (
    <>
      <Document>
        <Page style={styles.body}>
          <table style={styles.Redcolor}>
            <tr>
              <th>Male</th>
              <th>Female</th>
              <th>Expt</th>
              <th>Total number of fired workers </th>
            </tr>{" "}
            <tr>
              <td>{data.firedFemale}</td>
              <td>{data.firedExp}</td>
              <td>{data.firedTotal}</td>
            </tr>
          </table>
          <Text style={styles.header}>
            ICT PARK Monthly Report
            {"\n"}{" "}
          </Text>{" "}
          {"\n"}
          <Text>
            Company Name = {data.companyName} {"\n"}{" "}
          </Text>{" "}
          {"\n"}
          <Text>
            Date of month = {data.month} {"\n"}{" "}
          </Text>{" "}
          {"\n"}
          <Text style={styles.Greencolor}>
            1, JOB Creation
            {"\n"}{" "}
          </Text>{" "}
          {"\n"}
          <Text key={data._id}>
            <Text style={styles.Redcolor}>
              I- Total Number of workers
              {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            {/* <Text>{data.total_number_of_worker}</Text> */}
            <Text>* Male = {data.totalMale}</Text>
            <Text> * Female = {data.totalFemale}</Text>
            <Text>
              {" "}
              * Expt = {data.totalExp}
              {"\n"}
            </Text>
            {"\n"}
            <Text>
              * Total number of workers = {data.totalTotal} {"\n"}
            </Text>
            {"\n"}
            <Text style={styles.Redcolor}>
              II- Number of workers hired
              {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>* Male:- {data.hiredMale}</Text>
            <Text> * Female = {data.hiredFemale}</Text>
            <Text>
              {" "}
              * Expt = {data.hiredExp} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              * Total number of hired_worker = {data.hiredTotal} {"\n"}{" "}
            </Text>
            {"\n"}
            <Text style={styles.Redcolor}>
              III- Total number of fired/resigned workers
              {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>* Male = {data.firedMale}</Text>
            <Text> * Female = {data.firedFemale}</Text>
            <Text>
              {" "}
              * Expt = {data.firedExp} {"\n"}
            </Text>{" "}
            {"\n"}
            <Text>
              * Total number of fired workers {data.firedTotal} {"\n"}
            </Text>
            {"\n"}
            <Text style={styles.Redcolor}>
              IV- Average number of worker during the month ={" "}
              {data.average_worker_per_month}
              {"\n"}
            </Text>
            {"\n"}
            <Text style={styles.Redcolor}>
              V- Cumulative new jobs created EFY 2015 ={" "}
              {data.cumulative_new_jobs_created} {"\n"}
            </Text>{" "}
            {"\n"}
            {/* <Text>{data.number_of_workers_resigned}</Text> */}
            {/* <Text>{data.number_of_workers_hired}</Text> */}
            <Text style={styles.Redcolor}>
              VI- Turnover Rate = {data.turn_over_rate} {"\n"}
            </Text>
            {"\n"}
            <Text style={styles.Redcolor}>
              VII- Job creation = {data.job_creation} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text style={styles.Greencolor}>
              2. Export and Import Substitute
              {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              I- Planned Monthly export = {data.planned_monthly_report} {"\n"}
            </Text>{" "}
            {"\n"}
            <Text>
              II- Amount of export (USD) = {data.amount_of_export} {"\n"}
            </Text>{" "}
            {"\n"}
            <Text>
              III- Monthly import substitute(Local) ={" "}
              {data.monthly_import_substitute} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              IV- Amount import substitute (Birr) ={" "}
              {data.amount_import_substitute} {"\n"}
            </Text>{" "}
            {"\n"}
            <Text style={styles.Greencolor}>
              3. On Job Training Certification
              {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              Certificate Type = {data.certificate_type} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              Number of the trainee = {data.number_of_trainee} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              Duration of the training = {data.duration_of_training} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text style={styles.Greencolor}>
              4. Challenges
              {"\n"}{" "}
            </Text>{" "}
            {"\n"}
            <Text>
              {data.challenges} {"\n"}{" "}
            </Text>{" "}
            {"\n"}
          </Text>
          <Image
            src={"http://localhost:8080/" + data.additional_file}
            // src={kena}
            style={styles.image}
          />
        </Page>
      </Document>
    </>
  );
}
export default ViewReport;
