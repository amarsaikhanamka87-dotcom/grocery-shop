import { OCR_IMAGE_MAX_SIDE } from "@/lib/constants";

/**
 * Browser only: scales a phone photo down to OCR_IMAGE_MAX_SIDE and re-encodes it as JPEG, so it
 * fits the 1 MB server-action limit. Returns base64 without the "data:" prefix.
 */
export async function shrinkImage(file: File): Promise<{ imageBase64: string; mimeType: "image/jpeg" }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, OCR_IMAGE_MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return { imageBase64: dataUrl.slice(dataUrl.indexOf(",") + 1), mimeType: "image/jpeg" };
}
