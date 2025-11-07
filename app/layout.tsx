import "@/app/globals.css";
import AuthProvider from "@/app/authProvider";
import FontAwesomeConfig from "@/app/fontawesome";

export const metadata = {
  title: "TopUp",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <FontAwesomeConfig />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
