export const generateCompanies = (count: number) => {
    return Array.from({length: count}, (_, index) => ({
        id: (index + 1).toString(),
        isSelected: false,
        name: `Компания ${index + 1}`,
        address: `ул.${index + 1} линия, г.Ростов-на-Дону`
    }))
}