import React, { useState } from 'react';
import styles from './InvoiceGenerator.module.css';

const InvoiceGenerator = () => {
  const [invoice, setInvoice] = useState({
    company: 'Your Company LLC',
    email: 'contact@yourcompany.com',
    billTo: 'Client Name',
    clientEmail: 'client@email.com',
    items: [{ description: 'Web Design Service', quantity: 1, price: 500 }],
    tax: 0,
    discount: 0,
  });

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { description: '', quantity: 1, price: 0 }] });
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearData = () => {
    setInvoice({
      company: '',
      email: '',
      billTo: '',
      clientEmail: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      tax: 0,
      discount: 0,
    });
    setShowClearConfirm(false);
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const discountAmount = subtotal * (invoice.discount / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (invoice.tax / 100);
  const total = taxableAmount + taxAmount;

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.formArea}`}>
        <h3>Invoice Details</h3>
        
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Your Company</label>
            <input type="text" value={invoice.company} onChange={(e) => setInvoice({...invoice, company: e.target.value})} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Your Email</label>
            <input type="email" value={invoice.email} onChange={(e) => setInvoice({...invoice, email: e.target.value})} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Bill To</label>
            <input type="text" value={invoice.billTo} onChange={(e) => setInvoice({...invoice, billTo: e.target.value})} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Client Email</label>
            <input type="email" value={invoice.clientEmail} onChange={(e) => setInvoice({...invoice, clientEmail: e.target.value})} className={styles.input} />
          </div>
        </div>

        <h4>Items</h4>
        {invoice.items.map((item, i) => (
          <div key={i} className={styles.itemRow}>
            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(i, 'description', e.target.value)} className={styles.itemDesc} />
            <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(i, 'quantity', e.target.value)} className={styles.itemQty} />
            <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(i, 'price', e.target.value)} className={styles.itemPrice} />
            <button className={styles.removeItemBtn} onClick={() => removeItem(i)}>✖</button>
          </div>
        ))}
        
        <button className={styles.addItemBtn} onClick={addItem}>+ Add Item</button>

        <div className={styles.taxDiscountRow}>
          <div className={styles.inputGroup}>
            <label>Discount (%)</label>
            <input type="number" value={invoice.discount} onChange={(e) => setInvoice({...invoice, discount: Number(e.target.value)})} className={styles.taxInput} />
          </div>
          <div className={styles.inputGroup}>
            <label>Tax (%)</label>
            <input type="number" value={invoice.tax} onChange={(e) => setInvoice({...invoice, tax: Number(e.target.value)})} className={styles.taxInput} />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.printBtn} onClick={handlePrint}>🖨️ Download / Print as PDF</button>
          <button className={styles.clearDataBtn} onClick={() => setShowClearConfirm(true)}>🗑️ Clear Data</button>
        </div>
      </div>

      {/* Invoice Preview / Print Area */}
      <div className={styles.invoicePreview} id="printable-invoice">
        <div className={styles.invoiceHeader}>
          <div>
            <h2>{invoice.company}</h2>
            <p>{invoice.email}</p>
          </div>
          <h1>INVOICE</h1>
        </div>
        
        <div className={styles.billToSection}>
          <p><strong>Bill To:</strong></p>
          <p>{invoice.billTo}</p>
          <p>{invoice.clientEmail}</p>
        </div>

        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.totalsSection}>
          <div className={styles.totalRow}><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
          {invoice.discount > 0 && (
            <div className={`${styles.totalRow} ${styles.discountText}`}>
              <span>Discount ({invoice.discount}%):</span> <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          {invoice.tax > 0 && (
            <div className={styles.totalRow}><span>Tax ({invoice.tax}%):</span> <span>${taxAmount.toFixed(2)}</span></div>
          )}
          <div className={`${styles.totalRow} ${styles.grandTotal}`}><span>Total:</span> <span>${total.toFixed(2)}</span></div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowClearConfirm(false)}>
          <div className={`liquid-glass ${styles.confirmModal}`} onClick={(e) => e.stopPropagation()}>
            <h3>Clear All Data?</h3>
            <p>This will permanently delete everything you've typed in this invoice. This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowClearConfirm(false)}>Cancel</button>
              <button className={styles.confirmClearBtn} onClick={handleClearData}>Yes, Clear Everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
