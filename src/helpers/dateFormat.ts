export const formatDate = (date: Date, language = "en") =>
  new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
