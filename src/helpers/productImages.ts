/**
 * Products used to carry a single `imageURL`. They now carry `imageURLs`, but
 * Firestore documents and carts persisted before the migration still hold the
 * old shape, so every image read goes through these helpers.
 */
type ImageSource = {
  imageURLs?: unknown;
  imageURL?: unknown;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const getImageURLs = (source: ImageSource | null | undefined): string[] => {
  if (!source) return [];
  if (Array.isArray(source.imageURLs)) {
    return source.imageURLs.filter(isNonEmptyString);
  }
  return isNonEmptyString(source.imageURL) ? [source.imageURL] : [];
};

export const getPrimaryImageURL = (
  source: ImageSource | null | undefined,
): string | undefined => getImageURLs(source)[0];
