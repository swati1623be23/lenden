import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type StatementCredit = {
  amount: number;
  note: string | null;
  createdAt: Date;
};

export type StatementPayment = {
  amount: number;
  createdAt: Date;
};

export type StatementData = {
  name: string;
  phone: string | null;
  address: string | null;
  credits: StatementCredit[];
  payments: StatementPayment[];
  generatedAt: Date;
  shopName?: string | null;
  shopLogoUrl?: string | null;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const colors = {
  primary: rgb(0.06, 0.73, 0.51),
  dark: rgb(0.07, 0.09, 0.15),
  muted: rgb(0.45, 0.5, 0.58),
  text: rgb(0.12, 0.16, 0.22),
  border: rgb(0.85, 0.87, 0.9),
  white: rgb(1, 1, 1),
};

function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_") || "customer";
}

export function getStatementFilename(name: string) {
  return `${sanitizeFilename(name)}_statement.pdf`;
}

export async function generateCustomerStatement(data: StatementData): Promise<Uint8Array> {
  const totalCredit = data.credits.reduce((sum, credit) => sum + credit.amount, 0);
  const totalPayment = data.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const outstandingBalance = totalCredit - totalPayment;

  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const ensureSpace = (required: number) => {
    if (y - required < MARGIN) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  };

  const drawText = (
    text: string,
    x: number,
    size: number,
    font = fontRegular,
    color = colors.text,
  ) => {
    page.drawText(text, { x, y, size, font, color });
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: 1,
      color: colors.border,
    });
  };

  // Header
  page.drawRectangle({
    x: MARGIN,
    y: y - 52,
    width: CONTENT_WIDTH,
    height: 52,
    color: colors.dark,
  });
  drawText(data.shopName || "LenDen", MARGIN + 16, 18, fontBold, colors.white);
  y -= 22;
  drawText("Customer Account Statement", MARGIN + 16, 11, fontRegular, rgb(0.75, 0.85, 0.95));
  y -= 48;

  // Customer details
  drawText("Customer Details", MARGIN, 14, fontBold, colors.dark);
  y -= 22;

  const detailRows = [
    ["Name", data.name],
    ["Phone", data.phone || "-"],
    ["Address", data.address || "-"],
  ];

  for (const [label, value] of detailRows) {
    ensureSpace(18);
    drawText(`${label}:`, MARGIN, 10, fontBold, colors.muted);
    drawText(value, MARGIN + 80, 10, fontRegular, colors.text);
    y -= 18;
  }

  y -= 12;
  drawLine(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y -= 24;

  // Summary
  drawText("Account Summary", MARGIN, 14, fontBold, colors.dark);
  y -= 22;

  const summaryItems = [
    ["Total Credit", formatCurrency(totalCredit)],
    ["Total Payment", formatCurrency(totalPayment)],
    ["Outstanding Balance", formatCurrency(outstandingBalance)],
  ];

  for (const [label, value] of summaryItems) {
    ensureSpace(20);
    drawText(label, MARGIN, 11, fontRegular, colors.text);
    drawText(value, MARGIN + CONTENT_WIDTH - fontBold.widthOfTextAtSize(value, 11), 11, fontBold, colors.dark);
    y -= 20;
  }

  y -= 8;
  drawLine(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y -= 28;

  const drawTableSection = (
    title: string,
    columns: { label: string; width: number; align?: "left" | "right" }[],
    rows: string[][],
    emptyMessage: string,
  ) => {
    ensureSpace(40);
    drawText(title, MARGIN, 13, fontBold, colors.dark);
    y -= 20;

    const tableWidth = columns.reduce((sum, col) => sum + col.width, 0);
    const headerHeight = 22;

    const drawTableHeader = () => {
      ensureSpace(headerHeight + 10);
      page.drawRectangle({
        x: MARGIN,
        y: y - headerHeight,
        width: tableWidth,
        height: headerHeight,
        color: rgb(0.95, 0.97, 0.98),
      });

      let colX = MARGIN + 8;
      for (const col of columns) {
        const textWidth = fontBold.widthOfTextAtSize(col.label, 9);
        const x =
          col.align === "right" ? colX + col.width - textWidth - 8 : colX;
        page.drawText(col.label, {
          x,
          y: y - 15,
          size: 9,
          font: fontBold,
          color: colors.muted,
        });
        colX += col.width;
      }
      y -= headerHeight;
    };

    drawTableHeader();

    if (rows.length === 0) {
      ensureSpace(20);
      drawText(emptyMessage, MARGIN + 8, 10, fontRegular, colors.muted);
      y -= 28;
      return;
    }

    for (const row of rows) {
      ensureSpace(20);
      if (y <= MARGIN + 30) {
        drawTableHeader();
      }

      let colX = MARGIN + 8;
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const cell = row[i] ?? "";
        const textWidth = fontRegular.widthOfTextAtSize(cell, 10);
        const x = col.align === "right" ? colX + col.width - textWidth - 8 : colX;
        page.drawText(cell, {
          x,
          y: y - 14,
          size: 10,
          font: fontRegular,
          color: colors.text,
        });
        colX += col.width;
      }

      y -= 20;
      drawLine(MARGIN, y + 6, MARGIN + tableWidth, y + 6);
    }

    y -= 16;
  };

  const creditRows = [...data.credits]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((credit) => [
      formatDate(credit.createdAt),
      formatCurrency(credit.amount),
      credit.note || "-",
    ]);

  drawTableSection(
    "Credit History",
    [
      { label: "Date", width: 120 },
      { label: "Amount", width: 120, align: "right" },
      { label: "Note", width: CONTENT_WIDTH - 240 },
    ],
    creditRows,
    "No credit records found.",
  );

  const paymentRows = [...data.payments]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((payment) => [formatDate(payment.createdAt), formatCurrency(payment.amount)]);

  drawTableSection(
    "Payment History",
    [
      { label: "Date", width: 200 },
      { label: "Amount", width: CONTENT_WIDTH - 200, align: "right" },
    ],
    paymentRows,
    "No payment records found.",
  );

  // Footer
  ensureSpace(36);
  y -= 8;
  drawLine(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y -= 18;
  drawText(`Generated on ${formatDate(data.generatedAt)}`, MARGIN, 9, fontRegular, colors.muted);
  y -= 14;
  const footerText = `${data.shopName || "LenDen"} - Credit & Payment Management`;
  drawText(
    footerText,
    MARGIN + CONTENT_WIDTH - fontRegular.widthOfTextAtSize(footerText, 9),
    9,
    fontRegular,
    colors.muted,
  );

  return pdfDoc.save();
}
