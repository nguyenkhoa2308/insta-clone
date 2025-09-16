"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type CreatePostDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreatePostDialog({
  open,
  onClose,
}: CreatePostDialogProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open && fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
  }, [open, fileUrl]);

  useEffect(() => {
    if (!fileUrl) return;
    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (!nextFile) {
      setFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(nextFile);
    setFileUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] overflow-hidden rounded-2xl border border-black/10 bg-background shadow-xl dark:border-white/10">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
            <h2 className="text-lg font-semibold">Create new post</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-black/60 transition-colors hover:text-foreground dark:text-white/60"
            >
              Close
            </button>
          </div>
          <div className="space-y-4 p-6">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-black/15 bg-black/5 p-8 text-sm transition-colors hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
              <span>Click to upload</span>
              <span className="text-xs text-black/60 dark:text-white/60">
                PNG, JPG up to 10MB
              </span>
            </label>
            {fileUrl ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                <Image
                  src={fileUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="text-xs text-black/60 dark:text-white/60">
                No photo selected yet.
              </p>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!fileUrl}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-opacity bg-foreground text-background",
                  !fileUrl && "cursor-not-allowed opacity-50"
                )}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
