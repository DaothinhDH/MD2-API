/**
 * hàm format tiền tệ việt nam
 * @param {*} money chuỗi tiền tệ cần format
 * @returns chuỗi tiền tệ đã được  format
 * Author:DHT(11/09/023)
 */

export const formatMoney = (money) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};

/**
 * 
 * @param {*} date : chuỗi thời gian cần định dạng 
 * @returns : định dạng thời gian ngày-tháng-năm
 * author:DHT12/9/2023
 */
export const formatDate = (date) => {
  // lấy ra thời gian định dạng ủa chuỗi dựa vào thời gian thực 
  const today = new Date(date)
  // lấy ra năm
  let year = today.getFullYear();
  // lấy ra tháng
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  // lấy ra ngày
  let day = today.getDate();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }

  // trả ra chuỗi cần định dạng
  return `${day}-${month}-${year}`;
};

