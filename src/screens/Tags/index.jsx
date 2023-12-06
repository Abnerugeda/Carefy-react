import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Plus, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CardTag from "./components/CardTag";
import axios from "axios";
const urlApi = import.meta.env.VITE_URL_API;

export default function Tags() {
  const [dataTags, setDataTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${urlApi}/tags`);
        setDataTags(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="h-screen w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              TAGS
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Estes são detalhes sobre as suas tags
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Link to={"/novoPedido"}>
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <Plus strokeWidth={2} className="h-4 w-4" /> Cadastrar Tag
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="bg-[#F8FAFC] overflow-scroll grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 h-full p-5">
        {dataTags.map((value) => {
          return (
            <CardTag
              key={value.Codigo_Tag}
              nome={value.Nome}
              descricao={value.Descricao}
              cor={value.Cor}
              codigoTag={value.Codigo_Tag}
            />
          );
        })}
      </CardBody>
    </Card>
  );
}
