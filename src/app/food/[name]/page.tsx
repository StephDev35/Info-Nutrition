"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { IFood } from "@/types";
import { IMacronutrientData } from "@/types";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingForm from "@/components/suspens";
// Définition des types pour les données du graphique
interface DataEntry {
  name: string;
  value: number;
}

// Définition des types pour les props
interface PageFoodProps {
  params: {
    name: string;
  };
}

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PageFood: React.FC<PageFoodProps> = ({ params }) => {
  const router = useRouter();

  const [food, setFood] = useState<IFood | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [macronutriment, setmacronutriment] = useState<IMacronutrientData[]>(
    []
  );

  const FetchFood = async () => {
    try {
      const ApiUrl = `/api/foods/${params.name}`;
      const response = await fetch(ApiUrl);
      const data = await response.json();

      // Macronutriments
      const macronutrimentsDatas: IMacronutrientData[] = [
        { name: "carbohydrates", value: data.carbohydrates },
        { name: "protein", value: data.protein },
        { name: "fat", value: data.fat },
      ];
      setmacronutriment(macronutrimentsDatas);

      // Food General Informations
      setFood(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching Food:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await FetchFood();
    };
    initialize();
  }, [params.name]);

  return (
    <>
      <div className="p-8 text-white">
        <Undo2
          className="cursor-pointer mb-5 text-white"
          onClick={() => router.back()}
        />
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          {params.name}
        </h1>
        {!isLoading && food && macronutriment ? (
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={macronutriment}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {macronutriment.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <span className="inline-block w-3 h-3 bg-[#F28907] mr-2"></span>{" "}
                Carbohydrates
                <span className="inline-block w-3 h-3 bg-[#5079F2] ml-4 mr-2"></span>{" "}
                Protein
                <span className="inline-block w-3 h-3 bg-[#F2220F] ml-4 mr-2"></span>{" "}
                Fat
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3">
              <div className="text-lg font-semibold mb-4">
                Information de nutrition par gramme:
              </div>
              <div className="mb-4 p-4 bg-gray-900 text-white rounded-lg shadow-inner">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-[#F28907] border border-gray-700 mr-3"></div>
                  <div>
                    Carbohydrates:{" "}
                    <span className="font-medium">{food.carbohydrates}g</span>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-[#5079F2] border border-gray-700 mr-3"></div>
                  <div>
                    Protein:{" "}
                    <span className="font-medium">{food.protein}g</span>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-[#F2220F] border border-gray-700 mr-3"></div>
                  <div>
                    Fat: <span className="font-medium">{food.fat}g</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/vitamins.png"
                    width={30}
                    height={30}
                    alt="Vitamins"
                  />
                  <div className="ml-3">
                    <span className="font-semibold">Vitamins:</span>{" "}
                    {food.vitamins?.join(", ")}
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/minerals.png"
                    width={30}
                    height={30}
                    alt="Minerals"
                  />
                  <div className="ml-3">
                    <span className="font-semibold">Minerals:</span>{" "}
                    {food.minerals?.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingForm />
        )}
      </div>
    </>
  );
};

export default PageFood;
