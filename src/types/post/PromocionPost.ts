import PromocionDetallePost from "./PromocionDetallePost";

export default interface PromocionPost {
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
    detalles?: PromocionDetallePost[]
}