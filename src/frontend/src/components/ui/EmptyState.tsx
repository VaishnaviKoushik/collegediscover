import type React from "react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    ocid?: string;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
      data-ocid="empty_state"
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          data-ocid={action.ocid ?? "empty_state.cta.button"}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
