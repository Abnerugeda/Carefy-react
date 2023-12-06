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
import { PencilIcon, Plus, SearchIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${urlApi}/pacientes`);
        setDataPacientes(response.data.data);
        console.log(urlApi)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
        try {
          const response = await axios.post(`${urlApi}/pesquisarPaciente`, {termo: pesquisar});
          setDataPacientes(response.data.data);
          console.log(urlApi)
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
  }, [pesquisar])

  return (
    <Card className="h-screen w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
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
                onChange={(e)=>{setPesquisar(e.target.value)}}
                label="Pesquisar"
                icon={<SearchIcon className="h-5 w-5" />}
              />
            </div>
            <Link to={"/novoPedido"}>
              <Button className="flex items-center gap-3" color="blue" size="sm">
                <Plus strokeWidth={2} className="h-4 w-4" /> Cadastrar paciente
              </Button>
            </Link>
          </div>
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
            {dataPacientes.map(
              (
                {
                 Nome,
                 Codigo_Paciente,
                 Data_Nascimento,
                 Telefone
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={Nome}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {Nome}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Data_Nascimento}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Telefone}
                      </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Codigo_Paciente}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Editar Paciente">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Deletar Paciente">
                        <IconButton variant="text">
                          <Trash2Icon className="h-4 w-4 text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
       
      </CardFooter>
    </Card>
  );
}
