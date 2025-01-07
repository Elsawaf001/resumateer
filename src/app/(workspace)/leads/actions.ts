"use server"

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function createLead(data: { title: string; content: string; userId: string }) {
  const { title, content, userId } = data;
  try {
    const lead = await prisma.lead.create({
      data: {
        title,
        content,
        userId,
      },
    });
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
