import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * GET handler for fetching current user data
 * Returns user info including subscription status
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscription: true,
      },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      subscription: user.subscription,
    })
  } catch (error) {
    console.error("[USER_GET_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

/**
 * PATCH handler for updating user data
 * Allows users to update their profile information
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, image } = body

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        image,
      },
    })

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    })
  } catch (error) {
    console.error("[USER_PATCH_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
