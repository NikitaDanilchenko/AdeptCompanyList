import { toggleModal, deleteSelectedCompanies, toggleSelectedAll } from "@/entities/companies/model/companiesSlice"
import { Checkbox } from "@/shared/ui/checkbox/Checkbox"
import Modal from "@/shared/ui/modal/Modal"
import { Suspense, useEffect, useState } from "react"
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from "@/app/AppStore"
import { Button } from "@/shared/ui/button/Button"

export const CompanyControls = () => {
    const dispatch = useAppDispatch()
    const companies = useAppSelector(state => state.companiesReducer.companies)
    const allSelected = companies.every(company => company.isSelected);
    const anySelected = companies.some(company => company.isSelected);
    const isModalOpen = useAppSelector(state => state.companiesReducer.isModalOpen)
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const shouldStick = window.scrollY > 150
            setIsSticky(shouldStick)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={styles.controls}>
            <div className={styles.controls_checkboxAll}>
                <p>Выделить все</p>
                <Checkbox
                    isChecked={allSelected}
                    onChange={() => dispatch(toggleSelectedAll(!allSelected))}
                />
            </div>
            <div className={styles.controls_button}>
                <Button
                    variant="green"
                    onClick={() => dispatch(toggleModal())}>
                    Добавить компанию
                </Button>
                <Button
                    variant="red"
                    sticky={isSticky}
                    onClick={() => dispatch(deleteSelectedCompanies())}
                    disabled={!anySelected}>
                    Удалить выбранные
                </Button>
            </div>
            {isModalOpen && (
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Modal />
                </Suspense>
            )}
        </div>
    )
}