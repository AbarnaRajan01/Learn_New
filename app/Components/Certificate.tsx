import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles for the certificate
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 18,
    marginBottom: 8,
  },
  footer: {
    fontSize: 12,
    marginTop: 20,
    color: "#888",
  },
});

// Props type
interface CertificateProps {
  name: string;
  topic: string;
  date: string;
}

// Certificate PDF document component
const Certificate: React.FC<CertificateProps> = ({ name, topic, date }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.bodyText}>This certifies that</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
        <Text style={styles.bodyText}>
          Has successfully completed the course
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{topic}</Text>
        <Text style={styles.bodyText}>Date: {date}</Text>
        <Text style={styles.footer}>Issued by [Your Platform Name]</Text>
      </View>
    </Page>
  </Document>
);

// Button component to trigger PDF download
const CertificateDownloadButton: React.FC<CertificateProps> = ({
  name,
  topic,
  date,
}) => (
  <div className="flex justify-center mt-4">
    <PDFDownloadLink
      document={<Certificate name={name} topic={topic} date={date} />}
      fileName="certificate.pdf"
    >
      {({ loading }) =>
        loading ? "Loading certificate..." : "Download Certificate"
      }
    </PDFDownloadLink>
  </div>
);

export { Certificate, CertificateDownloadButton };
