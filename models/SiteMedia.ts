import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShowcaseProductItem {
  productSlug: string;
  tag: string;
  quickDescription: string;
  reel1Title: string;
  reel1Label: string;
  reel1Video: string;
  reel2Title: string;
  reel2Label: string;
  reel2Video: string;
}

export interface ISiteMedia extends Document {
  key: string; // Identifier like "active_config"
  logo: string;
  heroBanners: string[];
  promotionalSlides: Array<{ findGame?: string; cricketAction?: string }>;
  promotionalSection: {
    leftPoster: string;
    rightPoster: string;
  };
  categories: {
    men: string;
    women: string;
    youth: string;
    cap: string;
    kitbags: string;
    accessories: string;
  };
  videoThumbnail: string;
  mainVideo: string;
  actionReelVideo: string;
  teamwearBanner: string;
  teamwearSlides: string[];
  partnerLogos: string[];
  showcaseProducts: IShowcaseProductItem[];
  updatedAt: Date;
}

const ShowcaseProductSchema = new Schema<IShowcaseProductItem>(
  {
    productSlug: { type: String, required: true },
    tag: { type: String, default: "" },
    quickDescription: { type: String, default: "" },
    reel1Title: { type: String, default: "" },
    reel1Label: { type: String, default: "" },
    reel1Video: { type: String, default: "" },
    reel2Title: { type: String, default: "" },
    reel2Label: { type: String, default: "" },
    reel2Video: { type: String, default: "" },
  },
  { _id: false }
);

const SiteMediaSchema = new Schema<ISiteMedia>(
  {
    key: { type: String, default: "active_config", unique: true },
    logo: { type: String, default: "/images/logo.png" },
    heroBanners: { type: [String], default: [] },
    promotionalSlides: { type: Schema.Types.Mixed, default: [] },
    promotionalSection: {
      leftPoster: { type: String, default: "" },
      rightPoster: { type: String, default: "" },
    },
    categories: {
      men: { type: String, default: "" },
      women: { type: String, default: "" },
      youth: { type: String, default: "" },
      cap: { type: String, default: "" },
      kitbags: { type: String, default: "" },
      accessories: { type: String, default: "" },
    },
    videoThumbnail: { type: String, default: "" },
    mainVideo: { type: String, default: "" },
    actionReelVideo: { type: String, default: "" },
    teamwearBanner: { type: String, default: "" },
    teamwearSlides: { type: [String], default: [] },
    partnerLogos: { type: [String], default: [] },
    showcaseProducts: { type: [ShowcaseProductSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const SiteMedia: Model<ISiteMedia> =
  mongoose.models.SiteMedia || mongoose.model<ISiteMedia>("SiteMedia", SiteMediaSchema);

export default SiteMedia;
