import React from 'react'; // Ajoutez cet import
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { name: string }}): Metadata {
    const title = `Pour le ${params.name} `;
    const description = `Information sur ${params.name} `;
    return {
      title,
      description,
    };
   
    
}
  
export default function FoodLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}
  