/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/sections/Hero';
import ShowcaseCarousel from './components/sections/ShowcaseCarousel';
import HowItWorks from './components/sections/HowItWorks';
import Features from './components/sections/Features';
import WorkflowVisualizer from './components/sections/WorkflowVisualizer';
import Integrations from './components/sections/Integrations';
import Benefits from './components/sections/Benefits';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import Navbar from './components/layout/Navbar';

function Divider() {
  return (
    <div className="w-full px-8 md:px-16">
      <div className="h-px bg-gradient-to-r from-transparent via-[#65A859]/30 to-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-primary-500/30">
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <ShowcaseCarousel />
        <Divider />
        <HowItWorks />
        <Divider />
        <Features />
        <Divider />
        <WorkflowVisualizer />
        <Divider />
        <Integrations />
        <Divider />
        <Benefits />
        <Divider />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
