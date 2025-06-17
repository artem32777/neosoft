export const generateId = (items: number[]) => (items.length > 0 ? Math.max(...items) + 1 : 0)
