export function getRegionalLanguage() {
  const locale = navigator.language.toLowerCase();

  if (locale.includes("hi")) return "hi";
  if (locale.includes("ta")) return "ta"; 
  if (locale.includes("te")) return "te"; 
  if (locale.includes("ml")) return "ml"; 
  if (locale.includes("kn")) return "kn"; 
  if (locale.includes("bn")) return "bn"; 
  if (locale.includes("mr")) return "mr"; 

  return "en"; // fallback
}
