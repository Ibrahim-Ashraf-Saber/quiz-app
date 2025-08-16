import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import certificateImg from "/c.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  nameContainer: {
    position: "absolute",
    top: "55%",
    left: "0",
    transform: "translateY(-50%)",
    width: "100%",
  },
  studentName: {
    fontSize: 24,
    color: "#19416b",
    textAlign: "center",
    width: "100%",
    fontFamily: "Helvetica",
  },
  dateContainer: {
    position: "absolute",
    bottom: "15%",
    right: "35%",
  },
  dateText: {
    fontSize: 16,
    color: "#f59a3d",
    fontFamily: "Helvetica",
  },
});

const CertificatePDF = ({ studentName }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <Image src={certificateImg} style={styles.backgroundImage} />

        <View style={styles.nameContainer}>
          <Text style={styles.studentName}>
            {studentName || "Student Name"}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
