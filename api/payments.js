const { Paynow } = require("paynow");

const paynow = new Paynow("25025", process.env.PAYNOW_KEY);

paynow.resultUrl = "https://rif-app.vercel.app/api/payment";
paynow.returnUrl = "https://rif-app.vercel.app";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, phone, amount, item, method } = req.body;
  console.log("Payment request:", { email, phone, amount, item, method });
  console.log("Using Paynow key:", process.env.PAYNOW_KEY ? "Key exists" : "NO KEY FOUND");
  try {
    const payment = paynow.createPayment(`RIF-${Date.now()}`, "masundajade@gmail.com");
    payment.add(item, parseFloat(amount));

    if (method === "ecocash" || method === "onemoney") {
      const response = await paynow.sendMobile(payment, phone, method);
      if (response.success) {
        return res.status(200).json({
          success: true,
          instructions: response.instructions,
          pollUrl: response.pollUrl,
        });
      } else {
        return res.status(400).json({ success: false, error: response.error });
      }
    } else {
      const response = await paynow.send(payment);
      if (response.success) {
        return res.status(200).json({
          success: true,
          redirectUrl: response.redirectUrl,
          pollUrl: response.pollUrl,
        });
      } else {
        return res.status(400).json({ success: false, error: response.error });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};