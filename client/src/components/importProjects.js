import React, { useState, useEffect } from 'react'
import fetchProjects from '../components/getProjects';

export default () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects().then(res => setProjects(res.data));
    }, []);

    return (
        <>
        <pre>{JSON.stringify(projects, null, 6)}</pre>
        </>
    );
};