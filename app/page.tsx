import Link from 'next/link';
import { Clock, Users, Sprout, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-semibold text-purple-900">ChronoShare</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/auth" className="text-purple-700 hover:text-purple-900">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-purple-900 mb-6">
            Time Banking for Environmental Action
          </h1>
          <p className="text-xl text-purple-700 mb-8">
            1 hour = 1 hour, for everyone. No extraction, pure reciprocity.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
            <Sprout className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Environmental Focus
            </h3>
            <p className="text-purple-700">
              Exchange skills for climate action: gardening, solar, resilience, education, and mutual aid.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Equal Value
            </h3>
            <p className="text-purple-700">
              A gardener's hour equals a lawyer's hour. Time is the great equalizer.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
            <Clock className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Start with 1 Hour
            </h3>
            <p className="text-purple-700">
              Everyone begins with 1 hour of community connection. Dignity, not debt.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-purple-100">
          <h2 className="text-3xl font-light text-purple-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h4 className="font-semibold text-purple-900 mb-2">Sign Up</h4>
              <p className="text-purple-700">Create your account and receive 1 hour</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-purple-900 mb-2">Post</h4>
              <p className="text-purple-700">Offer a skill or request help</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-purple-900 mb-2">Connect</h4>
              <p className="text-purple-700">Browse and exchange with your community</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h4 className="font-semibold text-purple-900 mb-2">Exchange</h4>
              <p className="text-purple-700">Complete the exchange and watch balances update</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-purple-700">
          <p>Built for the Hopamine Green Hackathon — June 13–14, 2026</p>
        </div>
      </footer>
    </div>
  );
}
