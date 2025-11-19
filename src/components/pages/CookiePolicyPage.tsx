import { motion } from"motion/react";
import { Cookie, Info, Settings, Shield, AlertCircle, CheckCircle2 } from"lucide-react";

export function CookiePolicyPage() {
 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
 <div className="container mx-auto px-4 max-w-4xl">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center mb-12"
 >
 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6 mx-auto">
 <Cookie className="w-10 h-10 text-gray-900 fill-gray-900" />
 </div>
 <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
 Cookie Policy
 </h1>
 <p className="text-lg text-gray-600">
 Last updated: November 8, 2025
 </p>
 </motion.div>

 {/* Content */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.2 }}
 className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8"
 >
 {/* Introduction */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Info className="w-6 h-6 text-blue-600" />
 What Are Cookies?
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 Cookies are small text files that are placed on your device when you visit a website. They are widely 
 used to make websites work more efficiently and provide information to website owners.
 </p>
 <p className="text-gray-700 leading-relaxed">
 At Unmutte, we believe in transparency and giving you control over your data. This Cookie Policy explains 
 what cookies are, how we use them, and how you can manage them.
 </p>
 </section>

 {/* Privacy-First Approach */}
 <section className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
 <h2 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-3">
 <Shield className="w-6 h-6" />
 Our Privacy-First Approach
 </h2>
 <div className="space-y-3 text-green-800">
 <p className="leading-relaxed">
 <strong>Good news!</strong> Unmutte uses a privacy-first approach with local storage instead of traditional cookies:
 </p>
 <ul className="list-disc list-inside space-y-2 ml-4">
 <li><strong>No tracking cookies:</strong> We don't use cookies to track you across websites</li>
 <li><strong>No analytics cookies:</strong> We don't collect analytics data through cookies</li>
 <li><strong>No advertising cookies:</strong> We never show ads or use advertising cookies</li>
 <li><strong>Local storage only:</strong> Your data stays on your device</li>
 <li><strong>You're in control:</strong> Clear your browser data to remove all stored information</li>
 </ul>
 </div>
 </section>

 {/* What We Store Locally */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Settings className="w-6 h-6 text-purple-600" />
 What We Store Locally
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 Instead of cookies, we use browser local storage to save information that enhances your experience. 
 This data never leaves your device unless you explicitly choose to sync or export it.
 </p>
 
 <div className="space-y-4 mt-6">
 <div className="bg-blue-50 rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-blue-600" />
 Essential Information
 </h3>
 <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 text-sm">
 <li><strong>Theme preference:</strong> Your light/dark mode choice</li>
 <li><strong>Language settings:</strong> Your preferred language</li>
 <li><strong>Accessibility settings:</strong> Font size, motion preferences</li>
 </ul>
 </div>

 <div className="bg-purple-50 rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-purple-600" />
 Your Personal Data
 </h3>
 <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 text-sm">
 <li><strong>Mood journal entries:</strong> Your personal reflections</li>
 <li><strong>Mood tracking data:</strong> Your mood history and patterns</li>
 <li><strong>Resource bookmarks:</strong> Your saved resources</li>
 <li><strong>Chat history:</strong> Your AI conversation history (if enabled)</li>
 </ul>
 </div>

 <div className="bg-pink-50 rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-pink-600" />
 Application State
 </h3>
 <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 text-sm">
 <li><strong>Session state:</strong> Current page, form progress</li>
 <li><strong>Feature flags:</strong> Enabled/disabled features</li>
 <li><strong>Onboarding status:</strong> Whether you've completed setup</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Session Storage */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Temporary Session Storage
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 In addition to local storage, we may use session storage for temporary data that is automatically 
 deleted when you close your browser:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>Current session identifiers (never sent to servers)</li>
 <li>Temporary form data to prevent loss during navigation</li>
 <li>UI state for better user experience</li>
 </ul>
 <p className="text-gray-700 leading-relaxed mt-4">
 <strong className="text-gray-900">Important:</strong> Session storage is automatically 
 cleared when you close your browser tab.
 </p>
 </section>

 {/* Third-Party Services */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Third-Party Services
 </h2>
 <div className="space-y-4 text-gray-700">
 <p className="leading-relaxed">
 While Unmutte itself doesn't use cookies, some integrated third-party services may use cookies:
 </p>
 
 <div className="bg-gray-50 rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2">
 AI Providers (OpenAI, Anthropic, Google)
 </h3>
 <p className="text-sm leading-relaxed">
 When you interact with our AI chat, your messages may be processed by third-party AI providers. 
 These providers may use cookies or similar technologies according to their own policies. 
 We use privacy-preserving methods and don't share identifying information.
 </p>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2">
 Content Delivery Networks (CDN)
 </h3>
 <p className="text-sm leading-relaxed">
 We use CDNs to deliver website assets faster. These services may use technical cookies to 
 optimize delivery but do not track your behavior.
 </p>
 </div>
 </div>
 </section>

 {/* Managing Your Data */}
 <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Settings className="w-6 h-6 text-purple-600" />
 Managing Your Data
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 You have full control over your data stored in your browser:
 </p>
 
 <div className="space-y-3">
 <div className="bg-white rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2">
 Clear Browser Data
 </h3>
 <p className="text-sm text-gray-700 leading-relaxed">
 You can clear all stored data at any time through your browser settings:
 </p>
 <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4 mt-2">
 <li><strong>Chrome:</strong> Settings → Privacy → Clear browsing data</li>
 <li><strong>Firefox:</strong> Settings → Privacy → Clear Data</li>
 <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
 <li><strong>Edge:</strong> Settings → Privacy → Clear browsing data</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2">
 Export Your Data
 </h3>
 <p className="text-sm text-gray-700 leading-relaxed">
 You can export your journal entries and mood data from your Account settings at any time. 
 This gives you a backup and full portability of your information.
 </p>
 </div>

 <div className="bg-white rounded-lg p-4">
 <h3 className="font-semibold text-gray-900 mb-2">
 Private/Incognito Mode
 </h3>
 <p className="text-sm text-gray-700 leading-relaxed">
 When using Unmutte in private/incognito mode, all data is automatically deleted when you 
 close the browser window. Your conversations and data will not persist.
 </p>
 </div>
 </div>
 </section>

 {/* Do Not Track */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Do Not Track (DNT)
 </h2>
 <p className="text-gray-700 leading-relaxed">
 We respect Do Not Track (DNT) browser signals. Since we don't track you anyway, there's nothing to 
 disable. However, third-party services integrated with Unmutte may have their own DNT policies.
 </p>
 </section>

 {/* Browser Settings */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Browser Settings and Privacy Controls
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 Most web browsers allow you to control cookie and storage settings:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>Block all cookies (may affect functionality)</li>
 <li>Block third-party cookies only</li>
 <li>Clear cookies and site data regularly</li>
 <li>Set exceptions for trusted websites</li>
 </ul>
 <p className="text-gray-700 leading-relaxed mt-4">
 <strong className="text-gray-900">Note:</strong> Blocking local storage will prevent 
 Unmutte from saving your preferences, journal entries, and mood data. The app will still function, 
 but your data won't persist between sessions.
 </p>
 </section>

 {/* Changes to This Policy */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <AlertCircle className="w-6 h-6 text-orange-600" />
 Changes to This Policy
 </h2>
 <p className="text-gray-700 leading-relaxed">
 We may update this Cookie Policy from time to time to reflect changes in our practices or for legal 
 reasons. We will notify you of any material changes by posting the new policy on this page with an 
 updated"Last updated" date. We encourage you to review this policy periodically.
 </p>
 </section>

 {/* More Information */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 More Information
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 For more information about cookies and online privacy, you can visit:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li><a href="https://allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">All About Cookies</a></li>
 <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Your Online Choices</a></li>
 <li><a href="https://www.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Network Advertising Initiative</a></li>
 </ul>
 </section>

 {/* Contact Information */}
 <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Contact Us
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 If you have questions or concerns about our use of cookies and local storage, please contact us:
 </p>
 <ul className="space-y-2 text-gray-700">
 <li><strong className="text-gray-900">Email:</strong> privacy@unmutte.com</li>
 <li><strong className="text-gray-900">Address:</strong> [Your Company Address]</li>
 <li><strong className="text-gray-900">Phone:</strong> [Your Support Number]</li>
 </ul>
 </section>

 {/* Acknowledgment */}
 <section className="border-t border-gray-200 pt-6">
 <p className="text-sm text-gray-600 text-center">
 By using Unmutte, you consent to our use of local storage as described in this Cookie Policy.
 </p>
 </section>
 </motion.div>
 </div>
 </div>
 );
}
