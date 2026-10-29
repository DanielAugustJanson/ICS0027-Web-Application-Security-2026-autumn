"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface UnlockModalProps {
  onUnlock: (masterPassword: string) => Promise<void>;
  isProcessing: boolean;
}

export default function UnlockModal({ onUnlock, isProcessing }: UnlockModalProps) {
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;
    await onUnlock(passwordInput);
    setPasswordInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle>Unlock Vault</CardTitle>
          <CardDescription>Enter your Master Password to decrypt your secrets.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Master Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <Button type="submit" className="w-full cursor-pointer" disabled={isProcessing}>
              {isProcessing ? "Decrypting..." : "Unlock"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}