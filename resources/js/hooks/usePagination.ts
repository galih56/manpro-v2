import { useState } from "react";

export type UsePaginationType = {
    page?: number,
    limit?: number,
}

export const usePagination = ({
    page=1,
    limit=10,
} : UsePaginationType) =>{
    const [pageNumber, setPageNumber] = useState(page);
    const [itemsPerPage, setItemsPerPage] = useState<number>(limit)
  
    const pageNumberOnChange = (number : number) => setPageNumber(number);
    const itemsPerPageOnChange = (data : any) => setItemsPerPage(data);

    return {
        page : pageNumber,
        limit : itemsPerPage,
        pageOnChange : pageNumberOnChange,
        itemsPerPageOnChange : itemsPerPageOnChange 
    }
}