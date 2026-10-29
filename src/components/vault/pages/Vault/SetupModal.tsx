"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SetupModalProps {
  onSetup: (masterPassword: string) => Promise<void>;
  isProcessing: boolean;
}

export default function SetupModal({ onSetup, isProcessing }: SetupModalProps) {
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;
    await onSetup(passwordInput);
    setPasswordInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle>Create Master Password</CardTitle>
          <CardDescription>
            You must set a Master Password to encrypt your vault. This key is never stored on our servers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Master Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <Button type="submit" className="w-full cursor-pointer" disabled={isProcessing}>
              {isProcessing ? "Deriving Key..." : "Initialize Vault"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}