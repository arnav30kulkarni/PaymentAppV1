import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("theme", "light");
    document.documentElement.dataset.theme = "light";
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Log out"
      title="Log out"
      className="grid size-10 place-items-center rounded-xl text-(--text-secondary) transition hover:bg-(--color-negative)/10 hover:text-(--color-negative)"
    >
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3H9m0 0 3-3m-3 3 3 3" />
      </svg>
    </button>
  );
};

export default LogoutButton;
