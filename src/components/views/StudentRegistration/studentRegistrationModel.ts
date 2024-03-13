import React from "react";

export default interface IUserStudent {
    idEstudiante: number;
    estudiante: string;
    salon: string;
    materia: string;
    asistencia: boolean;
}

export const initialUserStudent: IUserStudent = {
    idEstudiante: 0,
    estudiante: "",
    salon: "",
    materia: "",
    asistencia: false
};

export interface IModalStudenRegistrationProps {
    student: IUserStudent;
    setStudent: React.Dispatch<React.SetStateAction<IUserStudent>>;
    guandarEstudiante: () => Promise<void>; 
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}