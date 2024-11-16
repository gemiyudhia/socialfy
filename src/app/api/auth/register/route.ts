import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/firebase/service";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const res = await register(req);
  return NextResponse.json(
    { status: res.status, message: res.message },
    { status: res.statusCode }
  );
}
