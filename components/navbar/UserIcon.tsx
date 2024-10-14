import { currentUser } from "@clerk/nextjs/server";

import { LuUser2 } from "react-icons/lu";

export default async function UserIcon() {
  const user = await currentUser();
  console.log(user);
  const userProfile = user?.imageUrl;

  if (userProfile) {
    return (
      <img
        src={userProfile}
        alt={"image"}
        className="h-6 w-6 object-cover rounded-full "
      />
    );
  }

  return <LuUser2 className="h-6 w-6 rouded-full text-white" />;
}
