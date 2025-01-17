import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

//import css
import "./InvoicePDF.css";

// Register the Roboto font
Font.register({
    family: 'Roboto',
    src: '/path/to/fonts/Roboto-Regular.ttf', // Adjust the path
});

// Define custom styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 10,
        padding: 10,
        borderBottom: '1px solid #ccc',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        fontSize: 12,
        color: '#555',
    },
    total: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#000',
    },
});

const InvoicePDF = ({ products, total }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Invoice</Text>
                <View style={styles.section}>
                    <Text>Order Summary:</Text>
                    {products.map((product) => (
                        <View key={product.id} style={styles.itemRow}>
                            <Text>{product.name} ({product.quantity}x)</Text>
                            <Text>${(product.quantity * product.price).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            </Page>
        </Document>
    )
}

export default InvoicePDF