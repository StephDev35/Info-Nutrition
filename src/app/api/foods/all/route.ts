import { foods } from "@/app/data";

export async function GET() {

    return Response.json(foods);
    
}