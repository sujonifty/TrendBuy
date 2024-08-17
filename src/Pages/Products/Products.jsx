import ProductCards from "./ProductCards";
import { useEffect, useState } from "react";
import { Button, Dropdown, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [brands, setBrands] = useState([]);

    // const [categories, setCategories] = useState([]);
    const numberOfPage = Math.ceil(count / itemsPerPage);
    useEffect(() => {
        fetch(`http://localhost:5000/filteredData`)
            .then(res => res.json())
            .then(data => setAllProducts(data))
    }, [])
    // console.log('all', allProducts)
    // console.log('pagi', products)

    useEffect(() => {

        if (selectedBrand) {
            const filterBrands = allProducts.filter((item) => item.brandName === selectedBrand);
            setProducts(filterBrands);
            console.log('brand', filterBrands)
        }
        else if (selectedBrand == '') {
            setProducts(products);
        }
    }, [products, selectedBrand, allProducts])
    useEffect(() => {

        if (selectedCategory) {
            const filterCategories = allProducts.filter((item) => item.categoryName === selectedCategory);
            setProducts(filterCategories);
            console.log('category', products)
        }
        else if (selectedCategory == '') {
            setProducts(products);
        }
    }, [allProducts, products, selectedCategory])

    useEffect(() => {
        if (selectedPriceRange) {
            const [minPrice, maxPrice] = selectedPriceRange.split('-');
            console.log(minPrice, maxPrice);
            if (minPrice) {
                const filterPrice = allProducts.filter((item) => item.price >= minPrice && item.price <= maxPrice);
                setProducts(filterPrice);
                console.log('min', filterPrice)
            }

        }

    }, [selectedPriceRange, allProducts]);
    // count the page 
    const pages = [...Array(numberOfPage).keys()];
    const handleItemPerPage = (e) => {
        const val = parseInt(e.target.value);
        // console.log(val)
        setItemsPerPage(val);
        setCurrentPage(0);
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemsPerPage, search]);

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])
    console.log('search', search)
    // searching section 
    const handleSearch = () => {
        fetch(`http://localhost:5000/search?search=${search}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    const handleSort = (sortType) => {
        console.log(sortType)
        fetch(`http://localhost:5000/sort/${sortType}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data);
                if (data) {
                    Swal.fire({
                        title: 'Success!',
                        text: `Sorted successfully by ${sortType}`,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    useEffect(() => {
        const allBrands = products.map(product => product.brandName);
        setBrands(allBrands);
        // const allCategory = products.map(product => product.categoryName);
        // setCategories([...new Set(allCategory)]);


    }, [products])
    // console.log(brands)
    // console.log(categories)
    return (
        <div>
            s
            <div className="flex flex-wrap  justify-center items-center gap-5 md:gap-40 my-16 bg-red-500">

                <div className="flex justify-center items-center ">
                    <TextInput
                        className="w-40"
                        id="search"
                        placeholder="Searching..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        required
                    />
                    <span className="w-full">
                        <Button className="rounded-l-none -ml-2" onClick={handleSearch}>search</Button>
                    </span>
                </div>
                <div className=" rounded-lg">
                    <select
                        className=" rounded-l-lg"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                        <option value="">All Brands</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {/* {categories.map((category) => (
                       <option key={category} value={category}>
                           {category}
                       </option>
                   ))} */}
                        <option value="Fitness">Fitness</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Personal Care">Personal Care</option>

                    </select>

                    <select
                        className=" rounded-r-lg"
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                    >
                        <option value="">Prices</option>
                        <option value="0-50">0 - 50</option>
                        <option value="51-100">51 - 100</option>
                        <option value="101-200">101 - 200</option>
                        <option value="201-500">201 - 500</option>

                    </select>

                </div>

                <div className="ml-20 -mt-[72px] md:m-0">
                    <Dropdown label="Sort" dismissOnClick={false}>
                        <Dropdown.Item onClick={() => handleSort('date')}>Sort  by date</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('price')}>Sort by price</Dropdown.Item>
                    </Dropdown>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-col-5  gap-10">
                {
                    products.map(item => <ProductCards key={item._id} item={item}></ProductCards>)
                }
            </div>

            <div className="flex justify-start items-end gap-10 my-10">
                <p className=" p-3">current Page: {currentPage}</p>

                <Button onClick={handlePrevPage}>Prev</Button>
                {
                    pages.map(page => <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'selected' : undefined}>{page}</Button>)
                }
                <Button onClick={handleNextPage}>Next</Button>
                <select onChange={handleItemPerPage} name="" id="" value={itemsPerPage}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                </select>
            </div>
        </div>
    );
};

export default Products;