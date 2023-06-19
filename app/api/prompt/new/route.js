import Prompt from "@/models/prompt";
import { ConnectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await ConnectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();
    // return new Response(JSON.stringify(newPrompt), {
    //   status: 201,
    // });
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (err) {
    console.log(err);
    // return new Response("Failed to create a new prompt", {
    //   status: 500,
    // });
    return NextResponse.json("Failed to create a new prompt", { status: 500 });
  }
};
