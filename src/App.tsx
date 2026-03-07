/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/sections/Hero';
import ShowcaseCarousel from './components/sections/ShowcaseCarousel';
import AgentsInAction from './components/sections/AgentsInAction';
import WhyAgent from './components/sections/WhyAgent';
import SolutionsOverview from './components/sections/SolutionsOverview';
import HowEngagementsWork from './components/sections/HowEngagementsWork';
import Integrations from './components/sections/Integrations';
import SecurityFAQ from './components/sections/SecurityFAQ';
import WhyA365 from './components/sections/WhyA365';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import Navbar from './components/layout/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';

function Divider() {
  return (
    <div className="w-full px-8 md:px-16">
      <div className="h-px bg-gradient-to-r from-transparent via-[#65A859]/30 to-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-primary-500/30">
        <Navbar />
        <main>
          <Hero />
          <Divider />
          <AgentsInAction />
          <Divider />
          <ShowcaseCarousel />
          <Divider />
          <WhyAgent />
          <Divider />
          <SolutionsOverview />
          <Divider />
          <HowEngagementsWork />
          <Divider />
          <Integrations />
          <Divider />
          <SecurityFAQ />
          <Divider />
          <WhyA365 />
          <Divider />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
