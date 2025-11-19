import { motion } from"motion/react";
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Users } from"lucide-react";

export function TermsOfServicePage() {
 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
 <div className="container mx-auto px-4 max-w-4xl">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center mb-12"
 >
 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6 mx-auto">
 <Scale className="w-10 h-10 text-gray-900 fill-gray-900" />
 </div>
 <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
 Terms of Service
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
 <FileText className="w-6 h-6 text-blue-600" />
 Agreement to Terms
 </h2>
 <p className="text-gray-700 leading-relaxed">
 Welcome to Unmutte. By accessing or using our platform, you agree to be bound by these Terms of Service 
 and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
 from using or accessing this site.
 </p>
 </section>

 {/* Service Description */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <Users className="w-6 h-6 text-purple-600" />
 Description of Service
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 Unmutte is a mental health support platform that provides:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>AI-powered conversational support</li>
 <li>Mood tracking and journaling tools</li>
 <li>Access to mental health resources</li>
 <li>Community support features</li>
 <li>Interactive stress relief activities</li>
 <li>Connection to human listeners (where available)</li>
 </ul>
 </section>

 {/* Important Disclaimer */}
 <section className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
 <h2 className="text-2xl font-bold mb-4 text-red-900 flex items-center gap-3">
 <AlertTriangle className="w-6 h-6" />
 Important Medical Disclaimer
 </h2>
 <div className="space-y-3 text-red-800">
 <p className="font-semibold leading-relaxed">
 Unmutte is NOT a substitute for professional medical advice, diagnosis, or treatment.
 </p>
 <ul className="list-disc list-inside space-y-2 ml-4">
 <li>Our AI and services do not provide medical or therapeutic advice</li>
 <li>We are not licensed mental health professionals</li>
 <li>In case of emergency, please call your local emergency services</li>
 <li>If you are in crisis, contact a crisis helpline immediately</li>
 <li>Always seek the advice of qualified health providers with questions about your condition</li>
 </ul>
 </div>
 </section>

 {/* User Responsibilities */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <CheckCircle className="w-6 h-6 text-green-600" />
 User Responsibilities
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 As a user of Unmutte, you agree to:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>Provide accurate and truthful information</li>
 <li>Maintain the confidentiality of your account</li>
 <li>Use the platform in a respectful and lawful manner</li>
 <li>Not share content that is harmful, threatening, or illegal</li>
 <li>Not attempt to access unauthorized areas of the platform</li>
 <li>Not use the platform for commercial purposes without permission</li>
 <li>Respect the privacy and rights of other users</li>
 <li>Be at least 13 years of age (or age required in your jurisdiction)</li>
 </ul>
 </section>

 {/* Prohibited Uses */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
 <XCircle className="w-6 h-6 text-red-600" />
 Prohibited Uses
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 You may not use Unmutte to:
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
 <li>Harass, abuse, or harm another person</li>
 <li>Share false or misleading information</li>
 <li>Impersonate any person or entity</li>
 <li>Violate any laws or regulations</li>
 <li>Distribute spam or malicious software</li>
 <li>Collect or harvest data from other users</li>
 <li>Interfere with or disrupt the platform's operation</li>
 <li>Promote self-harm or violence</li>
 </ul>
 </section>

 {/* Intellectual Property */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Intellectual Property Rights
 </h2>
 <div className="space-y-4 text-gray-700">
 <p className="leading-relaxed">
 <strong className="text-gray-900">Our Content:</strong> All content on Unmutte, 
 including text, graphics, logos, and software, is the property of Unmutte or its licensors and is 
 protected by copyright and trademark laws.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">Your Content:</strong> You retain ownership of 
 any content you create on our platform (journals, posts, etc.). By using our service, you grant us 
 a limited license to store and display your content as necessary to provide the service.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">Feedback:</strong> Any feedback or suggestions 
 you provide about Unmutte may be used by us without any obligation to you.
 </p>
 </div>
 </section>

 {/* Data and Privacy */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Data and Privacy
 </h2>
 <p className="text-gray-700 leading-relaxed">
 Your use of Unmutte is also governed by our Privacy Policy. We are committed to protecting your privacy 
 and handling your data responsibly. Please review our Privacy Policy to understand how we collect, use, 
 and protect your information.
 </p>
 </section>

 {/* Service Modifications */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Service Modifications and Termination
 </h2>
 <div className="space-y-4 text-gray-700">
 <p className="leading-relaxed">
 <strong className="text-gray-900">Modifications:</strong> We reserve the right to 
 modify, suspend, or discontinue any aspect of Unmutte at any time without notice.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">Termination:</strong> We may terminate or suspend 
 your access to Unmutte immediately, without prior notice, for any reason, including breach of these Terms.
 </p>
 <p className="leading-relaxed">
 <strong className="text-gray-900">Your Right to Terminate:</strong> You may stop 
 using Unmutte at any time and delete your account through your account settings.
 </p>
 </div>
 </section>

 {/* Disclaimer of Warranties */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Disclaimer of Warranties
 </h2>
 <p className="text-gray-700 leading-relaxed">
 Unmutte is provided"as is" and"as available" without warranties of any kind, either express or implied. 
 We do not guarantee that the service will be uninterrupted, secure, or error-free. We make no warranties 
 about the accuracy, reliability, or completeness of any content or information on the platform.
 </p>
 </section>

 {/* Limitation of Liability */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Limitation of Liability
 </h2>
 <p className="text-gray-700 leading-relaxed">
 To the fullest extent permitted by law, Unmutte and its affiliates, officers, employees, and agents 
 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising 
 from your use of or inability to use the service. This includes damages for loss of profits, data, or 
 other intangible losses.
 </p>
 </section>

 {/* Indemnification */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Indemnification
 </h2>
 <p className="text-gray-700 leading-relaxed">
 You agree to indemnify and hold harmless Unmutte and its affiliates from any claims, damages, losses, 
 liabilities, and expenses (including legal fees) arising from your use of the service, your violation 
 of these Terms, or your violation of any rights of another party.
 </p>
 </section>

 {/* Governing Law */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Governing Law and Disputes
 </h2>
 <p className="text-gray-700 leading-relaxed">
 These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
 without regard to its conflict of law provisions. Any disputes arising from these Terms or your use 
 of Unmutte shall be resolved through binding arbitration or in the courts of [Your Jurisdiction].
 </p>
 </section>

 {/* Changes to Terms */}
 <section>
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Changes to These Terms
 </h2>
 <p className="text-gray-700 leading-relaxed">
 We may revise these Terms of Service at any time without notice. By continuing to use Unmutte after 
 changes are posted, you agree to be bound by the revised terms. We encourage you to review these 
 Terms periodically.
 </p>
 </section>

 {/* Contact Information */}
 <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
 <h2 className="text-2xl font-bold mb-4 text-gray-900">
 Contact Us
 </h2>
 <p className="text-gray-700 leading-relaxed mb-4">
 If you have any questions about these Terms of Service, please contact us:
 </p>
 <ul className="space-y-2 text-gray-700">
 <li><strong className="text-gray-900">Email:</strong> legal@unmutte.com</li>
 <li><strong className="text-gray-900">Address:</strong> [Your Company Address]</li>
 <li><strong className="text-gray-900">Phone:</strong> [Your Support Number]</li>
 </ul>
 </section>

 {/* Acknowledgment */}
 <section className="border-t border-gray-200 pt-6">
 <p className="text-sm text-gray-600 text-center">
 By using Unmutte, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
 </p>
 </section>
 </motion.div>
 </div>
 </div>
 );
}
