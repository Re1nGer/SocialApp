import { Icon } from "@iconify/react";
import "./Searchbar.css";
import { useState, ChangeEvent, useEffect } from 'react';
import Test from '../../assets/download.jpg'
import { motion } from "framer-motion";
import { axios } from '../../axios';
import useDebounce from "../../hooks/useDebounce";
import CircleLoader from "../loader/CircleLoader";

type Users = {
    id: number,
    username: string,
    imgSrc: string
};

const Searchbar = (): JSX.Element => {

    const [inputValue, setInputValue] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedValue = useDebounce<string>(inputValue, 500);

    const [users, setUsers] = useState<Users[]>([]);

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const fetchUsers = async (keyword: string): Promise<void> => {
        try {
            //setIsLoading(true);
            const { data } = await axios.get<Users[]>(`/api/v1/users/${keyword}`);
            setUsers(data);
        } catch (error) {
            console.log(error);
        } finally {
            //setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(debouncedValue);
    },[debouncedValue])

    return (
        <>
            <div className="searchbar">
                <Icon icon="material-symbols:search" fontSize={20} className="searchbar__input-icon" />
                <input
                    onChange={handleInputChange}
                    className="searchbar__input"
                    placeholder="type in email"
                    value={inputValue}
                />
                <div className="searchbar__results">
                { isLoading ? (
                    <CircleLoader />
                ) : null }
                { users.map(item => (
                    <div className="searchbar__result" key={item.id}>
                        <img className="searchbar__result-img" src={item.imgSrc} alt="search" />
                        <div className="searchbar__result">
                            { item.username }
                        </div>
                    </div>
                )) }
                </div>
            </div>
        </>
    );
};


export default Searchbar;