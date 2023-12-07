import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const urlApi = import.meta.env.VITE_URL_API;

export default async function DeleteTags(codigoTag) {
  try {
    const response = await axios.delete(`${urlApi}/tags/${codigoTag}`);
    if (response.status === 200) {
      Swal.fire("Tag Deletada!", "bom trabalho 😎", "success");
      return 200;
    } else {
      Swal.fire("Ocorreu algum erro😢!", "", "error");
    }
  } catch (error) {
    Swal.fire("Ocorreu algum erro😢!", error.message, "error");
  }
}
