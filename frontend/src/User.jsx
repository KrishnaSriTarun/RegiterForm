import { useEffect, useState } from "react";
import axios from "axios";
import "./user.css";

const Users = () => {
      const [users, setUsers] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            setIsLoading(true);
            axios.get("http://127.0.0.1:5000/users")
                  .then((response) => {
                        console.log("Fetched Data:", response.data);
                        setUsers(response.data);
                        setIsLoading(false);
                  })
                  .catch((error) => {
                        console.error("Error fetching users:", error);
                        setError("Failed to load users");
                        setIsLoading(false);
                  });
      }, []);

      if (isLoading) {
            return (
                  <div className="users-container loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading users...</p>
                  </div>
            );
      }

      if (error) {
            return (
                  <div className="users-container error-container">
                        <div className="error-icon">!</div>
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                  </div>
            );
      }

      return (
            <div className="users-container">
                  <header className="users-header">
                        <h2>Users List</h2>
                        <div className="users-count">{users.length} users</div>
                  </header>

                  {users.length === 0 ? (
                        <div className="empty-state">
                              <div className="empty-icon">👥</div>
                              <p>No users found in the database.</p>
                        </div>
                  ) : (
                        <div className="users-grid">
                              {users.map((user) => (
                                    <div className="user-card" key={user.id}>
                                          <div className="user-avatar">
                                                {user.name.charAt(0).toUpperCase()}
                                          </div>
                                          <div className="user-details">
                                                <h3 className="user-name">{user.name}</h3>
                                                <div className="user-info">
                                                      <div className="info-item">
                                                            <span className="info-label">Email:</span>
                                                            <span className="info-value">{user.email}</span>
                                                      </div>
                                                      <div className="info-item">
                                                            <span className="info-label">Phone:</span>
                                                            <span className="info-value">{user.phone}</span>
                                                      </div>
                                                      <div className="info-item">
                                                            <span className="info-label">City:</span>
                                                            <span className="info-value">{user.city}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
};

export default Users;