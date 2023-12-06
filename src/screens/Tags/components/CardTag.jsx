import { Card, Typography } from "@material-tailwind/react";
import hexToRgba from "hex-to-rgba";
import { TagIcon } from "lucide-react";
import React from "react";

export default function CardTag({ nome, codigoTag, descricao, cor }) {
  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128 ? "white" : "black";
  };

  const textColor = getContrastColor(cor);

  return (
    <Card className="bg-white  rounded-tl-none relative w-58 h-20">
      <div className="flex gap-2 overflow-hidden overflow-elipses">
        <div style={{ backgroundColor: cor }} className="w-12 h-20 rounded-bl-lg " />
        <div>
          <Typography
            variant="h6"
            className="font-bold"
          >
            {codigoTag}
          </Typography>
          <Typography
            variant="h6"
            color="black"
          >
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
