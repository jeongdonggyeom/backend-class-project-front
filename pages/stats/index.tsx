import Header from "@/components/header";
import { day } from "@/util/api/rcp";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

interface TodayDataType {
  name: string;
  rate: number;
}

export default function Stat() {
  const save = new Date().toLocaleString().replaceAll(".", "").split(" ");
  const today =
    save[0] + "-" + save[1].padStart(2, "0") + "-" + save[2].padStart(2, "0");
  const { data, isSuccess } = useQuery(["day"], () => day(today));

  console.log(data);

  const [todayData, setTodayData] = useState<TodayDataType[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const li: TodayDataType[] = [];
      data.map((value: { hand: string; win: number }) => {
        const obj = {
          name: value.hand,
          rate: value.win,
        };
        li.push(obj);
      });
      setTodayData(li);
    }
  }, [data, isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Header />
      <div className="mt-16 flex flex-col items-center">
        <p className="text-3xl mb-10">오늘 승률</p>
        <BarChart width={600} height={400} data={todayData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rate" barSize={40} fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
