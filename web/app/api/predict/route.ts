import { db } from "@/lib/db";

export async function POST(req: Request){
    const { comment , access_token} = await req.json()

    if(!access_token) return Response.json({ message: "You need to get access_token our website" }, { status: 401 })

    if(!comment) return Response.json({ message: "Comment section cannot be empty" }, { status: 401 })

    const isExist = await db.user.findFirst(
        {
            where :{ 
                access_token: access_token
            }
        }
    )

    if(!isExist) return Response.json({ message: "You need to connect your github our webiste" }, { status: 401 })

    const res = await fetch(process.env.WEB_SERVICE_URL as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment }),
    })
    
    const data = await res.json()

    if(res.status === 200){
        await db.request.create(
            {
                data: {
                    userId: isExist.id
                }
            }
        )
    }

    return Response.json(data);
}
