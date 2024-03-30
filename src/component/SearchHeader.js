import { Image, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuSearch, LuSearchX } from "react-icons/lu";
import { Link } from "react-router-dom";

const { Option } = Select;

export default function SearchHeader() {

    const [isOpen, setIsOpen] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null)
    const [products, setProducts] = useState([])

    const handleChange = (value) => {
        setSelectedItem(value)
    };

    const fetchProducts = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/product/getAllNoPage`)
            .then((res) => {
                const data = res?.data;
                setProducts(data);
            })
            .catch(() => message.error("Error server!"));
    };

    useEffect(() => {
        isOpen &&
            fetchProducts()
    }, [isOpen])

    return (
        <div style={{ position: 'relative' }}>
            {isOpen
                ? <LuSearchX size={26} style={{ marginRight: 2 }} onClick={() => setIsOpen(!isOpen)} />
                : <LuSearch size={26} style={{ marginRight: 2 }} onClick={() => setIsOpen(!isOpen)} />
            }
            {isOpen &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: 380, height: 60, background: "#fff", position: "absolute", right: -80, bottom: -70, gap: 6 }}>
                    <Select
                        filterOption={(inputValue, option) =>
                            option.props.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                        onChange={handleChange} showSearch allowClear placeholder="Search" className="!rounded-lg" style={{ display: 'flex', width: 280, justifyContent: "start", alignItems: 'center' }}
                    >
                        {

                            products?.data?.map(item => (
                                <Option value={item.product_id}>
                                    {item.product_name}
                                </Option>
                            ))

                        }

                    </Select>

                    <Link onClick={() => setIsOpen(!isOpen)} to={`/market/${selectedItem}`}>
                        <button disabled={ selectedItem === null && true } className="text-xs border px-2 py-2 rounded-[4px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800">
                            Search
                        </button>
                    </Link>
                </div>
            }

        </div>
    );
}
