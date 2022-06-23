import { useState, useEffect } from "react";


export default function useFetch(url, method) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url, { method: method })
            .then((res) => res.json())
            .then((data) => setData(data));
    }
        , [url, method]

    );

    return [data,setData];
};
