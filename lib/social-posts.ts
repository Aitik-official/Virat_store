export type SocialPlatform = 'instagram' | 'facebook' | 'x'

export type SocialPost = {
  id: string
  platform: SocialPlatform
  accountName: string
  profileImage?: string
  imageUrl?: string
  videoUrl?: string
  caption?: string
  postUrl?: string
  publishedAt?: string
  likeCount?: number
  mediaType: 'image' | 'video'
}

export const socialPosts: SocialPost[] = [
  {
    id: 'post-1',
    platform: 'instagram',
    accountName: 'viratsports',
    imageUrl: '/images/banner1.jpeg',
    caption: '🏏 Game day is every day. Suit up in the gear built for champions. #NeverGiveUp #ViratSports',
    publishedAt: '2 days ago',
    likeCount: 4821,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
  {
    id: 'post-2',
    platform: 'instagram',
    accountName: 'viratsports',
    imageUrl: '/images/banner2.jpeg',
    caption: '⚡ Performance meets passion. Our new cricket jersey collection is here — drop everything. #ViratPerformance',
    publishedAt: '4 days ago',
    likeCount: 3650,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
  {
    id: 'post-3',
    platform: 'facebook',
    accountName: 'Virat Sports Official',
    imageUrl: '/images/banner3.jpeg',
    caption: 'Train hard, play harder. Built for the cricket pitch, designed for winners. Shop the latest collection now.',
    publishedAt: '5 days ago',
    likeCount: 2190,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
  {
    id: 'post-4',
    platform: 'x',
    accountName: '@viratsports',
    imageUrl: '/images/banner4.jpeg',
    caption: 'Relentless on and off the pitch. New season. New gear. Same hunger. 🏏🔥 #Cricket #ViratSports',
    publishedAt: '1 week ago',
    likeCount: 1870,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
  {
    id: 'post-5',
    platform: 'instagram',
    accountName: 'viratsports',
    imageUrl: '/images/banner5.jpeg',
    caption: '💪 The field is your stage. Make every move count. #BuiltDifferent #ViratPerformance',
    publishedAt: '1 week ago',
    likeCount: 5340,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
  {
    id: 'post-6',
    platform: 'facebook',
    accountName: 'Virat Sports Official',
    imageUrl: '/images/banner6.jpeg',
    caption: 'Champions are made in training. Our performance range keeps you ready for every battle. Shop now.',
    publishedAt: '10 days ago',
    likeCount: 2780,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
  {
    id: 'post-7',
    platform: 'x',
    accountName: '@viratsports',
    imageUrl: '/images/banner7.jpeg',
    caption: 'From the crease to the streets — Virat Sports has you covered every step of the way. 🙌 #NeverGiveUp',
    publishedAt: '2 weeks ago',
    likeCount: 3120,
    mediaType: 'image',
    postUrl: '#see-it-in-action',
  },
]

export const contactDetails = {
  intro: 'Have a question about an order, teamwear, or sizing? Leave us a message and our support team will get back to you.',
  email: '',
  phone: '',
  address: '',
  hours: '',
}

export const footerConfig = {
  logo: '',
  tagline: 'Performance wear for the game. Sportswear for everything after it.',
  shop: ['New arrivals', "Men's", 'Women', 'Cricket', 'Accessories'],
  sports: ['Cricket', 'Football', 'Shooting', 'Training', 'India merchandise', 'Shop outlet'],
  categories: ['Tops', 'Polos', 'Sleeveless', 'Long sleeves', 'Jackets & hoodies', 'Shorts', 'Pants & leggings', 'Tracksuits'],
  support: ['Contact', 'Shipping', 'Returns', 'Size guide'],
}

export const platformLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
}
