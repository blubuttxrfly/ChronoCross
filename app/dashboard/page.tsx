export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="border-b border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-purple-900">Dashboard</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
          <p className="text-purple-700">Your time balance and activity will appear here.</p>
        </div>
      </main>
    </div>
  );
}
