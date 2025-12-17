interface ThumbnailOptions {
  seekTime?: number;
  quality?: number;
  format?: "image/jpeg" | "image/png" | "image/webp";
  maxWidth?: number;
  maxHeight?: number;
}

export interface ThumbnailResult {
  url: string;
  blob: Blob;
  width: number;
  height: number;
  revoke: () => void;
}

export async function generateVideoThumbnail(
  file: File,
  options: ThumbnailOptions = {}
): Promise<ThumbnailResult> {
  if (!file.type.startsWith("video/")) {
    throw new Error(`Invalid file type: ${file.type}. Expected a video file.`);
  }

  const {
    seekTime = 1.0,
    quality = 0.75,
    format = "image/jpeg",
    maxWidth,
    maxHeight,
  } = options;

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const videoUrl = URL.createObjectURL(file);

    video.preload = "metadata";
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("error", (e) => {
      URL.revokeObjectURL(videoUrl);
      reject(new Error(`Error loading video: ${e.message || "Unknown error"}`));
    });

    video.addEventListener("loadedmetadata", () => {
      if (video.duration < seekTime) {
        URL.revokeObjectURL(videoUrl);
        reject(
          new Error(
            `Seek time ${seekTime}s exceeds video duration ${video.duration}s`
          )
        );
        return;
      }

      video.currentTime = seekTime;
    });

    video.addEventListener("seeked", () => {
      try {
        let { videoWidth, videoHeight } = video;

        if (maxWidth || maxHeight) {
          const aspectRatio = videoWidth / videoHeight;

          if (maxWidth && videoWidth > maxWidth) {
            videoWidth = maxWidth;
            videoHeight = videoWidth / aspectRatio;
          }

          if (maxHeight && videoHeight > maxHeight) {
            videoHeight = maxHeight;
            videoWidth = videoHeight * aspectRatio;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(videoUrl);

            if (!blob) {
              reject(new Error("Failed to generate thumbnail blob"));
              return;
            }

            const thumbnailUrl = URL.createObjectURL(blob);

            resolve({
              url: thumbnailUrl,
              blob,
              width: videoWidth,
              height: videoHeight,
              revoke: () => URL.revokeObjectURL(thumbnailUrl),
            });
          },
          format,
          quality
        );
      } catch (error) {
        URL.revokeObjectURL(videoUrl);
        reject(error);
      }
    });

    video.load();
  });
}
