// Define the structure of your API config
interface ApiConfig {
    api_key: string;
    location_api: string;
    weather_api: string;
    icon_url: string;
  }
  
  // Import the JSON config as a default import
  import apiConfigRaw from './../../../assets/apiConfig.json';
  
  // Cast the imported JSON to the defined interface
  const apiConfig = apiConfigRaw as ApiConfig;
  
  export function getFetchUrl(city: string, country: string) {
    const url =
      `${apiConfig.location_api}direct?q=${city},${country}&limit=3&appid=${apiConfig.api_key}`;
    return url;
  }
  
  export function getUrlFromParams(latitude: number, longitude: number) {
    const url =
      `${apiConfig.weather_api}weather?lat=${latitude}&lon=${longitude}&appid=${apiConfig.api_key}&units=metric`;
    return url;
  }
  
  export function getIconUrl(weatherIcon: string) {
    const url = `${apiConfig.icon_url}${weatherIcon}@2x.png`;
    return url;
  }
  