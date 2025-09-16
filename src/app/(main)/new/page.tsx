"use client";

import Image from "next/image";
import { useState } from "react";

export default function NewPostPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return setFileUrl(null);
    const url = URL.createObjectURL(f);
    setFileUrl(url);
  };
  return (
    <div className="w-full max-w-[560px]">
      <h1 className="text-lg font-semibold mb-4">Create new post</h1>
      <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-black/15 dark:border-white/15 rounded-xl p-8 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
        <span className="text-sm">Click to upload</span>
      </label>
      {fileUrl && (
        <div className="relative mt-4 aspect-[4/5] rounded overflow-hidden bg-black/5 dark:bg-white/5">
          <Image src={fileUrl} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}

