import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipToContent } from "@/components/SkipToContent";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme accentColor="blue" radius="medium">
      <div className="min-h-screen flex flex-col bg-gray-50">
        <SkipToContent />
        <Header />
        {children}
        <Footer />
        <AccessibilityToolbar />
      </div>
    </Theme>
  );
}
