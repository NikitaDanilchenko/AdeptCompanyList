import { useAppSelector } from '@/app/AppStore'
import styles from './styles.module.css'
import { CompanyRow } from '@/entities/companies/index'
import { useEffect, useMemo, useState } from 'react'

export const CompanyTable = () => {
    const companies = useAppSelector(state => state.companiesReducer.companies)
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 15;

    const visibleCompanies = useMemo(() => {
        const startIndex = 0;
        const endIndex = currentPage * companiesPerPage;
        return companies.slice(startIndex, endIndex);
    }, [companies, currentPage]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const { innerHeight } = window

        if (scrollHeight - (scrollTop + innerHeight) < 100) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={styles.table}>
            <div className={styles.header}>
                <div className={styles.cell}></div>
                <div className={styles.cell}>Название компании</div>
                <div className={styles.cell}>Адрес</div>
            </div>
            {visibleCompanies.map(company => (
                <CompanyRow key={company.id} company={company} />
            ))}
        </div>
    )
}