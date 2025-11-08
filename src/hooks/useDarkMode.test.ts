import { renderHook, act } from "@testing-library/react";
import { useDarkMode } from "./useDarkMode";
import { test, expect } from "vitest";

test("useDarkMode toggles dark mode", () => {
  const { result } = renderHook(() => useDarkMode());

  // Initial state
  expect(result.current.isDarkMode).toBe(true);
  expect(document.documentElement.classList.contains("dark")).toBe(true);

  // Toggle to light mode
  act(() => {
    result.current.toggleTheme();
  });
  expect(result.current.isDarkMode).toBe(false);
  expect(document.documentElement.classList.contains("dark")).toBe(false);

  // Toggle back to dark mode
  act(() => {
    result.current.toggleTheme();
  });
  expect(result.current.isDarkMode).toBe(true);
  expect(document.documentElement.classList.contains("dark")).toBe(true);
});
