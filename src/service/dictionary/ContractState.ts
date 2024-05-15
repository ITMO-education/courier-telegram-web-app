
export const StateCreated = 1n;
export const StatePayed = 2n;
export const StateFoundCourier = 3n;
export const StatePickedUp = 4n;
export const StateDelivered = 5n;
export const StateCanceledByOwner = 6n;
export const StateCanceledByCourier = 7n;

const m = new Map<bigint, string>()

m.set(StateCreated, "Требуется оплата")
m.set(StatePayed, "Ищем курьера")
m.set(StateFoundCourier, "Курьер в пути за заказом")
m.set(StatePickedUp, "Курьер доставляет адресату")
m.set(StateDelivered, "Доставлено")
m.set(StateCanceledByOwner, "Отменено")
m.set(StateCanceledByCourier, "Отменено курьером")

export function GetStateName(state: bigint) :string {
    let stateName = m.get(state)
    stateName ??= "Unknown state"

    return stateName
}
