import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {

    try {
        const session = await getServerSession(authOptions);
        // const currentUserEmail = session?.user?.email!;

        const data = await req.json()
        data.age = Number(data.age)

        // const user = await prisma.user.update({
        //     where: {
        //         email: currentUserEmail,
        //     },
        //     data,
        // })

        const currentUserName = session?.user?.name!;
        const user = await prisma.user.update({
            where: {
                name: currentUserName
            },
            data
        });

        return NextResponse.json(user)
    } catch (e) {
        console.log(e)
        return NextResponse.error()

    }
}