import DataModel from "./DataModel";
import IArticulo from "./IArticulo";


export default interface IPromocionDetalle extends DataModel<IPromocionDetalle>{
    detalle: String;
    articulo: IArticulo;
}