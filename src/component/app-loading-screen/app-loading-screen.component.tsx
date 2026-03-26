const AppLoadingScreen = () => (
  <div className="flex min-h-screen w-full items-center justify-center bg-[var(--cream)] px-6 text-[var(--dark)]">
    <div className="flex max-w-md flex-col items-center text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-[var(--border)]" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[var(--amber)]" />
        <span className="font-['Playfair_Display'] text-2xl font-black tracking-[-0.03em]">
          DG
        </span>
      </div>

      <div className="font-['Playfair_Display'] text-3xl font-black tracking-[-0.03em]">
        Dish <em className="text-[var(--amber)]">Galeria</em>
      </div>

      <p className="mt-3 text-sm font-light text-[var(--muted)]">
        Loading your recipes and preparing the app.
      </p>
    </div>
  </div>
);

export default AppLoadingScreen;
