export const serviceType =
  import.meta.env.VITE_PUBLIC_API_ENV === "live"
    ? "https://zam.zilytst.com"
    : "https://zam.zilytst.com";
