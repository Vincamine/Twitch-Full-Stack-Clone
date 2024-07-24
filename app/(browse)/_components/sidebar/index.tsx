import React from "react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommended } from "./recommended";
// import { Following } from "./following";

import { getRecommended } from "@/lib/recommended-service";
// import { getFollwedUser } from "@/lib/follow-service";

export async function Sidebar() {
  const recommended = await getRecommended();
//   const following = await getFollwedUser();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        {/* <Following data={following} /> */}
        <Recommended data={recommended} />
      </div>
      </Wrapper>
  );
}

// export function SidebarSkeleton() {
//   return (
//     <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35 z-50]">
//       <ToggleSkeleton />
//       <FollowingSkeleton />
//       <RecommendedSkeleton />
//     </aside>
//   );
// }