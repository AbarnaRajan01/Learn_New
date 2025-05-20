// lib/generatePdf.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 14 },
  section: { marginBottom: 10 },
  heading: { fontSize: 22, marginBottom: 10, fontWeight: "bold" },
  bodyText: { marginBottom: 6 },
});

export function generatePdfDocument(topic: string, content: string) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{topic} Notes</Text>
          <Text style={styles.bodyText}>{content}</Text>
        </View>
      </Page>
    </Document>
  );
}
