import React from "react";

interface InvoiceGeneratorProps {
  // You can define any additional props if needed
}

interface InvoiceGeneratorState {
  invoiceNumber: string;
}

class InvoiceGenerator extends React.Component<
  InvoiceGeneratorProps,
  InvoiceGeneratorState
> {
  constructor(props: InvoiceGeneratorProps) {
    super(props);

    this.state = {
      invoiceNumber: this.generateInvoiceNumber(),
    };
  }

  generateInvoiceNumber(): string {
    // Get the current date and time
    const now = new Date();

    // Format the date and time to use in the invoice number
    const datePart = `${now.getFullYear()}${this.padNumber(
      now.getMonth() + 1
    )}${this.padNumber(now.getDate())}`;
    const timePart = `${this.padNumber(now.getHours())}${this.padNumber(
      now.getMinutes()
    )}${this.padNumber(now.getSeconds())}`;

    // Generate a random string of letters and digits
    const randomPart = this.generateRandomString(4);

    // Combine the date and random parts to create the invoice number
    const invoiceNumber = `INV-${datePart}-${timePart}-${randomPart}`;

    return invoiceNumber;
  }

  padNumber(number: number): string {
    return number.toString().padStart(2, "0");
  }

  generateRandomString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  render() {
    return (
      <div>
        <p className="text-xs">Invoice: {this.state.invoiceNumber}</p>
      </div>
    );
  }
}

export default InvoiceGenerator;
