import { file, glob } from "astro/loaders";
import { z, defineCollection, reference } from "astro:content";


const authorCollection = defineCollection({
    loader: file("src/data/authors.json"),
    schema: z.object({
        id: z.string(),
        name: z.string(),
        detail: z.string(),
        avatarUrl: z.string(),
        xHandle: z.string().optional(),
        githubHandle: z.string().optional()
    })
})


const commonFields = {
    title: z.string().max(100, 'The title length must be less than or equal to 100 chars'),
    description: z.string(),

    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    draft: z.boolean().optional(),

    tags: z.array(z.string()),
    category: z.string(),
    authors: z.array(reference('author')).optional(),
    // Meta fields
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    canonicalUrl: z.string().url().optional(),
    featuredOrder: z.number().optional(), // for prioritizing on homepage
}




const guideCollection = defineCollection({
    loader: glob({ pattern: '*/index.{mdx,md}', base: './src/content/guides'}),
    schema: ({ image }) => z.object({
        ...commonFields,
        heroDescription: z.string(),
        overview: z.string(),
        chapters: z.array(reference('chapter')),
        // startAt: reference('chapter').optional(),
        themeColor: z.string().optional(),
        coverImagePath: image().optional(),
        thumbImagePath: image().optional(),
        twitterShareText: z.string().optional(),
        codeGithubUrl: z.string().url().optional(),
        needs: z.array(z.string()).optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        order: z.number(),
        featuredOrder: z.number().optional(), // for prioritizing on homepage
    })
})

const chapterCollection = defineCollection({
    loader: glob({ pattern: '*/chapters/**/*.{mdx,md}', base: './src/content/guides'}),
    schema: ({ image }) => z.object({
        ...commonFields,
        parentGuide: reference('guide'),
        chapterNumber: z.number(),
        coverImagePath: image().optional(),
        tocTitle: z.string().max(50, 'The tocTitle length must be less than or equal to 50 chars'),
        category: z.string().optional(), // <- override
    })
})

const articleCollection = defineCollection({
    loader: glob({ pattern: '**/*.{mdx,md}', base: './src/content/articles'}),
    schema: ({ image }) => z.object({
        ...commonFields,
        coverImagePath: image().optional(),
        difficulty: z.enum(['quick_tip', 'in_depth', 'walkthrough', 'primer', 'concept']).optional(),
    })
});

export const collections = {
    'guide': guideCollection,
    'chapter': chapterCollection,
    'author': authorCollection, 
    'article': articleCollection
}
