import React, { useEffect, useMemo, useState } from "react";
import useDebounce from "../feature/useDebounce";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceSearch = useDebounce(searchTerm, 3000);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/uses");
        if (!res.ok) {
          throw new Error("Failed to load users");
        }

        const data = await res.json();
        setUsers(data);
        return data;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!debounceSearch.trim()) return users;

    return users.filter((user) =>
      user.name.toLowerCase().includes(debounceSearch.toLowerCase()),
    );
  }, [debounceSearch, users]);

  // debouncing search term
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (searchTerm.trim() === '') {
  //       setFilteredUsers(users);
  //     }
  //     const filtered = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
  //     setFilteredUsers(filtered);
  //   }, 500);

  //   return () => { clearTimeout(timeout); }
  // }, [searchTerm, users]);

  return (
    <>
      <div>Search Debouncing</div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="search"
        placeholder="Search..."
      />
      <h2>Users list</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {/* {filteredUsers.length > 0
        ? filteredUsers.map((u) => <p key={u.id}>{u.name}</p>)
        : users.map((u) => <p key={u.id}>{u.name}</p>)
      } */}
      {filteredUsers.length === 0 ? <p>No user found</p> :
        filteredUsers.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
    </>
  );
};

export default SearchInput;
