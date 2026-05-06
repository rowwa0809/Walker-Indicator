import "./globals.css";
import TVWidget from "@/components/TVWidget";

export const metadata = {
  title: "Walker Indicator | Macro Radar for Options Traders",
  description:
    "Macro radar and narrative intelligence for options traders. Real-time macro signals, smarter options positioning."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="global-ticker" aria-label="Live market ticker">
          <TVWidget type="ticker" />
        </div>
        {children}
      </body>
    </html>
  );
}
