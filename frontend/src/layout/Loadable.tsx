import { Suspense } from "react";
import Spinner from "@/layout/Spinner/Spinner"

function Loadable(Component: any) {
    return function ReturnComponent(props: any) {
        return (
            <Suspense fallback={<Spinner />}>
                <Component {...props} />
            </Suspense>
        );
    };
}

export default Loadable