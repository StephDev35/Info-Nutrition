import { foods } from "@/app/data";

export async function GET(
  request: Request,
  { params }: { params: { nameAliment: string } }
) {
  const index = foods.findIndex(food => 
    food.name.toLowerCase().replace(/ /g, '-') === params.nameAliment
  );

  if (index !== -1) {
    return new Response(JSON.stringify(foods[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ error: "Food not found" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
