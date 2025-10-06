import { NextResponse } from "next/server";

// Returns presence (boolean) of required env vars without exposing secrets
export async function GET() {
  const keys = [
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_PUSHER_APP_KEY",
    "NEXT_PUBLIC_PUSHER_APP_CLUSTER",
    "PUSHER_APP_ID",
    "PUSHER_APP_SECRET",
    "SENDGRID_API_KEY",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
  ];

  const presence: Record<string, boolean> = {};
  for (const key of keys) {
    presence[key] = Boolean(process.env[key]);
  }

  return NextResponse.json({
    runtime: process.env.NODE_ENV,
    hasEnv: presence,
    timestamp: new Date().toISOString(),
  });
}


