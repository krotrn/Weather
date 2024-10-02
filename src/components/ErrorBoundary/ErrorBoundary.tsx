import React, { memo, Suspense } from 'react'
import Loading from '../../assets/Loading';

const ErrorBoundary = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <Suspense fallback={<div className={className}>
        <Loading />
    </div>}>
        {children}
    </Suspense>
);
export default memo(ErrorBoundary)