import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from '../Hooks/useBookSearch'


const WebDevScroll = () => {
    
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    
    const {books, loading, error, hasMore} = useBookSearch(query, pageNumber)
    
    const observer = useRef();
    const lastBookElement = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])
    const handleSearch = (e) => {
        setQuery(e.target.value);
        setPageNumber(1);
    }
    
        return (
        <div>
           <input type="text" value={query} onChange={handleSearch}/>
            {books.map((book, index) => {
                if(books.length === index + 1){
                    return <div ref={lastBookElement} key={index}>{book}</div>
                } else {
                    return <div key={index}>{book}</div>
                }
            })}
           <div>{loading && 'Loading...'}</div>
           <div>{error && 'Error'}</div>
        </div>
    )
}

export default WebDevScroll
