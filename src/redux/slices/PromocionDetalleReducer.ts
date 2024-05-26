
import IPromocionDetalle from '../../types/IPromocionDetalle';
import PromocionDetallePost from '../../types/post/PromocionDetallePost';

import { createGenericSlice } from './GenericReducer';

const promocionDetalleSlice = createGenericSlice<IPromocionDetalle| PromocionDetallePost[]>('promocionDetalleState', { data: [] });

export const { setData: setPromocionDetalle, resetData: resetPromocionDetalle } = promocionDetalleSlice.actions;

export default promocionDetalleSlice.reducer;