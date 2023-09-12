/**
 * Validate email
 * @param {*} email : chuỗi email cần kiểm tra
 * @returns true nếu đúng định dạng, false nếu sai định dạng
 * Author: DHT(12/09/2023)
 */
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
