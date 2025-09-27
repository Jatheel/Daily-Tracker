import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const tabs = [
    { href: "/", label: "Dashboard" },
    { href: "/updates", label: "Updates" },
    { href: "/reminders", label: "Reminders" },
    { href: "/backup", label: "Backup" },
  ];

  return (
    <div className="min-h-full">
      <div className="md:flex md:gap-4">
        {/* Desktop left nav */}
        <nav className="hidden md:block md:w-56 p-4 border-r border-gray-200">
          <p className="text-xl font-semibold mb-4">Daily Tracker</p>
          <ul className="space-y-2">
            {tabs.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className={`block px-3 py-2 rounded-lg ${router.pathname === t.href ? "bg-brand-100 text-brand-800" : "hover:bg-gray-100"}`}>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 w-full md:p-4 pb-20 md:pb-4">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <ul className="grid grid-cols-3">
          {tabs.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className={`block text-center py-3 ${router.pathname === t.href ? "text-brand-700 font-semibold" : "text-gray-700"}`}>
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
