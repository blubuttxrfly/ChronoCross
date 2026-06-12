import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export function DashboardHome() {
  return (
    <div className="grid min-h-[calc(100vh-7rem)] place-items-center px-4 py-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center">
        <div className="mb-4 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#008ac1]">
            ChronoShare network
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0f3442] sm:text-5xl">
            Time moves around the world
          </h1>
        </div>

        <div className="aero-panel mx-auto grid w-full max-w-[700px] place-items-center rounded-[2rem] p-3 sm:p-4">
          <RotatingEarth width={640} height={640} className="mx-auto" />
        </div>
      </section>
    </div>
  );
}
