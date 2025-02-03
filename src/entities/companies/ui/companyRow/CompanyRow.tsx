import { useAppDispatch, useAppSelector } from "@/app/AppStore";
import React from "react";
import styles from './styles.module.css'
import { editCompany, toggleSelect } from "@/entities/companies/model/companiesSlice";
import { EditableSpan } from "@/shared/ui/editableSpan/EditableSpan";
import { Checkbox } from "@/shared/ui/checkbox/Checkbox";

export type CompanyRowProps = {
    company: {
        id: string
        isSelected: boolean
        name: string
        address: string
    }
}

export const CompanyRow = React.memo(({ company }: CompanyRowProps) => {
    const dispatch = useAppDispatch();
    const currentCompany = useAppSelector(state =>
        state.companiesReducer.companies.find(comp =>
            comp.id === company.id
        )
    )

    const handleToggleSelect = () => {
        dispatch(toggleSelect(company.id))
    }
    
    const handleEditCompany = (newValues: { name?: string, address?: string }) => {
        dispatch(editCompany({ id: company.id, name: newValues.name ?? company.name, address: newValues.address ?? company.address }))
    }

    if (!currentCompany) return null
    return (
        <div className={currentCompany.isSelected ? styles.selected : styles.row}>
            <div className={styles.cell}>
                <Checkbox
                    isChecked={currentCompany.isSelected}
                    onChange={handleToggleSelect}
                />
            </div>
            <div className={styles.cell}>
                <EditableSpan
                    title={currentCompany.name}
                    onChange={(newName) => handleEditCompany({ name: newName })}
                />
            </div>
            <div className={styles.cell}>
                <EditableSpan
                    title={currentCompany.address}
                    onChange={(newAddress) => handleEditCompany({ address: newAddress })}
                />
            </div>
        </div>
    );
})
