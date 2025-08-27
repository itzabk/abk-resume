export function getLink(key, fallback = "#") {
  try {
    const v = import.meta.env[key];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
    return fallback;
  } catch {
    return fallback;
  }
}

export function getEmail() {
  try {
    const v = import.meta.env.VITE_EMAIL;
    return typeof v === "string" && v.includes("@") ? v : "you@example.com";
  } catch {
    return "you@example.com";
  }
}
