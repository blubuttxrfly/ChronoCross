"use client";

import { MemberRow } from "@/components/app/member-row";
import { PageFrame } from "@/components/app/page-frame";
import { SectionHeading } from "@/components/app/section-heading";
import { COMMUNITY_MEMBERS } from "@/lib/dashboard-data";

export function CommunityPage() {
  const active = COMMUNITY_MEMBERS.filter((member) => member.activeThisWeek);
  const others = COMMUNITY_MEMBERS.filter((member) => !member.activeThisWeek);

  return (
    <PageFrame wide className="pb-16">
      <section className="aero-hero relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
        <div className="relative max-w-2xl">
          <p className="text-sm font-semibold text-white/86">Your network</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Meet the people trading time nearby.
          </h1>
          <p className="mt-4 text-base leading-7 text-white/82">
            These are the neighbors you exchange time with. Everyone gives an
            hour to earn an hour, building trust through real help.
          </p>
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          title="Active this week"
          subtitle="Neighbors who've posted or exchanged recently."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-white/52 py-12">
          <SectionHeading title="Everyone else" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </PageFrame>
  );
}
