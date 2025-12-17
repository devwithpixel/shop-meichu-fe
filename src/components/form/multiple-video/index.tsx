"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { maxFileSize } from "@/config/form";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { EyeIcon, UploadIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NoScrollSmootherContent from "@/components/no-scroll-smoother-content";
import { generateVideoThumbnail, ThumbnailResult } from "./helper";
import { Spinner } from "@/components/ui/spinner";

export function MultipleVideo({
  value,
  onChange,
  accept = "video/mp4, video/mov",
  required = false,
  maximumFiles,
  className,
}: {
  value: File[];
  onChange?: (value: File[]) => void;
  accept?: string;
  required?: boolean;
  maximumFiles?: number;
  className?: string;
}) {
  const [videoThumbnails, setVideoThumbnails] = useState<ThumbnailResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  const currentVideoBuffer = useMemo(() => {
    if (!value[selectedIndex ?? 0]) return null;

    return URL.createObjectURL(value[selectedIndex ?? 0]);
  }, [value, selectedIndex]);

  useEffect(() => {
    const generateThumbnails = async () => {
      const results = await Promise.all(
        value.map((file) => generateVideoThumbnail(file))
      );
      setVideoThumbnails(results);
    };

    generateThumbnails();

    return () => {
      for (const thumbnail of videoThumbnails) {
        thumbnail.revoke();
      }
    };
  }, [value]);

  useEffect(() => {
    return () => {
      if (currentVideoBuffer) {
        URL.revokeObjectURL(currentVideoBuffer);
      }
    };
  }, [currentVideoBuffer]);

  const onFilesChange = useCallback(
    (newFiles: File[]) => {
      onChange?.(newFiles);
    },
    [onChange]
  );

  const onOpenPreview = useCallback((index: number) => {
    setSelectedIndex(index);
    setShowPreviewDialog(true);
  }, []);

  return (
    <>
      <FileUpload
        value={value}
        onValueChange={onFilesChange}
        accept={accept}
        maxFiles={maximumFiles}
        multiple={(maximumFiles || 0) > 1}
        className={cn("w-full", className)}
        required={required}
      >
        {maximumFiles && value.length === maximumFiles ? null : (
          <FileUploadDropzone className="min-h-32">
            <div className="flex flex-col items-center gap-2 text-center">
              <UploadIcon className="size-8 text-muted-foreground" />
              <div className="space-y-2">
                <p className="font-medium text-sm">
                  Drop images here or click to upload
                </p>
                <p className="text-muted-foreground text-xs">
                  PNG & JPG up to {maxFileSize / 1024 / 1024} MB
                </p>
                {maximumFiles && (
                  <p className="text-muted-foreground text-xs">
                    Maximum {maximumFiles} files allowed
                  </p>
                )}
              </div>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </FileUploadTrigger>
            </div>
          </FileUploadDropzone>
        )}
        <FileUploadList className="max-h-96 overflow-y-auto">
          {value.map((file, index) => {
            return (
              <FileUploadItem key={index} value={file}>
                <FileUploadItemPreview
                  render={(originalFile) =>
                    videoThumbnails[index] ? (
                      <img
                        src={videoThumbnails[index]?.url}
                        alt={originalFile.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Spinner />
                    )
                  }
                />
                <FileUploadItemMetadata />
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onOpenPreview(index)}
                  >
                    <EyeIcon />
                  </Button>
                  <FileUploadItemDelete asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-destructive/30 hover:text-destructive-foreground dark:hover:bg-destructive dark:hover:text-destructive-foreground"
                    >
                      <XIcon />
                    </Button>
                  </FileUploadItemDelete>
                </div>
              </FileUploadItem>
            );
          })}
        </FileUploadList>
      </FileUpload>

      <NoScrollSmootherContent>
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Preview Video</DialogTitle>
              <DialogDescription>
                Preview the video for {value[selectedIndex ?? 0]?.name}
              </DialogDescription>
            </DialogHeader>
            {currentVideoBuffer && (
              <div className="w-full h-96 dark:bg-gray-900 bg-gray-50 border rounded-lg">
                <video
                  className="w-full h-full object-contain mx-auto"
                  src={currentVideoBuffer}
                  controls
                />
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => setShowPreviewDialog(false)}
                variant="outline"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </NoScrollSmootherContent>
    </>
  );
}
