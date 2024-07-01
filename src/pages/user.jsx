import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

import { fetchUsers } from 'src/services/api';

// ----------------------------------------------------------------------

export default function UserPage() {

  // Add state for users and loading
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log(data)
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView users={users} loading={loading} />
    </>
  );
}
