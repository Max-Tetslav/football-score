import React, {useMemo} from "react";

export function useCalendar(range ,data){
  const rangeMatches = useMemo(() => {
    console.log(data);
    if (range[0] === '' && range[1] === '') return data;

    return data.filter(item => {
      const start = range[0].split('/').reverse().map((item, index) => {
        if(index === 1){
          item = Number(item) - 1;
        }
        return Number(item);
      });

      const end = range[1].split('/').reverse().map((item, index) => {
        if(index === 1){
          item = Number(item) - 1;
        }
        return Number(item);
      });

      const itemDate = new Date(item.utcDate).getTime();
      const startRange = new Date(...start).getTime();
      const endRange = new Date(...end).getTime();

      return itemDate >= startRange && itemDate <= endRange;
    })
  }, []);

  return rangeMatches;
}