import ProductCards from "./ProductCards";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

const Products = () => {
    const [products, setProducts]=useState([]);
    const [currentPage, setCurrentPage]=useState(0);
    const [itemsPerPage, setItemsPerPage]=useState(8);
    // const {count}=useLoaderData()
    const [count, setCount]= useState(0);

    const numberOfPage = Math.ceil(count/itemsPerPage);

    // count the page
    // const pages = [];
    // for(let i=0; i<numberOfPage; i++){
    //     pages.push(i);
    // }
    // same operation using one line code 
    const pages = [...Array(numberOfPage).keys()];
    const handleItemPerPage =(e)=>{
        const val =parseInt(e.target.value);
        // console.log(val)
        setItemsPerPage(val);
        setCurrentPage(0);
    }
    const handlePrevPage=()=>{
        if(currentPage > 0){
            setCurrentPage(currentPage -1)
        }
    }
    const handleNextPage=()=>{
        if(currentPage < pages.length-1){
            setCurrentPage(currentPage +1)
        }
    }
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage,itemsPerPage]);

    useEffect(()=>{
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    },[])
    
    console.log(count,products);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-col-5  gap-10">
                {
                    products.map(item => <ProductCards key={item._id} item={item}></ProductCards>)
                }
            </div>
            <div className="flex justify-start items-end gap-10 my-10">
                <p className=" p-3">current Page: {currentPage}</p> 
                
                <Button onClick={handlePrevPage}>Prev</Button>
                {
                    pages.map(page=><Button
                         key={page} 
                         onClick={()=> setCurrentPage(page)}
                         className={currentPage===page? 'selected':undefined}>{page}</Button>)
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