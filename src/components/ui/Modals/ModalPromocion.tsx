import PromocionService from "../../../services/PromocionService";
import * as Yup from 'yup';
import PromocionPost from "../../../types/post/PromocionPost";
import Swal, { SweetAlertIcon } from "sweetalert2";
import GenericModal from "./GenericModal";
import { Box, Button, Card, CardActions, CardMedia, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import TextFieldValue from "../TextFieldValue/TextFieldValue";
import EmpresaService from "../../../services/EmpresaService";
import SucursalService from "../../../services/SucursalService";
import { useEffect, useState } from "react";
import ISucursal from "../../../types/ISucursal";
import IPromocion from "../../../types/IPromocion";
import ImagenService from "../../../services/ImagenService";
import { TipoPromocion } from "../../../types/enums/TipoPromocion";
import { Delete, PhotoCamera } from "@mui/icons-material";
import IImagen from "../../../types/IImagen";
import DeleteIcon from '@mui/icons-material/Delete';
import CardArticuloSeleccionado from "../Cards/CardArticuloSeleccionado/CardArticuloSeleccionado";

interface ModalPromocionProps {
    modalName: string;
    initialValues: PromocionPost | any;
    isEditMode: boolean;
    fetchPromociones: () => void;
    promocionAEditar?: any;
    idSucursal: number;
    onClose: () => void;
}

const ModalPromocion: React.FC<ModalPromocionProps> = ({
    modalName,
    initialValues,
    isEditMode,
    fetchPromociones,
    promocionAEditar,
    idSucursal,
    onClose
}) => {
    const URL = import.meta.env.VITE_API_URL;

    const promocionService = new PromocionService();
    const empresaService = new EmpresaService();
    const sucursalService = new SucursalService();
    const imagenService = new ImagenService();
    

    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [selectedSucursales, setSelectedSucursales] = useState<number[]>([]);
    const [selectedArticles, setSelectedArticles] = useState<{ idArticulo: number, cantidad: number, denominacion: string }[]>([]);
    const [tipoPromocion, setTipoPromocion] = useState(TipoPromocion.PROMOCION);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [promocionImages, setPromocionImages] = useState<any[]>([]);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  


    const validationSchema = Yup.object().shape({
        denominacion: Yup.string().required('Campo requerido'),
        fechaDesde: Yup.date().required('Campo requerido'),
        fechaHasta: Yup.date().required('Campo requerido'),
        horaDesde: Yup.string().required('Campo requerido'),
        horaHasta: Yup.string().required('Campo requerido'),
        descripcionDescuento: Yup.string().required('Campo requerido'),
        precioPromocional: Yup.number().required('Campo requerido'),
    });

    
  const showModal = (title: string , text: string, icon: SweetAlertIcon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      customClass: {
        container: "my-swal",
      },
    });
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Verificar si la cantidad total de imágenes (las actuales más las nuevas) supera el límite de 3
      if (promocionImages.length + files.length > 3) {
        showModal("Error", "No puedes subir más de 3 imágenes", "warning");
        event.target.value = '';
        return;
      }
  
      // Si no supera el límite, actualizar la lista de archivos seleccionados
      setSelectedFiles(files);
      // Calcular la cantidad total de imágenes después de agregar las nuevas
      const totalImages = promocionImages.length + files.length;
      // Habilitar el botón de submit si hay al menos una imagen seleccionada
      setDisableSubmit(totalImages === 0);
    }
  };
  

  const uploadImages = async (id: number) => {
    if (!selectedFiles) {
      return showModal("No hay imágenes seleccionadas", "Selecciona al menos una imagen", "warning");;
    }
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("uploads", file);
    });

    const url = `${URL}/promocion/uploads?id=${id}`;

    Swal.fire({
      title: "Subiendo imágenes...",
      text: "Espere mientras se suben los archivos.",
      customClass: {
        container: 'my-swal',
      },
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const modal = Swal.getPopup();
        if (modal) {
          modal.classList.add('my-swal');
        }
      },
    });

    try {
      const response = await imagenService.uploadImages(url, formData); 

      if (!response.ok) {
        throw new Error('Error al subir las imágenes');
      }

      showModal("Éxito", "Imágenes subidas correctamente", "success");
    } catch (error) {
      showModal("Error", "Algo falló al subir las imágenes, inténtalo de nuevo.", "error");
      console.error("Error al subir las imágenes:", error);
    }
    setSelectedFiles(null);
  };

  const handleDeleteImg = async (url: string, uuid: string) => {
    const urlParts = url.split("/");
    const publicId = urlParts[urlParts.length - 1];
  
    const formData = new FormData();
    formData.append("publicId", publicId);
    formData.append("id", uuid);
  
    if (promocionImages.length === 1) {
      showModal("Error", "No puedes eliminar la última imagen de la promocion", "warning");
      return;
    }
  
    Swal.fire({
      title: "Eliminando imagen...",
      text: "Espere mientras se elimina la imagen.",
      customClass: {
        container: 'my-swal',
      },
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch(`${URL}/promocion/deleteImg`, {
        method: "POST",
        body: formData,
      });
  
      Swal.close();
  
      if (response.ok) {
        showModal("Éxito", "Imagen eliminada correctamente", "success");
        // Filtra la imagen eliminada de la lista
        const updatedImages = promocionImages.filter((img) => img.uuid !== uuid);
        setPromocionImages(updatedImages);
        // Vuelve a cargar las imágenes actualizadas
        fetchPromociones();
        onClose(); // Close the modal
      } else {
        showModal("Error", "Algo falló al eliminar la imagen, inténtalo de nuevo.", "error");
      }
    } catch (error) {
      Swal.close();
      showModal("Error", "Algo falló, contacta al desarrollador.", "error");
      console.error("Error:", error);
    }
  };
  

    const fetchSucursales = async () => {
        try {
            const sucursal = await sucursalService.get(`${URL}/sucursal`, idSucursal) as ISucursal;
            const empresaid = sucursal.empresa.id;
            const empresa = await empresaService.get(`${URL}/empresa/sucursales`, empresaid);
            const sucursales = empresa.sucursales;
            setSucursales(sucursales);
        } catch (error) {
            console.error("Error al obtener las sucursales:", error);
        }
    };

    useEffect(() => {
        fetchSucursales();
    }, [idSucursal]);

    const handleAgregarArticulo = (idArticulo: number, cantidad: number, denominacion: string) => {
        const nuevoArticulo = { idArticulo, cantidad, denominacion };
        setSelectedArticles([...selectedArticles, nuevoArticulo]);
    };

    const handleEliminarArticulo = (index: number) => {
        const nuevosArticulos = [...selectedArticles];
        nuevosArticulos.splice(index, 1);
        setSelectedArticles(nuevosArticulos);
    };


    const handleTipoPromocionChange = (event: SelectChangeEvent<TipoPromocion>) => {
        const tipo = event.target.value as TipoPromocion;
        // Actualiza el estado tipoPromocion
        setTipoPromocion(tipo);
    };



    useEffect(() => {
        const articulosGuardados = JSON.parse(localStorage.getItem('articulosSeleccionados') || '[]');
        setSelectedArticles(articulosGuardados);
    }, []);

    useEffect(() => {
        localStorage.setItem('articulosSeleccionados', JSON.stringify(selectedArticles));
    }, [selectedArticles]);

    useEffect(() => {
        if (!isEditMode) {
            return () => setSelectedArticles([]);
        }
    }, [isEditMode]);



    const handleSubmit = async (values: PromocionPost) => {
        let rollback = false; // Variable para controlar el rollback
        let id: number | null = null;
    
        try {
            // Validaciones previas al envío de datos
            if (!isEditMode && (!selectedFiles || selectedFiles.length === 0)) {
                showModal("Error", "Debes subir al menos una imagen", "warning");
                return;
            }
    
            if (selectedFiles && selectedFiles.length > 3) {
                showModal("Error", "No puedes subir más de 3 imágenes", "warning");
                return;
            }
    
            if (selectedSucursales.length === 0) {
                showModal("Error", "Debe seleccionar al menos una sucursal.", "warning");
                return;
            }
    
            // Construcción del objeto a enviar
            const promocionPost: PromocionPost = {
                denominacion: values.denominacion,
                fechaDesde: values.fechaDesde,
                fechaHasta: values.fechaHasta,
                horaDesde: values.horaDesde,
                horaHasta: values.horaHasta,
                descripcionDescuento: values.descripcionDescuento,
                precioPromocional: values.precioPromocional,
                tipoPromocion: values.tipoPromocion,
                idSucursales: selectedSucursales,
                detalles: selectedArticles
            };
    
            let response;
    
            // Envío de datos (POST o PUT)
            if (isEditMode && promocionAEditar) {
                response = await promocionService.put(`${URL}/promocion`, promocionAEditar.id, promocionPost);
                id = promocionAEditar.id;
            } else {
                response = await promocionService.post(`${URL}/promocion`, promocionPost) as IPromocion;
                id = response.id;
            }
    
            // Verificación de éxito en el envío de datos
            if (id !== null) {
                if (selectedFiles) {
                    await uploadImages(id);
                }
    
                showModal("Éxito", isEditMode ? "Promoción editada correctamente" : "Promoción creada correctamente", "success");
                fetchPromociones();
    
            } else {
                throw new Error("El ID de la promoción es nulo");
            }
    
        } catch (error) {
            rollback = true; // Establecer rollback a true en caso de error
            if (id !== null && rollback) { // Realizar rollback si es necesario
                await promocionService.delete(`${URL}/promocion`, id);
            }
            showModal("Error", "Ocurrió un error, por favor intenta nuevamente.", "error");
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleToggleSucursal = (sucursalId: number) => {
        if (selectedSucursales.includes(sucursalId)) {
            setSelectedSucursales(selectedSucursales.filter(id => id !== sucursalId));
        } else {
            setSelectedSucursales([...selectedSucursales, sucursalId]);
        }
    };

    return (
        <GenericModal
            modalName={modalName}
            title={isEditMode ? 'Editar Promocion' : 'Añadir Promocion'}
            initialValues={promocionAEditar || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            isEditMode={isEditMode}
            disableSubmit = {disableSubmit}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextFieldValue label="Denominación" name="denominacion" type="text" placeholder="Denominación" disabled={isEditMode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldValue label="Precio promocional" name="precioPromocional" type="number" placeholder="Precio promocional" />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextFieldValue name="fechaDesde" type="date" placeholder="Desde la fecha" label='Desde la fecha' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldValue name="fechaHasta" type="date" placeholder="Hasta la fecha" label='Hasta la fecha' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextFieldValue name="horaDesde" type="time" placeholder="Desde la hora" label='Desde la hora' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldValue name="horaHasta" type="time" placeholder="Hasta la hora" label='Hasta la hora' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextFieldValue label="Descripción" name="descripcion" type="text" placeholder="Descripcion" disabled={isEditMode} />
                    </Grid>
                </Grid>
                <FormControl fullWidth>
                    <InputLabel id="select-tipo-promocion-label">Tipo de Promoción</InputLabel>
                    <Select
                        labelId="select-tipo-promocion-label"
                        id="select-tipo-promocion"
                        value={tipoPromocion}
                        onChange={handleTipoPromocionChange}
                        label="Tipo de Promoción"
                        name="tipoPromocion"
                        disabled={isEditMode}
                    >
                        {Object.values(TipoPromocion).map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                                {tipo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                    sx={{
                        my: 2,
                        bgcolor: "#E66200",
                        "&:hover": {
                            bgcolor: "grey",
                        },
                    }}
                >
                    Subir Imágenes
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        multiple
                    />
                </Button>
                {isEditMode && promocionAEditar && promocionAEditar?.imagenes.length > 0 && (
                    <div>
                        <Typography variant='h5' sx={{ mb: 1 }}>Imágenes del producto</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {promocionAEditar?.imagenes.map((image: IImagen) => (
                                <Card key={image.id} style={{ position: 'relative', width: '100px', height: '100px' }}>
                                    <CardMedia
                                        component="img"
                                        image={image.url}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <CardActions style={{ position: 'absolute', top: 0, right: 0 }}>
                                        <IconButton style={{ color: 'red' }} onClick={() => handleDeleteImg(image.url, image.id.toString())}>
                                            <Delete />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </Box>
                
                {!isEditMode && (
                    <>
                        <p>Selecciona las sucursales:</p>
                        {sucursales.map((sucursal: ISucursal) => (
                            <FormControlLabel
                                key={sucursal.id}
                                control={
                                    <Checkbox
                                        checked={selectedSucursales.includes(sucursal.id)}
                                        onChange={() => handleToggleSucursal(sucursal.id)}
                                    />
                                }
                                label={sucursal.nombre}
                            />
                        ))}
                    </>
                )}

                <CardArticuloSeleccionado onAgregarArticulo={handleAgregarArticulo} />
                {!isEditMode && (
                    <div>
                        <Typography variant='body1' sx={{ mt: 2 }}>Artículos seleccionados:</Typography>
                        <List>
                            {selectedArticles.map((article, index) => (
                                <ListItem key={article.idArticulo}>
                                    <ListItemText primary={`${article.denominacion} - ${article.cantidad}`} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => handleEliminarArticulo(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )}
            </div>
        </GenericModal>
    );
};

export default ModalPromocion;