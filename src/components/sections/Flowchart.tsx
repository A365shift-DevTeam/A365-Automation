import { motion } from 'motion/react';
import { Github, ArrowRight } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { useState } from 'react';
import FlowchartGif from '../../assets/Gif.gif';

// Define SVG components
const TABS = ['E-COMMERCE', 'FINANCE', 'HEALTHCARE', 'B2B SAAS', 'AUTOMOTIVE'];

export default function Flowchart() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    // Adjusted card classes to fit inside the right container
    const cardClasses = "bg-white rounded-[20px] md:rounded-[24px] shadow-sm p-3 md:p-4 lg:p-5 flex flex-col items-center w-full z-10 relative flex-1 min-w-[70px]";

    return (
        <SectionWrapper id="solutions" className="bg-white dark:bg-gray-950 overflow-hidden py-16 md:py-24">
            <div className="flex flex-col xl:flex-row gap-12 xl:gap-8 items-start">

                {/* Left Side Content (Text & Call to Actions) */}
                <div className="w-full xl:w-5/12 flex flex-col justify-center xl:sticky xl:top-32 xl:pr-8">
                    <p className="text-sm font-bold tracking-widest text-gray-400 dark:text-gray-500 mb-6 uppercase">
                        Industry Solutions
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
                        We've built our business by serving global enterprises
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                        From automotive giants to financial institutions, our AI agents power mission-critical operations across industries.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded font-semibold transition-colors flex items-center justify-center gap-2 tracking-wide text-sm">
                            VIEW CASE STUDIES <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="bg-transparent border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-400 text-gray-900 dark:text-white px-8 py-4 rounded font-semibold transition-colors tracking-wide text-sm text-center">
                            CONTACT SALES
                        </button>
                    </div>
                </div>

                {/* Right Side Container (Interactive Tabs & Flowchart) */}
                <div className="w-full xl:w-7/12 flex flex-col">

                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 md:justify-end">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide border transition-all duration-300 ${activeTab === tab
                                    ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900'
                                    : 'bg-transparent border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Interactive Container */}
                    <div className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-[24px] md:rounded-[40px] p-8 md:p-12 lg:p-16 relative shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden mt-8 max-w-5xl mx-auto">

                        {/* Selected Tab Content Overlay */}
                        <div className="mb-0 relative z-10 w-full lg:w-3/4">
                            <p className="text-[#64748B] text-[10px] font-bold tracking-widest uppercase mb-4">
                                {activeTab}
                            </p>
                        </div>

                        {/* Animated Scaled-Down Flowchart */}
                        <div className="mt-8 pt-6">
                            <p className="text-[#64748B] text-xs font-bold tracking-widest uppercase mb-10 text-center">
                                SYSTEM ARCHITECTURE
                            </p>

                            <div className="flex justify-center w-full mt-8">
                                <img
                                    src={FlowchartGif}
                                    alt="System Architecture Diagram"
                                    className="w-full max-w-4xl h-auto rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

