import Prompt from "@/models/prompt";
import { ConnectToDB } from "@/utils/database";
import { headers } from "next/headers";
export const GET = async (req) => {
  const headersList = headers();
  const referer = headersList.get("referer");
  try {
    await ConnectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        referer: referer,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
