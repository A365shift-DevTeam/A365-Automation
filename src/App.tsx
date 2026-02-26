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

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-primary-500/30">
      <main>
        <Hero />
        <ShowcaseCarousel />
        <HowItWorks />
        <Features />
        <WorkflowVisualizer />
        <Integrations />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
