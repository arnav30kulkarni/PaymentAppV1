import { useEffect, useState } from "react";

const NewAppbar = () => {
    const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <header className="flex h-20 w-full items-center gap-4 border-b border-(--color-border)/20 bg-(--color-bg) px-4 shadow-sm sm:px-8">
            <div className="flex shrink-0 items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-(--color-accent) shadow-[0_8px_20px_rgba(56,186,128,0.25)]">
                    <span className="text-xl font-black text-white">P</span>
                </div>
                <h1 className="text-lg font-bold leading-none tracking-tight text-(--text-primary)">PayFlow</h1>
            </div>

            <div className="mx-auto flex min-w-0 max-w-xl flex-1 items-center">
                <label className="relative block w-full">
                    <span className="sr-only">Search</span>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-(--text-secondary)">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="search" placeholder="Search" className="w-full rounded-xl border border-(--color-border)/25 bg-(--color-bg-secondary) py-2.5 pl-10 pr-4 text-sm text-(--text-primary) outline-none transition focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20" />
                </label>
            </div>

            <div className="flex shrink-0 items-center gap-2">
                <button type="button" aria-label="Notifications" title="Notifications" className="grid size-10 place-items-center rounded-xl text-(--text-secondary) transition hover:bg-(--color-accent)/10 hover:text-(--text-primary)">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022 23.848 23.848 0 0 0 5.454 1.31m5.713 0a24.255 24.255 0 0 1-5.713 0m5.713 0a3 3 0 1 1-5.713 0" />
                    </svg>
                </button>
                <button type="button" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setIsDark((currentValue) => !currentValue)} className="grid size-10 place-items-center rounded-xl text-(--text-secondary) transition hover:bg-(--color-accent)/10 hover:text-(--text-primary)">
                    {isDark ? "☀" : "☾"}
                </button>
                <button type="button" aria-label="User profile" title="User profile" className="grid size-10 place-items-center rounded-full bg-(--color-primary) text-sm font-bold text-white transition hover:opacity-80">
                    U
                </button>
            </div>
        </header>
    )
}

export default NewAppbar;