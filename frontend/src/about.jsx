import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#181A2A] dark:text-white pt-24">
            <Header />
            <Footer />
        </div>
    )}