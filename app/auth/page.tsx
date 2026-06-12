export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-purple-100 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-purple-900 text-center mb-8">
          Sign In / Sign Up
        </h1>
        <p className="text-purple-700 text-center mb-8">
          Auth integration coming soon.
        </p>
        <div className="text-center text-purple-600">
          <p className="text-sm">Supabase auth will be connected here.</p>
        </div>
      </div>
    </div>
  );
}
