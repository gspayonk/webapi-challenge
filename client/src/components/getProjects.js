import axios from 'axios';

export default async () => {
    const result = await axios
        .get(`http://localhost:4000/api/projects`)
        .then(res => res);

    return result;
};