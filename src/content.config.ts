import { file, glob } from "astro/loaders";
import { z, defineCollection, reference } from "astro:content";

const guideContributor = z.object({
    name: z.string(),
    detail: z.string(),
    avatar: z.string().url()
})

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

const guideCollection = defineCollection({
    loader: glob({ pattern: '*/index.{mdx,md}', base: './src/content/guides'}),
    schema: ({ image }) => z.object({
        title: z.string().max(100, 'The title length must be less than or equal to 100 chars'),
        description: z.string(),
        heroDescription: z.string(),
        overview: z.string(),
        category: z.string().optional(),
        tags: z.array(z.string()),
        order: z.number(),
        themeColor: z.string(),
        codeGithubUrl: z.string().url().optional(),
        toc: z.array(z.string()).optional(),
        coverImagePath: image().optional(),
        thumbImagePath: image().optional(),
        contributorCount: z.string().optional(),
        authors: z.array(reference('author')),
        twitterShareText: z.string().optional(),
        date: z.date(),
        startAt: reference('chapter').optional(),
        chapters: z.array(reference('chapter')),
        needs: z.array(z.string()).optional(),
    })
})

const chapterCollection = defineCollection({
    loader: glob({ pattern: '**/chapters/**/*.{mdx,md}', base: './src/content/guides'}),
    schema: ({ image }) => z.object({
        title: z.string().max(100, 'The title length must be less than or equal to 100 chars'),
        tocTitle: z.string().max(50, 'The tocTitle length must be less than or equal to 50 chars'),
        description: z.string(),
        tags: z.array(z.string()),
        // image: '/static/images/astro-get-up-and-running/banner.png'
        seriesKey: z.string().optional(),
        seriesOrdinal: z.number().optional(),
        published: z.boolean(),
        publishedAt: z.date(),
        updatedAt: z.date().optional(),
        commit: z.string().optional(),
        authors: z.array(guideContributor).optional(),
    })
})

export const collections = {
    'guide': guideCollection,
    'chapter': chapterCollection,
    'author': authorCollection
}
