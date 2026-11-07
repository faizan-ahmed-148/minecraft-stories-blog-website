//LoadingBar.jsx
"use client";
import { useOnNavigate } from "@/app/hook/useOnNavigate";
import styles from "./LoadingBar.module.css";

export default function LoadingBar() {
  const loading = useOnNavigate();
  return (
    <div
      aria-busy={loading}
      className={styles?.loading}></div>
  );
}