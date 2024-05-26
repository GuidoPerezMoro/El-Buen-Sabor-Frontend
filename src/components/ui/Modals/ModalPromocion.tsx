import PromocionService from "../../../services/PromocionService";
import * as Yup from 'yup';
import PromocionPost from "../../../types/post/PromocionPost";
import Swal from "sweetalert2";
import { useEffect } from "react";

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
        precioVenta: Yup.number().required('Campo requerido'),
        precioCompra: Yup.number().required('Campo requerido').positive('El precio de compra debe ser un número positivo'),
        stockActual: Yup.number()
            .required('Campo requerido')
            .positive('El stock actual debe ser un número positivo')
            .min(Yup.ref('stockMinimo'), 'El stock no puede ser menor que el stock mínimo')
            .max(Yup.ref('stockMaximo'), 'El stock no puede ser mayor que el stock máximo'),
        stockMaximo: Yup.number().required('Campo requerido').positive('El stock máximo debe ser un número positivo'),
        stockMinimo: Yup.number().required('Campo requerido').positive('El stock mínimo debe ser un número positivo'),
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
        <></>
    );
};

export default ModalPromocion;
