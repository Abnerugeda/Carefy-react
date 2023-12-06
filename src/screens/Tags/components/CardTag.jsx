import { Card, Typography } from "@material-tailwind/react";
import { TagIcon } from "lucide-react";
import React from "react";

export default function CardTag({ nome, codigoTag, descricao, cor }) {
  return (
    <Card className=" relative bg-white w-52 h-52">
      <TagIcon style={{color: cor}} className="absolute top-0 right-[-15px]"/>

      <div className="m-2 overflow-hidden overflow-ellipsis">
        <Typography variant="h5" color="black">
          {nome}
        </Typography>
        <div className="bg-gray-300 w-full h-[1px]" />
        <Typography className="mb-1" variant="h6">
          Código: {codigoTag}
        </Typography>
        <Typography variant="h6">{descricao}</Typography>
      </div>
      <div
        style={{ backgroundColor: cor }}
        className={`absolute bottom-0 rounded-b-lg w-full h-6 bottom-0`}
      ></div>
    </Card>
  );
}
