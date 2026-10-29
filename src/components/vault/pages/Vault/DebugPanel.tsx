import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DebugPanelProps {
  userId: string;
  currentSalt: string | null;
  masterKey: CryptoKey | null;
  hasVaultBlob: boolean;
}

export default function DebugPanel({ userId, currentSalt, masterKey, hasVaultBlob }: DebugPanelProps) {
  return (
    <Card className="border-yellow-500/50 bg-yellow-500/10">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-mono text-yellow-600 dark:text-yellow-400">
          🐞 Debug Panel (KDF & Vault State)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs font-mono space-y-1">
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>KDF Salt in State:</strong> {currentSalt ?? "NULL (Needs Setup)"}</p>
        <p><strong>Master Key in RAM:</strong> {masterKey ? "LOADED (Unlocked)" : "NULL (Locked)"}</p>
        <p><strong>Has Encrypted Vault Blob:</strong> {hasVaultBlob ? "YES" : "NO"}</p>
      </CardContent>
    </Card>
  );
}