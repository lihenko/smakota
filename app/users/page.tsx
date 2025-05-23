// app/users/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data: User[] = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
     <section>
      <div className="container">
        <h1 className='text-center text-2xl font-bold mb-4'>Наші кулінари</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
     </section>
      
    </>
  );
};

export default UsersPage;
