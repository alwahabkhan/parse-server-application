import React, { useState, useEffect } from 'react';
import Parse from 'parse';

Parse.initialize('myAppId'); 
Parse.serverURL = 'http://localhost:1337/parse'; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const query = new Parse.Query(Parse.User);
    try {
      const usersList = await query.find();
      setUsers(usersList); 
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const subscribeToUserChanges = () => {
    const query = new Parse.Query(Parse.User);
    query.subscribe().then((subscription) => {
      subscription.on('create', (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]); 
      });

      subscription.on('update', (updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      });

      subscription.on('delete', (deletedUser) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== deletedUser.id)
        ); 
      });
    });
  };

  useEffect(() => {
    fetchUsers();
    subscribeToUserChanges();

    return () => {

    };
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Username: {user.get('username')}</p>
            <p>Email: {user.get('email')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
