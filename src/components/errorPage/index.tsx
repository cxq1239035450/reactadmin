import { FC } from 'react';
import { useRouteError, ErrorResponse } from 'react-router-dom'
const ErrorPage: FC = () => {
    const error = useRouteError() as ErrorResponse & Error
    console.log(error);
    
    return (
        <div id='errorPage'>
            <div>跳转失败</div>
            <div>{error?.statusText}</div>
        </div>
    )
}

export default ErrorPage;