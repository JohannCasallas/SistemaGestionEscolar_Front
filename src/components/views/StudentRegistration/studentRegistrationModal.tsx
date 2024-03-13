import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './studentRegistrationView';
import { IModalStudenRegistrationProps } from './studentRegistrationModel';

const ModalStudenRegistration: React.FunctionComponent<IModalStudenRegistrationProps> = ({
    student,
    setStudent,
    guandarEstudiante,
    handleInputChange
}) => {
    return (
        <Modal.Body>
            <div className="modal-form">
                <label htmlFor="Estudiante">Nombre del Estudiante:</label>
                <input
                    type="text"
                    id="estudiante"
                    value={student.estudiante}
                    onChange={handleInputChange}
                    className="form-control"
                />
                <label htmlFor="Salon">Salon:</label>
                <input
                    type="text"
                    id="salon"
                    value={student.salon}
                    onChange={handleInputChange}
                    className="form-control"
                />
                <label htmlFor="Materia">Materia:</label>
                <input
                    type="text"
                    id="materia"
                    value={student.materia}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>
            <div className='check-form'>
                <label htmlFor="asistencia">Asistencia</label>
                <input
                    type="checkbox"
                    id="asistencia"
                    checked={student.asistencia}
                    onChange={handleInputChange}
                    className="form-check-input"
                />
            </div>
            <div className="save-button-container">
                <Button className='save-button' variant="primary" onClick={guandarEstudiante}>Guardar</Button>
            </div>
        </Modal.Body>
    );
};

export default ModalStudenRegistration;
