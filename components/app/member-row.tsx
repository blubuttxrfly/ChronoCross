import { MemberAvatar } from "@/components/app/member-avatar";
import type { CommunityMember } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconHeartHandshake } from "@tabler/icons-react";
import Link from "next/link";

type MemberRowProps = {
  member: CommunityMember;
  href?: string;
  className?: string;
};

export function MemberRow({
  member,
  href = "/dashboard/community",
  className,
}: MemberRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        "aero-panel group block overflow-hidden rounded-2xl transition-all hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="relative h-28 bg-gradient-to-br from-[#58c7ff] via-[#73e0de] to-[#95ed91]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.04)_48%),linear-gradient(to_top,rgba(0,98,136,0.24),transparent_58%)]" />
        {member.activeThisWeek && (
          <span className="aero-chip absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold text-[#008ac1]">
            Active this week
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="-mt-10 flex items-end justify-between gap-3">
          <MemberAvatar
            name={member.name}
            size="lg"
            className="ring-4 ring-white/80"
          />
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/64 text-[#008ac1] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#0f3442]">
          {member.name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#5e8490]">
          {member.bio}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#466d79]">
          <IconHeartHandshake className="h-4 w-4 text-[#008ac1]" stroke={2} />
          Helped {member.neighborsHelped} neighbors
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {member.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="aero-chip rounded-full px-3 py-1 text-xs font-medium text-[#315462]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
