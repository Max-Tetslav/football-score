import {useMemo} from "react";

export function useSearching(string, data){
  const searchingItems = useMemo(() => {
    return data.filter(item => item.name.toLocaleLowerCase().includes(string.toLocaleLowerCase()));
  },[string, data]);

  return searchingItems;
}
