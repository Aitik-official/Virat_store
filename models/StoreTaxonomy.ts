import mongoose, { Schema, Document, Model } from "mongoose";
import {
  defaultTaxonomyConfig,
  type StoreTaxonomyConfig,
} from "@/lib/store-taxonomy";

export interface IStoreTaxonomyDoc extends Document, StoreTaxonomyConfig {
  key: string;
  updatedAt: Date;
}

const MainCategoryItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    showOnNavbar: { type: Boolean, default: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const CategoryItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    parentCategory: { type: String, default: "" },
    sport: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const TagBadgeItemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    bgColor: { type: String, default: "#e51717" },
    textColor: { type: String, default: "#ffffff" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const SportItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const SiteAnnouncementItemSchema = new Schema(
  {
    id: { type: String, default: "" },
    text: { type: String, default: "" },
    linkText: { type: String, default: "" },
    linkHref: { type: String, default: "" },
  },
  { _id: false }
);

const SiteAnnouncementSchema = new Schema(
  {
    enabled: { type: Boolean, default: true },
    text: { type: String, default: "" },
    linkText: { type: String, default: "" },
    linkHref: { type: String, default: "" },
    items: { type: [SiteAnnouncementItemSchema], default: [] },
    bgColor: { type: String, default: "#080d2d" },
    textColor: { type: String, default: "#ffffff" },
  },
  { _id: false }
);

const StoreContactInfoSchema = new Schema(
  {
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    address: { type: String, default: "" },
    hours: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
  { _id: false }
);

const StoreTaxonomySchema = new Schema<IStoreTaxonomyDoc>(
  {
    key: { type: String, default: "active_taxonomy", unique: true },
    mainCategories: { type: [MainCategoryItemSchema], default: defaultTaxonomyConfig.mainCategories },
    categories: { type: [CategoryItemSchema], default: defaultTaxonomyConfig.categories },
    sports: { type: [SportItemSchema], default: defaultTaxonomyConfig.sports },
    badges: { type: [TagBadgeItemSchema], default: defaultTaxonomyConfig.badges },
    sizes: { type: [String], default: defaultTaxonomyConfig.sizes },
    announcement: { type: SiteAnnouncementSchema, default: defaultTaxonomyConfig.announcement },
    contactInfo: { type: StoreContactInfoSchema, default: defaultTaxonomyConfig.contactInfo },
  },
  {
    timestamps: true,
  }
);

if (process.env.NODE_ENV !== "production" && mongoose.models.StoreTaxonomy) {
  delete (mongoose.models as any).StoreTaxonomy;
}

const StoreTaxonomy: Model<IStoreTaxonomyDoc> =
  mongoose.models.StoreTaxonomy ||
  mongoose.model<IStoreTaxonomyDoc>("StoreTaxonomy", StoreTaxonomySchema);

export default StoreTaxonomy;
