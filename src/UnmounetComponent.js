import { useEffect } from "react";

const UnmountComponnet = () => {
    useEffect(() => {
        return () => {
            console.log('componnetnWillUnmount');
        }
    }, []);
    return <div>UnmountComponnet</div>
}

export default UnmountComponnet;