"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  House,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  CornerDownLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { PageKey } from "./page";

interface CommandItem {
  id: PageKey;
  label: string;
  description: string;
  icon: React.ElementType;
  shortcut?: string;
}

const commands: CommandItem[] = [
  {
    id: "home",
    label: "Home",
    description: "Go to homepage",
    icon: House,
  },
  {
    id: "about",
    label: "About",
    description: "Learn about Muhammad Zain",
    icon: User,
  },
  {
    id: "experience",
    label: "Experience",
    description: "View work experience",
    icon: Briefcase,
  },
  {
    id: "projects",
    label: "Projects",
    description: "See professional highlights",
    icon: FolderOpen,
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch",
    icon: Mail,
  },
];

interface CommandPaletteProps {
  onNavigate: (page: PageKey) => void;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.id.toLowerCase().includes(q)
    );
  });

  // Derive active index: clamp to filtered list length, reset on query change
  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  const handleSelect = useCallback(
    (id: PageKey) => {
      onNavigate(id);
      setOpen(false);
      setQuery("");
    },
    [onNavigate]
  );

  // Keyboard shortcut: Cmd+K / Ctrl+K / "/" when no input focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // "/" key only when no input/textarea is focused
      if (e.key === "/" && !open) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        setOpen(true);
        return;
      }

      // Cmd+K / Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure dialog has mounted
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Keyboard navigation within the dialog
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[safeIndex]) {
          handleSelect(filtered[safeIndex].id);
        }
      }
    },
    [filtered, safeIndex, handleSelect]
  );

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setQuery(""); }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg p-0 gap-0 overflow-hidden bg-surface-elevated border-surface-border rounded-xl"
      >
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search and navigate between pages
        </DialogDescription>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-surface-border px-4 py-3">
          <Search className="size-4 text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-sm outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-surface-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-72 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((cmd) => {
                const isActive = filtered[safeIndex]?.id === cmd.id;
                const Icon = cmd.icon;
                return (
                  <motion.button
                    key={cmd.id}
                    layout
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleSelect(cmd.id)}
                    onMouseEnter={() =>
                      setActiveIndex(filtered.indexOf(cmd))
                    }
                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors duration-100 ${
                      isActive
                        ? "bg-[#10b981]/10 text-text-primary"
                        : "text-text-primary hover:bg-surface-border/50"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center size-8 rounded-lg shrink-0 ${
                        isActive
                          ? "bg-[#10b981]/15 text-[#10b981]"
                          : "bg-surface-border/60 text-text-muted"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{cmd.label}</div>
                      <div className="text-xs text-text-muted truncate">
                        {cmd.description}
                      </div>
                    </div>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-text-muted"
                      >
                        <CornerDownLeft className="size-3.5" />
                      </motion.span>
                    )}
                  </motion.button>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-8 text-center text-sm text-text-muted"
              >
                <Search className="size-6 mx-auto mb-2 opacity-40" />
                <p>No pages found for &quot;{query}&quot;</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard hints footer */}
        <div className="flex items-center justify-between border-t border-surface-border px-4 py-2 text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center rounded border border-surface-border bg-background px-1 py-0.5 text-[10px] font-medium">
                ↑↓
              </kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center rounded border border-surface-border bg-background px-1 py-0.5 text-[10px] font-medium">
                ↵
              </kbd>
              <span>open</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center rounded border border-surface-border bg-background px-1 py-0.5 text-[10px] font-medium">
              /
            </kbd>
            <span>to toggle</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
