import { Settings, TrendingUp, BarChart3, AppWindow } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

export default function WhyAmbot365() {
  const stats = [
    { value: '18+ Years', label: 'Global Automation Experience' },
    { value: '1,213+', label: 'Automation Projects Delivered' },
    { value: '200+', label: 'Lean Projects Led' },
    { value: '95%', label: 'Process Automation Achieved' },
  ];

  const highlights = [
    {
      title: 'AUTOMATION BACKGROUND',
      text: '18+ years of global experience focused on Microsoft automation, process excellence, and enterprise delivery.',
      icon: <Settings className="w-5 h-5 text-primary-500" />,
    },
    {
      title: 'DELIVERY IMPACT',
      text: 'Completed 1,213 automation projects and led over 200 Lean projects with measurable productivity gains.',
      icon: <TrendingUp className="w-5 h-5 text-primary-500" />,
    },
    {
      title: 'POWER BI & ANALYTICS',
      text: 'Built dashboards, KPI scorecards, and visual reports for senior leadership including VPs and CIOs.',
      icon: <BarChart3 className="w-5 h-5 text-primary-500" />,
    },
    {
      title: 'MICROSOFT EXPERTISE',
      text: 'Hands-on with Office Script, VBA, Power BI, Power Automate, Excel, Word, PowerPoint, and SharePoint.',
      icon: <AppWindow className="w-5 h-5 text-primary-500" />,
    },
  ];

  const tools = [
    'Office Script',
    'VBA',
    'Power BI',
    'Power Automate',
    'Excel',
    'Word',
    'PowerPoint',
    'SharePoint',
  ];

  return (
    <SectionWrapper id="about" className="section-bg px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-4xl mb-4 section-title tracking-tight">
            Why Ambot365
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            18+ years of global automation experience with deep Microsoft expertise,
            enterprise process transformation, Power BI reporting, and scalable digital
            solutions built for real business impact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="section-card rounded-[28px] px-8 py-9 text-center shadow-sm"
            >
              <div className="text-2xl font-medium text-primary-600 dark:text-primary-400 md:text-3xl lg:text-4xl">
                {item.value}
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
          <div className="section-card rounded-[30px] p-8 md:p-10 shadow-sm">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl md:leading-relaxed">
              With 18 years of global experience, I bring specialized automation skills,
              particularly in Microsoft applications, to drive efficiency and innovation.
              I have completed <span className="font-medium section-subtitle">1,213 automation projects</span>,
              led <span className="font-medium section-subtitle">200+ Lean projects</span>, and achieved up to
              <span className="font-medium text-primary-600 dark:text-primary-400"> 95% process automation</span>, delivering major
              operational savings and productivity gains.
            </p>

            <div className="mt-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
                Approach to Automation
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400 md:text-sm">
                My methodology starts with end-to-end process understanding, followed by
                feasibility checks, solution design, development, testing, and delivery.
                Every project is built with strong focus on usability, UX, and UI.
              </p>
            </div>
          </div>

          <div className="section-card rounded-[30px] p-5 md:p-7 shadow-sm">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-5 px-3 py-6 md:gap-6 md:px-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                      {item.title}
                    </div>
                    <div className="mt-1 text-base leading-relaxed text-gray-800 dark:text-gray-100 font-medium md:text-lg">
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 section-card rounded-[30px] p-8 md:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <h2 className="text-xl font-medium section-subtitle md:text-2xl">
                Global Automation Implementations
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-400 md:text-sm">
                Implemented automation solutions across Banking, FP&A, Accounts Receivable,
                Human Resources, Payroll, Record to Report, Accounts Payable, Travel & Living,
                Quality, Presales, and Transition functions at enterprise scale.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium section-subtitle md:text-2xl">
                Microsoft 365 Expertise
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 text-[10px] font-medium text-primary-700 dark:text-primary-300 md:text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
