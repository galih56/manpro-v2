import { Button } from "@/components/elements";
import { Props } from "@/types";
import { AxiosError } from "axios";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error } : FallbackProps) => {
    return (
        <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert" >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </Button>
        </div>
    );
};

export const ErrorBoundaryWrapper = ({children} : Props) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    )
}