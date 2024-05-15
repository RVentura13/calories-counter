type CalorieDisplayProps = {
  calories: number;
  text: string;
};

export const CalorieDisplay = ({ calories, text }: CalorieDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1  gap-3 text-center">
      <span
        className={`font-black text-6xl ${
          text === "Consumidas"
            ? "text-lime-500"
            : text === "Ejercicio"
            ? "text-orange-500"
            : "text-white"
        }`}
      >
        {calories}
      </span>
      {text}
    </p>
  );
};
