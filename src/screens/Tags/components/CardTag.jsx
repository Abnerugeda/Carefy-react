import { Card, Typography } from "@material-tailwind/react";
import { TagIcon } from "lucide-react";
import React from "react";

export default function CardTag({ nome, codigoTag,  cor, onClick}) {
  
  return (
    <Card
      onClick={onClick}
      className={`bg-white cursor-pointer rounded-tl-none relative transition-transform transform hover:shadow-2xl hover:shadow-blue-100 hover:translate-y-[-5px] w-58 h-20 `}
    >
      <div className="flex gap-2 overflow-hidden overflow-elipses">
        <div
          style={{ backgroundColor: cor }}
          className="w-12 h-20 rounded-bl-lg "
        />
        <div>
          <Typography variant="h6" className="font-bold">
            {codigoTag}
          </Typography>
          <Typography variant="h6" color="black">
            {nome}
          </Typography>
        </div>
      </div>
      <TagIcon
        style={{ color: cor }}
        className="absolute bottom-[-10px] right-[-5px]"
      />
    </Card>
  );
}
