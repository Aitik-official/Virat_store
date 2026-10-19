import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import StoreTaxonomy from "@/models/StoreTaxonomy";
import { defaultTaxonomyConfig } from "@/lib/store-taxonomy";

export async function GET() {
  try {
    await connectToDatabase();
    let config = await StoreTaxonomy.findOne({ key: "active_taxonomy" }).lean();

    if (!config) {
      config = await StoreTaxonomy.create({
        key: "active_taxonomy",
        ...defaultTaxonomyConfig,
      });
    } else if (!config.mainCategories || config.mainCategories.length === 0) {
      // Auto-populate default main categories for existing database documents
      config = await StoreTaxonomy.findOneAndUpdate(
        { key: "active_taxonomy" },
        { $set: { mainCategories: defaultTaxonomyConfig.mainCategories } },
        { returnDocument: 'after' }
      ).lean();
    }

    return NextResponse.json({ success: true, taxonomy: config });
  } catch (error: any) {
    console.error("GET /api/taxonomy error:", error);
    return NextResponse.json({
      success: true,
      taxonomy: defaultTaxonomyConfig,
      fallback: true,
      error: error.message,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const updated = await StoreTaxonomy.findOneAndUpdate(
      { key: "active_taxonomy" },
      { $set: body },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, taxonomy: updated });
  } catch (error: any) {
    console.error("PUT /api/taxonomy error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update taxonomy" },
      { status: 500 }
    );
  }
}
