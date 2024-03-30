import { ProfileAvatar } from "@/components/ProfileAvatar"
import { getServerSession } from "next-auth"
import db from "../../../../prisma/db"
import { redirect } from "next/navigation";

export default async function Profile () {

    const session = await getServerSession()

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/profile");
    }

    const user = await db.user.findFirst({ where: {
        email: session.user.email
    } })

    return (<>
        <ul style={{ color: '#888' }}>
            <li>
                {user.name}
            </li>
            <li>
                <ProfileAvatar user={user}/>
            </li>
        </ul>
    
    </>)
}