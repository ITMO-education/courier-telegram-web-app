
export const StateCreated = 1n;
export const StatePayed = 2n;
export const StateFoundCourier = 3n;
export const StatePickedUp = 4n;
export const StateDelivered = 5n;
export const StateCanceledByOwner = 6n;
export const StateCanceledByCourier = 7n;

const m = new Map<bigint, string>()

m.set(StateCreated, "Created")
m.set(StatePayed, "Payed")
m.set(StateFoundCourier, "FoundCourier")
m.set(StatePickedUp, "PickedUp")
m.set(StateDelivered, "Delivered")
m.set(StateCanceledByOwner, "CanceledByOwner")
m.set(StateCanceledByCourier, "CanceledByCourier")




export function GetStateName(state: bigint) :string {
    let stateName = m.get(state)
    stateName ??= "Unknown state"

    return stateName
}
