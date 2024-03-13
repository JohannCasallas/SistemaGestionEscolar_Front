import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BiSearch, BiTrash, BiPencil } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './studentRegistration.css';
import userStudent, { initialUserStudent } from './studentRegistrationModel';
import ModalStudenRegistration from './studentRegistrationModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { StudentRegistrationController } from './studentRegistrationController';
import Swal from 'sweetalert2';

const StudenRegistrationView: React.FunctionComponent = () => {
    const studentRegistrationController = new StudentRegistrationController();
    const [students, setStudents] = useState<userStudent[]>([]);
    const [student, setStudent] = useState<userStudent>(initialUserStudent);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        consultarEstudiante();
    }, []);

    const buscarEstudiantePorNombre = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const nombre = e.target.value;
        if (nombre.trim() !== "") {
            const studentData = await studentRegistrationController.buscarEstudiantePorNombre(nombre);
            setStudents(studentData);
        } else {
            consultarEstudiante();
        }
    };
    

    const consultarEstudiante = async () => {
        const studentData = await studentRegistrationController.consultarEstudiante();
        setStudents(studentData);
    }

    const guardarEstudiante = async () => {
        const camposValidos = validarCampos();

        if (camposValidos) {
            const studentData = editIndex !== null
                ? await studentRegistrationController.editarEstudiante(student)
                : await studentRegistrationController.guardarEstudiante({ ...student, idEstudiante: 0 });

            setStudent(studentData);
            consultarEstudiante();
            setShowModal(false);

            const successMessage = editIndex !== null
                ? 'Estudiante editado exitosamente.'
                : 'Estudiante guardado exitosamente.';

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: successMessage
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Campos Incompletos',
                text: 'Por favor, completa todos los campos antes de continuar.'
            });
        }
    }

    const validarCampos = () => {
        if (student.estudiante === '' || student.materia === '' || student.salon === '') {
            return false;
        }
        return true;
    }

    const eliminarEstudiante = async (idEstudiante: number) => {

        const confirmacionElminar = await Swal.fire({
            icon: 'warning',
            title: '¿Está seguro?',
            text: 'Está a punto de eliminar el registro del estudiante. ¿Desea continuar?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })

        if (confirmacionElminar) {
            const studentData = await studentRegistrationController.eliminarEstudiante(idEstudiante);
            setStudents(prevStudents => prevStudents.filter(student => student.idEstudiante !== idEstudiante));

            Swal.fire({
                icon: 'success',
                title: 'Estudiante eliminado',
                text: 'El estudiante ha sido eliminado con éxito.'
            });
        }

    }

    const manejarEstadoModal = (index?: number) => {
        if (typeof index === 'number') {
            setStudent(students[index]);
            setEditIndex(index);
        } else {
            setEditIndex(null);
        }
        setShowModal(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, type, value, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setStudent(prevStudent => ({
            ...prevStudent,
            [id]: newValue
        }));
    };

    return (
        <div className="container">
            <div className="student-registration-view">
                <div className="header">
                    <h2>Sistema de Gestión Escolar</h2>
                    <Button className="custom-button" onClick={() => manejarEstadoModal()}>Nuevo estudiante</Button>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onChange={buscarEstudiantePorNombre}
                        />
                        <BiSearch className="search-icon" />
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Salón</th>
                            <th>Materia</th>
                            <th>Asistencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.estudiante}</td>
                                <td>{student.salon}</td>
                                <td>{student.materia}</td>
                                <td>{student.asistencia ? 'Presente' : 'Ausente'}</td>
                                <td>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-edit-${index}`}>Editar</Tooltip>}
                                    >
                                        <span>
                                            <BiPencil
                                                onClick={() => manejarEstadoModal(index)}
                                                className="table-icon edit-icon"
                                            />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Eliminar</Tooltip>}
                                    >
                                        <span onClick={() => eliminarEstudiante(student.idEstudiante)}>
                                            <BiTrash className="table-icon delete-icon" />
                                        </span>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="footer">Total de filas: {students.length}</div>
            </div>
            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setStudent(initialUserStudent);
            }}>
                <Modal.Header closeButton className={editIndex !== null ? 'edit-title' : 'new-title'}>
                    <Modal.Title >
                        {editIndex !== null ? 'Editar Estudiante' : 'Registrar Estudiante'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalStudenRegistration
                        student={student}
                        setStudent={setStudent}
                        guandarEstudiante={guardarEstudiante}
                        handleInputChange={handleInputChange}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default StudenRegistrationView;