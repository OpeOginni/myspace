import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    // WHEN A USER FOLLOWS ANOTHER USER
    const session = await getServerSession(authOptions)
    const currentUserEmail = session?.user?.email!;
    const { targetUserId } = await req.json()

    const currentUserId = await prisma.user.findUnique({
        where: { email: currentUserEmail }
    }).then((user) => user?.id!)


    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId
        },
    })

    return NextResponse.json(record)
}

export async function DELETE(req: NextRequest) {
    // WHEN A USER UNFOLLOWS ANOTHER USER
    const session = await getServerSession(authOptions)
    const currentUserEmail = session?.user?.email!;
    const targetUserId = req.nextUrl.searchParams.get("targetUserId"); // We get the target user id form the endpoint params


    const currentUserId = await prisma.user.findUnique({
        where: { email: currentUserEmail }
    }).then((user) => user?.id!)

    const record = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: targetUserId!,
            }
        }
    })
    return NextResponse.json(record)


}