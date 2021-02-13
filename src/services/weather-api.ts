export class WeatherApi {
  getWether = async (cityName: string): Promise<string> => {
    const apiURL = process.env.REACT_APP_API_URL;
    const key = process.env.REACT_APP_API_KEY;
    const requestUrl = `${apiURL}weather?q=${cityName}&appid=${key}`;
    const response = await fetch(`http://${requestUrl}`);
    return await response.text();
  };
}
