import "@/app/globals.css";
import AuthProvider from "@/app/authProvider";

export const metadata = {
  title: "Auth Layout",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
