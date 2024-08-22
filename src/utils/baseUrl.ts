export const serviceType =
  import.meta.env.VITE_PUBLIC_API_ENV === "live"
    ? "https://zam.zilytst.com"
    : "https://zam.zilytst.com";

export const baseUrl = {
  base: `${serviceType}/api/v1`,
  auth: `${serviceType}/api/v1/user`,
  user: `${serviceType}/api/v1/user`,
};
