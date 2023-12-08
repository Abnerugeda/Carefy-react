import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import {
  PencilIcon,
  Plus,
  SearchIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DialogCreatePacientes } from "../Home/components/DialogCreatePacientes";
import { DialogViewTagsPacientes } from "../Home/components/DialogViewTagsPacientes";
import { DialogUpdatePacientes } from "../Home/components/DialogUpdatePacientes";
import DeletePaciente from "../../controller/Pacientes/DeletePaciente";
import Swal from "sweetalert2";

const urlApi = import.meta.env.VITE_URL_API;

const TABLE_HEAD = [
  "Nome",
  "Data de nascimento",
  "Telefone",
  "Código do paciente",
  "",
];

const TABLE_ROWS = [
  {
    img: "https://th.bing.com/th/id/OIP.MxZKNcxakEwIG2dLOvCk4gHaEk?w=257&h=180&c=7&r=0&o=5&pid=1.7",
    name: "Filet à parmegiana",
    amount: "R$198,00",
    date: "11/11",
    status: "pago",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

export function TablePacientes() {
  const [dataPacientes, setDataPacientes] = useState([]);
  const [pesquisar, setPesquisar] = useState("");
  const [dataTags, setDataTags] = useState([]);

  async function fetchFilterTag(codigoTag) {
    try {
      const response = await axios.get(
        `${urlApi}/pacientes/codigoTag/${codigoTag}`
      );
      setDataPacientes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get(`${urlApi}/pacientes`);
      const responseTag = await axios.get(`${urlApi}/tags`);
      setDataTags(responseTag.data.data);
      setDataPacientes(response.data.data);
      console.log(urlApi);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPesquisa() {
      try {
        const response = await axios.post(`${urlApi}/pesquisarPaciente`, {
          termo: pesquisar,
        });
        setDataPacientes(response.data.data);
        console.log(urlApi);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPesquisa();
  }, [pesquisar]);

  return (
    <Card className="h-screen w-full">
      <CardHeader floated={false} shadow={false} className="h-48 rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Pacientes
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Estes são detalhes sobre os seus pacientes
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                value={pesquisar}
                onChange={(e) => {
                  setPesquisar(e.target.value);
                }}
                label="Pesquisar"
                icon={<SearchIcon className="h-5 w-5" />}
              />
            </div>
            <div>
              <DialogCreatePacientes fetchData={fetchData} />
              <Button
                onClick={() => fetchData()}
                color="blue"
                size="sm"
                fullWidth
              >
                Limpar filtro
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {dataTags.map((tag) => {
            return (
              <TagIcon
                onClick={() => {
                  fetchFilterTag(tag.Codigo_Tag);
                }}
                width={20}
                className="hover:w-7 cursor-pointer"
                color={tag.Cor}
              />
            );
          })}
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll h-full px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataPacientes.map((paciente, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={paciente.Codigo_Paciente}>
                  <td className={classes}>
                    <div className="flex flex-col gap-3 ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {paciente.Nome}
                      </Typography>
                      <div className="grid grid-cols-4 cursor-pointer">
                        {paciente.Tags.map((tag) => {
                          return (
                            <DialogViewTagsPacientes
                              tags={paciente.Tags}
                              cor={tag.Cor}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {paciente.Data_Nascimento}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {paciente.Telefone}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {paciente.Codigo_Paciente}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <DialogUpdatePacientes
                      pacienteData={paciente}
                      fetchData={fetchData}
                    />
                    <Tooltip content="Deletar Paciente">
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "Você tem certeza?",
                            text: "😬😬😬😬",
                            icon: "warning",
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",
                            confirmButtonText: "Sim, deletar!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              console.log(paciente.Codigo_Paciente);
                              if (
                                (await DeletePaciente(
                                  paciente.Codigo_Paciente
                                )) === 200
                              ) {
                                fetchData();
                              }
                            }
                          });
                        }}
                        variant="text"
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
    </Card>
  );
}
