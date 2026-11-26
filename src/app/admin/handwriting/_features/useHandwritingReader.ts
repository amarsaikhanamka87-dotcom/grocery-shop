"use client";

import { useEffect, useState, useTransition } from "react";
import { readHandwriting } from "./readHandwriting";
import { shrinkImage } from "./shrinkImage";

/** Photo side of the handwriting page: chosen photo, its preview, and reading it into text. */
export function useHandwritingReader(onRead: (text: string, scanId: string | null) => void) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReading, startReading] = useTransition();

  // Free the last preview's memory when it changes or the page closes.
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function choosePhoto(chosen: File | null) {
    setFile(chosen);
    setPreviewUrl(chosen ? URL.createObjectURL(chosen) : null);
    setError(null);
  }

  function readPhoto() {
    if (!file) return;
    setError(null);
    startReading(async () => {
      try {
        const result = await readHandwriting(await shrinkImage(file));
        if (result.ok) onRead(result.text, result.scanId);
        else setError(result.error);
      } catch {
        setError("Зургийг нээж чадсангүй. Өөр зураг сонгоно уу.");
      }
    });
  }

  return { file, previewUrl, error, isReading, choosePhoto, readPhoto };
}
