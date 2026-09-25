import express from "express";
import qr from "qr-image";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>QR Code Generator</title>
      <style>
        body {
          font-family: Arial;
          text-align: center;
          padding: 50px;
          background: #f4f4f4;
        }
        input, button {
          padding: 12px;
          margin: 10px;
        }
      </style>
    </head>
    <body>
      <h1>QR Code Generator</h1>
      <form action="/generate" method="POST">
        <input name="url" type="url"
          placeholder="Enter a URL" required>
        <button type="submit">Generate QR</button>
      </form>
    </body>
    </html>
  `);
});

app.post("/generate", (req, res) => {
  const url = req.body.url;
  const qrImage = qr.image(url, { type: "png" });

  res.setHeader("Content-Type", "image/png");
  qrImage.pipe(res);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});