import DataModel from "./DataModel";

export default interface IPromocion extends DataModel<IPromocion>{
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
}