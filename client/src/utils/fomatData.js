/**
 * hàm format tiền tệ việt nam
 * @param {*} money chuỗi tiền tệ cần format
 * @returns chuỗi tiền tệ đã được  format
 * Author:DHT(11/09/023)
 */

export const formatMoney = (money) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatDate = () => {};

export const formatEmail = () => {};
