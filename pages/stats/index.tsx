import Header from "@/components/header";
import { day, week } from "@/util/api/rcp";
import { makeDate, makeName } from "@/util/function/make";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TodayDataType {
  name: string;
  rate: number;
}

interface WeekDataType {
  date: string;
  바위: number;
  가위: number;
  보: number;
}

interface DayApiDataType {
  hand: string;
  win: number;
}

interface WeekApiDataType {
  hand: string;
  win: number;
  created: string;
}

export default function Stat() {
  const now = new Date();
  const start = makeDate(now);
  const end = makeDate(new Date(now.setDate(now.getDate() + 7)));

  useQuery(["day"], () => day(start), {
    onSuccess: (data) => dayFunction(data),
  });
  useQuery(["week"], () => week(start, end), {
    onSuccess: (data) => {
      weekFunction(data);
    },
  });

  const [todayData, setTodayData] = useState<TodayDataType[]>([]);
  const [weekData, setWeekData] = useState<WeekDataType[]>([]);

  const dayFunction = (data: DayApiDataType[]) => {
    const li: TodayDataType[] = [];
    data.map((value: DayApiDataType) => {
      const name = makeName(value.hand);
      const obj = {
        name: name,
        rate: value.win,
      };
      li.push(obj);
    });
    setTodayData(li);
  };

  const weekFunction = (data: WeekApiDataType[][]) => {
    const li: WeekDataType[] = [];
    data.map((value: WeekApiDataType[]) => {
      const save = value[0].created.substring(0, 10).split("-");
      const date =
        save[0] + "-" + save[1] + "-" + (Number(save[2]) + 1).toString();
      let obj: WeekDataType = {
        date: date,
        바위: 0,
        가위: 0,
        보: 0,
      };
      value.map((value: WeekApiDataType) => {
        if (value.hand === "R") {
          obj = {
            ...obj,
            바위: value.win,
          };
        } else if (value.hand === "C") {
          obj = {
            ...obj,
            가위: value.win,
          };
        } else if (value.hand === "P") {
          obj = {
            ...obj,
            보: value.win,
          };
        }
      });
      li.push(obj);
    });
    setWeekData(li);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pb-20">
      <Header />
      <div className="mt-16 flex flex-col items-center">
        <p className="text-3xl mb-10">오늘 승률</p>
        {todayData.length > 0 ? (
          <>
            <BarChart width={600} height={400} data={todayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" barSize={40} fill="#8884d8" />
            </BarChart>
          </>
        ) : (
          <p className="text-3xl mb-10">오늘 진행된 가위바위보가 없습니다.</p>
        )}
      </div>
      <div className="mt-16 flex flex-col items-center bg-white w-[60%]">
        <p className="text-3xl mb-10">주간 승률</p>
        {weekData.length > 0 ? (
          <>
            <LineChart
              width={1000}
              height={400}
              data={weekData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="바위" stroke="#ff0000" />
              <Line type="monotone" dataKey="가위" stroke="#00ff62" />
              <Line type="monotone" dataKey="보" stroke="#1900ff" />
            </LineChart>
          </>
        ) : (
          <p className="text-3xl mb-10">주간 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
