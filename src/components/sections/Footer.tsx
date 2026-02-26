export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-gray-50">A365<span className="text-primary-500">.</span></div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              The modern automation platform for ambitious teams.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-500 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Templates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 A365 Automation. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
