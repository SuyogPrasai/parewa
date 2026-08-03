import { z } from "zod";

export const SanityImageAssetReferenceSchema = z.object({
	_ref: z.string(),
	_type: z.literal("reference"),
	_weak: z.boolean().optional(),
});

export const SanityImageCropSchema = z.object({
	_type: z.literal("sanity.imageCrop"),
	top: z.number().optional(),
	bottom: z.number().optional(),
	left: z.number().optional(),
	right: z.number().optional(),
});

export const SanityImageHotspotSchema = z.object({
	_type: z.literal("sanity.imageHotspot"),
	x: z.number().optional(),
	y: z.number().optional(),
	height: z.number().optional(),
	width: z.number().optional(),
});

export const SanityImageSchema = z
	.object({
		_type: z.literal("image"),
		asset: SanityImageAssetReferenceSchema.optional(),
		media: z.unknown().optional(),
		hotspot: SanityImageHotspotSchema.optional(),
		crop: SanityImageCropSchema.optional(),
	})
	.refine((image) => Boolean(image.asset?._ref), {
		
		message: "asset._ref is required when image is present",
	});

