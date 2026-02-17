import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Shield,
  FileCheck,
  Map,
  Brain,
  BarChart3,
  Users,
  LineChart,
  TrendingUp,
  Gamepad,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Banner from "./Banner";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-white">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Banner />

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">5M+</div>
                <div className="text-gray-400">Land Records Digitized</div>
              </div>
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-400">Data Accuracy</div>
              </div>
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">80%</div>
                <div className="text-gray-400">Dispute Reduction</div>
              </div>
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-400">Government Partnerships</div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-muted bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Our platform offers cutting-edge tools and AI-driven insights to enhance investment strategies and user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-md border">
                <Gamepad className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl text-black font-bold mb-2">Gamified Learning</h3>
                <p className="text-muted-foreground">
                  Interactive simulations and challenges to help users master investment strategies in a fun way.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <LineChart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl text-black font-bold mb-2">AI based Recommendations</h3>
                <p className="text-muted-foreground">
                  AI-driven market analysis provides deep insights into trends and investment opportunities.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <Lock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl text-black font-bold mb-2">Secure Transactions</h3>
                <p className="text-muted-foreground">
                  Advanced hashing techniques protect user passwords and sensitive financial data.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <FileCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl text-black font-bold mb-2">Investment Tracking</h3>
                <p className="text-muted-foreground">
                Track investments securely. Store data and access anytime. Learn basics with our e-book.Download our investment guide
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl text-black font-bold mb-2">Paper Trading</h3>
                <p className="text-muted-foreground">
                  Risk-free simulated trading experience to practice investment strategies before committing real funds.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl text-black font-bold mb-2">Reports & Analytics</h3>
                <p className="text-muted-foreground">
                  Comprehensive reports and AI-powered analytics for tracking investment performance and making informed decisions.
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* How It Works Section */}
<section id="how-it-works" className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
        How It Works
      </h2>
      <p className="text-gray-400 max-w-[700px] mx-auto">
        A seamless and intelligent approach to stock market learning, trading, and analytics.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-blue-400">1</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-blue-400">
          Learn & Simulate
        </h3>
        <p className="text-gray-400">
          Engage in gamified paper trading to practice investment strategies without real money.
        </p>
      </div>

      <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-blue-400">2</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-blue-400">
          AI-Powered Insights
        </h3>
        <p className="text-gray-400">
          Get real-time analytics and AI-driven predictions to make informed investment decisions.
        </p>
      </div>

      <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-blue-400">3</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-blue-400">
          Secure Transactions
        </h3>
        <p className="text-gray-400">
          Execute trades with confidence using encrypted data, KYC verification, and secure reporting.
        </p>
      </div>
    </div>
  </div>
</section>

 {/* Technology Section */}
<section id="technology" className="py-20 bg-muted bg-gradient-to-b from-gray-800 to-gray-900">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Our Technology Stack
      </h2>
      <p className="text-muted-foreground max-w-[700px] mx-auto">
        Leveraging modern tools to provide a seamless, secure, and efficient investment experience.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* React */}
      <div className="flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
             alt="React" className="w-12 h-12 mb-2" />
        <h3 className="text-lg font-semibold text-white">React</h3>
      </div>

      {/* Firebase */}
      <div className="flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800">
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" 
             alt="Firebase" className="w-12 h-12 mb-2" />
        <h3 className="text-lg font-semibold text-white">Firebase</h3>
      </div>

      {/* Flask */}
      <div className="flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800">
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" 
             alt="Flask" className="w-12 h-12 mb-2" />
        <h3 className="text-lg font-semibold text-white">Flask</h3>
      </div>

      {/* Tailwind CSS */}
      <div className="flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" 
             alt="Tailwind CSS" className="w-12 h-12 mb-2" />
        <h3 className="text-lg font-semibold text-white">Tailwind CSS</h3>
      </div>

      {/* ShadCN and Vite - Wrapped in a Flex Container */}
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-center gap-6">
        {/* ShadCN */}
        <div className="flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800">
          <img src="https://avatars.githubusercontent.com/u/139761612?s=200&v=4" 
               alt="ShadCN" className="w-12 h-12 mb-2 rounded-full" />
          <h3 className="text-lg font-semibold text-white">ShadCN</h3>
        </div>

        {/* Vite */}
        <div className="flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" 
               alt="Vite" className="w-12 h-12 mb-2" />
          <h3 className="text-lg font-semibold text-white">Vite</h3>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
              Ready to Transform Land Record Management?
            </h2>
            <p className="text-lg text-gray-400 max-w-[700px] mx-auto mb-8">
              Join government agencies and property professionals already
              benefiting from our secure, transparent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 bg-blue-500 hover:bg-blue-600 text-white border border-blue-500"
              >
                Request a Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-400"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className=" py-20 bg-background bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Have questions or ready to get started? Our team is here to help
                you implement a secure land record system.
              </p>
            </div>

            <div className="max-w-[600px] mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium">
                    Organization
                  </label>
                  <input
                    id="organization"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your organization"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your message"
                  />
                </div>

                <Button className="w-full">Submit</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Database className="h-5 w-5 text-primary" />
            <span className="font-bold">DigiKshetra Records</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DigiKshetra Records. All rights
            reserved.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
