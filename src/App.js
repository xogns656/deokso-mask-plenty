import React, { useState, useEffect } from "react";
import List from "./Component/List";
const App = () => {
  const [maskData, setMaskData] = useState();

  useEffect(() => {
    const intervalID = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude: lat, longitude: lng } = position.coords;
        const requestUrl =
          process.env.REACT_APP_MASK_URL + `lat=${lat}&lng=${lng}&m=2000`;

        const maskDataRequest = await fetch(requestUrl);
        if (maskDataRequest.status === 200) {
          const getData = await maskDataRequest.json();
          const { stores } = getData;
          let filterData = [];
          filterData = stores.filter(
            curr => curr.remain_stat !== "empty" && curr.remain_stat !== "break"
          );
          filterData.sort((a, b) => {
            const matching = {
              plenty: 2,
              some: 1,
              few: 0,
              empty: -1,
              break: -2
            };

            if (matching[a.remain_stat] > matching[b.remain_stat]) {
              return 1;
            } else if (matching[a.remain_stat] === matching[b.remain_stat]) {
              return 0;
            } else {
              return -1;
            }
          });

          setMaskData(filterData);
        } else {
          alert("DB로 부터 데이터를 가져오지 못했습니다.");
        }
      });
    }, 5000);

    return () => clearInterval(intervalID);
  }, [maskData]);
  return (
    <div className="App">
      {maskData ? (
        maskData.length ? (
          <List maskData={maskData} />
        ) : (
          <h1>
            현재 위치 2km 반경 내의 공적 마스크 물량이 모두 소진되었습니다.
          </h1>
        )
      ) : (
        "데이터를 불러오는 중 입니다."
      )}
    </div>
  );
};

export default App;
