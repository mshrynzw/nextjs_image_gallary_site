"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { InfoModal } from "./InfoModal";

export function Header() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="relative flex items-center justify-center">
            <Link
              href="/"
              className="text-center text-2xl font-serif hover:opacity-80"
            >
              Gallery by mshrynzw
            </Link>
            <button
              onClick={() => setIsInfoModalOpen(true)}
              className="absolute right-0 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
              aria-label="情報を表示"
            >
              <HelpCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
}
