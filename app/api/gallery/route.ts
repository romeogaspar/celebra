import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:celebra/*")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const images = result.resources.map((img: any) => ({
      id: img.public_id,
      url: img.secure_url,
      width: img.width,
      height: img.height,
      folder: img.folder,
      category: img.asset_folder
        ? img.asset_folder.split("/").pop()
        : (img.public_id.split("/")[1] ?? "General"),
    }));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 },
    );
  }
}
