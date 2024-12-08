"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function LogoutButton() {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: "authenticated" | "unauthenticated" | "loading";
  };

  return (
    <div>
      {status === "authenticated" && (
        <>
          <h4>{session?.user?.username}</h4>
          <Button onClick={() => signOut()}>Logout</Button>
        </>
      )}
    </div>
  );
}
