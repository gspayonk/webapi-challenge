import React, { useState, useEffect } from 'react'
import fetchActions from '../components/getActions';

export default () => {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetchActions().then(res => setActions(res.data));
    }, []);

    return (
        <>
        <pre>{JSON.stringify(actions, null, 6)}</pre>
        </>
    );
};