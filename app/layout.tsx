import "@/app/globals.css";
import AuthProvider from "@/app/authProvider";
import FontAwesomeConfig from "@/app/fontawesome";

export const metadata = {
  title: "TopUp",
};

const MIDTRANS_DOMAINS = [
  "https://app.sandbox.midtrans.com",
  "https://api.sandbox.midtrans.com",
  "https://snap-popup-app.sandbox.midtrans.com",
  "https://snap-popup.sandbox.midtrans.com",
  "https://snap-assets.al-pc-id-b.cdn.gtflabs.io"
];

const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'", 
  ...MIDTRANS_DOMAINS
].join(" ");

const styleSrc = [
  "'self'",
  "'unsafe-inline'",
  "https://snap-assets.al-pc-id-b.cdn.gtflabs.io"
].join(" ");

const connectSrc = [
  "'self'",
  ...MIDTRANS_DOMAINS,
  "https://gwk.gopayapi.com"
].join(" ");

const frameSrc = [
  "'self'",
  "https://app.sandbox.midtrans.com",
  "https://snap-popup-app.sandbox.midtrans.com"
].join(" ");

const csp = `
  default-src 'self';
  script-src ${scriptSrc};
  style-src ${styleSrc};
  connect-src ${connectSrc};
  frame-src ${frameSrc};
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
`.replace(/\s+/g, " ").trim();

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="id">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
