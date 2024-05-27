import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import IPromocion from "../../../../types/IPromocion";
import IArticulo from "../../../../types/IArticulo";
import { setPromociones } from "../../../../redux/slices/PromocionReducer";
import GenericCard from "../GenericCard/GenericCard";
import { onDelete } from "../../../../utils/utils";

interface CardPromocionProps {
  promocion: IPromocion;
  onEdit: (promocion: IPromocion) => void;
  fetchPromociones: () => Promise<void>;
}

const CardPromocion: React.FC<CardPromocionProps> = ({
  promocion,
  onEdit,
  fetchPromociones,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await onDelete(
      promocion,
      async (promocionToDelete) => {
        // Lógica para eliminar la promoción, asumiendo que existe una función deletePromocion
        // await deletePromocion(promocionToDelete.id);
      },
      fetchPromociones,
      () => dispatch(setPromociones([])) // Se actualizan las promociones después de eliminar
    );
  };

  return (
    <GenericCard
      title={promocion.denominacion}
      subtitle={`Válido desde el ${promocion.fechaDesde} a las ${promocion.horaDesde} hasta el ${promocion.fechaHasta} a las ${promocion.horaHasta}.`}
      images={[]} // Aquí se pueden pasar imágenes si están disponibles
      actions={[
        {
          icon: <Edit />,
          tooltip: "Editar",
          onClick: () => onEdit(promocion),
        },
        {
          icon: <Delete />,
          tooltip: "Eliminar",
          onClick: handleDelete,
        },
      ]}
    >
      <CardContent>
        <Typography variant="h6">{promocion.denominacion}</Typography>
        <Typography variant="body2">
          {promocion.descripcionDescuento}
        </Typography>
        <Typography variant="body2">
          Valor: {promocion.precioPromocional}
        </Typography>
        <Typography variant="body2">
          Detalle:
          <ul>
            {promocion.detalles.map((detalle, index) => (
              <li key={index}>
                {detalle.cantidad} {detalle.idArticulo}
              </li>
            ))}
          </ul>
        </Typography>
      </CardContent>
    </GenericCard>
  );
};

export default CardPromocion;
