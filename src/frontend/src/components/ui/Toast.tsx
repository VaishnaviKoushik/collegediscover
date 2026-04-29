import { Toaster } from "./sonner";

// Re-export toast from sonner for convenient use throughout the app
export { toast } from "sonner";

// Drop-in Toaster wrapper — render once in App/Layout
export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-card text-foreground border border-border shadow-lg rounded-xl font-body text-sm",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  );
}
