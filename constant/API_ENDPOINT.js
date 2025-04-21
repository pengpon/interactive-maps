const isProduction = import.meta.env.MODE === 'production'
let API_ENDPOINT;

// Demo 直接拿 assets json 資料，不打 API
if (isProduction) {
  API_ENDPOINT = 'https://xxxxx'
} else {
  API_ENDPOINT = 'https://xxxxx'

  // 使用 json sever
  // API_ENDPOINT = "http://localhost:3002/";
}
export { API_ENDPOINT };
