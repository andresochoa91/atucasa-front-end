
/**
 * Get url cachedData from back-end. The purpose of this is to reduce calls to third party api, saving money
 */

interface IMapquest {
  stringified_data: string,
  coords_url?: string
};

export const getCachedData = async(url:string, mapquestType:string) => {
  try {
    const backendURL = process.env.REACT_APP_API;
  
    const fetchData = mapquestType !== "coords" ? (
      await fetch(`${backendURL}/cache/${url}`)
    ) : (
      await fetch(`${backendURL}/cache/show_no_url`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coords_url: url })
      })
    );
  
    const data = await fetchData.json();
  
    if (data.status === "Success") {
      return data
    } else {
      const mapquestAPI = (
        mapquestType === "address" ? 
          process.env.REACT_APP_MAPQUEST_GET_DATA_FROM_ADDRESS :
        mapquestType === "coords" ? 
          process.env.REACT_APP_MAPQUEST_GET_ADDRESS_FROM_COORDS :
        process.env.REACT_APP_MAPQUEST_GET_ROUTE
      );
      
      const fetchMapquest = await fetch(`${mapquestAPI}${url}`);
      const mapQuestData = await fetchMapquest.json();
  
      const mapquestParams: IMapquest = { 
        stringified_data: JSON.stringify(mapQuestData) 
      };
      
      if (mapquestType === "coords") {
        mapquestParams.coords_url = url
      }
  
      const fetchData = mapquestType !== "coords" ? (
        await fetch(`${backendURL}/cache/${url}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mapquestParams)
        }) 
      ) : (
        await fetch(`${backendURL}/cache/no_url`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mapquestParams)
        })  
      )
  
      const data = await fetchData.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

