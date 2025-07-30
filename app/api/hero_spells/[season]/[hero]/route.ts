import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { existsSync} from "fs";

export async function GET( 
    request :NextRequest,
    {params} : {params: {season: string,hero: string}}
) {
    const {season,hero} = await params;

const filePath = path.join(process.cwd(), "data",season,`${hero}.json`);

if(!existsSync(filePath)){
    return NextResponse.json({ error: "Hero not found" }, { status: 404 });
}

try{
    const fileContent = await readFile(filePath, "utf-8");
    const heroData = JSON.parse(fileContent);
    return NextResponse.json(heroData, { status: 200 });
}
catch (error) {
    console.log("Error reading file ",error)
    return NextResponse.json({ error: "Failed to read hero data" }, { status: 500 });
}};