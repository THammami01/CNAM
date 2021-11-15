export const getThemeFromLocalStorage = () => {
  let isDarkTheme = false;
  if (localStorage.getItem("selectedTheme") === "dark") isDarkTheme = true;
  else if (document.body.getAttribute("theme-mode") === "dark")
    isDarkTheme = true;

  return isDarkTheme;
};

export const saveThemeInLocalStorage = (isDarkTheme: boolean) => {
  localStorage.setItem("selectedTheme", isDarkTheme ? "dark" : "light");
};

export const getSelectedLangFromLocalStorage = () => {
  return localStorage.getItem("selectedLang") || "fr";
};

export const saveSelectedLangInLocalStorage = (selectedLang: string) => {
  return localStorage.setItem("selectedLang", selectedLang);
};

export const getRegularDateStr = (date: Date): undefined | string => {
  const tempDate = new Date(date);
  if (tempDate.toString() !== "Invalid Date")
    return `${tempDate.getDate().toString().padStart(2, "0")}-${(
      tempDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${tempDate.getFullYear()}`;
};

const calculateSum = (arr: [number]): number => {
  return arr.reduce((a, b) => a + b, 0);
};

const exceeds60Days = (consultationDate: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // 60 Days * 24 Hours * 60 Minutes * 60 Seconds * 1000 Ms = 5184000000 Ms
  return today.getTime() - consultationDate.getTime() > 5184000000;
};

export const getEntryRes = (finalEntryData: any) => {
  if (exceeds60Days(finalEntryData.consultationData.consultationDate))
    return {
      status: "Rejected",
      reason: "Consultation date exceeds 60 Days.",
    };

  const totalMedsAndAnaylyzes = calculateSum(
    finalEntryData.medsAndAnaylizesData.map((el: any) => +el.price)
  );

  return totalMedsAndAnaylyzes > 200
    ? {
        status: "Medical check up",
        reason: "Total prices are more than the limit (200 TND).",
      }
    : { status: "Accepted" };
};
