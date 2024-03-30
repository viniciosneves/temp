import { ProfileAvatar } from "@/components/ProfileAvatar"
import { getServerSession } from "next-auth"

export default async function Profile () {

    const { user } = await getServerSession()

    return (<>
        <ul>
            <li>
                {user.name}
            </li>
            <li>
                <ProfileAvatar user={user}/>
            </li>
        </ul>
    
    </>)
}