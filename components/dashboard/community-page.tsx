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
      <section className="relative overflow-hidden rounded-[2rem] bg-[#f7efe2] p-6 shadow-sm sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(246,195,91,0.48),transparent_28%),radial-gradient(circle_at_12%_88%,rgba(42,115,78,0.20),transparent_28%)]" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-semibold text-[#8a5b13]">Your network</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#16241d] sm:text-5xl">
            Meet the people trading time nearby.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#646860]">
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
        <section className="border-t border-[#e7e1d8] py-12">
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
