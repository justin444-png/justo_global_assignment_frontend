import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {};
    const [link, setLink] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [serverTime, setServerTime] = useState('');

    const getLink = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            setErrorMessage('')
            const response = await axios.post(
                `http://localhost:3002/api/auth/generateLink/${data.userId}`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            const result = response.data;
    
            if (result.status === 'success') {
                setLink(result.data.link);
            } else {
                setErrorMessage(result.message || 'Something went wrong');
            }
        } catch (error) {
            setErrorMessage('An error occurred while generating the link');
        }
    };

    const getServerTime = async () => {
      
            const token = localStorage.getItem('accessToken');

            const response = await axios.get(link, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = response.data;

            if (result.status === 'success') {
                const timeResponse = await axios.get(
                    `http://localhost:3002/api/auth/getServerTime/${result.data.userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const newData = timeResponse.data;

                if (newData.status === 'success') {
                    setServerTime(newData.data.serverTime); 
                } else {
                    setErrorMessage('Server time not available.');
                }
            } else {
                setServerTime('')
                setErrorMessage(result.message);
            }
       
    };

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <button onClick={getLink}>Get a Link</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {link && (
                <a
                    href="#"  
                    onClick={(e) => {
                        e.preventDefault();  
                        getServerTime();    
                    }}
                    style={{ textDecoration: 'underline', color: 'blue' ,paddingLeft:'20px'}}  
                >
                    {link}
                </a>
            )}

            {serverTime && (
                <div>
                    <h2>Server Time: {serverTime}</h2>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
