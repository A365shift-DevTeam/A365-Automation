/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/sections/Hero';
import ShowcaseCarousel from './components/sections/ShowcaseCarousel';
import AgentsInAction from './components/sections/AgentsInAction';
import SolutionsOverview from './components/sections/SolutionsOverview';
import ProcessComparison from './components/sections/ProcessComparison';
import HowEngagementsWork from './components/sections/HowEngagementsWork';
import WhyAmbot365 from './components/sections/WhyAmbot365';
import StickyFooter from './components/ui/StickyFooter';
import Navbar from './components/layout/Navbar';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import { ThemeProvider } from './contexts/ThemeContext';
import Separator from './components/ui/Separator';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-primary-500/30">
        <Navbar />
        <main>
          <Hero />
          <Separator />
          <SolutionsOverview />
          <Separator />
          <AgentsInAction />
          <Separator />
          <ShowcaseCarousel />
          <Separator />
          <ProcessComparison />
          <Separator />
          <HowEngagementsWork />
          <Separator />
          {/* <Integrations />
          <Separator /> */}
          <WhyAmbot365 />
          {/* <CTA /> */}
        </main>
        <StickyFooter />
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  );
}
