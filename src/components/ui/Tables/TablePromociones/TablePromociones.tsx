import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import PromocionService from "../../../../services/PromocionService";
import Row from "../../../../types/Row";
import IPromocion from "../../../../types/IPromocion";
import PromocionPost from "../../../../types/post/PromocionPost";
import { setPromociones } from "../../../../redux/slices/PromocionReducer";
import { handleSearch, onDelete } from "../../../../utils/utils";
import { toggleModal } from "../../../../redux/slices/ModalReducer";
import Column from "../../../../types/Column";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import EmptyState from "../../Cards/EmptyState/EmptyState";
import SearchBar from "../../common/SearchBar/SearchBar";
import TableComponent from "../Table/Table";
import { Add } from "@mui/icons-material";
import ModalPromocion from "../../Modals/ModalPromocion";

export const TablePromociones = () => {
  const dispatch = useAppDispatch();
  const globalPromociones = useAppSelector((state) => state.promocion.data);
  const isModalOpen = useAppSelector((state) => state.modal.modalPromocion);
  const url = import.meta.env.VITE_API_URL;
  const promocionService = new PromocionService();
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [selectedPromocion, setSelectedPromocion] = useState<
    IPromocion | PromocionPost
  >();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPromociones = async () => {
    try {
      const promociones = await promocionService.getAll(url + "/Promocion");
      dispatch(setPromociones(promociones));
      setFilteredData(promociones);
    } catch (error) {
      console.error("Error al obtener los artículos de insumo:", error);
    } finally {
      setIsLoading(false); // Indicamos que la carga de datos ha terminado
    }
  };

  useEffect(() => {
    fetchPromociones();
  }, [dispatch]);

  const initialValue: PromocionPost = {
    denominacion: "",
    fechaDesde: "",
    fechaHasta: "",
    horaDesde: "",
    horaHasta: "",
    descripcionDescuento: "",
    precioPromocional: 0,
    detalles: [],
  };

  const onSearch = (query: string) => {
    handleSearch(query, globalPromociones, "denominacion", setFilteredData);
  };

  const handleEdit = (promocion: IPromocion) => {
    if (promocion) {
      setIsEditing(true);
      setSelectedPromocion(promocion);
      dispatch(toggleModal({ modalName: "modalPromocion" }));
    }
  };
  const handleAddPromocion = () => {
    setIsEditing(false);
    setSelectedPromocion(initialValue);
    dispatch(toggleModal({ modalName: "modalPromocion" }));
  };

  const handleDelete = async (promocion: IPromocion) => {
    try {
      await onDelete(
        promocion,
        async (promocionToDelete: IPromocion) => {
          await promocionService.delete(
            url + "/Promocion",
            promocionToDelete.id
          );
        },
        fetchPromociones,
        () => {},
        (error: any) => {
          console.error("Error al eliminar la promocion:", error);
        }
      );
    } catch (error) {
      console.error("Error al eliminar la promocion:", error);
    }
  };

  const columns: Column[] = [
    {
      id: "denominacion",
      label: "Nombre",
      renderCell: (rowData) => <>{rowData.denominacion}</>,
    },
    {
      id: "precioCompra",
      label: "Precio de compra",
      renderCell: (rowData) => <>{rowData.precioCompra}</>,
    },
    {
      id: "precioVenta",
      label: "Precio de Venta",
      renderCell: (rowData) => <>{rowData.precioVenta}</>,
    },
    {
      id: "stock",
      label: "Stock",
      renderCell: (rowData) => <>{rowData.stockActual}</>,
    },
    {
      id: "unidadMedida",
      label: "Unidad De Medida",
      renderCell: (rowData) => <>{rowData.unidadMedida.denominacion}</>,
    },
    {
      id: "elaboracion",
      label: "¿Es para elaborar?",
      renderCell: (rowData) => <>{rowData.esParaElaborar ? "Sí" : "No"}</>,
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Promociones
          </Typography>
          <Box>
            <Button
              sx={{
                bgcolor: "#E66200",
                "&:hover": {
                  bgcolor: "grey",
                },
                mr: 1,
                padding: "10px 20px",
                fontSize: "1.0rem",
              }}
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddPromocion}
            >
              Promocion
            </Button>
          </Box>
        </Box>
        {isLoading ? ( // Mostrar componente de carga mientras los datos se están cargando
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <CircularProgress sx={{ color: "#fb6376" }} />
          </Box>
        ) : filteredData.length === 0 ? ( // Mostrar componente de estado vacío si no hay datos
          <EmptyState
            title="No hay promociones cargadas"
            description="Agrega nuevas promociones utilizando el formulario."
          />
        ) : (
          <>
            <Box sx={{ mt: 2 }}>
              <SearchBar onSearch={onSearch} />
            </Box>
            <TableComponent
              data={filteredData}
              columns={columns}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </>
        )}
      </Container>
      {isModalOpen && selectedPromocion && (
        <ModalPromocion
          modalName="modalPromocion"
          initialValues={selectedPromocion || initialValue}
          isEditMode={isEditing}
          getPromociones={fetchPromociones}
          promocionAEditar={selectedPromocion}
        />
      )}
    </Box>
  );
};
