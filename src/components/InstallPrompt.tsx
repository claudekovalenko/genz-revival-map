import { useEffect, useState } from "react";

/**
 * "Install app" affordance.
 *
 * Chrome/Edge/Android fire `beforeinstallprompt`, which lets us trigger the
 * native install flow from a button. iOS Safari has no equivalent API — the
 * user has to go through Share → Add to Home Screen — so there we show the
 * instructions instead. If the app is already installed (running standalone),
 * nothing renders at all.
 */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "revival-map-install-dismissed";

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    // iOS gets the manual instructions; everyone else waits for the event.
    if (isIos()) {
      setHidden(false);
      return;
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
      setHidden(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const onInstalled = () => setHidden(true);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (hidden) return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setHidden(true);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setHidden(true);
    setDeferred(null);
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(28rem,calc(100vw-2rem))]">
      <div className="bg-white dark:bg-[#1b1c22] border border-black/10 dark:border-white/15 rounded-xl shadow-lg px-4 py-3">
        {showIosHelp ? (
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-semibold">Add to your Home Screen</div>
            <p className="text-xs text-black/70 dark:text-white/60 leading-relaxed">
              Tap the <strong>Share</strong> button in Safari's toolbar, then choose{" "}
              <strong>Add to Home Screen</strong>. It will open full-screen like an app and work offline.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="self-start text-xs underline text-black/50 dark:text-white/40 mt-1"
            >
              Got it
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}icon-192.png`}
              alt=""
              className="w-9 h-9 rounded-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold leading-tight">Install Revival Map</div>
              <div className="text-xs text-black/60 dark:text-white/50 leading-tight mt-0.5">
                Add it to your phone — opens full screen, works offline.
              </div>
            </div>
            <button
              type="button"
              onClick={() => (isIos() ? setShowIosHelp(true) : install())}
              className="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-black text-white dark:bg-white dark:text-black"
            >
              Install
            </button>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="shrink-0 text-black/40 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 px-1 text-lg leading-none"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
