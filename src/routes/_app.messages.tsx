import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { messagesApi } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

export const Route = createFileRoute("/_app/messages")({
  head: () => ({
    meta: [
      { title: "Messages · Azure & Co." },
      { name: "description", content: "Guest, staff and department conversations." },
      { property: "og:title", content: "Messages · Azure & Co." },
      { property: "og:description", content: "Guest, staff and department conversations." },
    ],
  }),
  component: Messages,
});

function Messages() {
  const [threads, setThreads] = useState<Awaited<ReturnType<typeof messagesApi.threads>>>([]);
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    messagesApi.threads().then((t) => {
      setThreads(t);
      setActive(t[0]?.id ?? "");
    });
  }, []);
  const current = threads.find((t) => t.id === active);

  return (
    <>
      <PageHeader eyebrow="Inbox" title="Messages" description="Every conversation, in one calm inbox." />
      <div className="surface grid overflow-hidden md:grid-cols-[320px_1fr]" style={{ minHeight: 560 }}>
        <div className="border-b border-border md:border-b-0 md:border-r">
          <ul className="divide-y divide-border">
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setActive(t.id)}
                  className={`flex w-full items-center gap-3 p-4 text-left transition ${active === t.id ? "bg-secondary/60" : "hover:bg-secondary/30"}`}
                >
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-medium">{t.name}</span>
                      <span className="text-[10px] text-muted-foreground">{t.time}</span>
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{t.last}</div>
                  </div>
                  {t.unread > 0 && (
                    <span className="ml-2 grid size-5 shrink-0 place-items-center rounded-full bg-gold text-[10px] font-medium text-gold-foreground">
                      {t.unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          {current && (
            <>
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Avatar className="size-9">
                  <AvatarImage src={current.avatar} />
                  <AvatarFallback>{current.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{current.name}</div>
                  <div className="text-[11px] text-success">Online</div>
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm">
                  Hello, we're arriving around 3pm today.
                </div>
                <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-primary p-3 text-sm text-primary-foreground">
                  Wonderful — your suite will be ready. Anything special we can arrange?
                </div>
                <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm">
                  {current.last}
                </div>
              </div>
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 pl-3">
                  <input
                    placeholder="Write a reply…"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
