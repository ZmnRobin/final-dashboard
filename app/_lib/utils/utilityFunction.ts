import Cookies from "js-cookie";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (dateStr: any, locale: any) => {
  const date = new Date(dateStr);
  const options: Object = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: any) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month: any) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const getTokenFromCookies = () => {
  return Cookies.get("token");
};

export const getRoleFromCookies = () => {
  return Cookies.get("role");
};
export const formatTimeToLocal = (timeStr: any, locale: any) => {
  const time = new Date(timeStr);

  const options: Object = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(time);
};
