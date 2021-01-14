
/**
 * Get url cachedData from back-end. The purpose of this is to reduce calls to third party api, saving money
 */
// const url = `This is me`;

export const getCachedData = async(url:string, mapquestType:string) => {

  const fetchData = mapquestType !== "coords" ? 
  await fetch(`${process.env.REACT_APP_API}/cache/${url}`) :
  await fetch(`${process.env.REACT_APP_API}/cache/show_without_url`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coordsUrl: url
    })
  });

  const data = await fetchData.json();

  // console.log(data);

  if (data.status === "Success") {
    console.log("In Cache :)");
    return data
    // console.log(data);
  } else {
    console.log("Not in Cache");
    const mapquestAPI = (
      mapquestType === "address" ? 
        process.env.REACT_APP_MAPQUEST_GET_DATA_FROM_ADDRESS :
      mapquestType === "coords" ? 
        process.env.REACT_APP_MAPQUEST_GET_ADDRESS_FROM_COORDS :
      process.env.REACT_APP_MAPQUEST_GET_ROUTE
    );

    // console.log(`${mapquestAPI}${url}`);

    const fetchMapquest = await fetch(`${mapquestAPI}${url}`);
    const mapQuestData = await fetchMapquest.json();

    // console.log(mapQuestData);

    interface IMapquest {
      strData: string,
      coordsUrl?: string
    };

    const mapquestParams: IMapquest = { 
      strData: JSON.stringify(mapQuestData) 
    };
    
    if (mapquestType === "coords") {
      mapquestParams.coordsUrl = url
    }

    // console.log(mapquestParams);

    const fetchData = mapquestType !== "coords" ? 
    await fetch(`${process.env.REACT_APP_API}/cache/${url}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapquestParams)
    }) :
    await fetch(`${process.env.REACT_APP_API}/cache/no_url`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapquestParams)
    })  

    const data = await fetchData.json();
    // console.log(data);
    return data;
  }
};

// getCachedData("550 rivera st,sf,ca", "address");
