"use client";

import { useState } from "react";
import { SHOP_PHONE } from "@/lib/constants";

// Orders are saved on Day 6 and paid on Day 7 (docs/full-flow.md §11).
// Until then submitting only shows this notice; nothing leaves the browser.
const NOT_YET = `Онлайн захиалга удахгүй нээгдэнэ. Одоогоор ${SHOP_PHONE} дугаарт залгаж захиална уу.`;

export function useCheckoutSubmit() {
  const [notice, setNotice] = useState<string | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(NOT_YET);
  };
  return { notice, onSubmit };
}
