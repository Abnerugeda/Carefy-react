import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2';
const urlApi = import.meta.env.VITE_URL_API;

export default async function DeletePaciente(codigoPaciente) {
    
    try {
        const response = await axios.delete(`${urlApi}/pacientes/${codigoPaciente}`)
        if (response.status === 200) {
            Swal.fire("Paciente deletado com sucesso!", "bom trabalho 😎", "success");
            return 200;
          } else if (response.status === 203 || response.status === 202) {
            Swal.fire(
              "Ops!",
               response.data.message + "🫡",
              "success"
            );
          }
        } catch (error) {
          Swal.fire("Ocorreu algum erro😢!", error.message, "error");
          console.error(error)
        }
}
