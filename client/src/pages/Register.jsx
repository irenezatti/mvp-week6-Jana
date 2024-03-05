import React from 'react';
import { useState } from "react";
import axios from "axios";



export default function Register() {
        const [credentials, setCredentials] = useState({
          username: "",
          password: "",
        });
        const { username, password } = credentials;
const register = async () => {
    try {
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: credentials,
      });
      console.log(data.message);
    } catch (error) {
        console.log(error);
        setData(error.message);
      }
    };

const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
      };
    

    return (
            <div>
              <div>
                <input
                  value={username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  className="form-control mb-2"
                />
                <input
                  value={password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control mb-2"
                />
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-primary" onClick={register}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          );
        }