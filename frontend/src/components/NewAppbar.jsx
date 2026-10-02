import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutButton from "./LogoutButton";

const NewAppbar = () => {
    const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const notificationRef = useRef(null);
    const bellButtonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    const getRecentNotifications = async (token) => {
        if (!token) {
            setNotifications([]);
            return;
        }

        try {
            const response = await axios.get("http://localhost:4500/api/v1/account/recent", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(response.data.transactions || []);
        } catch {
            setNotifications([]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const loadDashboardData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:4500/api/v1/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(userResponse.data);
            } catch {
                setUser(null);
            }

            await getRecentNotifications(token);
        };

        void loadDashboardData();
    }, []);

    useEffect(() => {
        if (!notificationsOpen) return;

        const handleClickOutside = (event) => {
            const clickedOutsideMenu = notificationRef.current && !notificationRef.current.contains(event.target);
            const clickedOutsideButton = bellButtonRef.current && !bellButtonRef.current.contains(event.target);

            if (clickedOutsideMenu && clickedOutsideButton) {
                setNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [notificationsOpen]);

    const initials = user ? `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}` : "U";
    const formatNotificationDate = (date) => new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));

    return (
        <header className="flex h-20 w-full items-center gap-4 border-b border-(--color-border)/20 bg-(--color-bg) px-4 shadow-sm sm:px-8">
            <button type="button" onClick={() => navigate("/newdashboard")} className="flex shrink-0 items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-(--color-accent) shadow-[0_8px_20px_rgba(56,186,128,0.25)]">
                    <span className="text-xl font-black text-white">P</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-none tracking-tight text-(--text-primary)">PayFlow</h1>
                    <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-amber-600">Simulation</span>
                </div>
            </button>

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
                <div className="notification-control">
                <button ref={bellButtonRef} type="button" aria-label="Notifications" title="Notifications" onClick={() => {
                    setNotifications([]);
                    setNotificationsOpen((isOpen) => !isOpen);
                }} className="relative grid size-10 place-items-center rounded-xl text-(--text-secondary) transition hover:bg-(--color-accent)/10 hover:text-(--text-primary)">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022 23.848 23.848 0 0 0 5.454 1.31m5.713 0a24.255 24.255 0 0 1-5.713 0m5.713 0a3 3 0 1 1-5.713 0" />
                    </svg>
                    {notifications.length > 0 && <span className="notification-badge">{notifications.length > 9 ? "9+" : notifications.length}</span>}
                </button>
                {notificationsOpen && <div ref={notificationRef} className="notification-menu">
                    <div className="notification-menu-heading"><strong>Payment notifications</strong><span>{notifications.length} recent</span></div>
                    {notifications.length === 0 ? <p className="notification-empty">No payment activity yet.</p> : notifications.slice(0, 4).map((notification) => {
                        const isCredit = notification.type === "Credit";
                        const counterparty = notification.counterparty;
                        const name = counterparty ? `${counterparty.firstname ?? ""} ${counterparty.lastname ?? ""}`.trim() || "PayFlow user" : "PayFlow user";
                        return <div className="notification-item" key={String(notification.id ?? notification._id)}>
                            <span className={`notification-dot ${isCredit ? "credit" : "debit"}`}>{isCredit ? "+" : "-"}</span>
                            <span className="notification-copy"><strong>{isCredit ? "Payment received" : "Payment sent"}</strong><small>{isCredit ? `From ${name}` : `To ${name}`} · {formatNotificationDate(notification.createdAt)}</small></span>
                            <strong className={isCredit ? "notification-credit" : ""}>{isCredit ? "+" : "-"}₹{Number(notification.amount).toFixed(2)}</strong>
                        </div>;
                    })}
                </div>}
                </div>
                <button type="button" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setIsDark((currentValue) => !currentValue)} className="grid size-10 place-items-center rounded-xl text-(--text-secondary) transition hover:bg-(--color-accent)/10 hover:text-(--text-primary)">
                    {isDark ? "☀" : "☾"}
                </button>
                <button type="button" aria-label="User profile" title="User profile" onClick={() => navigate("/profile")} className="grid size-10 overflow-hidden rounded-full bg-(--color-primary) text-sm font-bold text-white transition hover:opacity-80">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Your profile" className="size-full object-cover" />
                    ) : (
                        initials
                    )}
                </button>
                <LogoutButton />
            </div>
        </header>
    )
}

export default NewAppbar;