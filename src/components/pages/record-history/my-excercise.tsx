import { Exercise } from "@/services/client/record-history/record-history.service";
import React from "react";

type Props = {
  excercises: Exercise[];
};

const MyExcercise: React.FC<Props> = ({ excercises }) => {
  return (
    <section id="my-exercise" className="bg-[#414141] p-4 mb-12">
      <div className="flex items-center mb-4">
        <h3 className="text-white text-xl font-bold mr-8">MY EXERCISE</h3>
        <span className="text-white">2021.05.21</span>
      </div>

      <div className="h-[192px] overflow-y-auto pr-[30px] custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {Array.isArray(excercises) &&
            excercises.map((exercise) => (
              <div
                key={exercise?.id}
                className="flex justify-between items-center border-b border-[#777777] py-2"
              >
                <div>
                  <p className="text-white">• {exercise?.name}</p>
                  <p className="text-[#FFCC21] text-sm">
                    {exercise?.calories}kcal
                  </p>
                </div>
                <div className="text-[#FFCC21]">{exercise?.duration} min</div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MyExcercise;
