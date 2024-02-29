const isProduction = import.meta.env.MODE === 'production'
let API_ENDPOINT;

if (isProduction) {
  API_ENDPOINT = 'https://enterprise.oakmega.ai/api/v1/server/xinbei/'
} else {
  API_ENDPOINT = 'https://enterprise.oakmega.ai/api/v1/server/xinbei/'

  // 使用 json sever
  // API_ENDPOINT = "http://localhost:3002/";
}
export { API_ENDPOINT };
