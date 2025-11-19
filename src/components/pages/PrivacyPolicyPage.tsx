import { motion } from"motion/react";
import { Shield, Lock, Eye, Database, UserCheck, FileText } from"lucide-react";

export function PrivacyPolicyPage() {
 return (
 <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20">
 <div className="container mx-auto px-4 max-w-4xl">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center mb-12"
 >
 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6 mx-auto">
 <Shield className="w-10 h-10 text-gray-900 fill-gray-900" />
 </div>
 <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
 Privacy Policy
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
 <FileText className="w-6 h-6 text-purple-600" />
 Introduction
 </h2>
 <p className="text-gray-700 leading-relaxed">
 At Unmutte, we are committed to protecting your privacy and ensuring the security of your personal information. 
 This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mental 
 health support platform.
 </p>
 </section>

 {/* Information We Collect */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Database className="w-6 h-6 text-blue-600" />
 Information We Collect
 </h2>
 <div className="space-y-4 text-gray-700">
 <div>
 <h3 className="font-semibold text-lg mb-2 text-gray-900">Personal Information</h3>
 <ul className="list-disc list-inside space-y-2 ml-4">
 <li>Email address (for account creation)</li>
 <li>Name (optional)</li>
 <li>Age range (for appropriate content)</li>
 <li>Profile information you choose to provide</li>
 </ul>
 </div>
 <div>
 <h3 className="font-semibold text-lg mb-2 text-gray-900">Usage Data</h3>
 <ul className="list-disc list-inside space-y-2 ml-4">
 <li>Journal entries (stored locally on your device)</li>
 <li>Mood tracking data (stored locally)</li>
 <li>Conversation logs with AI (processed securely)</li>
 <li>Game statistics and progress</li>
 <li>App usage patterns and preferences</li>
 </ul>
 </div>
 </div>
 </section>

 {/* How We Use Your Information */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <UserCheck className="w-6 h-6 text-green-600" />
 How We Use Your Information
 </h2>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>To provide and maintain our mental health support services</li>
 <li>To personalize your experience and provide relevant resources</li>
 <li>To improve our AI conversational capabilities</li>
 <li>To analyze usage patterns and enhance our platform</li>
 <li>To communicate important updates and safety information</li>
 <li>To ensure the safety and security of our users</li>
 </ul>
 </section>

 {/* Data Storage and Security */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Lock className="w-6 h-6 text-red-600" />
 Data Storage and Security
 </h2>
 <div className="space-y-4 text-gray-700">
 <p className="leading-relaxed">
 <strong className="text-gray-900">Local Storage:</strong> Your journal entries, 
 mood data, and personal notes are stored locally on your device using browser storage. We do not 
 have access to this data unless you explicitly choose to share it.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">Encryption:</strong> All data transmitted between 
 your device and our servers is encrypted using industry-standard SSL/TLS protocols.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">AI Processing:</strong> Conversations with our AI 
 are processed securely and are not stored permanently unless required for immediate context.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">Third-Party Services:</strong> We use trusted 
 third-party services (like OpenAI, Anthropic) for AI processing, which are bound by their own 
 privacy policies and our data processing agreements.
 </p>
 </div>
 </section>

 {/* Your Privacy Rights */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Eye className="w-6 h-6 text-purple-600" />
 Your Privacy Rights
 </h2>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li><strong className="text-gray-900">Access:</strong> You can access your data at any time through your account</li>
 <li><strong className="text-gray-900">Export:</strong> You can export your journal and mood data in JSON format</li>
 <li><strong className="text-gray-900">Delete:</strong> You can delete your account and all associated data</li>
 <li><strong className="text-gray-900">Opt-out:</strong> You can opt out of analytics and data collection</li>
 <li><strong className="text-gray-900">Correct:</strong> You can update or correct your personal information</li>
 </ul>
 </section>

 {/* Data Sharing */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Data Sharing and Disclosure
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>With your explicit consent</li>
 <li>To comply with legal obligations or court orders</li>
 <li>To protect the safety of our users or the public</li>
 <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
 <li>In case of emergency situations where immediate harm is threatened</li>
 </ul>
 </section>

 {/* Children's Privacy */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Children's Privacy
 </h2>
 <p className="text-gray-700 leading-relaxed">
 Unmutte is designed for users aged 13 and above. We do not knowingly collect personal information from 
 children under 13. If you are a parent or guardian and believe your child has provided us with personal 
 information, please contact us immediately.
 </p>
 </section>

 {/* Changes to Privacy Policy */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Changes to This Privacy Policy
 </h2>
 <p className="text-gray-700 leading-relaxed">
 We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
 Privacy Policy on this page and updating the"Last updated" date. We encourage you to review this Privacy 
 Policy periodically for any changes.
 </p>
 </section>

 {/* Contact Information */}
 <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Contact Us
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 If you have any questions about this Privacy Policy or our data practices, please contact us:
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
 By using Unmutte, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
 </p>
 </section>
 </motion.div>
 </div>
 </div>
 );
}
