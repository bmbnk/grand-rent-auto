import { useState } from 'react';

export default function useJwt() {
    const getJwt = () => {
        const jwtString = localStorage.getItem('jwt');
        const userJwt = JSON.parse(jwtString);
        return userJwt?.jwt
    };
    const [jwt, setJwt] = useState(getJwt());

    const saveJwt = userJwt => {
        localStorage.setItem('jwt', JSON.stringify(userJwt));
        setJwt(userJwt.jwt);
    };

    return {
        setJwt: saveJwt,
        jwt
    }
}