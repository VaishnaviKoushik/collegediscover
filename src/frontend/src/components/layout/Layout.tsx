import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  Heart,
  LayoutGrid,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useCompare } from "../../contexts/compare";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const navLinks = [
  { to: "/", label: "Discover", icon: LayoutGrid },
  { to: "/compare", label: "Compare", icon: BookOpen },
  { to: "/saved", label: "Saved", icon: Heart },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const { selectedColleges, canCompare } = useCompare();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-primary hover:opacity-80 transition-smooth"
            data-ocid="nav.logo.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span>CollegeDiscover</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  data-ocid={`nav.${label.toLowerCase()}.link`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {label === "Compare" && selectedColleges.length > 0 && (
                    <Badge
                      variant="default"
                      className="h-4 w-4 p-0 text-[10px] flex items-center justify-center rounded-full"
                    >
                      {selectedColleges.length}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth + mobile menu */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden md:flex items-center gap-2"
                data-ocid="nav.logout.button"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoading}
                className="hidden md:flex items-center gap-2"
                data-ocid="nav.login.button"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            )}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  data-ocid={`nav.mobile.${label.toLowerCase()}.link`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {label === "Compare" && selectedColleges.length > 0 && (
                    <Badge variant="default" className="ml-auto text-xs">
                      {selectedColleges.length}
                    </Badge>
                  )}
                </Link>
              );
            })}
            <Separator className="my-2" />
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
                data-ocid="nav.mobile.logout.button"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-smooth"
                data-ocid="nav.mobile.login.button"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Internet Identity
              </button>
            )}
          </div>
        )}

        {/* Compare bar when colleges selected */}
        {selectedColleges.length > 0 && (
          <div className="bg-primary/5 border-t border-primary/20 px-4 py-2 flex items-center justify-between gap-4">
            <span className="text-sm text-primary font-medium">
              {selectedColleges.length} college
              {selectedColleges.length > 1 ? "s" : ""} selected for comparison
            </span>
            <Link to="/compare">
              <Button
                size="sm"
                disabled={!canCompare}
                className="h-7 text-xs"
                data-ocid="nav.compare_bar.button"
              >
                Compare Now
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-primary font-display font-bold">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-primary-foreground" />
              </div>
              CollegeDiscover
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
