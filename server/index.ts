import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
    const app = express();
    const server = createServer(app);

    app.use(cors());
    app.use(express.json());

    // 1. Nodemailer Transporter (Zilber - Gmail Setup)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER, // uzairkhantaken1234@gmail.com
            pass: process.env.SMTP_PASS, // Aapka 16-digit Google App Password
        },
    });

    // 2. Zilber Order API route
    app.post("/api/send-email", async (req, res) => {
        const { customer, items, total } = req.body;

        // Items list ko HTML table mein convert karna
        const itemsHtml = items.map((item: any) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">${item.name}</td>
        <td style="padding: 10px; text-align: center;">${item.size || 'N/A'}</td>
        <td style="padding: 10px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

        try {
            console.log("Attempting to send Zilber order email...");

            const info = await transporter.sendMail({
                from: `"Zilber Store" <${process.env.SMTP_USER}>`,
                to: process.env.CONTACT_EMAIL, // uzairkhantaken1234@gmail.com
                subject: `New Zilber Order: ${customer.name} - Rs. ${total.toLocaleString()}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; padding: 20px;">
            <h2 style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">ZILBER NEW ORDER</h2>
            
            <h3>Customer Details</h3>
            <p><b>Name:</b> ${customer.name}</p>
            <p><b>Phone:</b> ${customer.phone}</p>
            <p><b>City:</b> ${customer.city}</p>
            <p><b>Address:</b> ${customer.address}</p>

            <h3 style="margin-top: 25px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f8f8;">
                  <th style="text-align: left; padding: 10px;">Product</th>
                  <th style="padding: 10px;">Size</th>
                  <th style="padding: 10px;">Qty</th>
                  <th style="text-align: right; padding: 10px;">Price</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <div style="margin-top: 20px; text-align: right; font-size: 18px; font-weight: bold;">
              Grand Total: Rs. ${total.toLocaleString()}
            </div>
          </div>
        `,
            });

            console.log("Zilber Order Email sent:", info.messageId);
            res.status(200).json({ success: true });
        } catch (err) {
            console.error("NodeMailer Error (Zilber):", err);
            res.status(500).json({
                success: false,
                message: "Failed to send order email.",
                error: err instanceof Error ? err.message : String(err)
            });
        }
    });

    // 3. Static files configuration
    const staticPath =
        process.env.NODE_ENV === "production"
            ? path.resolve(__dirname, "public")
            : path.resolve(__dirname, "..", "dist", "public");

    app.use(express.static(staticPath));

    app.get("*", (_req, res) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Zilber Server running on http://localhost:${port}/`);
    });
}

startServer().catch(console.error);