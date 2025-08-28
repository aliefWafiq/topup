import FontAwesomeConfig from "@/app/fontawesome";
import "@/app/globals.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <FontAwesomeConfig />
      </head>
      <body className={`antialiased`}>
            <main className="px-6">landing page</main>
      </body>
    </html>
  );
}
