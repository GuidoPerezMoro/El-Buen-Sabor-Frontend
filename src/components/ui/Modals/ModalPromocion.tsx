import PromocionService from "../../../services/PromocionService";
import * as Yup from 'yup';
import PromocionPost from "../../../types/post/PromocionPost";
import Swal from "sweetalert2";
import GenericModal from "./GenericModal";
import { Grid } from "@mui/material";
import TextFieldValue from "../TextFieldValue/TextFieldValue";

interface ModalPromocionProps {
    modalName: string;
    initialValues: any;
    isEditMode: boolean;
    getPromociones: Function;
    promocionAEditar?: any;
}

const ModalPromocion: React.FC<ModalPromocionProps> = ({
    modalName,
    initialValues,
    isEditMode,
    getPromociones,
    promocionAEditar,
}) => {
    const promocionService = new PromocionService();
    const URL = import.meta.env.VITE_API_URL;

    const validationSchema = Yup.object().shape({
        denominacion: Yup.string().required('Campo requerido'),
        precioPromocional: Yup.number().required('Campo requerido'),
        fechaDesde: Yup.date().required('Campo requerido'),
        fechaHasta: Yup.date().required('Campo requerido'),
        horaDesde: Yup.date().required('Campo requerido'),
        horaHasta: Yup.date().required('Campo requerido'),
        descripcion: Yup.string().required('Campo requerido'),
    });

    const handleSubmit = async (values: PromocionPost) => {
        console.log(values)
        try {
            const promocionPost = {
                denominacion: values.denominacion,
                fechaDesde: values.fechaDesde,
                fechaHasta: values.fechaHasta,
                horaDesde: values.horaDesde,
                horaHasta: values.horaHasta,
                descripcionDescuento: values.descripcionDescuento,
                precioPromocional: values.precioPromocional,
                detalles: []
            };

            console.log(promocionPost);

            let response;


            if (isEditMode && promocionAEditar) {
                response = await promocionService.put(`${URL}/Promocion`, promocionAEditar.id, promocionPost);
                getPromociones();
            } else {
                response = await promocionService.post(`${URL}/Promocion`, promocionPost);
                getPromociones();
            }

            if (response) {
                Swal.fire({
                    title: '¡Éxito!',
                    text: isEditMode ? 'Promocion editada correctamente' : 'Promocion creada correctamente',
                    icon: 'success',
                });
                getPromociones();
            } else {
                throw new Error('No se recibió una respuesta del servidor.');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al enviar los datos',
                icon: 'error',
            });
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
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <TextFieldValue label="Denominación" name="denominacion" type="text" placeholder="Denominación" disabled={isEditMode} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldValue label="Precio promocional" name="precioPromocional" type="number" placeholder="Precio promocional" />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <TextFieldValue label="Desde la fecha" name="fechaDesde" type="date" placeholder="Desde la fecha" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldValue label="Hasta la fecha" name="fechaHasta" type="date" placeholder="Hasta la fecha" />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <TextFieldValue label="Desde la hora" name="horaDesde" type="date" placeholder="Desde la hora" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldValue label="Hasta la hora" name="horaHasta" type="time" placeholder="Hasta la hora" />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center"/>
                <Grid item xs={6}>
                    <TextFieldValue label="Descripcion" name="descripcionDescuento" type="text" placeholder="Descripcion"/>
                </Grid>
            </div>
        </GenericModal>
    );
};

export default ModalPromocion;