
import { headers } from 'next/headers'
export async function POST(req: Request){
    const { comment } = await req.json();
    const headersList = headers()
    const referer = headersList.get('referer')
   
    if(referer && referer.startsWith(process.env.BASE_URL as string))
        {
            const response = await fetch(process.env.WEB_SERVICE_URL as string, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment }),
                })
                
            const data = await response.json() 
               
            return Response.json(data);
        }

   return Response.json({ message: "UnAuthorized",description:"This API only use on our website" }, { status: 401 })
}
