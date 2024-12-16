import React from 'react';

export default async function Layout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="container px-4 py-8  mx-auto">
            {children}
        </div>
    );
}