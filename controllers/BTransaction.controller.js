import { verifyJWT } from '../services/jwt.js';
import { OfferTransaction } from '../models/association.js';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

export const BusinessTransactionController = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
      console.log(decoded)
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const transactions = await OfferTransaction.findAll({
      where: {store_id: decoded.id}
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Error in BusinessTransactionController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const exportCSV = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const transactions = await OfferTransaction.findAll({
      where: {store_id: decoded.id}
    });

    const fields = ['transaction_id', 'date', 'time', 'customer_product', 'amount', 'discounted_amount', 'after_discount_price', 'status'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error in exportCSV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const downloadInvoices = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const transactions = await Transaction.findAll({
      where: { business_id: decoded.id },
      order: [['date', 'DESC'], ['time', 'DESC']]
    });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoices.pdf');
    doc.pipe(res);

    transactions.forEach((transaction, index) => {
      if (index > 0) {
        doc.addPage();
      }
      doc.fontSize(18).text('Invoice', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Transaction ID: ${transaction.transaction_id}`);
      doc.text(`Date: ${transaction.date} ${transaction.time}`);
      doc.text(`Product: ${transaction.customer_product}`);
      doc.text(`Amount: ₹${parseFloat(transaction.amount).toFixed(2)}`);
      doc.text(`Discounted Amount: ${transaction.discounted_amount ? `₹${parseFloat(transaction.discounted_amount).toFixed(2)}` : 'N/A'}`);
      doc.text(`After Discount Price: ₹${parseFloat(transaction.after_discount_price).toFixed(2)}`);
      doc.text(`Status: ${transaction.status}`);
    });

    doc.end();
  } catch (error) {
    console.error('Error in downloadInvoices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// The duplicate export statement has been removed