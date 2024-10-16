"use client";

import { AuthDialog } from "@/components/auth-dialog";
import { Chat } from "@/components/chat";
import { ChatInput } from "@/components/chat-input";
import { ChatPicker } from "@/components/chat-picker";
import { NavBar } from "@/components/NavBar";
import { AuthViewType, useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import modelsList from "@/lib/models.json";
import templates from "@/lib/templates";
import { ChatSettings } from "@/components/chat-settings";
import { LLMModelConfig } from "@/lib/models";

export default function Home() {
  const [isAuthDialogOpen, setIsAuthDialog] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in");
  const { session } = useAuth(setIsAuthDialog, setAuthView);
  const [chatInput, setChatInput] = useLocalStorage("chat", "");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<"auto">("auto");
  const [languageModel, setLanguageModel] = useLocalStorage("languageModel", {
    model: "gpt-4o-mini",
  });

  function logout() {
    if (supabase) {
      supabase.auth.signOut();
    } else {
      console.warn("Supabase is not initialized");
    }
  }

  function handleLanguageModelChange(e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e });
  }

  return (
    <main className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setIsAuthDialog}
          view={authView}
          supabase={supabase}
        />
      )}
      <div className="grid w-full md:grid-cols-2">
        <div className="flex flex-col w-full max-w-[800px] mx-auto px-4 overflow-auto col-span-2">
          <NavBar
            session={session}
            showLogin={() => setIsAuthDialog(true)}
            signOut={logout}
          />
          <Chat />
          <ChatInput
            isLoading={false}
            input={chatInput}
            handleInputChange={() => { }}
            handleSubmit={() => { }}
            handleFileChange={setFiles}
            files={files}
            error={undefined}
            retry={() => { }}
            isMultiModal={false}
            stop={() => { }}
          >
            <ChatPicker models={modelsList.models} templates={templates} />

            <ChatSettings
              languageModel={languageModel}
              onLanguageModelChange={handleLanguageModelChange}
              apiKeyConfigurable={true}
              baseURLConfigurable={true}
            />
          </ChatInput>
        </div>
      </div>
    </main>
  );
}
