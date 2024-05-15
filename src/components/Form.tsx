import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../data/categories";
import type { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export const Form = () => {
  const { state, dispatch } = useActivity();

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id); //Para detectar si es número
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value, // si es verdadero lo convierte en número sino lo guarda como string
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0; // Confirma si el name no está vacío y las calorías sean mayor a 0 y devuelve un true
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() }); //guarda el state y llama la función para crear un id diferente
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="category">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="name">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="calories">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        ></input>
      </div>
      <input
        type="submit"
        className="bg-gray-800 w-full p-2 font-bold uppercase text-white cursor-pointer hover:bg-gray-900 disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      ></input>
    </form>
  );
};
