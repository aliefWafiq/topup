import "@/app/globals.css";
import AuthProvider from "@/app/authProvider";

export const metadata = {
  title: "Auth Layout",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div className="bg-gray-100">
          <div className="flex items-center justify-center px-6 py-8 mx-auto h-screen">
            <div className="w-full flex felx-col justify-center items-center bg-white rounded-lg shadow mt-0 max-w-md">
              <AuthProvider>{children}</AuthProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default AuthLayout;
