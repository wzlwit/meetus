// import { useFetch } from "hooks/useFetch";
import { useEffect, useState } from "react";


export default function useFetchResults(url, method) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url, { method: method })
            .then((res) => res.json())
            .then((data) => setData(data.results))
            ;
    }
        , [url, method]

    );

    return [data, setData];
};
