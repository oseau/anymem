"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { UserButton } from "@clerk/nextjs";
import { Dictionary } from "@/get-dictionary";
import { usePathname } from "next/navigation";

export function NavLinks({
  dict,
  i18nPrefix,
}: {
  dict: Dictionary;
  i18nPrefix: string;
}) {
  const { isSignedIn } = useAuth();
  const isHome = usePathname() === i18nPrefix;

  return (
    <div className="flex items-center space-x-4">
      {isSignedIn && (
        <Link href={`/dashboard`} className="text-gray-600 hover:text-blue-600">
          {dict.header.dashboard}
        </Link>
      )}
      {isHome && (
        <>
          <a
            href="https://twitter.com/Yangorz/status/1831610190518698431"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
            aria-label="Twitter Announcement"
          >
            <TwitterLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/oseau/anymem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
            aria-label="GitHub Repository"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
        </>
      )}
      <UserButton />
    </div>
  );
}
