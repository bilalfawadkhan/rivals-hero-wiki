import { NextResponse,NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function GET(
    
){
     const filePath = path.join(process.cwd(), "data", "HeroNames.json");

     if(!existsSync(filePath)){
        return NextResponse.json({ error: "Hero names not found" }, { status: 404 });
     }

try{
    const fileContent = await readFile(filePath, "utf-8");
    const heroNames = JSON.parse(fileContent);
    return NextResponse.json(heroNames,{ status: 200 });
}catch (error) {

    console.log("Error reading file ",error);
    return NextResponse.json({ error: "Failed to read hero names" }, { status: 500 });
}

}
