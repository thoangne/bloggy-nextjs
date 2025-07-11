import "./globals.css";
import { Sora } from "next/font/google";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});
export const metadata = {
  title: "Bloggy",
  description: "Read Write Learn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title> {metadata?.title}</title>
        <meta name="description" content={metadata?.description} key="desc" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${sora?.className} antialiased bg-gradient-to-b
      from-[#141414] to-[#000000] text-white  relative `}
      >
        {children}
      </body>
    </html>
  );
}
