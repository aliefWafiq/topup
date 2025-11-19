import "@/app/globals.css";
import AuthProvider from "@/app/authProvider";

export const metadata = {
  title: "TopUp",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default AuthLayout;