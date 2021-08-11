import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Sarabun",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

Font.register({
  family: "Sarabun",
  fonts: [{ src: "./fonts/Sarabun-Regular.ttf" }],
});

const PDFReport = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const [isOnPdfView, setIsOnPdfView] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsOnPdfView(true);
    }, 1000);
  }, []);

  return (
    <>
      {isOnPdfView && (
        <PDFViewer className="container-fluid mt-3" height={800}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.container}>
                <Image style={{ width: 50 }} src="./logo192.png" />
              </View>
              <View>
                <Text style={styles.title}>Select Item Report</Text>
              </View>
              <Table data={cart}>
                <TableHeader textAlign="center">
                  <TableCell weighting={0.15}>Code</TableCell>
                  <TableCell style={{ marginLeft: 5 }} weighting={0.5}>
                    Name Product
                  </TableCell>
                  <TableCell weighting={0.25}>Price</TableCell>
                  <TableCell weighting={0.25}>Quantity</TableCell>
                  <TableCell weighting={0.25}>Total Item</TableCell>
                </TableHeader>
                <TableBody>
                  <DataTableCell
                    weighting={0.15}
                    style={{ textAlign: "center" }}
                    getContent={(r) => r.id}
                  />
                  <DataTableCell
                    style={{ marginLeft: 5 }}
                    weighting={0.5}
                    getContent={(r) => r.name}
                  />
                  <DataTableCell
                    weighting={0.25}
                    style={{ textAlign: "center" }}
                    getContent={(r) => r.price}
                  />
                  <DataTableCell
                    weighting={0.25}
                    style={{ textAlign: "center" }}
                    getContent={(r) => r.qty}
                  />
                  <DataTableCell
                    weighting={0.25}
                    style={{ textAlign: "center" }}
                    getContent={(r) => r.qty * r.price}
                  />
                </TableBody>
              </Table>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default PDFReport;
