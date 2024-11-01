import { useAppDispatch, useAppSelector } from '@/app/AppStore';
import React, { useState } from 'react';
import { addCompany, toggleModal } from '@/entities/companies/model/companiesSlice';
import styles from './styles.module.css'
import { Button } from '../button/Button';

const Modal: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const isModalOpen = useAppSelector((state) => state.companiesReducer.isModalOpen);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(addCompany({ name, address }));
        dispatch(toggleModal());
        setName('');
        setAddress('');
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            dispatch(toggleModal())
        }
    }

    if (!isModalOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleCloseModal}>
            <div className={styles.modal}>
                <h3>Добавить компанию</h3>
                <div className={styles.modal_controls}>
                    <input
                        className={styles.modal_input}
                        type='text'
                        placeholder='Название компании'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className={styles.modal_input}
                        type='text'
                        placeholder='Адрес компании'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button
                        variant='green'
                        onClick={handleSubmit}
                        disabled={name.trim() === '' || address.trim() == ''}>
                        Добавить
                    </Button>
                    <Button
                        variant='red'
                        onClick={() => dispatch(toggleModal())}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal