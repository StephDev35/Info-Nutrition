import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function LoadingForm() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col md:flex-row items-center md:items-start w-full">
        {/* Colonne gauche */}
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
          <div className="w-full md:w-1/2 lg:w-1/3 pb-16 md:mb-0 pt-24 pl-52  ">
            {/* Image Skeleton */}
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
          <div className="text-center mt-4">
            {/* Labels pour les macronutriments */}
            <span className="inline-block w-3 h-3 bg-[#F28907] mr-2"></span>{" "}
            Carbohydrates
            <span className="inline-block w-3 h-3 bg-[#5079F2] ml-4 mr-2"></span>{" "}
            Protein
            <span className="inline-block w-3 h-3 bg-[#F2220F] ml-4 mr-2"></span>{" "}
            Fat
          </div>
        </div>

        {/* Colonne droite */}
        <div className="w-full md:w-1/2 lg:w-2/3">
          <div className="text-lg font-semibold mb-4">
            {/* Titre de la section */}
            Information de nutrition par gramme:
          </div>
          <div className="mb-4 p-4 bg-gray-900 text-white rounded-lg shadow-inner">
            <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              {/* Espacement entre les lignes de texte */}
              <div className="space-y-2">
                {/* Skeleton pour les descriptions */}
                <Skeleton className="h-4 w-40" />
                
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {/* Autres éléments de texte */}
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
