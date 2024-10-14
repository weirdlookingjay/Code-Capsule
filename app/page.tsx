"use client";

import { AuthDialog } from "@/components/auth-dialog";
import { AuthViewType } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Home() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(true);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in")
  return (
    <main className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog open={isAuthDialogOpen} setOpen={setIsAuthDialogOpen} view={authView} supabase={supabase} />
      )}
      <div className="grid -wfull md:grid-cols-2">
        <div></div>
      </div>
    </main>
  );
}
