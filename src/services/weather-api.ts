export class WeatherApi {
  public apiURL = process.env.REACT_APP_API_URL;
  public key = process.env.REACT_APP_API_KEY;

  public getWeather = async (cityName: string): Promise<string> => {
    const requestURL = `${this.apiURL}weather?q=${cityName}&appid=${this.key}`;
    const response = await fetch(`http://${requestURL}`);
    return await response.text();
  };

  public getGeoWeather = async (lat: number, lon: number) => {
    const requestURL = `${this.apiURL}onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,daily&appid=${this.key}`;
    const response = await fetch(`http://${requestURL}`);
    return await response.text();
  };
}
