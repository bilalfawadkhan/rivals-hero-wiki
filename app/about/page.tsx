'use client';

import { useEffect } from "react";


export default function AboutPage() {

    useEffect(() => {
        fetch('/api/hero_spells/hero')
        .then(response => response.json())
          .then(data => {
              console.log(data);
          })




    },[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        Welcome to our application! We are dedicated to providing the best user experience and helping you achieve your goals. Our team is committed to continuous improvement and innovation.
      </p>
      <p>
      </p>
    </div>
  );
}