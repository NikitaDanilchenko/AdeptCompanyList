import styles from './styles.module.css'
import { CompanyControls } from '@/features/companies/ui/index'
import { CompanyTable } from '@/entities/companies/index'

export const CompanyList = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Список компаний</h1>
            <CompanyControls />
            <CompanyTable />
        </div>
    )
}
