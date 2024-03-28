'use server'

import { revalidatePath } from "next/cache";
import db from "../../prisma/db";
import { getServerSession,  } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function incrementThumbsUp(post) {

    // await new Promise((resolve) => setTimeout( resolve, 3500))

    await db.post.update({
        where: {
            id: post.id
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })

    revalidatePath('/')
    revalidatePath(`/${post.slug}`)
}

export async function postComment(post, formData) {
    const session = await getServerSession(options)

    await db.comment.create({
        data: {
            text: formData.get('text'),
            authorId: session.user.id,
            postId: post.id
        }
    })

    revalidatePath('/')
    revalidatePath(`/${post.slug}`)
}

export async function postReply(parent, formData) {
    const session = await getServerSession(options)
    // console.log(session)

    const post = await db.post.findFirst({
        where: {
            id: parent.postId
        }
    })

    await db.comment.create({
        data: {
            text: formData.get('text'),
            authorId: session.user.id,
            postId: post.id,
            parentId: parent.parentId ?? parent.id
        }
    })
    revalidatePath(`/${post.slug}`)
}