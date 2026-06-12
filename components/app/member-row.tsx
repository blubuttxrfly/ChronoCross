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
        "group block overflow-hidden rounded-2xl border border-[#e7e1d8] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="relative h-28 bg-gradient-to-br from-[#f6c35b] via-[#7fb18d] to-[#2b6950]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.58),transparent_28%),linear-gradient(to_top,rgba(0,0,0,0.28),transparent_58%)]" />
        {member.activeThisWeek && (
          <span className="absolute top-3 left-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold text-[#24734d] shadow-sm">
            Active this week
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="-mt-10 flex items-end justify-between gap-3">
          <MemberAvatar
            name={member.name}
            size="lg"
            className="ring-4 ring-white"
          />
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f1e8] text-[#14261f]">
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#1d251f]">
          {member.name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#74776f]">
          {member.bio}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#5d625b]">
          <IconHeartHandshake className="h-4 w-4 text-[#b5791b]" stroke={2} />
          Helped {member.neighborsHelped} neighbors
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {member.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#f6f1e8] px-3 py-1 text-xs font-medium text-[#5d625b]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
