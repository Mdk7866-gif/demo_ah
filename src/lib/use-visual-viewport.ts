"use client";

import { useLayoutEffect, type RefObject } from "react";

/** Pin a fixed overlay to the visible screen, including mobile browser chrome. */
export function usePinToVisualViewport(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const pin = () => {
      const viewport = window.visualViewport;
      if (!viewport) {
        return;
      }
      node.style.top = `${viewport.offsetTop}px`;
      node.style.left = `${viewport.offsetLeft}px`;
      node.style.width = `${viewport.width}px`;
      node.style.height = `${viewport.height}px`;
      node.style.bottom = "auto";
      node.style.right = "auto";
    };

    pin();
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", pin);
    viewport?.addEventListener("scroll", pin);
    window.addEventListener("resize", pin);
    return () => {
      viewport?.removeEventListener("resize", pin);
      viewport?.removeEventListener("scroll", pin);
      window.removeEventListener("resize", pin);
      node.style.top = "";
      node.style.left = "";
      node.style.width = "";
      node.style.height = "";
      node.style.bottom = "";
      node.style.right = "";
    };
  }, [active, ref]);
}
