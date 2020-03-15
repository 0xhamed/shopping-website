module.exports = {
  port: process.env.PORT,
  db_URI: process.env.db_URI,
  session_secret: process.env.session_secret,
  paypal_mode: process.env.paypal_mode,
  paypal_client_id: process.env.paypal_client_id,
  paypal_client_secret: process.env.paypal_client_secret,
  WEB_URL: process.env.WEB_URL // eg. http://localhost:3000  ===>> notice no / at the end
};
