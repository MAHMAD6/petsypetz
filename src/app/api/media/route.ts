import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const media = await db.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, url, title, description, thumbnailUrl } = body;
    
    if (!type || !url) {
      return NextResponse.json({ error: "Type and URL are required" }, { status: 400 });
    }

    const newMedia = await db.media.create({
      data: {
        type,
        url,
        title,
        description,
        thumbnailUrl,
      },
    });

    return NextResponse.json(newMedia);
  } catch (error) {
    console.error("Error creating media:", error);
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 });
  }
}
