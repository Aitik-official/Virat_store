import { connectToDatabase } from '@/lib/mongodb'
import ProductModel from '@/models/Product'
import { products as fallbackProducts, type Product } from '@/lib/products-data'

/**
 * Server-only helper to fetch a product by slug or id from MongoDB first,
 * falling back gracefully to static products if offline or unreachable.
 */
export async function getProductBySlugOrId(identifier: string): Promise<Product | null> {
  try {
    await connectToDatabase()
    const dbProduct = await ProductModel.findOne({
      $or: [{ id: identifier }, { slug: identifier }],
    }).lean<Product>()

    if (dbProduct) {
      return {
        id: dbProduct.id || String((dbProduct as { _id?: unknown })._id),
        name: dbProduct.name,
        slug: dbProduct.slug,
        gender: dbProduct.gender,
        category: dbProduct.category,
        sport: dbProduct.sport || 'cricket',
        price: Number(dbProduct.price),
        originalPrice: dbProduct.originalPrice ? Number(dbProduct.originalPrice) : undefined,
        badge: dbProduct.badge || undefined,
        image: dbProduct.image,
        images: dbProduct.images?.length ? [...dbProduct.images] : [dbProduct.image],
        description: dbProduct.description,
        features: dbProduct.features || [],
        sizes: dbProduct.sizes || ['S', 'M', 'L', 'XL'],
        colors: (dbProduct.colors || []).map((c) => ({ name: c.name, hex: c.hex, image: c.image })),
        inStock: dbProduct.inStock ?? true,
        rating: dbProduct.rating || 4.8,
        reviewsCount: dbProduct.reviewsCount || 0,
        videoUrl: dbProduct.videoUrl || undefined,
        actionVideoUrl: dbProduct.actionVideoUrl || undefined,
      }
    }

    // Product was not found in MongoDB
    return null
  } catch (error) {
    console.warn('getProductBySlugOrId database error:', error)
    return null
  }
}

/**
 * Server-only helper to get all products from MongoDB
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    await connectToDatabase()
    const dbProducts = await ProductModel.find().sort({ createdAt: -1 }).lean<Product[]>()

    if (dbProducts) {
      return dbProducts.map((p) => ({
        id: p.id || String((p as { _id?: unknown })._id),
        name: p.name,
        slug: p.slug,
        gender: p.gender,
        category: p.category,
        sport: p.sport || 'cricket',
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        badge: p.badge || undefined,
        image: p.image,
        images: p.images?.length ? [...p.images] : (p.image ? [p.image] : []),
        description: p.description,
        features: p.features || [],
        sizes: p.sizes || ['S', 'M', 'L', 'XL'],
        colors: (p.colors || []).map((c) => ({ name: c.name, hex: c.hex, image: c.image })),
        inStock: p.inStock ?? true,
        rating: p.rating || 4.8,
        reviewsCount: p.reviewsCount || 0,
        videoUrl: p.videoUrl || undefined,
        actionVideoUrl: p.actionVideoUrl || undefined,
      }))
    }
  } catch (error) {
    console.warn('getAllProducts database error:', error)
  }

  return []
}
