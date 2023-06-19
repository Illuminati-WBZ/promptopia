// GET
import Prompt from "@/models/prompt";
import { ConnectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return NextResponse("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// patch (update)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await ConnectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return NextResponse.json("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (err) {
    return NextResponse.json("Failed to update prompt", { status: 500 });
  }
};

// delete
export const DELETE = async (req, { params }) => {
  try {
    await ConnectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return NextResponse.json("prompt deleted successfully", { status: 200 });
  } catch (err) {
    return NextResponse.json("Failed to delete prompt", { status: 500 });
  }
};
