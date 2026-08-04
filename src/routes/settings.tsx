import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { deleteEntry, useHistory } from "@/lib/history";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — NewsVision AI" },
      {
        name: "description",
        content: "Manage appearance and clear the article drafts stored in this browser.",
      },
      { property: "og:title", content: "Settings — NewsVision AI" },
      { property: "og:description", content: "Appearance and local data controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const entries = useHistory();

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold tracking-tight">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Switch between light and dark reading modes.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-sm text-muted-foreground">Toggle theme</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Local data</CardTitle>
          <CardDescription>
            {entries?.length ?? 0} draft{entries?.length === 1 ? "" : "s"} stored in this browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            disabled={!entries?.length}
            onClick={() => {
              entries?.forEach((e) => deleteEntry(e.id));
              toast.success("All drafts cleared");
            }}
          >
            Clear all drafts
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}