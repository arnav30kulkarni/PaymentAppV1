import { useState } from "react"
import NewSignIn from "./newSignin"

const NewLanding = ()=>{

    const [signIn,setSignIn] = useState(false)
    
 return(
        <main className="min-h-screen overflow-hidden bg-[#f4f7f3] text-(--color-primary)">

            {signIn && <NewSignIn onClose={() => setSignIn(false)} />}
            
            <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-5 sm:px-10 lg:px-14">
                <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#d9f2df] blur-3xl" />
                <header className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-(--color-accent) shadow-[0_8px_20px_rgba(56,186,128,0.25)]">
                            <span className="text-xl font-black text-white">P</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-none tracking-tight">PayFlow</h1>
                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-secondary)">Move freely</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-[#cce6d4] bg-white/80 px-3 py-1.5 text-xs font-semibold text-(--text-accent-hover) shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-(--color-positive) shadow-[0_0_0_3px_#d9f2df]" />
                        v2 live
                    </div>
                </header>

                <section className="relative grid items-center gap-14 pb-8 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-20 lg:pt-28">
                    <div className="max-w-2xl">
                        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-(--text-accent-hover)">
                            <span className="h-px w-8 bg-(--color-accent)" />
                            Payments, simplified
                        </p>
                        <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-7xl">
                            Fast, secure
                            <br />
                            payments for
                            <br />
                            <span className="text-(--text-accent)">everyone.</span>
                        </h2>
                        <p className="mt-7 max-w-md text-base leading-7 text-(--text-secondary) sm:text-lg">
                            Send money, split bills, and keep your everyday finances moving from one beautifully simple place.
                        </p>
                        <div className="mt-9 flex flex-wrap items-center gap-3">
                            <button type="button" onClick={() => setSignIn((currentSignIn) => !currentSignIn)} className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(20,20,20,0.16)] transition-transform hover:-translate-y-0.5">
                                Get started <span className="ml-2">-&gt;</span>
                            </button>
                            <button type="button" className="rounded-full border border-[#cbd7ce] bg-white/70 px-6 py-3 text-sm font-bold text-(--color-primary) transition-colors hover:bg-white">
                                See how it works
                            </button>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-md">
                        <div className="absolute -inset-5 rounded-[2.5rem] bg-[#dcefe0] opacity-70 blur-2xl" />
                        <div className="relative rotate-2 rounded-4xl bg-(--color-primary) p-6 text-white shadow-[0_24px_55px_rgba(20,20,20,0.22)] transition-transform hover:rotate-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-white/60">Available balance</p>
                                    <p className="mt-2 text-4xl font-black tracking-tight">₹22,840<span className="text-2xl text-white/60">.50</span></p>
                                </div>
                                <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-(--text-accent)">+12.8%</div>
                            </div>
                            <div className="mt-12 flex items-end justify-between">
                                <div className="flex -space-x-2">
                                    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-(--color-primary) bg-[#f5b5a5] text-xs font-bold text-(--color-primary)">A</span>
                                    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-(--color-primary) bg-[#9bc9ef] text-xs font-bold text-(--color-primary)">M</span>
                                    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-(--color-primary) bg-(--color-accent) text-xs font-bold text-(--color-primary)">+4</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -left-8 rounded-2xl border border-[#d9e8dc] bg-white p-4 shadow-[0_12px_30px_rgba(20,20,20,0.1)]">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-(--text-secondary)">Latest transfer</p>
                            <p className="mt-1 text-sm font-bold"> Radhesh Varma <span className="ml-3 text-(--color-positive)">+₹120.00</span></p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
 )
}

export default NewLanding