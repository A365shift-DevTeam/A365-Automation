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
import Integrations from './components/sections/Integrations';
import SecurityFAQ from './components/sections/SecurityFAQ';
import WhyA365 from './components/sections/WhyA365';
import ContactUs from './components/sections/ContactUs';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import StickyFooter from './components/ui/StickyFooter';
import Navbar from './components/layout/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import { SectionSeparator } from './components/SectionSeparator';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-primary-500/30">
        <Navbar />
        <main>
          <Hero />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <SolutionsOverview />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <AgentsInAction />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <ShowcaseCarousel />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <ProcessComparison />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <HowEngagementsWork />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          {/* <Integrations />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} /> */}
          <WhyA365 />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <SecurityFAQ />
          <SectionSeparator color="grey" width="100%" thickness={2} shadow={true} />
          <ContactUs />
          {/* <CTA /> */}
        </main>
        <StickyFooter />
      </div>
    </ThemeProvider>
  );
}
