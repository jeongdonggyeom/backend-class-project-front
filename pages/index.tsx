import Header from "@/components/header";
import Icon from "@/components/icon";
import { winRate } from "@/util/api/rcp";

import { useQuery } from "react-query";

export default function Home() {
  const { data, isSuccess } = useQuery("wr", () => winRate());

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Header />
      {isSuccess && data.length > 0 ? (
        <>
          <div className="flex gap-10 mt-36">
            <Icon
              image={"scissors"}
              name={data[1].hand}
              rate={data[1].wr}
              hand="C"
            />
            <Icon
              image={"rock"}
              name={data[0].hand}
              rate={data[0].wr}
              hand="R"
            />
            <Icon
              image={"paper"}
              name={data[2].hand}
              rate={data[2].wr}
              hand="P"
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl">데이터를 불러오는중...</p>
        </>
      )}
    </div>
  );
}
