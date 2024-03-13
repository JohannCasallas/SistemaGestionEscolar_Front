import React from "react";
import IUserStudent from "./studentRegistrationModel";

export class StudentRegistrationController {

  async buscarEstudiantePorNombre(nombre: string): Promise<IUserStudent[]> {
    const response = await fetch(`https://localhost:7122/estudiante/buscarEstudiantePorNombre/${nombre}`);
    return response.json();
  }

  async consultarEstudiante(): Promise<IUserStudent[]> {
    const response = await fetch("https://localhost:7122/estudiante/consultarEstudiante");
    return response.json();
  }

  async guardarEstudiante(student: IUserStudent): Promise<IUserStudent> {
    const response = await fetch('https://localhost:7122/estudiante/guardarEstudiante', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });
    return response.json();
  }

  async eliminarEstudiante(IdStudent: number): Promise<IUserStudent> {
    const response = await fetch(`https://localhost:7122/estudiante/eliminarEstudiante/${IdStudent}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(IdStudent)
    });
    return response.json();
  }

  async editarEstudiante(student: IUserStudent): Promise<IUserStudent> {
    const response = await fetch(`https://localhost:7122/estudiante/editarEstudiante/${student.idEstudiante}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });
    return response.json();
  }

}