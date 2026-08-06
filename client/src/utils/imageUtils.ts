/**
 * Utility to process and format image URLs across the application.
 * Automatically converts Google Drive share/view links into direct image URLs
 * playable within standard HTML <img> tags.
 */
export function formatImageUrl(url: string | undefined | null): string {
  if (!url) return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop';
  const trimmed = url.trim();

  // Handle Google Drive file link variants:
  // - https://drive.google.com/file/d/192gG8N1hrDuVLeR7ZE0HM4aFr1_swayh/view?usp=drive_link
  // - https://drive.google.com/file/d/192gG8N1hrDuVLeR7ZE0HM4aFr1_swayh/view
  // - https://drive.google.com/open?id=192gG8N1hrDuVLeR7ZE0HM4aFr1_swayh
  // - https://drive.google.com/uc?id=192gG8N1hrDuVLeR7ZE0HM4aFr1_swayh
  // - https://lh3.googleusercontent.com/d/192gG8N1hrDuVLeR7ZE0HM4aFr1_swayh
  const googleDriveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/;
  const match = trimmed.match(googleDriveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

/**
 * Handle onError event for <img> elements to fallback to a backup thumbnail/placeholder if loading fails.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  originalUrl?: string
) {
  const target = e.currentTarget;
  
  // If it's a googleusercontent link, try drive.google.com thumbnail endpoint as fallback
  if (target.src.includes('lh3.googleusercontent.com/d/')) {
    const fileId = target.src.split('/d/')[1];
    if (fileId) {
      target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
      return;
    }
  }

  // Generic fallback image
  const defaultFallback = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop';
  if (target.src !== defaultFallback) {
    target.src = defaultFallback;
  }
}
