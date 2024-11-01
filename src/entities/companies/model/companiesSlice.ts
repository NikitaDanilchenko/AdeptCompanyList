import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyType } from "./types";
import { generateCompanies } from "@/shared/helpers/generateCompanies";

interface CompaniesState {
    companies: CompanyType[],
    isModalOpen: boolean
}

const initialState: CompaniesState = {
    companies: generateCompanies(10000),
    isModalOpen: false
}

export const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        toggleSelectedAll: (state: CompaniesState, action: PayloadAction<boolean>) => {
            state.companies.forEach((company) => company.isSelected = action.payload)
        },
        toggleSelect: (state: CompaniesState, action: PayloadAction<string>) => {
            const company = state.companies.find(comp => comp.id === action.payload);
            if (company) company.isSelected = !company.isSelected;
        },
        editCompany: (state: CompaniesState, action: PayloadAction<{ id: string, name: string, address: string }>) => {
            const company = state.companies.find(comp => comp.id === action.payload.id);
            if (company) {
                company.name = action.payload.name;
                company.address = action.payload.address;
            }
        },
        addCompany: (state: CompaniesState, action: PayloadAction<{ name: string, address: string }>) => {
            state.companies.unshift(
                {
                    id: new Date().toString(),
                    isSelected: false,
                    name: action.payload.name,
                    address: action.payload.address
                }
            );
        },
        toggleModal: (state: CompaniesState) => {
            state.isModalOpen = !state.isModalOpen
        },
        deleteSelectedCompanies: (state) => {
            state.companies = state.companies.filter(company => !company.isSelected);
        }
    }
})

export const { 
    toggleSelectedAll, 
    toggleSelect, 
    editCompany, 
    addCompany, 
    toggleModal, 
    deleteSelectedCompanies 
} = companiesSlice.actions
export default companiesSlice.reducer