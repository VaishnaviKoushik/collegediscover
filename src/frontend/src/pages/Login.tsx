import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Fingerprint,
  Lock,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/auth";

const II_BENEFITS = [
  "No passwords to remember or leak",
  "Uses your device's biometrics (Face ID, fingerprint, security key)",
  "Your identity is never shared with third parties",
  "Works across all Internet Computer apps",
];

export default function Login() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const search = useSearch({ strict: false }) as { returnUrl?: string };
  const returnUrl = (search?.returnUrl ?? "/saved") as "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: returnUrl });
    }
  }, [isAuthenticated, navigate, returnUrl]);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-muted/20"
      data-ocid="login.page"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

          <div className="px-8 py-10 flex flex-col items-center gap-6">
            {/* Icon cluster */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-card">
                <Lock className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Welcome to CollegeDiscover
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Sign in with Internet Identity to save colleges and access your
                personalized list
              </p>
            </div>

            {/* Login CTA */}
            <Button
              size="lg"
              className="w-full text-base font-semibold gap-2.5 h-12 transition-smooth"
              onClick={login}
              disabled={isLoading}
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <Fingerprint className="w-5 h-5" />
                  Sign In with Internet Identity
                </>
              )}
            </Button>

            {/* Privacy note */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl px-4 py-3 w-full">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/70" />
              <span>
                Your saved colleges are{" "}
                <strong className="text-foreground">private</strong> and tied to
                your identity — only you can see them.
              </span>
            </div>

            {/* What is Internet Identity — collapsible */}
            <div className="w-full border border-border rounded-xl overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-smooth"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                data-ocid="login.ii_explainer.toggle"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary/70" />
                  What is Internet Identity?
                </span>
                {expanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {expanded && (
                <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20 space-y-3">
                  <p>
                    <strong className="text-foreground">
                      Internet Identity
                    </strong>{" "}
                    is a privacy-preserving authentication system built on the
                    Internet Computer blockchain.
                  </p>
                  <ul className="space-y-1.5">
                    {II_BENEFITS.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Skip link */}
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth underline-offset-4 hover:underline"
              data-ocid="login.skip.link"
            >
              Continue without signing in →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
