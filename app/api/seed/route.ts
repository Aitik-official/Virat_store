import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import SiteMedia from "@/models/SiteMedia";
import { products as seedProducts } from "@/lib/products-data";
import { defaultSiteMedia } from "@/lib/site-assets";

export async function POST() {
  try {
    await connectToDatabase();

    // 1. Seed Products if empty
    const productCount = await Product.countDocuments();
    let seededProductsCount = 0;
    if (productCount === 0) {
      const formatted = seedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        gender: p.gender,
        category: p.category,
        sport: p.sport || "cricket",
        price: p.price,
        originalPrice: p.originalPrice,
        badge: p.badge,
        image: p.image,
        images: p.images || [p.image],
        description: p.description,
        features: p.features || [],
        sizes: p.sizes || ["S", "M", "L", "XL"],
        colors: p.colors || [],
        inStock: p.inStock ?? true,
        rating: p.rating || 4.8,
        reviewsCount: p.reviewsCount || 0,
        videoUrl: p.videoUrl,
        actionVideoUrl: p.actionVideoUrl,
      }));
      await Product.insertMany(formatted);
      seededProductsCount = formatted.length;
    }

    // 2. Seed SiteMedia if empty
    let mediaDoc = await SiteMedia.findOne({ key: "active_config" });
    let mediaCreated = false;
    if (!mediaDoc) {
      mediaDoc = await SiteMedia.create({
        key: "active_config",
        ...defaultSiteMedia,
      });
      mediaCreated = true;
    }

    return NextResponse.json({
      success: true,
      message: "Database check / seed completed successfully.",
      productCount: productCount === 0 ? seededProductsCount : productCount,
      mediaConfigured: true,
      mediaCreated,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to seed database",
      },
      { status: 500 }
    );
  }
}
