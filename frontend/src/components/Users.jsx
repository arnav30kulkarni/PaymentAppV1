import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GetRandomColor from "./AvatarColor";
import useDebounce from "../hooks/useDebounce";

const Users = () => {
  const token=localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const debouncedFilter = useDebounce(filter, 400);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/v1/user/bulk?filter=" + debouncedFilter,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response) => {
        const usersWithColor = (response.data.users || []).map((user) => ({
          ...user,
          color: GetRandomColor(),
        }));

        setUsers(usersWithColor);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, [debouncedFilter, token]);

  return (
    <div className="users-directory">
      <div className="users-directory-heading">
        <div><h2>People</h2><span>{users.length} available {users.length === 1 ? "recipient" : "recipients"}</span></div>
        <span className="users-secure-mark">● Secure directory</span>
      </div>
      <div className="users-search-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          onChange={(e) => setFilter(e.target.value)}
          className="users-search"
          placeholder="Search by first or last name"
        />
      </div>

      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <User key={user.id || user._id} user={user} />
          ))
        ) : (
          <div className="users-empty"><strong>No recipients found</strong><span>Try a different name or clear your search.</span></div>
        )}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const firstName = user?.firstname || "";
  const lastName = user?.lastname || "";
  const initial = firstName ? firstName[0].toUpperCase() : "?";

  return (
    <div className="user-row">
      <div className="user-identity">
        <div className={`user-avatar ${user.color}`}>
          {user.profilePicture ? <img src={user.profilePicture} alt={`${firstName} ${lastName}`} /> : <div>{initial}</div>}
        </div>
        <div className="user-copy">
          <strong>{firstName} {lastName}</strong>
          <span>{user.username}</span>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            navigate(
              "/send?id=" +
                (user.id || user._id) +
                "&name=" +
                firstName +
                " " +
                lastName
            );
          }}
          text="Pay"
        />
      </div>
    </div>
  );
}

export default Users;
