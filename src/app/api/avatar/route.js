import { put, del } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function POST(request) {

    const { user } = await getServerSession()
    const filename = user.email
    const dbuser = await db.user.findFirst({ where: { 
        email: user.email
    } })

    if (dbuser.image?.includes('vercel-storage.com')) {
        console.log('deletar', dbuser.image)
        del(dbuser.image)
    }

    const blob = await put(filename, request.body, {
        access: 'public',
    });

    await db.user.update({
        where: {
            email: user.email
        },
        data: {
            image: blob.url
        }
    })

    return NextResponse.json({
        url: blob.url
    });
    
}
